import { afterEach, describe, expect, it, vi } from 'vitest';
import { describeWeatherCode, getBerlinWeather } from '../weather';

describe('describeWeatherCode', () => {
  it.each([
    [0, 'clear', false],
    [2, 'partly cloudy', false],
    [3, 'overcast', false],
    [45, 'fog', false],
    [53, 'drizzle', true],
    [63, 'rain', true],
    [81, 'rain', true],
    [73, 'snow', false],
    [95, 'storm', true],
    [4, 'weather', false],
  ])('code %i is %s', (code, label, rainy) => {
    expect(describeWeatherCode(code)).toEqual({ label, rainy });
  });
});

describe('getBerlinWeather', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('returns rounded temperature and label', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: true,
        json: async () => ({
          current: { temperature_2m: 8.6, weather_code: 61 },
        }),
      }))
    );
    expect(await getBerlinWeather()).toEqual({
      temperature: 9,
      label: 'rain',
      rainy: true,
    });
  });

  it('returns null when the API fails or changes shape', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: false }))
    );
    expect(await getBerlinWeather()).toBeNull();
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: true, json: async () => ({}) }))
    );
    expect(await getBerlinWeather()).toBeNull();
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new Error('offline');
      })
    );
    expect(await getBerlinWeather()).toBeNull();
  });
});
