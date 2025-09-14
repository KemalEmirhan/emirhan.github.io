import { z } from 'zod';

// Shared icon name enum - single source of truth
const ICON_NAMES = ['Github', 'LinkedIn', 'Medium', 'Twitter'] as const;
export const IconNameSchema = z.enum(ICON_NAMES);

// Icon schemas
export const IconPropSchema = z.object({
  bgColor: z.string().min(1, 'Background color is required'),
});

export const BaseIconPropsSchema = z.object({
  name: IconNameSchema,
  color: z.string().optional(),
});

// Account link schema
export const AccountLinkSchema = z.object({
  url: z.url(),
  name: IconNameSchema,
});

export const AccountLinksArraySchema = z.array(AccountLinkSchema);

// Icon registry schemas
export const IconDataSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  viewBox: z.string().min(1, 'ViewBox is required'),
  path: z.string().min(1, 'Path is required'),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
  color: z.string().optional(),
});

export const IconRegistrySchema = z.record(IconNameSchema, IconDataSchema);

// Age calculation schema
export const BirthDateSchema = z.date();

// Type exports
export type TIconProp = z.infer<typeof IconPropSchema>;
export type TBaseIconProps = z.infer<typeof BaseIconPropsSchema> &
  React.SVGProps<SVGSVGElement>;
export type TAccountLink = z.infer<typeof AccountLinkSchema>;
export type TAccountLinks = z.infer<typeof AccountLinksArraySchema>;
export type TIconData = z.infer<typeof IconDataSchema>;
export type TIconName = z.infer<typeof IconNameSchema>;
export type TIconRegistry = z.infer<typeof IconRegistrySchema>;
