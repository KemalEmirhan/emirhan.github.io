import { describe, expect, test } from 'vitest';
import {
  createLinkCell,
  createTextCell,
  createTableRow,
  createTableColumns,
  getColumnWidth,
} from '../utilities';

describe('Table utilities', () => {
  describe('createLinkCell', () => {
    test('should create a link cell with default properties', () => {
      const cell = createLinkCell('https://example.com', 'https://example.com');

      expect(cell.value).toBe('https://example.com');
      expect(cell.isLink).toBe(true);
      expect(cell.linkProps).toEqual({
        href: 'https://example.com',
        target: '_blank',
        rel: 'noopener noreferrer',
      });
    });

    test('should create a link cell with custom properties', () => {
      const cell = createLinkCell(
        'Example',
        'https://example.com',
        '_self',
        'noopener'
      );

      expect(cell.value).toBe('Example');
      expect(cell.isLink).toBe(true);
      expect(cell.linkProps).toEqual({
        href: 'https://example.com',
        target: '_self',
        rel: 'noopener',
      });
    });
  });

  describe('createTextCell', () => {
    test('should create a text cell', () => {
      const cell = createTextCell('Hello World');

      expect(cell.value).toBe('Hello World');
      expect(cell.isLink).toBe(false);
      expect(cell.linkProps).toBeUndefined();
    });
  });

  describe('createTableRow', () => {
    test('should create a table row with text cells', () => {
      const data = { platform: 'GITHUB', account: 'https://github.com/user' };
      const row = createTableRow(data);

      expect(row.platform.value).toBe('GITHUB');
      expect(row.platform.isLink).toBe(false);
      expect(row.account.value).toBe('https://github.com/user');
      expect(row.account.isLink).toBe(false);
    });

    test('should create a table row with link cells for specified fields', () => {
      const data = { platform: 'GITHUB', account: 'https://github.com/user' };
      const row = createTableRow(data, ['account']);

      expect(row.platform.value).toBe('GITHUB');
      expect(row.platform.isLink).toBe(false);
      expect(row.account.value).toBe('https://github.com/user');
      expect(row.account.isLink).toBe(true);
      expect(row.account.linkProps?.href).toBe('https://github.com/user');
    });
  });

  describe('createTableColumns', () => {
    test('should create table columns with default alignment', () => {
      const headers = [
        { key: 'platform', label: 'PLATFORM' },
        { key: 'account', label: 'ACCOUNT' },
      ];
      const columns = createTableColumns(headers);

      expect(columns).toHaveLength(2);
      expect(columns[0]).toEqual({
        key: 'platform',
        label: 'PLATFORM',
        align: 'left',
      });
      expect(columns[1]).toEqual({
        key: 'account',
        label: 'ACCOUNT',
        align: 'left',
      });
    });

    test('should create table columns with custom alignment', () => {
      const headers = [
        { key: 'platform', label: 'PLATFORM', align: 'left' as const },
        { key: 'account', label: 'ACCOUNT', align: 'right' as const },
      ];
      const columns = createTableColumns(headers);

      expect(columns[0].align).toBe('left');
      expect(columns[1].align).toBe('right');
    });
  });

  describe('getColumnWidth', () => {
    test.each([
      {
        columnCount: 2,
        expectedWidth: 'w-1/2',
        description: 'should return w-1/2 for 2 columns',
      },
      {
        columnCount: 3,
        expectedWidth: 'w-1/3',
        description: 'should return w-1/3 for 3 columns',
      },
      {
        columnCount: 4,
        expectedWidth: 'w-1/4',
        description: 'should return w-1/4 for 4 columns',
      },
      {
        columnCount: 5,
        expectedWidth: 'w-20%',
        description: 'should return calculated width for other column counts',
      },
    ])('$description', ({ columnCount, expectedWidth }) => {
      const columns = Array.from({ length: columnCount }, (_, index) => ({
        key: `col${index + 1}`,
        label: `Column ${index + 1}`,
        align: 'left' as const,
      }));

      expect(getColumnWidth(columns)).toBe(expectedWidth);
    });
  });
});
