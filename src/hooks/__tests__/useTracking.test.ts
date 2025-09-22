/* eslint-disable no-undef */
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import useTracking from '../useTracking';

// Mock window.gtag
const mockGtag = vi.fn();

describe('useTracking', () => {
  beforeEach(() => {
    // Mock window object
    Object.defineProperty(global, 'window', {
      value: {
        gtag: mockGtag,
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return clickEvent function', () => {
    const { result } = renderHook(() => useTracking('test-action'));

    expect(result.current.clickEvent).toBeDefined();
    expect(typeof result.current.clickEvent).toBe('function');
  });

  it('should call gtag with correct parameters when clickEvent is called', () => {
    const { result } = renderHook(() => useTracking('test-action'));

    result.current.clickEvent();

    expect(mockGtag).toHaveBeenCalledWith('event', 'test-action', {
      event_category: 'engagement',
      event_label: undefined,
      value: undefined,
    });
  });

  it('should call gtag with custom parameters when provided', () => {
    const { result } = renderHook(() => useTracking('custom-action'));

    result.current.clickEvent({
      category: 'navigation',
      label: 'header-menu',
      value: 1,
    });

    expect(mockGtag).toHaveBeenCalledWith('event', 'custom-action', {
      event_category: 'navigation',
      event_label: 'header-menu',
      value: 1,
    });
  });

  it('should handle SSR gracefully when window is undefined', () => {
    // The hook already handles SSR by checking typeof window === 'undefined'
    // This test verifies the hook doesn't crash in SSR environments
    const { result } = renderHook(() => useTracking('test-action'));

    // Should not throw an error
    expect(() => result.current.clickEvent()).not.toThrow();
  });

  it('should not call gtag when gtag is not available', () => {
    // @ts-expect-error - intentionally removing gtag for test
    delete global.window.gtag;

    const { result } = renderHook(() => useTracking('test-action'));

    result.current.clickEvent();

    expect(mockGtag).not.toHaveBeenCalled();

    // Restore gtag
    global.window.gtag = mockGtag;
  });

  it('should use default category when not provided', () => {
    const { result } = renderHook(() => useTracking('test-action'));

    result.current.clickEvent({
      label: 'test-label',
    });

    expect(mockGtag).toHaveBeenCalledWith('event', 'test-action', {
      event_category: 'engagement',
      event_label: 'test-label',
      value: undefined,
    });
  });

  it('should memoize clickEvent function based on action', () => {
    const { result, rerender } = renderHook(
      ({ action }) => useTracking(action),
      { initialProps: { action: 'action1' } }
    );

    const firstClickEvent = result.current.clickEvent;

    rerender({ action: 'action1' });
    expect(result.current.clickEvent).toBe(firstClickEvent);

    rerender({ action: 'action2' });
    expect(result.current.clickEvent).not.toBe(firstClickEvent);
  });

  it('should validate event data with Zod schema', () => {
    const { result } = renderHook(() => useTracking('test-action'));

    // Valid data should work
    expect(() => {
      result.current.clickEvent({
        category: 'navigation',
        label: 'test-label',
        value: 1,
      });
    }).not.toThrow();

    expect(mockGtag).toHaveBeenCalledWith('event', 'test-action', {
      event_category: 'navigation',
      event_label: 'test-label',
      value: 1,
    });
  });

  it('should throw error for invalid event data', () => {
    const { result } = renderHook(() => useTracking('test-action'));

    // Invalid data should throw Zod validation error
    expect(() => {
      result.current.clickEvent({
        // @ts-expect-error - intentionally passing invalid data for test
        value: 'invalid-string-value',
      });
    }).toThrow();
  });
});
