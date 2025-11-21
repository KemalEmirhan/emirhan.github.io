import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FilterableCollections from '../index';

const mockCollections = [
  {
    _id: 1,
    title: 'Collection 1',
    count: 2,
    bookmarks: [
      { _id: 1, link: 'http://link1.com', title: 'Link 1' },
      { _id: 2, link: 'http://link2.com', title: 'Link 2' },
    ],
  },
  {
    _id: 2,
    title: 'Collection 2',
    count: 1,
    bookmarks: [{ _id: 3, link: 'http://link3.com', title: 'Link 3' }],
  },
];

describe('FilterableCollections', () => {
  it('renders empty state when no collections provided', () => {
    render(<FilterableCollections collections={[]} />);
    const emptyStates = screen.getAllByText('No collections found.');
    expect(emptyStates.length).toBeGreaterThan(0);
  });

  it('renders collections and allows filtering', () => {
    render(<FilterableCollections collections={mockCollections} />);

    // Check initial state (all collections shown)
    expect(screen.getByText('Collection 1')).toBeInTheDocument();
    expect(screen.getByText('Collection 2')).toBeInTheDocument();

    // Check if bookmarks are rendered (assuming CollectionsList renders them)
    // Note: This depends on CollectionsList implementation, checking for titles
    expect(screen.getByText('Link 1')).toBeInTheDocument();
    expect(screen.getByText('Link 3')).toBeInTheDocument();
  });

  it('filters collections when filter button is clicked', () => {
    render(<FilterableCollections collections={mockCollections} />);

    // Initially both collections are shown
    expect(screen.getByText('Collection 1')).toBeInTheDocument();
    expect(screen.getByText('Collection 2')).toBeInTheDocument();

    // Click on Collection 1 filter
    fireEvent.click(screen.getByText('Collection 1 (2)'));

    // Only Collection 1 should be visible
    expect(screen.getByText('Collection 1')).toBeInTheDocument();
    expect(screen.queryByText('Collection 2')).not.toBeInTheDocument();
  });
});
