import { z } from 'zod';

// GA4 measurement IDs are public (they ship in every page's HTML), so a default is safe.
export const DEFAULT_GA_ID = 'G-409F5ZW24Z';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  VERCEL_ENV: z.enum(['production', 'preview', 'development']).optional(),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  GA_ID: z.string().optional(),
  NEXT_PUBLIC_GTM_ID: z.string().optional(),
  GTM_ID: z.string().optional(),
});

type RawEnv = Partial<Record<keyof z.infer<typeof envSchema>, string>>;

// Accepts both names: Vercel was set up with GA_ID/GTM_ID before the code switched to NEXT_PUBLIC_*.
export const resolveEnv = (raw: RawEnv) => {
  const env = envSchema.parse({
    ...raw,
    NODE_ENV: raw.NODE_ENV || 'development',
    VERCEL_ENV: raw.VERCEL_ENV || undefined,
  });

  return {
    isProd: env.NODE_ENV === 'production',
    isDev: env.NODE_ENV === 'development',
    isTest: env.NODE_ENV === 'test',
    // Vercel previews build with NODE_ENV=production too; only the live site should report.
    shouldTrack:
      env.NODE_ENV === 'production' &&
      (env.VERCEL_ENV === undefined || env.VERCEL_ENV === 'production'),
    gaId: env.NEXT_PUBLIC_GA_ID || env.GA_ID || DEFAULT_GA_ID,
    gtmId: env.NEXT_PUBLIC_GTM_ID || env.GTM_ID || '',
  };
};

const resolved = resolveEnv({
  NODE_ENV: process.env.NODE_ENV,
  VERCEL_ENV: process.env.VERCEL_ENV,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  GA_ID: process.env.GA_ID,
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  GTM_ID: process.env.GTM_ID,
});

export const { isProd, isDev, isTest, shouldTrack, gaId, gtmId } = resolved;
