'use client';

import { useEffect, type RefObject } from 'react';
import Haptic, { type HapticPresetName } from 'browser-haptic';

// iPhone gets a real switch tick through an invisible overlay; Android uses the Vibration API.
const useHaptic = (
  ref: RefObject<HTMLElement | null>,
  preset: HapticPresetName = 'light'
) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return Haptic.attach(el, preset);
  }, [ref, preset]);
};

export default useHaptic;
