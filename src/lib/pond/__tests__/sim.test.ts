import { describe, expect, it } from 'vitest';
import { WaveSim, gridHeightFor } from '../sim';

describe('WaveSim', () => {
  it('starts still', () => {
    expect(new WaveSim(32, 32).peak()).toBe(0);
  });

  it('spreads a drop outward and calms down over time', () => {
    const sim = new WaveSim(64, 64);
    sim.drop(32, 32, 3, 1);
    const start = sim.peak();
    expect(start).toBeGreaterThan(0.9);

    for (let i = 0; i < 10; i++) sim.step();
    // The ring has left the centre and reached cells further out.
    expect(Math.abs(sim.field[32 * 64 + 40])).toBeGreaterThan(0);

    for (let i = 0; i < 600; i++) sim.step();
    expect(sim.peak()).toBeLessThan(0.01);
  });

  it('ignores drops outside the grid', () => {
    const sim = new WaveSim(16, 16);
    sim.drop(-50, -50, 3, 1);
    expect(sim.peak()).toBe(0);
  });

  it('resets to still water', () => {
    const sim = new WaveSim(16, 16);
    sim.drop(8, 8, 2, 1);
    sim.step();
    sim.reset();
    expect(sim.peak()).toBe(0);
  });
});

describe('gridHeightFor', () => {
  it('keeps cells square after squashing the pond into an ellipse', () => {
    expect(gridHeightFor(256, 600, 240)).toBe(256);
    expect(gridHeightFor(256, 342, 200)).toBe(374);
  });
});
