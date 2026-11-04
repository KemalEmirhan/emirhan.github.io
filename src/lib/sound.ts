const STORAGE_KEY = 'sound';
const DROP_URL = '/sounds/drop.mp3';

let enabled = false;
let ctx: AudioContext | null = null;
let dropBuffer: AudioBuffer | null = null;
let loading: Promise<void> | null = null;
const listeners = new Set<() => void>();

const readStored = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'on';
  } catch {
    return false;
  }
};

if (typeof window !== 'undefined') enabled = readStored();

export const soundStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: () => enabled,
  getServerSnapshot: () => false,
};

const getContext = () => {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  // iOS starts contexts suspended until a user gesture.
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
};

const loadDrop = (audio: AudioContext) => {
  loading ??= fetch(DROP_URL)
    .then(res => res.arrayBuffer())
    .then(data => audio.decodeAudioData(data))
    .then(buffer => {
      dropBuffer = buffer;
    })
    .catch(() => {
      // Allow a retry on the next toggle.
      loading = null;
    });
  return loading;
};

export const setSound = (on: boolean) => {
  enabled = on;
  try {
    localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off');
  } catch {
    // Private mode: the toggle still works for this visit.
  }
  if (on) {
    const audio = getContext();
    if (audio) void loadDrop(audio);
  }
  listeners.forEach(listener => listener());
};

/** The stone hitting the water. `pitch` varies it slightly so repeated drops don't sound identical. */
export const playDrop = (pitch = 1) => {
  if (!enabled) return;
  const audio = getContext();
  if (!audio) return;
  const play = () => {
    if (!dropBuffer) return;
    const source = audio.createBufferSource();
    const gain = audio.createGain();
    source.buffer = dropBuffer;
    source.playbackRate.value = pitch;
    gain.gain.value = 0.7;
    source.connect(gain).connect(audio.destination);
    source.start();
  };

  // Sound left "on" from a previous visit: the first drop waits for the 3KB file.
  if (dropBuffer) play();
  else void loadDrop(audio).then(play);
};
