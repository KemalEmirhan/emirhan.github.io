'use client';

import React, { useEffect, useRef, useState } from 'react';

type TiltState = 'hidden' | 'idle' | 'active' | 'blocked';

type PermissionRequester = { requestPermission?: () => Promise<string> };

type TiltControlProps = {
  onTilt: (x: number, y: number) => void;
  onShake: () => void;
};

const TILT_RANGE = 25;
const SHAKE_THRESHOLD = 18;
const SHAKE_COOLDOWN = 2000;

const canTilt = () =>
  typeof window !== 'undefined' &&
  'DeviceOrientationEvent' in window &&
  window.matchMedia('(pointer: coarse)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setLean = (px: number) => {
  document
    .querySelectorAll<HTMLElement>('[data-lean]')
    .forEach(el => el.style.setProperty('--lean', `${px.toFixed(2)}px`));
};

const noop = () => undefined;

const TiltControl = ({ onTilt, onShake }: TiltControlProps) => {
  const [state, setState] = useState<TiltState>('hidden');
  const cleanupRef = useRef<() => void>(noop);

  useEffect(() => {
    // Decided after mount: the server can't know about sensors or pointer type.
    if (canTilt()) setState('idle');
    return () => cleanupRef.current();
  }, []);

  const start = async () => {
    const orientation = window.DeviceOrientationEvent as unknown as
      | PermissionRequester
      | undefined;
    const motion = window.DeviceMotionEvent as unknown as
      | PermissionRequester
      | undefined;

    try {
      // iOS only grants this from a tap, so it must be the first await in the handler.
      if (typeof orientation?.requestPermission === 'function') {
        const result = await orientation.requestPermission();
        if (result !== 'granted') {
          setState('blocked');
          return;
        }
        await motion?.requestPermission?.().catch(() => 'denied');
      }
    } catch {
      setState('blocked');
      return;
    }

    let baseBeta: number | null = null;
    let lastShake = 0;

    const onOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma === null || event.beta === null) return;
      baseBeta ??= event.beta;
      const x = event.gamma / TILT_RANGE;
      const y = (event.beta - baseBeta) / TILT_RANGE;
      onTilt(x, -y);
      setLean(Math.max(-1, Math.min(1, x)) * 3);
    };

    const onMotion = (event: DeviceMotionEvent) => {
      const a = event.acceleration;
      if (!a || a.x === null || a.y === null || a.z === null) return;
      const force = Math.hypot(a.x, a.y, a.z);
      const now = performance.now();
      if (force > SHAKE_THRESHOLD && now - lastShake > SHAKE_COOLDOWN) {
        lastShake = now;
        onShake();
      }
    };

    window.addEventListener('deviceorientation', onOrientation);
    window.addEventListener('devicemotion', onMotion);
    cleanupRef.current = () => {
      window.removeEventListener('deviceorientation', onOrientation);
      window.removeEventListener('devicemotion', onMotion);
      onTilt(0, 0);
      setLean(0);
    };
    setState('active');
  };

  const stop = () => {
    cleanupRef.current();
    cleanupRef.current = noop;
    setState('idle');
  };

  if (state === 'hidden') return null;

  if (state === 'blocked') {
    return <span className='label'>tilt blocked</span>;
  }

  return (
    <button
      type='button'
      className='link-button tap-target'
      onClick={state === 'active' ? stop : start}
    >
      {state === 'active' ? (
        'tilting · stop'
      ) : (
        <span>
          <span aria-hidden='true'>↻ </span>tilt · asks for motion
        </span>
      )}
    </button>
  );
};

export default TiltControl;
