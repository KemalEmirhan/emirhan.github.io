import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CollectionsList from '../index';

const mockCollections = [
  {
    _id: 1,
    title: 'Collection 1',
    count: 1,
    bookmarks: [
      {
        _id: 1,
        link: 'http://link1.com',
        title: 'Link 1',
        excerpt: 'Excerpt 1',
      },
    ],
  },
];

describe('CollectionsList', () => {
  it('renders empty state when no collections match filter', () => {
    render(
      <CollectionsList
        collections={mockCollections}
        selectedCollectionId={999}
      />
    );
    expect(screen.getByText('No collections found.')).toBeInTheDocument();
  });

  it('renders collections and bookmarks', () => {
    render(
      <CollectionsList
        collections={mockCollections}
        selectedCollectionId={null}
      />
    );
    expect(screen.getByText('Collection 1')).toBeInTheDocument();
    expect(screen.getByText('Link 1')).toBeInTheDocument();
    expect(screen.getByText('Excerpt 1')).toBeInTheDocument();
  });

  it('renders specific collection when selected', () => {
    render(
      <CollectionsList collections={mockCollections} selectedCollectionId={1} />
    );
    expect(screen.getByText('Collection 1')).toBeInTheDocument();
  });

  it('renders empty bookmarks message when collection has no bookmarks', () => {
    const collectionsWithEmptyBookmarks = [
      {
        _id: 1,
        title: 'Empty Collection',
        count: 0,
        bookmarks: [],
      },
    ];
    render(
      <CollectionsList
        collections={collectionsWithEmptyBookmarks}
        selectedCollectionId={null}
      />
    );
    expect(
      screen.getByText('No bookmarks in this collection.')
    ).toBeInTheDocument();
  });
});
