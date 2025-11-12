'use client';

import React, { useState } from 'react';
import Card from '@/components/Card';
import CollectionFilter from '@/components/CollectionFilter';
import CollectionsList from '@/components/CollectionsList';

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

type FilterableCollectionsProps = {
  collections: Collection[];
};

const FilterableCollections = ({ collections }: FilterableCollectionsProps) => {
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | number | null
  >(null);

  const handleSelectCollection = (collectionId: string | number | null) => {
    setSelectedCollectionId(collectionId);
  };

  return (
    <>
      <Card className='grid-col-full'>
        <h2 className='text-2xl font-bold text-gray-900'>Links</h2>
        <p className='mb-4'>
          Here is a collection of links that I find useful.
        </p>
        {collections.length === 0 ? (
          <p className='text-base text-gray-800'>No collections found.</p>
        ) : (
          <CollectionFilter
            collections={collections}
            selectedCollectionId={selectedCollectionId}
            onSelectCollection={handleSelectCollection}
          />
        )}
      </Card>

      <CollectionsList
        collections={collections}
        selectedCollectionId={selectedCollectionId}
      />
    </>
  );
};

export default FilterableCollections;
