import { describe, expect, it } from 'vitest';
import { DEFAULT_GA_ID, resolveEnv } from '../env';

describe('resolveEnv', () => {
  it('tracks the live production site with the default GA ID', () => {
    const env = resolveEnv({
      NODE_ENV: 'production',
      VERCEL_ENV: 'production',
    });
    expect(env.shouldTrack).toBe(true);
    expect(env.gaId).toBe(DEFAULT_GA_ID);
  });

  it('accepts the old unprefixed variable names', () => {
    const env = resolveEnv({
      NODE_ENV: 'production',
      GA_ID: 'G-OLDNAME',
      GTM_ID: 'GTM-OLD',
    });
    expect(env.gaId).toBe('G-OLDNAME');
    expect(env.gtmId).toBe('GTM-OLD');
  });

  it('prefers the NEXT_PUBLIC_ names when both are set', () => {
    const env = resolveEnv({
      NODE_ENV: 'production',
      GA_ID: 'G-OLDNAME',
      NEXT_PUBLIC_GA_ID: 'G-NEWNAME',
    });
    expect(env.gaId).toBe('G-NEWNAME');
  });

  it('does not track Vercel previews or local dev', () => {
    expect(
      resolveEnv({ NODE_ENV: 'production', VERCEL_ENV: 'preview' }).shouldTrack
    ).toBe(false);
    expect(resolveEnv({ NODE_ENV: 'development' }).shouldTrack).toBe(false);
  });
});
