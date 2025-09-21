import { z } from 'zod';

// Shared account name enum - single source of truth
const ACCOUNT_NAMES = [
  'Github',
  'Linkedin',
  'Medium',
  'Twitter',
  'Instagram',
  'Bluesky',
] as const;
export const AccountNameSchema = z.enum(ACCOUNT_NAMES);

// Account link schema
export const AccountLinkSchema = z.object({
  url: z.url(),
  name: AccountNameSchema,
});

export const AccountLinksArraySchema = z.array(AccountLinkSchema);

// Age calculation schema
export const BirthDateSchema = z.date();

export const NavigationSchema = z.object({
  href: z.string(),
  label: z.string(),
});

export const NavigationsArraySchema = z.array(NavigationSchema);

// Type exports
export type TAccountLink = z.infer<typeof AccountLinkSchema>;
export type TAccountLinks = z.infer<typeof AccountLinksArraySchema>;
export type TAccountName = z.infer<typeof AccountNameSchema>;
export type TNavigation = z.infer<typeof NavigationSchema>;
export type TNavigations = z.infer<typeof NavigationsArraySchema>;
