import { afterEach, describe, expect, it, vi } from 'vitest';

const fakeAudio = () => {
  const start = vi.fn();
  const source = {
    buffer: null as unknown,
    playbackRate: { value: 1 },
    connect: vi.fn((next: unknown) => next),
    start,
  };
  class FakeContext {
    state = 'suspended';
    destination = {};
    resume = vi.fn(async () => undefined);
    decodeAudioData = vi.fn(async () => ({ duration: 0.31 }));
    createBufferSource = () => source;
    createGain = () => ({ gain: { value: 1 }, connect: vi.fn(() => ({})) });
  }
  vi.stubGlobal('AudioContext', FakeContext);
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => ({ arrayBuffer: async () => new ArrayBuffer(8) }))
  );
  return { start, source };
};

describe('sound', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it('is off by default and notifies listeners on change', async () => {
    fakeAudio();
    const { setSound, soundStore } = await import('../sound');
    expect(soundStore.getSnapshot()).toBe(false);
    expect(soundStore.getServerSnapshot()).toBe(false);
    const listener = vi.fn();
    const unsubscribe = soundStore.subscribe(listener);
    setSound(true);
    expect(soundStore.getSnapshot()).toBe(true);
    expect(localStorage.getItem('sound')).toBe('on');
    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
    setSound(false);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('plays nothing while off', async () => {
    const { start } = fakeAudio();
    const { playDrop, setSound } = await import('../sound');
    setSound(false);
    playDrop();
    await new Promise(r => setTimeout(r, 0));
    expect(start).not.toHaveBeenCalled();
  });

  it('plays the drop sample at a slightly varied pitch when on', async () => {
    const { start, source } = fakeAudio();
    const { playDrop, setSound } = await import('../sound');
    setSound(true);
    playDrop(1.1);
    await new Promise(r => setTimeout(r, 0));
    expect(fetch).toHaveBeenCalledWith('/sounds/drop.mp3');
    expect(start).toHaveBeenCalled();
    expect(source.playbackRate.value).toBe(1.1);
    setSound(false);
  });
});
