import { type TTableCell, type TTableRow, type TTableColumn } from '@/schemas';

/**
 * Utility function to create a table cell with link properties
 */
export const createLinkCell = (
  value: string,
  href: string,
  target: string = '_blank',
  rel: string = 'noopener noreferrer'
): TTableCell => ({
  value,
  isLink: true,
  linkProps: {
    href,
    target,
    rel,
  },
});

/**
 * Utility function to create a regular table cell
 */
export const createTextCell = (value: string): TTableCell => ({
  value,
  isLink: false,
});

/**
 * Utility function to create table row from simple object
 * This is useful for backward compatibility with existing data structures
 */
export const createTableRow = (
  data: Record<string, string>,
  linkFields: string[] = []
): TTableRow => {
  const row: TTableRow = {};

  Object.entries(data).forEach(([key, value]) => {
    const isLink = linkFields.includes(key.toLowerCase());
    row[key.toLowerCase()] = isLink
      ? createLinkCell(value, value)
      : createTextCell(value);
  });

  return row;
};

/**
 * Utility function to create table columns
 */
export const createTableColumns = (
  headers: Array<{
    key: string;
    label: string;
    align?: 'left' | 'right' | 'center';
  }>
): TTableColumn[] => {
  return headers.map(header => ({
    key: header.key.toLowerCase(),
    label: header.label,
    align: header.align || 'left',
  }));
};

/**
 * Utility function to get the width of the columns
 */
export const getColumnWidth = (columns: TTableColumn[]): string => {
  const totalColumns = columns.length;
  if (totalColumns === 2) return 'w-1/2';
  if (totalColumns === 3) return 'w-1/3';
  if (totalColumns === 4) return 'w-1/4';
  return `w-${Math.floor(100 / totalColumns)}%`;
};
