import 'server-only';
import { z } from 'zod';

const serverEnvSchema = z.object({
  RAINDROP_ACCESS_TOKEN: z.string().optional(),
});

export const serverEnv = serverEnvSchema.parse({
  RAINDROP_ACCESS_TOKEN: process.env.RAINDROP_ACCESS_TOKEN,
});
