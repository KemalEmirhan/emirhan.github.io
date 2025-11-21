import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import useAge from '../useAge';

describe('useAge', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return correct age before birthday', () => {
    // Birthday is 1994-08-13
    // Set date to 2024-01-01 (before birthday)
    vi.setSystemTime(new Date(2024, 0, 1));
    const age = useAge();
    // 2024 - 1994 = 30, but before birthday so 29
    expect(age).toBe(29);
  });

  it('should return correct age after birthday', () => {
    // Set date to 2024-09-01 (after birthday)
    vi.setSystemTime(new Date(2024, 8, 1));
    const age = useAge();
    // 2024 - 1994 = 30
    expect(age).toBe(30);
  });

  it('should return correct age on birthday', () => {
    // Set date to 2024-08-13 (on birthday)
    vi.setSystemTime(new Date(2024, 7, 13));
    const age = useAge();
    // 2024 - 1994 = 30
    expect(age).toBe(30);
  });
});
