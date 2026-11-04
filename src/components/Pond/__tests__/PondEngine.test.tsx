import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const engine = {
  drop: vi.fn(() => true),
  disturb: vi.fn(),
  setTilt: vi.fn(),
  destroy: vi.fn(),
};

vi.mock('@/lib/pond/engine', () => ({
  PondEngine: class {
    static isSupported = () => true;
    constructor(_: HTMLCanvasElement, options: { onReady?: () => void }) {
      options.onReady?.();
      return engine;
    }
  },
}));

import Pond from '../';

const rect = { left: 0, top: 0, width: 600, height: 240 } as DOMRect;

describe('Pond with WebGL', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.values(engine).forEach(fn => fn.mockClear());
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(
      rect
    );
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  const mount = (rainy = false) => {
    const utils = render(<Pond rainy={rainy} />);
    act(() => {
      vi.advanceTimersByTime(5);
    });
    return utils;
  };

  it('starts the engine, then drops one teaching stone in the centre', () => {
    mount();
    expect(
      screen.getByRole('button', { name: 'Drop a stone in the pond' })
    ).toHaveAttribute('data-ready', 'true');
    act(() => {
      vi.advanceTimersByTime(1300);
    });
    expect(engine.drop).toHaveBeenCalledWith(0.5, 0.5, 0.8);
  });

  it('drops where the pointer went down', () => {
    mount();
    const button = screen.getByRole('button', {
      name: 'Drop a stone in the pond',
    });
    fireEvent.pointerDown(button, { clientX: 150, clientY: 60 });
    fireEvent.click(button);
    expect(engine.drop).toHaveBeenLastCalledWith(0.25, 0.25);
  });

  it('drops in the centre for keyboard clicks', () => {
    mount();
    fireEvent.click(
      screen.getByRole('button', { name: 'Drop a stone in the pond' })
    );
    expect(engine.drop).toHaveBeenLastCalledWith(0.5, 0.5);
  });

  it('leaves a wake behind a moving mouse, not a finger', () => {
    mount();
    const button = screen.getByRole('button', {
      name: 'Drop a stone in the pond',
    });
    fireEvent.pointerMove(button, { pointerType: 'touch', clientX: 100 });
    fireEvent.pointerMove(button, { pointerType: 'mouse', clientX: 10 });
    fireEvent.pointerMove(button, { pointerType: 'mouse', clientX: 60 });
    expect(engine.disturb).toHaveBeenCalledTimes(1);
  });

  it('does not rain until the visitor touches the water', () => {
    mount(true);
    act(() => {
      vi.advanceTimersByTime(10_000);
    });
    const beforeTouch = engine.disturb.mock.calls.length;
    expect(beforeTouch).toBe(0);
  });

  it('drips after a touch, then stops after a quiet spell', () => {
    mount(true);
    fireEvent.click(
      screen.getByRole('button', { name: 'Drop a stone in the pond' })
    );
    act(() => {
      vi.advanceTimersByTime(8000);
    });
    expect(engine.disturb.mock.calls.length).toBeGreaterThan(0);
    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    const later = engine.disturb.mock.calls.length;
    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(engine.disturb.mock.calls.length).toBe(later);
  });

  it('cleans up the engine on unmount', () => {
    const { unmount } = mount();
    unmount();
    expect(engine.destroy).toHaveBeenCalled();
  });
});

describe('Stone cursor', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.values(engine).forEach(fn => fn.mockClear());
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(
      rect
    );
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('follows the mouse and splashes only after the stone lands', () => {
    render(<Pond />);
    act(() => {
      vi.advanceTimersByTime(5);
    });
    const button = screen.getByRole('button', {
      name: 'Drop a stone in the pond',
    });
    const stone = button.querySelector<HTMLElement>('.pond-stone')!;
    const animate = vi.fn();
    button
      .querySelectorAll<
        SVGElement | HTMLElement
      >('.pond-stone-art, .pond-stone-shadow')
      .forEach(el => {
        el.animate = animate;
      });

    fireEvent.pointerEnter(button, {
      pointerType: 'mouse',
      clientX: 300,
      clientY: 120,
    });
    expect(button).toHaveAttribute('data-stone', 'on');
    expect(stone.style.transform).toContain('300px');

    engine.drop.mockClear();
    fireEvent.pointerDown(button, {
      pointerType: 'mouse',
      clientX: 300,
      clientY: 120,
    });
    fireEvent.click(button);
    expect(animate).toHaveBeenCalled();
    expect(engine.drop).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(engine.drop).toHaveBeenCalledWith(0.5, 0.5);

    fireEvent.pointerLeave(button, { pointerType: 'mouse' });
    expect(button).toHaveAttribute('data-stone', 'off');
  });
});
