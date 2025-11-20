import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock server-only to prevent error in test environment
vi.mock('server-only', () => {
  return {};
});

// Mock config/env.server before importing raindrop
vi.mock('@/config/env.server', () => ({
  serverEnv: {
    RAINDROP_ACCESS_TOKEN: 'test-token',
  },
}));

vi.mock('@/config/app', () => ({
  appConfig: {
    raindrop: {
      apiUrl: 'https://api.raindrop.io/rest/v1/',
      revalidate: 60 * 60 * 24,
    },
  },
}));

import { getBookmarks, getCollectionBookmarks } from '../raindrop';

// Mock fetch
const fetchMock = vi.fn();
globalThis.fetch = fetchMock;

describe('raindrop', () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  describe('getBookmarks', () => {
    it('should fetch collections successfully', async () => {
      const mockData = { result: true, items: [] };
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await getBookmarks();

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.raindrop.io/rest/v1/collections',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-token',
          },
        })
      );
      expect(result).toEqual(mockData);
    });

    it('should return null on fetch error', async () => {
      fetchMock.mockRejectedValueOnce(new Error('Network error'));

      const result = await getBookmarks();

      expect(result).toBeNull();
    });

    it('should return null on non-ok response', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        text: async () => 'Unauthorized',
      });

      const result = await getBookmarks();

      expect(result).toBeNull();
    });
  });

  describe('getCollectionBookmarks', () => {
    it('should fetch collection bookmarks successfully', async () => {
      const mockData = { result: true, items: [] };
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await getCollectionBookmarks(123);

      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.raindrop.io/rest/v1/raindrops/123',
        expect.any(Object)
      );
      expect(result).toEqual(mockData);
    });

    it('should return null on error', async () => {
      fetchMock.mockRejectedValueOnce(new Error('Network error'));

      const result = await getCollectionBookmarks(123);

      expect(result).toBeNull();
    });

    it('should return null on non-ok response', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        text: async () => 'Not Found',
      });

      const result = await getCollectionBookmarks(123);

      expect(result).toBeNull();
    });
  });
});
