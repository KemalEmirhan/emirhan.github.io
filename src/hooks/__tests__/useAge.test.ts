import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import useAge from '../useAge';
import { renderHook } from '@testing-library/react';

// Mock the BirthDateSchema to control the birth date for testing
vi.mock('@/schemas', () => ({
  BirthDateSchema: {
    parse: vi.fn(() => new Date(1994, 7, 13)), // August 13, 1994
  },
}));

describe('useAge', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should calculate age correctly before birthday', () => {
    // Mock current date to be July 15, 2024 (before birthday)
    vi.setSystemTime(new Date(2024, 6, 15)); // July 15, 2024

    const result = renderHook(() => useAge()).result.current;
    expect(result).toBe(29);
  });

  it('should calculate age correctly on birthday', () => {
    // Mock current date to be August 13, 2024 (on birthday)

    vi.setSystemTime(new Date(2024, 7, 13)); // August 13, 2024

    const result = renderHook(() => useAge()).result.current;
    expect(result).toBe(30);
  });

  it('should calculate age correctly after birthday', () => {
    // Mock current date to be September 15, 2024 (after birthday)
    vi.setSystemTime(new Date(2024, 8, 15)); // September 15, 2024

    const result = renderHook(() => useAge()).result.current;
    expect(result).toBe(30);
  });
});
