import { describe, expect, test, vi } from 'vitest';
import { getActiveLinkIndex, calculateDotPosition } from '../utils';

describe('StickyBottomNavigation utils', () => {
  describe('getActiveLinkIndex', () => {
    test('should return correct index for existing pathname', () => {
      expect(getActiveLinkIndex('/')).toBe(0);
      expect(getActiveLinkIndex('/socials')).toBe(1);
    });

    test('should return -1 for non-existing pathname', () => {
      expect(getActiveLinkIndex('/nonexistent')).toBe(-1);
    });
  });

  describe('calculateDotPosition', () => {
    test('should calculate horizontal position correctly', () => {
      const mockNavElement = {
        querySelectorAll: vi.fn().mockReturnValue([
          {
            getBoundingClientRect: vi.fn().mockReturnValue({
              left: 100,
              width: 50,
            }),
          },
        ]),
        getBoundingClientRect: vi.fn().mockReturnValue({
          left: 50,
        }),
      } as unknown as HTMLElement;

      const result = calculateDotPosition(mockNavElement, 0, 'horizontal');
      expect(result).toBe(75); // 100 - 50 + 50/2 = 75
    });

    test('should calculate vertical position correctly', () => {
      const mockNavElement = {
        querySelectorAll: vi.fn().mockReturnValue([
          {
            getBoundingClientRect: vi.fn().mockReturnValue({
              top: 100,
              height: 30,
            }),
          },
        ]),
        getBoundingClientRect: vi.fn().mockReturnValue({
          top: 50,
        }),
      } as unknown as HTMLElement;

      const result = calculateDotPosition(mockNavElement, 0, 'vertical');
      expect(result).toBe(65); // 100 - 50 + 30/2 = 65
    });

    test('should return 0 when activeLink is not found', () => {
      const mockNavElement = {
        querySelectorAll: vi.fn().mockReturnValue([]),
        getBoundingClientRect: vi.fn().mockReturnValue({
          left: 50,
        }),
      } as unknown as HTMLElement;

      const result = calculateDotPosition(mockNavElement, 0, 'horizontal');
      expect(result).toBe(0);
    });

    test('should default to horizontal direction', () => {
      const mockNavElement = {
        querySelectorAll: vi.fn().mockReturnValue([
          {
            getBoundingClientRect: vi.fn().mockReturnValue({
              left: 100,
              width: 50,
            }),
          },
        ]),
        getBoundingClientRect: vi.fn().mockReturnValue({
          left: 50,
        }),
      } as unknown as HTMLElement;

      const result = calculateDotPosition(mockNavElement, 0);
      expect(result).toBe(75); // Should use horizontal calculation
    });
  });
});
