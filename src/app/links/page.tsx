import React from 'react';
import type { Metadata } from 'next';
import { getBookmarks, getCollectionBookmarks } from '@/lib/raindrop';
import FilterableCollections from '@/components/FilterableCollections';

const fetchCollectionsWithBookmarks = async () => {
  const collectionsData = await getBookmarks();

  if (!collectionsData?.items) {
    return [];
  }

  const collectionsWithBookmarks = await Promise.all(
    collectionsData.items.map(async collection => {
      const collectionId =
        typeof collection._id === 'string'
          ? parseInt(collection._id, 10)
          : collection._id;
      const bookmarks = await getCollectionBookmarks(collectionId);
      return {
        ...collection,
        bookmarks: bookmarks?.items || [],
      };
    })
  );

  return collectionsWithBookmarks.filter(collection => collection.count > 0);
};

export const metadata: Metadata = {
  title: 'Links',
  description:
    'Curated collection of useful links and bookmarks by Emirhan Kemal Kosem. Discover resources, tools, and interesting content.',
  openGraph: {
    title: 'Links | Emirhan Kemal Kosem',
    description: 'Curated collection of useful links and bookmarks.',
    url: 'https://emirkemal.com/links',
  },
  alternates: {
    canonical: '/links',
  },
};

const LinksPage = async () => {
  const filteredCollections = await fetchCollectionsWithBookmarks();

  return <FilterableCollections collections={filteredCollections} />;
};

export default LinksPage;
