import 'server-only';

const RAIDDROP_API_URL = 'https://api.raindrop.io/rest/v1/';

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

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_RAINDROP_ACCESS_TOKEN}`,
  },
  next: {
    revalidate: 60 * 60 * 24 * 1, // Revalidate once a day
  },
};

export const getBookmarks = async (): Promise<Bookmarks | null> => {
  try {
    const response = await fetch(`${RAIDDROP_API_URL}/collections`, options);
    if (!response.ok) {
      throw new Error('Failed to fetch bookmarks');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return null;
  }
};
