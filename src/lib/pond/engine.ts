import { WaveSim, gridHeightFor } from './sim';

const VERTEX = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// Ripples are drawn as contour lines of the height field, so they match the hand-drawn rings.
const FRAGMENT = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uHeight;
uniform vec2 uRes;
uniform vec2 uTilt;
uniform float uRest;
uniform vec3 uFlash;
uniform vec3 uInk;
out vec4 outColor;

// Same radii and opacities as PondDrawing's RINGS, so the SVG-to-canvas swap is invisible.
const float RADII[7] = float[7](0.04, 0.113, 0.213, 0.333, 0.473, 0.633, 0.8);
const float ALPHAS[7] = float[7](1.0, 0.85, 0.65, 0.45, 0.3, 0.2, 0.12);

float rings(vec2 centerUv, vec2 uv) {
  vec2 px = (uv - centerUv) * uRes;
  float e = length(vec2(px.x, px.y / 0.4)) / (uRes.x * 0.5);
  float w = fwidth(e) * 1.1;
  float a = 1.0 - smoothstep(1.6, 2.6, length(px));
  for (int i = 0; i < 7; i++) {
    a = max(a, (1.0 - smoothstep(0.0, w, abs(e - RADII[i]))) * ALPHAS[i]);
  }
  return a;
}

float level(float h, float c) {
  float w = max(fwidth(h) * 1.1, 1e-4);
  return 1.0 - smoothstep(0.0, w, abs(h - c));
}

