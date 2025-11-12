'use client';

import React from 'react';
import { cn } from '@/utilities/common';

type Collection = {
  _id: string | number;
  title: string;
  count: number;
  bookmarks: unknown[];
};

type CollectionFilterProps = {
  collections: Collection[];
  selectedCollectionId: string | number | null;
  onSelectCollection: (collectionId: string | number | null) => void;
};

const CollectionFilter = ({
  collections,
  selectedCollectionId,
  onSelectCollection,
}: CollectionFilterProps) => {
  const handleClick = (collectionId: string | number | null) => {
    onSelectCollection(collectionId);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    collectionId: string | number | null
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(collectionId);
    }
  };

  return (
    <div className='flex flex-wrap gap-2'>
      <button
        type='button'
        onClick={() => handleClick(null)}
        onKeyDown={event => handleKeyDown(event, null)}
        className={cn(
          'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150',
          'focus-visible:focus-ring',
          selectedCollectionId === null
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        )}
        aria-label='Show all collections'
        aria-pressed={selectedCollectionId === null}
      >
        All
      </button>
      {collections.map(collection => {
        const isSelected = selectedCollectionId === collection._id;
        return (
          <button
            key={collection._id}
            type='button'
            onClick={() => handleClick(collection._id)}
            onKeyDown={event => handleKeyDown(event, collection._id)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150',
              'focus-visible:focus-ring',
              isSelected
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            )}
            aria-label={`Filter by ${collection.title} collection`}
            aria-pressed={isSelected}
          >
            {collection.title} ({collection.count})
          </button>
        );
      })}
    </div>
  );
};

export default CollectionFilter;
