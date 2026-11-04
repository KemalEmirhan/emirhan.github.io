import { z } from 'zod';

export const BirthDateSchema = z.date();

export const TrackingEventSchema = z.object({
  action: z.string().min(1),
  category: z.string().optional(),
  label: z.string().optional(),
  value: z.number().optional(),
});

export type TTrackingEvent = z.infer<typeof TrackingEventSchema>;
