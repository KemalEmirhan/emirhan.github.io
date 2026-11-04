// 2D wave simulation with two height buffers. Call `step()` at a fixed 60Hz:
// damping is per step, so a frame-rate step would fade ripples 2x faster on 120Hz screens.
export class WaveSim {
  readonly width: number;
  readonly height: number;
  damping: number;
  private current: Float32Array;
  private previous: Float32Array;
  private sponge: Float32Array;

  constructor(width: number, height: number, damping = 0.985) {
    this.width = Math.max(3, Math.round(width));
    this.height = Math.max(3, Math.round(height));
    this.damping = damping;
    this.current = new Float32Array(this.width * this.height);
    this.previous = new Float32Array(this.width * this.height);
    this.sponge = WaveSim.buildSponge(this.width, this.height);
  }

  // Extra damping near the border so waves fade out instead of bouncing off a rectangle.
  private static buildSponge(width: number, height: number) {
    const sponge = new Float32Array(width * height);
    const band = Math.max(4, Math.round(Math.min(width, height) * 0.08));
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const d = Math.min(x, y, width - 1 - x, height - 1 - y);
        const t = Math.max(0, 1 - d / band);
        sponge[y * width + x] = 1 - 0.15 * t * t;
      }
    }
    return sponge;
  }

  get field(): Float32Array {
    return this.current;
  }

  drop(x: number, y: number, radius = 3, strength = 1) {
    const { width, height } = this;
    const r = Math.max(1, radius);
    const minX = Math.max(1, Math.floor(x - r));
    const maxX = Math.min(width - 2, Math.ceil(x + r));
    const minY = Math.max(1, Math.floor(y - r));
    const maxY = Math.min(height - 2, Math.ceil(y + r));

    for (let gy = minY; gy <= maxY; gy++) {
      for (let gx = minX; gx <= maxX; gx++) {
        const d = Math.hypot(gx - x, gy - y) / r;
        if (d >= 1) continue;
        // Cosine bump: no hard rim, so the first ring is smooth.
        this.current[gy * width + gx] +=
          strength * 0.5 * (1 + Math.cos(Math.PI * d));
      }
    }
  }

  step() {
    const { width, height, damping, sponge } = this;
    const cur = this.current;
    const prev = this.previous;

    for (let y = 1; y < height - 1; y++) {
      const row = y * width;
      for (let x = 1; x < width - 1; x++) {
        const i = row + x;
        const next =
          (cur[i - 1] + cur[i + 1] + cur[i - width] + cur[i + width]) * 0.5 -
          prev[i];
        prev[i] = next * damping * sponge[i];
      }
    }

    this.previous = cur;
    this.current = prev;
  }

  peak(): number {
    let max = 0;
    const field = this.current;
    for (let i = 0; i < field.length; i++) {
      const v = Math.abs(field[i]);
      if (v > max) max = v;
    }
    return max;
  }

  reset() {
    this.current.fill(0);
    this.previous.fill(0);
  }
}

// Grid rows that keep cells square once the pond is squashed into an ellipse.
export const gridHeightFor = (
  gridWidth: number,
  cssWidth: number,
  cssHeight: number,
  ellipseRatio = 0.4
) =>
  Math.max(
    8,
    Math.round((gridWidth * (cssHeight / Math.max(1, cssWidth))) / ellipseRatio)
  );
