import { describe, it, expect } from 'vitest';
import { cn } from '../common';

describe('common utilities', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('should handle conditional classes', () => {
      expect(cn('class1', false, 'class3')).toBe('class1 class3');
    });

    it('should merge tailwind classes', () => {
      expect(cn('p-4', 'p-2')).toBe('p-2');
    });
  });
});
