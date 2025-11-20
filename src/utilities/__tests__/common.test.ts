import { describe, it, expect } from 'vitest';
import { cn } from '../common';

describe('common utilities', () => {
  describe('cn', () => {
    describe('basic merging', () => {
      it.each([
        {
          case: 'should merge class names correctly',
          input: ['class1', 'class2'],
          expected: 'class1 class2',
        },
        {
          case: 'should handle conditional classes',
          input: ['class1', false, 'class3'],
          expected: 'class1 class3',
        },
        {
          case: 'should merge tailwind classes',
          input: ['p-4', 'p-2'],
          expected: 'p-2',
        },
      ])('$case', ({ input, expected }) => {
        expect(cn(...input)).toBe(expected);
      });
    });

    describe('edge cases', () => {
      it.each([
        {
          case: 'should handle empty input',
          input: [],
          expected: '',
        },
        {
          case: 'should handle all falsy values',
          input: [null, undefined, false, 0, ''],
          expected: '',
        },
        {
          case: 'should handle empty strings',
          input: ['', 'class1', ''],
          expected: 'class1',
        },
        {
          case: 'should handle mixed falsy and truthy values',
          input: [null, 'class1', undefined, 'class2', false],
          expected: 'class1 class2',
        },
      ])('$case', ({ input, expected }) => {
        expect(cn(...input)).toBe(expected);
      });
    });

    describe('input types', () => {
      it.each([
        {
          case: 'should handle array input',
          input: [['class1', 'class2']],
          expected: 'class1 class2',
        },
        {
          case: 'should handle nested arrays',
          input: [['class1', ['class2', 'class3']]],
          expected: 'class1 class2 class3',
        },
        {
          case: 'should handle object input',
          input: [{ active: true, disabled: false, visible: true }],
          expected: 'active visible',
        },
        {
          case: 'should handle mixed arrays and objects',
          input: [['class1', 'class2'], { active: true, disabled: false }],
          expected: 'class1 class2 active',
        },
        {
          case: 'should handle strings with arrays and objects',
          input: ['base', ['array1', 'array2'], { active: true }, 'end'],
          expected: 'base array1 array2 active end',
        },
      ])('$case', ({ input, expected }) => {
        expect(cn(...input)).toBe(expected);
      });
    });

    describe('complex Tailwind scenarios', () => {
      describe('responsive classes', () => {
        it.each([
          {
            case: 'should merge responsive padding classes',
            input: ['p-4 md:p-6', 'md:p-8'],
            expected: 'p-4 md:p-8',
          },
          {
            case: 'should merge responsive margin classes',
            input: ['m-2 md:m-4', 'md:m-6'],
            expected: 'm-2 md:m-6',
          },
          {
            case: 'should handle multiple breakpoints',
            input: ['p-2 md:p-4 lg:p-6', 'md:p-8 lg:p-10'],
            expected: 'p-2 md:p-8 lg:p-10',
          },
        ])('$case', ({ input, expected }) => {
          expect(cn(...input)).toBe(expected);
        });
      });

      describe('variant classes', () => {
        it.each([
          {
            case: 'should merge hover variants',
            input: ['hover:p-4', 'hover:p-2'],
            expected: 'hover:p-2',
          },
          {
            case: 'should merge focus variants',
            input: ['focus:ring-2', 'focus:ring-4'],
            expected: 'focus:ring-4',
          },
          {
            case: 'should handle multiple variants',
            input: [
              'hover:bg-gray-100 focus:ring-2',
              'hover:bg-gray-200 focus:ring-4',
            ],
            expected: 'hover:bg-gray-200 focus:ring-4',
          },
          {
            case: 'should handle combined responsive and variant classes',
            input: ['p-4 hover:p-2 md:p-6', 'md:p-8 hover:p-1'],
            expected: 'p-4 md:p-8 hover:p-1',
          },
        ])('$case', ({ input, expected }) => {
          expect(cn(...input)).toBe(expected);
        });
      });

      describe('color conflicts', () => {
        it.each([
          {
            case: 'should resolve background color conflicts',
            input: ['bg-red-500', 'bg-blue-500'],
            expected: 'bg-blue-500',
          },
          {
            case: 'should resolve text color conflicts',
            input: ['text-red-500', 'text-blue-500'],
            expected: 'text-blue-500',
          },
          {
            case: 'should resolve border color conflicts',
            input: ['border-red-500', 'border-blue-500'],
            expected: 'border-blue-500',
          },
          {
            case: 'should handle multiple color property conflicts',
            input: ['bg-red-500 text-red-500', 'bg-blue-500 text-blue-500'],
            expected: 'bg-blue-500 text-blue-500',
          },
        ])('$case', ({ input, expected }) => {
          expect(cn(...input)).toBe(expected);
        });
      });

      describe('spacing conflicts', () => {
        it.each([
          {
            case: 'should resolve padding conflicts',
            input: ['p-2 px-4', 'p-4 px-6'],
            expected: 'p-4 px-6',
          },
          {
            case: 'should resolve margin conflicts',
            input: ['m-2 mx-4', 'm-4 mx-6'],
            expected: 'm-4 mx-6',
          },
          {
            case: 'should handle padding and margin separately',
            input: ['p-2 m-4', 'p-4 m-6'],
            expected: 'p-4 m-6',
          },
        ])('$case', ({ input, expected }) => {
          expect(cn(...input)).toBe(expected);
        });
      });

      describe('size and dimension conflicts', () => {
        it.each([
          {
            case: 'should resolve width conflicts',
            input: ['w-10', 'w-20'],
            expected: 'w-20',
          },
          {
            case: 'should resolve height conflicts',
            input: ['h-10', 'h-20'],
            expected: 'h-20',
          },
          {
            case: 'should resolve flex gap conflicts',
            input: ['gap-2', 'gap-4'],
            expected: 'gap-4',
          },
        ])('$case', ({ input, expected }) => {
          expect(cn(...input)).toBe(expected);
        });
      });

      describe('combined complex scenarios', () => {
        it.each([
          {
            case: 'should handle multiple conflicting utilities',
            input: ['p-4 bg-red-500 text-white', 'p-6 bg-blue-500 text-black'],
            expected: 'p-6 bg-blue-500 text-black',
          },
          {
            case: 'should handle responsive variants with conflicts',
            input: ['p-2 md:p-4 hover:bg-gray-100', 'md:p-6 hover:bg-gray-200'],
            expected: 'p-2 md:p-6 hover:bg-gray-200',
          },
          {
            case: 'should preserve non-conflicting classes',
            input: [
              'p-4 bg-red-500 flex items-center',
              'p-6 bg-blue-500 justify-center',
            ],
            expected: 'flex items-center p-6 bg-blue-500 justify-center',
          },
        ])('$case', ({ input, expected }) => {
          expect(cn(...input)).toBe(expected);
        });
      });
    });
  });
});
