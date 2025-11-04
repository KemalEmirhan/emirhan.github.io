import React from 'react';
import { getBookmarks } from '@/lib/raindrop';
import Card from '../../src/components/Card';

export async function fetchData() {
  const collections = await getBookmarks();

  return collections;
}

const BookmarksPage = async () => {
  const collections = await fetchData();

  return (
    <div>
      <Card className='grid-col-full'>
        <h2 className='text-2xl font-bold text-gray-900'>Some Links I Like</h2>
        <ul>
          {collections?.items.map(item => (
            <li key={item._id}>{item.title}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default BookmarksPage;
