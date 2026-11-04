'use client';

import React, { useRef, useSyncExternalStore } from 'react';
import { setSound, soundStore } from '@/lib/sound';
import useHaptic from '@/hooks/useHaptic';

const SoundToggle = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const on = useSyncExternalStore(
    soundStore.subscribe,
    soundStore.getSnapshot,
    soundStore.getServerSnapshot
  );
  useHaptic(ref);

  return (
    <button
      ref={ref}
      type='button'
      className='link-button'
      onClick={() => setSound(!on)}
    >
      sound {on ? 'on' : 'off'}
    </button>
  );
};

export default SoundToggle;