void main() {
  float h = texture(uHeight, vUv).r + dot(uTilt, vUv - 0.5);

  // Crest and trough lines at a few heights: every wave becomes a clean ring.
  float water = max(
    max(level(h, 0.02) * 0.8, level(h, -0.03) * 0.28),
    level(h, 0.12) * 0.4
  );

  // Fade the water out toward an ellipse, so the pond has no rectangular edge.
  vec2 px = (vUv - 0.5) * uRes;
  float er = length(vec2(px.x, px.y / 0.4)) / (uRes.x * 0.47);
  water *= 1.0 - smoothstep(0.82, 1.0, er);

  float rest = rings(vec2(0.5), vUv) * uRest;
  float flash = uFlash.z > 0.0 ? rings(uFlash.xy, vUv) * uFlash.z : 0.0;
  float a = max(max(water, rest), flash);
  outColor = vec4(uInk * a, a);
}`;

const STEP = 1 / 60;
const MAX_LIVE_DROPS = 3;
const RING_LIFETIME = 2.2;
const DAMPING = 0.975;
const SLEEP_BELOW = 0.008;
const GRID_WIDTH = 256;

export type PondOptions = {
  reducedMotion: boolean;
  ink?: [number, number, number];
  onReady?: () => void;
  onLost?: () => void;
};

const compile = (gl: WebGL2RenderingContext, type: number, src: string) => {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('shader');
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? 'shader compile');
  }
  return shader;
};

export class PondEngine {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;
  private texture: WebGLTexture;
  private uniforms: Record<string, WebGLUniformLocation | null> = {};
  private sim: WaveSim;
  private reducedMotion: boolean;
  private ink: [number, number, number];

  private raf = 0;
  private lastTime = 0;
  private accumulator = 0;
  private visible = true;
  private onScreen = true;
  private rest = 1;
  private tilt = { x: 0, y: 0 };
  private tiltTarget = { x: 0, y: 0 };
  private flash = { x: 0.5, y: 0.5, start: -1 };
  private drops: number[] = [];
  private observer: IntersectionObserver;
  private resizeObserver: ResizeObserver;
  private destroyed = false;
  private simActive = false;
  private textureSize = { w: 0, h: 0 };
  private onLost?: () => void;

  static isSupported(): boolean {
    try {
      return !!document.createElement('canvas').getContext('webgl2');
    } catch {
      return false;
    }
  }

  constructor(canvas: HTMLCanvasElement, options: PondOptions) {
    this.canvas = canvas;
    this.reducedMotion = options.reducedMotion;
    this.onLost = options.onLost;
    this.ink = options.ink ?? [19 / 255, 37 / 255, 79 / 255];

    const gl = canvas.getContext('webgl2', {
      antialias: false,
      premultipliedAlpha: true,
      alpha: true,
    });
    if (!gl) throw new Error('webgl2 unavailable');
    this.gl = gl;

    const program = gl.createProgram();
    if (!program) throw new Error('program');
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) ?? 'link');
    }
    this.program = program;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    for (const name of [
      'uHeight',
      'uRes',
      'uTilt',
      'uRest',
      'uFlash',
      'uInk',
    ]) {
      this.uniforms[name] = gl.getUniformLocation(program, name);
    }

    const texture = gl.createTexture();
    if (!texture) throw new Error('texture');
    this.texture = texture;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

    this.sim = new WaveSim(GRID_WIDTH, 8, DAMPING);
    this.resize();

    this.resizeObserver = new ResizeObserver(() => {
      this.resize();
      this.wake();
    });
    this.resizeObserver.observe(canvas);

    this.observer = new IntersectionObserver(([entry]) => {
      this.onScreen = entry.isIntersecting;
      if (this.onScreen) this.wake();
    });
    this.observer.observe(canvas);

    document.addEventListener('visibilitychange', this.onVisibility);
    canvas.addEventListener('webglcontextlost', this.onContextLost);

    this.render();
    options.onReady?.();
  }

  private onVisibility = () => {
    this.visible = !document.hidden;
    if (this.visible) this.wake();
  };

  private onContextLost = (event: Event) => {
    event.preventDefault();
    this.stop();
    this.destroyed = true;
    this.onLost?.();
  };

  private resize() {
    const rect = this.canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(rect.width * dpr);
    this.canvas.height = Math.round(rect.height * dpr);
    const rows = gridHeightFor(GRID_WIDTH, rect.width, rect.height);
    if (rows !== this.sim.height)
      this.sim = new WaveSim(GRID_WIDTH, rows, DAMPING);
    this.render();
  }

  /** Drop a stone at a position given in 0..1 of the canvas. Returns false when capped. */
  drop(u: number, v: number, strength = 0.7): boolean {
    if (this.destroyed) return false;
    const now = performance.now() / 1000;

    if (this.reducedMotion) {
      this.flash = { x: u, y: v, start: now };
      this.wake();
      return true;
    }

    this.drops = this.drops.filter(t => now - t < RING_LIFETIME);
    if (this.drops.length >= MAX_LIVE_DROPS) return false;
    this.drops.push(now);

    // Canvas y grows downward, texture v grows upward.
    this.sim.drop(u * this.sim.width, (1 - v) * this.sim.height, 5.5, strength);
    this.simActive = true;
    this.wake();
    return true;
  }

  /** Small disturbance used for the cursor wake and rain; not capped. */
  disturb(u: number, v: number, strength = 0.25) {
    if (this.destroyed || this.reducedMotion) return;
    this.sim.drop(u * this.sim.width, (1 - v) * this.sim.height, 3.5, strength);
    this.simActive = true;
    this.wake();
  }

  /** Tilt in -1..1 on both axes; smoothed over ~250ms. */
  setTilt(x: number, y: number) {
    if (this.reducedMotion) return;
    const next = {
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    };
    // Ignore sensor noise, otherwise the loop never gets to sleep while tilt is on.
    const change = Math.max(
      Math.abs(next.x - this.tiltTarget.x),
      Math.abs(next.y - this.tiltTarget.y)
    );
    if (change < 0.01) return;
    this.tiltTarget = next;
    this.wake();
  }

  private wake() {
    if (this.raf || this.destroyed) return;
    if (!this.visible || !this.onScreen) return;
    this.lastTime = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  private stop() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  private frame = (time: number) => {
    this.raf = 0;
    if (this.destroyed || !this.visible || !this.onScreen) return;

    const dt = Math.max(0, Math.min(0.1, (time - this.lastTime) / 1000));
    this.lastTime = time;

    if (this.simActive) {
      this.accumulator += dt;
      let steps = 0;
      while (this.accumulator >= STEP && steps < 4) {
        this.sim.step();
        this.accumulator -= STEP;
        steps++;
      }
      if (steps === 4) this.accumulator = 0;
    }

    const k = 1 - Math.exp(-dt / 0.25);
    this.tilt.x += (this.tiltTarget.x - this.tilt.x) * k;
    this.tilt.y += (this.tiltTarget.y - this.tilt.y) * k;

    const peak = this.simActive ? this.sim.peak() : 0;
    const restTarget = peak > 0.02 ? 0.3 : 1;
    this.rest += (restTarget - this.rest) * (1 - Math.exp(-dt / 0.4));

    this.render();

    const tiltSettled =
      Math.abs(this.tiltTarget.x - this.tilt.x) < 0.002 &&
      Math.abs(this.tiltTarget.y - this.tilt.y) < 0.002;
    const flashLive =
      this.flash.start >= 0 && time / 1000 - this.flash.start < 0.7;
    const restSettled = Math.abs(restTarget - this.rest) < 0.01;

    if (this.simActive && peak < SLEEP_BELOW) {
      this.sim.reset();
      this.simActive = false;
      this.accumulator = 0;
    }

    if (this.simActive || !tiltSettled || flashLive || !restSettled) {
      this.raf = requestAnimationFrame(this.frame);
    } else {
      this.render();
    }
  };

  private flashAlpha(): number {
    if (this.flash.start < 0) return 0;
    const t = performance.now() / 1000 - this.flash.start;
    if (t < 0.2) return t / 0.2;
    if (t < 0.4) return 1;
    if (t < 0.6) return 1 - (t - 0.4) / 0.2;
    return 0;
  }

  private render() {
    const { gl, sim, uniforms } = this;
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    if (this.textureSize.w !== sim.width || this.textureSize.h !== sim.height) {
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.R16F,
        sim.width,
        sim.height,
        0,
        gl.RED,
        gl.FLOAT,
        sim.field
      );
      this.textureSize = { w: sim.width, h: sim.height };
    } else {
      gl.texSubImage2D(
        gl.TEXTURE_2D,
        0,
        0,
        0,
        sim.width,
        sim.height,
        gl.RED,
        gl.FLOAT,
        sim.field
      );
    }

    gl.uniform1i(uniforms.uHeight, 0);
    gl.uniform2f(uniforms.uRes, this.canvas.width, this.canvas.height);
    gl.uniform2f(uniforms.uTilt, this.tilt.x * 0.08, this.tilt.y * 0.08);
    gl.uniform1f(uniforms.uRest, this.rest);
    gl.uniform3f(
      uniforms.uFlash,
      this.flash.x,
      1 - this.flash.y,
      this.flashAlpha()
    );
    gl.uniform3f(uniforms.uInk, ...this.ink);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  destroy() {
    this.stop();
    this.destroyed = true;
    this.observer.disconnect();
    this.resizeObserver.disconnect();
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.canvas.removeEventListener('webglcontextlost', this.onContextLost);
  }
}
