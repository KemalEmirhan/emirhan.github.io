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

// Generic table schemas
export const TableCellSchema = z.object({
  value: z.string(),
  isLink: z.boolean().default(false),
  linkProps: z
    .object({
      href: z.string(),
      target: z.string().default('_blank'),
      rel: z.string().default('noopener noreferrer'),
    })
    .optional(),
});

export const TableRowSchema = z.record(z.string(), TableCellSchema);

export const TableColumnSchema = z.object({
  key: z.string(),
  label: z.string(),
  align: z.enum(['left', 'right', 'center']).default('left'),
  width: z.string().optional(),
});

export const TableDataSchema = z.object({
  columns: z.array(TableColumnSchema),
  rows: z.array(TableRowSchema),
  className: z.string().optional(),
});

// Type exports
export type TAccountLink = z.infer<typeof AccountLinkSchema>;
export type TAccountLinks = z.infer<typeof AccountLinksArraySchema>;
export type TAccountName = z.infer<typeof AccountNameSchema>;
export type TNavigation = z.infer<typeof NavigationSchema>;
export type TNavigations = z.infer<typeof NavigationsArraySchema>;

// Generic table type exports
export type TTableCell = z.infer<typeof TableCellSchema>;
export type TTableRow = z.infer<typeof TableRowSchema>;
export type TTableColumn = z.infer<typeof TableColumnSchema>;
export type TTableData = z.infer<typeof TableDataSchema>;
