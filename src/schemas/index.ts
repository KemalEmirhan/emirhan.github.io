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

// Tracking event schema
export const TrackingEventSchema = z.object({
  action: z.string().min(1),
  category: z.string().optional(),
  label: z.string().optional(),
  value: z.number().optional(),
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

// Tracking event type export
export type TTrackingEvent = z.infer<typeof TrackingEventSchema>;

// Raindrop API schemas
export const BookmarkAccessSchema = z.object({
  level: z.number(),
  draggable: z.boolean(),
});

export const BookmarkCollaboratorsSchema = z.object({
  $id: z.string(),
});

export const BookmarkUserSchema = z.object({
  $id: z.number(),
});

export const BookmarkItemSchema = z.object({
  _id: z.string(),
  access: BookmarkAccessSchema,
  collaborators: BookmarkCollaboratorsSchema,
  color: z.string(),
  count: z.number(),
  cover: z.array(z.string()),
  created: z.string(),
  expanded: z.boolean(),
  lastUpdate: z.string(),
  public: z.boolean(),
  sort: z.number(),
  title: z.string(),
  user: BookmarkUserSchema,
  view: z.string(),
});

export const BookmarksSchema = z.object({
  result: z.number(),
  items: z.array(BookmarkItemSchema),
});

export const CollectionBookmarkSchema = z.looseObject({
  _id: z.number(),
  link: z.string(),
  title: z.string(),
  excerpt: z.string().optional(),
});

export const CollectionBookmarksSchema = z.object({
  result: z.boolean(),
  items: z.array(CollectionBookmarkSchema),
});

export type TBookmarkAccess = z.infer<typeof BookmarkAccessSchema>;
export type TBookmarkCollaborators = z.infer<
  typeof BookmarkCollaboratorsSchema
>;
export type TBookmarkUser = z.infer<typeof BookmarkUserSchema>;
export type TBookmarkItem = z.infer<typeof BookmarkItemSchema>;
export type TBookmarks = z.infer<typeof BookmarksSchema>;
export type TCollectionBookmark = z.infer<typeof CollectionBookmarkSchema>;
export type TCollectionBookmarks = z.infer<typeof CollectionBookmarksSchema>;
