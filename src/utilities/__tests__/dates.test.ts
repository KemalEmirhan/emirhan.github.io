import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getFormattedDate } from '../dates';

describe('dates utilities', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return formatted date', () => {
    const mockDate = new Date('2024-01-15T10:00:00Z');
    vi.setSystemTime(mockDate);

    const result = getFormattedDate();

    expect(result).toBe('January 15, 2024');
  });

  it('should format different dates correctly', () => {
    const mockDate = new Date('2024-12-25T10:00:00Z');
    vi.setSystemTime(mockDate);

    const result = getFormattedDate();

    expect(result).toBe('December 25, 2024');
  });
});
