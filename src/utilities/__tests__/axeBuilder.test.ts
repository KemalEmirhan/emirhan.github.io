import { beforeEach, describe, expect, it, vi } from 'vitest';
import { axeAnalyze } from '../axeBuilder';
import { Page } from '@playwright/test';

// Mock @axe-core/playwright
vi.mock('@axe-core/playwright', () => {
  const mockAnalyze = vi.fn().mockResolvedValue({ violations: [] });
  const mockWithTags = vi.fn().mockReturnValue({ analyze: mockAnalyze });
  const mockAxeBuilder = vi.fn().mockReturnValue({ withTags: mockWithTags });

  return {
    AxeBuilder: mockAxeBuilder,
  };
});

// Mock @playwright/test
const mockPage = {
  url: () => 'http://localhost:3000',
} as Page;

describe('axeBuilder', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create AxeBuilder with correct rules', async () => {
    const { AxeBuilder } = await import('@axe-core/playwright');

    await axeAnalyze(mockPage);

    expect(AxeBuilder).toHaveBeenCalledWith({ page: mockPage });
  });

  it('should return the result of analyze', async () => {
    const result = await axeAnalyze(mockPage);

    // The mock should return a result from the analyze function
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
  });
});
