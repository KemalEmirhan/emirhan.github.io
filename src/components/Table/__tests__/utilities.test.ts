import { describe, expect, test } from 'vitest';
import { isLinkField, getValue } from '../utilities';

describe('Table utilities', () => {
  describe('isLinkField', () => {
    const isLinkFieldCases = [
      // [header, linkField, expected, description]
      [
        'ACCOUNT',
        'account',
        true,
        'should return true when linkField matches header (case insensitive)',
      ],
      [
        'account',
        'ACCOUNT',
        true,
        'should return true when linkField matches header (case insensitive)',
      ],
      [
        'Account',
        'account',
        true,
        'should return true when linkField matches header (case insensitive)',
      ],
      [
        'PLATFORM',
        'account',
        false,
        'should return false when linkField does not match header',
      ],
      [
        'ACCOUNT',
        'platform',
        false,
        'should return false when linkField does not match header',
      ],
      [
        'ACCOUNT',
        undefined,
        false,
        'should return false when linkField is undefined',
      ],
      [
        'ACCOUNT',
        '',
        false,
        'should return false when linkField is empty string',
      ],
    ];

    test.each(isLinkFieldCases)('%s', (header, linkField, expected) => {
      expect(
        isLinkField(header as string, linkField as string | undefined)
      ).toBe(expected);
    });
  });

  describe('getValue', () => {
    const mockRow = {
      platform: 'GITHUB',
      accountname: 'https://github.com/user',
    };

    const getValueCases = [
      // [row, header, isLeft, expected]
      [mockRow, 'platform', true, 'GITHUB'],
      [mockRow, 'accountname', false, 'https://github.com/user'],
      [mockRow, 'nonexistent', true, 'GITHUB'],
      [mockRow, 'nonexistent', false, 'https://github.com/user'],
      [{ platform: 'GITHUB', accountname: '' }, 'accountname', true, 'GITHUB'],
      [{}, 'nonexistent', true, undefined],
    ];

    test.each(getValueCases)('getValue', (...args) => {
      const [row, header, isLeft, expected] = args;
      expect(
        getValue(
          row as Record<string, string>,
          header as string,
          isLeft as boolean
        )
      ).toBe(expected);
    });
  });
});
