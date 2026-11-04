import { afterEach, describe, expect, it, vi } from 'vitest';
import { formatDownloads, getPackageStats } from '../npm';

const respond = (body: unknown, ok = true) => ({ ok, json: async () => body });

describe('npm stats', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('formats downloads compactly', () => {
    expect(formatDownloads(428)).toBe('428');
    expect(formatDownloads(1234)).toBe('1.2k');
  });

  it('reads version and weekly downloads', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) =>
        url.includes('registry')
          ? respond({ version: '1.1.1' })
          : respond({ downloads: 428 })
      )
    );
    expect(await getPackageStats('browser-haptic')).toEqual({
      version: '1.1.1',
      weeklyDownloads: 428,
    });
  });

  it('returns null on failures or odd shapes', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => respond({}, false))
    );
    expect(await getPackageStats('x')).toBeNull();
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => respond({}))
    );
    expect(await getPackageStats('x')).toBeNull();
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new Error('offline');
      })
    );
    expect(await getPackageStats('x')).toBeNull();
  });
});
