'use client';

import React, { useRef, useSyncExternalStore } from 'react';
import { consentStore, setConsent } from '@/lib/consent';
import useHaptic from '@/hooks/useHaptic';

const ConsentBanner = () => {
  const consent = useSyncExternalStore(
    consentStore.subscribe,
    consentStore.getSnapshot,
    consentStore.getServerSnapshot
  );
  const acceptRef = useRef<HTMLButtonElement>(null);
  const declineRef = useRef<HTMLButtonElement>(null);
  useHaptic(acceptRef);
  useHaptic(declineRef);

  if (consent !== 'unset') return null;

  return (
    <section className='consent' role='region' aria-label='Analytics consent'>
      <p className='consent-text'>
        Can I count your visit with Google Analytics? No ads, no selling, just
        numbers.
      </p>
      <div className='consent-actions'>
        <button
          ref={declineRef}
          type='button'
          className='link-button tap-target'
          onClick={() => setConsent('denied')}
        >
          No thanks
        </button>
        <button
          ref={acceptRef}
          type='button'
          className='consent-accept'
          onClick={() => setConsent('granted')}
        >
          Sure
        </button>
      </div>
    </section>
  );
};

export default ConsentBanner;
