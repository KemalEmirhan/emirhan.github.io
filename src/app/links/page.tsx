import React from 'react';
import type { Metadata } from 'next';
import { getBookmarks } from '@/lib/raindrop';
import Card from '@/components/Card';

export async function fetchData() {
  const collections = await getBookmarks();

  return collections;
}

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
  // const collections = await fetchData();

  return (
    <>
      <Card className='grid-col-full'>
        <h2 className='text-2xl font-bold text-gray-900'>Links</h2>

        <p className='text-base text-gray-800'>
          Links will be here...(no worries)
        </p>
      </Card>
    </>
  );
};

export default LinksPage;
