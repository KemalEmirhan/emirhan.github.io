'use client';

import React, { useLayoutEffect, useSyncExternalStore } from 'react';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { consentStore, primeGoogleConsent } from '@/lib/consent';

type AnalyticsProps = {
  gaId: string;
  gtmId?: string;
  enabled: boolean;
};

// Google's scripts load only after the visitor accepts; until then nothing is sent or stored.
const Analytics = ({ gaId, gtmId, enabled }: AnalyticsProps) => {
  const consent = useSyncExternalStore(
    consentStore.subscribe,
    consentStore.getSnapshot,
    consentStore.getServerSnapshot
  );
  const active = enabled && consent === 'granted';

  // Runs before next/script's effects insert gtag.js, so the defaults are queued first.
  useLayoutEffect(() => {
    if (active) primeGoogleConsent();
  }, [active]);

  if (!active) return null;

  return (
    <>
      <GoogleAnalytics gaId={gaId} />
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
    </>
  );
};

export default Analytics;
