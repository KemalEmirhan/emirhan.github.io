'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PondEngine } from '@/lib/pond/engine';
import { bobFrom } from '@/lib/pond/bob';
import { playDrop } from '@/lib/sound';
import useHaptic from '@/hooks/useHaptic';
import TiltControl from './TiltControl';
import PondDrawing from './PondDrawing';
import Stone from './Stone';

type PondProps = {
  rainy?: boolean;
};

const WAKE_SPACING = 40;
const RAIN_IDLE_LIMIT = 20_000;
const TAP_MEMORY = 800;
const FALL_MS = 140;
const STONE_RETURN_MS = 450;

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Pond = ({ rainy = false }: PondProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const engineRef = useRef<PondEngine | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, time: -Infinity, mouse: false });
  const stoneRef = useRef<HTMLSpanElement>(null);
  const stoneArtRef = useRef<SVGSVGElement>(null);
  const stoneShadowRef = useRef<HTMLSpanElement>(null);
  const fallingRef = useRef(false);
  const wakeRef = useRef({ x: 0, y: 0, travelled: 0 });
  const lastTouchRef = useRef(0);
  const [ready, setReady] = useState(false);

  useHaptic(buttonRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !PondEngine.isSupported()) return;

    let introTimer = 0;
    const init = () => {
      try {
        engineRef.current = new PondEngine(canvas, {
          reducedMotion: reducedMotion(),
          onReady: () => setReady(true),
          onLost: () => setReady(false),
        });
      } catch {
        return;
      }
      // One stone on load teaches the gesture without words.
      if (!reducedMotion()) {
        introTimer = window.setTimeout(() => {
          engineRef.current?.drop(0.5, 0.5, 0.8);
          const rect = canvas.getBoundingClientRect();
          bobFrom(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }, 1200);
      }
    };

    // WebGL setup waits until the browser is idle, after hydration.
    const idle =
      window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1));
    const handle = idle(init);

    return () => {
      window.cancelIdleCallback?.(handle as number);
      window.clearTimeout(introTimer);
      engineRef.current?.destroy();
      engineRef.current = null;
    };
  }, []);

  const rainTimerRef = useRef(0);
  useEffect(() => () => window.clearTimeout(rainTimerRef.current), []);

  // Rain only starts after the visitor touches the water, so nothing moves on its own (WCAG 2.2.2).
  const touch = () => {
    lastTouchRef.current = performance.now();
    if (!rainy || reducedMotion() || rainTimerRef.current) return;
    const drip = () => {
      if (performance.now() - lastTouchRef.current > RAIN_IDLE_LIMIT) {
        rainTimerRef.current = 0;
        return;
      }
      if (!document.hidden) {
        engineRef.current?.disturb(
          0.1 + Math.random() * 0.8,
          0.15 + Math.random() * 0.7,
          0.5
        );
      }
      rainTimerRef.current = window.setTimeout(
        drip,
        3000 + Math.random() * 4000
      );
    };
    rainTimerRef.current = window.setTimeout(drip, 2500);
  };

  const showDot = (x: number, y: number) => {
    const dot = dotRef.current;
    if (!dot || typeof dot.animate !== 'function') return;
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    const still = reducedMotion();
    const placed = 'translate(-50%, -50%) scale(1)';
    // Two effects so the 160ms ease-out applies to the pop-in only, not the whole lifetime.
    dot.animate(
      [
        {
          opacity: 0,
          transform: `translate(-50%, -50%) scale(${still ? 1 : 0.6})`,
        },
        { opacity: 1, transform: placed },
      ],
      { duration: 160, easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)' }
    );
    dot.animate(
      [
        { opacity: 1, transform: placed },
        { opacity: 0, transform: placed },
      ],
      { duration: 400, delay: 400, easing: 'ease-out', fill: 'backwards' }
    );
  };

  const splash = (x: number, y: number, rect: DOMRect) => {
    touch();
    engineRef.current?.drop(
      (x - rect.left) / rect.width,
      (y - rect.top) / rect.height
    );
    showDot(x - rect.left, y - rect.top);
    playDrop(0.9 + Math.random() * 0.2);
    bobFrom(x, y);
  };

  // Mouse only: the stone falls onto its shadow, and the splash starts when it lands.
  const dropStone = (onLand: () => void) => {
    const art = stoneArtRef.current;
    const shadow = stoneShadowRef.current;
    const button = buttonRef.current;
    if (!art || !shadow || !button || typeof art.animate !== 'function') {
      onLand();
      return;
    }
    if (reducedMotion()) {
      onLand();
      return;
    }
    fallingRef.current = true;
    const fall = {
      duration: FALL_MS,
      easing: 'cubic-bezier(0.55, 0, 1, 0.45)',
      fill: 'forwards' as const,
    };
    art.animate(
      [
        { transform: 'translate(-50%, -150%) scale(1)', opacity: 1 },
        { transform: 'translate(-50%, -55%) scale(0.7)', opacity: 0 },
      ],
      fall
    );
    shadow.animate(
      [
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 0 },
      ],
      fall
    );
    window.setTimeout(onLand, FALL_MS);
    // A fresh stone appears in hand once the splash has started.
    window.setTimeout(() => {
      fallingRef.current = false;
      const appear = {
        duration: 220,
        easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        fill: 'forwards' as const,
      };
      art.animate(
        [
          { transform: 'translate(-50%, -150%) scale(0.8)', opacity: 0 },
          { transform: 'translate(-50%, -150%) scale(1)', opacity: 1 },
        ],
        appear
      );
      shadow.animate(
        [
          { transform: 'translate(-50%, -50%) scale(0.6)', opacity: 0 },
          { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        ],
        appear
      );
    }, STONE_RETURN_MS);
  };

  const handleClick = () => {
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const pointer = pointerRef.current;
    const fromPointer = performance.now() - pointer.time < TAP_MEMORY;

    // Keyboard (and the iOS haptic overlay's forwarded click) have no position: use the last tap or the centre.
    const x = fromPointer ? pointer.x : rect.left + rect.width / 2;
    const y = fromPointer ? pointer.y : rect.top + rect.height / 2;

    if (fromPointer && pointer.mouse && button.dataset.stone === 'on') {
      if (fallingRef.current) return;
      dropStone(() => splash(x, y, button.getBoundingClientRect()));
    } else {
      splash(x, y, rect);
    }
  };

  const moveStone = (event: React.PointerEvent<HTMLButtonElement>) => {
    const stone = stoneRef.current;
    if (!stone) return;
    const rect = event.currentTarget.getBoundingClientRect();
    stone.style.transform = `translate3d(${event.clientX - rect.left}px, ${event.clientY - rect.top}px, 0)`;
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'mouse') return;
    moveStone(event);
    event.currentTarget.dataset.stone = 'on';
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.dataset.stone = 'off';
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    pointerRef.current = {
      x: event.clientX,
      y: event.clientY,
      time: performance.now(),
      mouse: event.pointerType === 'mouse',
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'mouse') return;
    moveStone(event);
    const wake = wakeRef.current;
    const dx = event.clientX - wake.x;
    const dy = event.clientY - wake.y;
    wake.travelled += Math.hypot(dx, dy);
    wake.x = event.clientX;
    wake.y = event.clientY;
    if (wake.travelled < WAKE_SPACING) return;
    wake.travelled = 0;
    const rect = event.currentTarget.getBoundingClientRect();
    engineRef.current?.disturb(
      (event.clientX - rect.left) / rect.width,
      (event.clientY - rect.top) / rect.height,
      0.05
    );
  };

  return (
    <figure className='pond'>
      <button
        ref={buttonRef}
        type='button'
        className='pond-surface'
        aria-label='Drop a stone in the pond'
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        data-ready={ready}
      >
        <PondDrawing className='pond-drawing' />
        <canvas ref={canvasRef} className='pond-canvas' aria-hidden='true' />
        <span ref={dotRef} className='pond-dot' aria-hidden='true' />
        <Stone ref={stoneRef} artRef={stoneArtRef} shadowRef={stoneShadowRef} />
      </button>
      <figcaption className='pond-caption'>
        <span className='label'>
          <span className='hint-fine'>click the water</span>
          <span className='hint-coarse'>tap the water</span>
        </span>
        <TiltControl
          onTilt={(x, y) => engineRef.current?.setTilt(x, y)}
          onShake={() => {
            touch();
            for (let i = 0; i < 6; i++) {
              engineRef.current?.disturb(Math.random(), Math.random(), 0.6);
            }
          }}
        />
      </figcaption>
    </figure>
  );
};

export default Pond;
