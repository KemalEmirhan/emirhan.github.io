import { z } from 'zod';

/**
 * Client-safe environment variables
 * Note: GTM_ID and GA_ID must be prefixed with NEXT_PUBLIC_ to be accessible in client components
 */
const clientEnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  NEXT_PUBLIC_GTM_ID: z.string().optional(),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
});

const clientEnv = clientEnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV || 'development',
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
});

export const isProd = clientEnv.NODE_ENV === 'production';
export const isDev = clientEnv.NODE_ENV === 'development';
export const isTest = clientEnv.NODE_ENV === 'test';

export const gtmId = clientEnv.NEXT_PUBLIC_GTM_ID || '';
export const gaId = clientEnv.NEXT_PUBLIC_GA_ID || '';
