export type Weather = {
  temperature: number;
  label: string;
  rainy: boolean;
};

const BERLIN_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,weather_code&timezone=Europe%2FBerlin';

// WMO weather codes: https://open-meteo.com/en/docs
export const describeWeatherCode = (
  code: number
): { label: string; rainy: boolean } => {
  if (code === 0) return { label: 'clear', rainy: false };
  if (code === 1 || code === 2) return { label: 'partly cloudy', rainy: false };
  if (code === 3) return { label: 'overcast', rainy: false };
  if (code === 45 || code === 48) return { label: 'fog', rainy: false };
  if (code >= 51 && code <= 57) return { label: 'drizzle', rainy: true };
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82))
    return { label: 'rain', rainy: true };
  if ((code >= 71 && code <= 77) || code === 85 || code === 86)
    return { label: 'snow', rainy: false };
  if (code >= 95) return { label: 'storm', rainy: true };
  return { label: 'weather', rainy: false };
};

export const getBerlinWeather = async (): Promise<Weather | null> => {
  try {
    const res = await fetch(BERLIN_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      current?: { temperature_2m?: number; weather_code?: number };
    };
    const temperature = data.current?.temperature_2m;
    const code = data.current?.weather_code;
    if (typeof temperature !== 'number' || typeof code !== 'number')
      return null;
    return {
      temperature: Math.round(temperature),
      ...describeWeatherCode(code),
    };
  } catch {
    return null;
  }
};
