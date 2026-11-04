// Pixels per second the "wave" travels from the stone to each list row.
export const WAVE_SPEED = 420;
const MAX_DISTANCE = 1400;
const EASING = 'cubic-bezier(0.645, 0.045, 0.355, 1)';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Bob every `[data-bob]` row when the ring from (x, y) reaches it. Returns a cancel function. */
export const bobFrom = (x: number, y: number): (() => void) => {
  if (prefersReducedMotion()) return () => undefined;
  const timers: number[] = [];

  document.querySelectorAll<HTMLElement>('[data-bob]').forEach(el => {
    if (typeof el.animate !== 'function') return;
    const rect = el.getBoundingClientRect();
    const distance = Math.hypot(
      rect.left + rect.width / 2 - x,
      rect.top + rect.height / 2 - y
    );
    if (distance > MAX_DISTANCE) return;

    const offset = el.dataset.bob === 'sink' ? 3 : -2;
    timers.push(
      window.setTimeout(
        () => {
          // A bob already in flight is never restarted.
          const running = el
            .getAnimations()
            .some(a => a.id === 'bob' && a.playState === 'running');
          if (running) return;
          const animation = el.animate(
            [
              { transform: 'translateY(0)' },
              { transform: `translateY(${offset}px)` },
              { transform: 'translateY(0)' },
            ],
            { duration: 400, easing: EASING }
          );
          animation.id = 'bob';
        },
        (distance / WAVE_SPEED) * 1000
      )
    );
  });

  return () => timers.forEach(t => window.clearTimeout(t));
};
