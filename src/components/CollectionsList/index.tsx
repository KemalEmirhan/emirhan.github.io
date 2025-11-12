'use client';

import React from 'react';
import Link from 'next/link';
import Card from '@/components/Card';
import { cn } from '@/utilities/common';

type Bookmark = {
  _id: number;
  link: string;
  title: string;
  excerpt?: string;
};

type Collection = {
  _id: string | number;
  title: string;
  count: number;
  bookmarks: Bookmark[];
};

type CollectionsListProps = {
  collections: Collection[];
  selectedCollectionId: string | number | null;
};

const CollectionsList = ({
  collections,
  selectedCollectionId,
}: CollectionsListProps) => {
  const filteredCollections =
    selectedCollectionId === null
      ? collections
      : collections.filter(
          collection => collection._id === selectedCollectionId
        );

  if (filteredCollections.length === 0) {
    return (
      <Card className='grid-col-full'>
        <p className='text-base text-gray-800'>No collections found.</p>
      </Card>
    );
  }

  return (
    <>
      {filteredCollections.map(collection => (
        <Card key={collection._id} className='grid-col-full'>
          <div className='flex items-center gap-2 mb-4'>
            <svg
              className='w-5 h-5 text-gray-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
              />
            </svg>
            <h3 className='text-lg font-bold text-gray-900'>
              {collection.title}
            </h3>
            <span className='text-sm text-gray-600'>({collection.count})</span>
          </div>

          {collection.bookmarks.length > 0 ? (
            <ul className='space-y-3'>
              {collection.bookmarks.map(bookmark => (
                <li key={bookmark._id}>
                  <Link
                    href={bookmark.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={cn(
                      'text-base text-gray-800 hover:text-gray-900',
                      'underline flex items-start gap-2 group',
                      'focus-visible:focus-ring rounded-sm p-1 -ml-1'
                    )}
                  >
                    <span className='flex-1'>{bookmark.title}</span>
                    <svg
                      className='w-4 h-4 text-gray-500 group-hover:text-gray-700 flex-shrink-0 mt-0.5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                      />
                    </svg>
                  </Link>
                  {bookmark.excerpt && (
                    <p className='text-sm text-gray-600 mt-1 ml-6'>
                      {bookmark.excerpt}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-sm text-gray-600'>
              No bookmarks in this collection.
            </p>
          )}
        </Card>
      ))}
    </>
  );
};

export default CollectionsList;
