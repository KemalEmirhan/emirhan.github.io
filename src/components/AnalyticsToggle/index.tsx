'use client';

import React, { useRef, useSyncExternalStore } from 'react';
import { consentStore, setConsent } from '@/lib/consent';
import useHaptic from '@/hooks/useHaptic';

// Withdrawing consent is as easy as giving it: one tap in the footer.
const AnalyticsToggle = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const consent = useSyncExternalStore(
    consentStore.subscribe,
    consentStore.getSnapshot,
    consentStore.getServerSnapshot
  );
  useHaptic(ref);
  const on = consent === 'granted';

  return (
    <button
      ref={ref}
      type='button'
      className='link-button'
      onClick={() => setConsent(on ? 'denied' : 'granted')}
    >
      analytics {on ? 'on' : 'off'}
    </button>
  );
};

export default AnalyticsToggle;
