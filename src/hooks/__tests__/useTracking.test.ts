import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useTracking from '../useTracking';

// Mock env config to enable dev mode for console logging tests
vi.mock('@/config/env', () => ({
  isDev: true,
}));

describe('useTracking', () => {
  let consoleGroupSpy: ReturnType<typeof vi.spyOn>;
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;
  let consoleGroupEndSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Mock console methods to keep test output clean
    consoleGroupSpy = vi.spyOn(console, 'group').mockImplementation(vi.fn());
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(vi.fn());
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(vi.fn());
    consoleGroupEndSpy = vi
      .spyOn(console, 'groupEnd')
      .mockImplementation(vi.fn());

    vi.clearAllMocks();
    window.gtag = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // @ts-expect-error - cleaning up test mock
    delete window.gtag;
  });

  it('should track event successfully', () => {
    const { result } = renderHook(() => useTracking('test-action'));

    result.current.clickEvent({
      category: 'test-category',
      label: 'test-label',
      value: 1,
    });

    expect(consoleGroupSpy).toHaveBeenCalledWith(
      '🎯 Tracking Event: test-action'
    );
    expect(consoleLogSpy).toHaveBeenCalledWith('📊 Event Data:', {
      action: 'test-action',
      category: 'test-category',
      label: 'test-label',
      value: 1,
    });
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '✅ Sending to Google Analytics...'
    );
    expect(consoleLogSpy).toHaveBeenCalledWith('📤 Event sent successfully');
    expect(consoleGroupEndSpy).toHaveBeenCalled();
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

  it('should warn if gtag is not available', () => {
    // @ts-expect-error - testing undefined gtag scenario
    window.gtag = undefined;
    const { result } = renderHook(() => useTracking('test-action'));

    result.current.clickEvent();

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      '⚠️  Tracking skipped: window or gtag not available'
    );
    expect(consoleGroupEndSpy).toHaveBeenCalled();
  });
});
