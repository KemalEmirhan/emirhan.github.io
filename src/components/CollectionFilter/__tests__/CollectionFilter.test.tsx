import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CollectionFilter from '../index';

const mockCollections = [
  { _id: 1, title: 'Collection 1', count: 5, bookmarks: [] },
  { _id: 2, title: 'Collection 2', count: 3, bookmarks: [] },
];

describe('CollectionFilter', () => {
  it('renders all filter buttons', () => {
    render(
      <CollectionFilter
        collections={mockCollections}
        selectedCollectionId={null}
        onSelectCollection={() => {}}
      />
    );
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Collection 1 (5)')).toBeInTheDocument();
    expect(screen.getByText('Collection 2 (3)')).toBeInTheDocument();
  });

  it('calls onSelectCollection when clicked', () => {
    const handleSelect = vi.fn();
    render(
      <CollectionFilter
        collections={mockCollections}
        selectedCollectionId={null}
        onSelectCollection={handleSelect}
      />
    );

    fireEvent.click(screen.getByText('Collection 1 (5)'));
    expect(handleSelect).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText('All'));
    expect(handleSelect).toHaveBeenCalledWith(null);
  });

  it('highlights selected filter', () => {
    render(
      <CollectionFilter
        collections={mockCollections}
        selectedCollectionId={1}
        onSelectCollection={() => {}}
      />
    );

    const selectedButton = screen.getByText('Collection 1 (5)');
    expect(selectedButton).toHaveClass('bg-gray-900');
    expect(selectedButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onSelectCollection on Enter key', () => {
    const handleSelect = vi.fn();
    render(
      <CollectionFilter
        collections={mockCollections}
        selectedCollectionId={null}
        onSelectCollection={handleSelect}
      />
    );

    const button = screen.getByText('Collection 1 (5)');
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleSelect).toHaveBeenCalledWith(1);
  });

  it('calls onSelectCollection on Space key', () => {
    const handleSelect = vi.fn();
    render(
      <CollectionFilter
        collections={mockCollections}
        selectedCollectionId={null}
        onSelectCollection={handleSelect}
      />
    );

    const button = screen.getByText('All');
    fireEvent.keyDown(button, { key: ' ' });
    expect(handleSelect).toHaveBeenCalledWith(null);
  });
});
