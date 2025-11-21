import 'server-only';
import { appConfig } from '@/config/app';
import { serverEnv } from '@/config/env.server';
import type { TBookmarks, TCollectionBookmarks } from '@/schemas';

const getOptions = () => ({
  method: 'GET' as const,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${serverEnv.RAINDROP_ACCESS_TOKEN}`,
  },
  next: {
    revalidate: appConfig.raindrop.revalidate,
  },
});

export const getBookmarks = async (): Promise<TBookmarks | null> => {
  try {
    const options = getOptions();
    const response = await fetch(
      `${appConfig.raindrop.apiUrl}/collections`,
      options
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(
        `Failed to fetch collections: ${response.status} ${response.statusText}. ${errorText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching collections:', error);
    return null;
  }
};

export const getCollectionBookmarks = async (
  collectionId: number
): Promise<TCollectionBookmarks | null> => {
  try {
    const options = getOptions();
    const response = await fetch(
      `${appConfig.raindrop.apiUrl}/raindrops/${collectionId}`,
      options
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(
        `Failed to fetch collection bookmarks: ${response.status} ${response.statusText}. ${errorText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching collection bookmarks:', error);
    return null;
  }
};
