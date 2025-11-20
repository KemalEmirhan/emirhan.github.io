import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useTracking from '../useTracking';

describe('useTracking', () => {
  // Mock console methods to keep test output clean
  vi.spyOn(console, 'group').mockImplementation(() => {});
  vi.spyOn(console, 'log').mockImplementation(() => {});
  const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  vi.spyOn(console, 'groupEnd').mockImplementation(() => {});

  beforeEach(() => {
    vi.clearAllMocks();
    window.gtag = vi.fn();
  });

  afterEach(() => {
    delete window.gtag;
  });

  it('should track event successfully', () => {
    const { result } = renderHook(() => useTracking('test-action'));

    result.current.clickEvent({
      category: 'test-category',
      label: 'test-label',
      value: 1,
    });

    expect(window.gtag).toHaveBeenCalledWith('event', 'test-action', {
      event_category: 'test-category',
      event_label: 'test-label',
      value: 1,
    });
  });

  it('should use default category if not provided', () => {
    const { result } = renderHook(() => useTracking('test-action'));

    result.current.clickEvent();

    expect(window.gtag).toHaveBeenCalledWith('event', 'test-action', {
      event_category: 'engagement',
      event_label: undefined,
      value: undefined,
    });
  });

  it('should warn if window or gtag is not available', () => {
    window.gtag = undefined;
    const { result } = renderHook(() => useTracking('test-action'));

    result.current.clickEvent();

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      '⚠️  Tracking skipped: window or gtag not available'
    );
  });
});
