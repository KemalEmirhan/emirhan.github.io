import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { bobFrom, WAVE_SPEED } from '../bob';

describe('bobFrom', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  const row = (kind: string, top: number) => {
    const el = document.createElement('li');
    el.dataset.bob = kind;
    el.getBoundingClientRect = () =>
      ({ left: 0, top, width: 0, height: 0 }) as DOMRect;
    el.animate = vi.fn(() => ({ id: '' }) as unknown as Animation);
    el.getAnimations = () => [];
    document.body.appendChild(el);
    return el;
  };

  it('bobs each row when the wave reaches it, nearest first', () => {
    const near = row('float', 100);
    const far = row('sink', 500);
    bobFrom(0, 0);

    vi.advanceTimersByTime((100 / WAVE_SPEED) * 1000 + 1);
    expect(near.animate).toHaveBeenCalledTimes(1);
    expect(far.animate).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    const keyframes = (far.animate as ReturnType<typeof vi.fn>).mock
      .calls[0][0] as Array<Record<string, string>>;
    expect(keyframes[1].transform).toBe('translateY(3px)');
  });

  it('can be cancelled', () => {
    const el = row('float', 100);
    const cancel = bobFrom(0, 0);
    cancel();
    vi.advanceTimersByTime(5000);
    expect(el.animate).not.toHaveBeenCalled();
  });
});
