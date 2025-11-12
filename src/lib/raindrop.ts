import 'server-only';

const RAINDROP_API_URL = 'https://api.raindrop.io/rest/v1/';

type BookmarkItem = {
  _id: string;
  access: {
    level: number;
    draggable: boolean;
  };
  collaborators: {
    $id: string;
  };
  color: string;
  count: number;
  cover: string[];
  created: string;
  expanded: boolean;
  lastUpdate: string;
  public: boolean;
  sort: number;
  title: string;
  user: {
    $id: number;
  };
  view: string;
};

type Bookmarks = {
  result: number;
  items: BookmarkItem[];
};

type CollectionBookmark = {
  _id: number;
  link: string;
  title: string;
  excerpt?: string;
  [key: string]: unknown;
};

type CollectionBookmarks = {
  result: boolean;
  items: CollectionBookmark[];
};

const getOptions = () => {
  const token = process.env.RAINDROP_ACCESS_TOKEN;

  if (!token) {
    throw new Error(
      'RAINDROP_ACCESS_TOKEN environment variable is not set. Please set it in your .env.local file.'
    );
  }

  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 60 * 60 * 24 * 1,
    },
  };
};

export const getBookmarks = async (): Promise<Bookmarks | null> => {
  try {
    const options = getOptions();
    const response = await fetch(`${RAINDROP_API_URL}/collections`, options);

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
): Promise<CollectionBookmarks | null> => {
  try {
    const options = getOptions();
    const response = await fetch(
      `${RAINDROP_API_URL}/raindrops/${collectionId}`,
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
