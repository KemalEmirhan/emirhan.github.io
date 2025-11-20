import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StickyBottomNavigation from '../index';

// Mock dependencies
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

const mockClickEvent = vi.fn();
vi.mock('@/hooks/useTracking', () => ({
  default: () => ({
    clickEvent: mockClickEvent,
  }),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('motion/react', () => ({
  motion: {
    div: ({ className }: { className: string }) => (
      <div className={className} />
    ),
  },
}));

describe('StickyBottomNavigation', () => {
  it('renders navigation links', () => {
    render(<StickyBottomNavigation />);
    // Assuming NAVIGATIONS has items
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('tracks clicks', () => {
    render(<StickyBottomNavigation />);
    const link = screen.getAllByRole('link')[0];
    fireEvent.click(link);
    expect(mockClickEvent).toHaveBeenCalled();
  });
});
