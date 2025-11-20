import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NavigationMenu from '../index';

// Mock useTracking
const mockClickEvent = vi.fn();
vi.mock('@/hooks/useTracking', () => ({
  default: () => ({
    clickEvent: mockClickEvent,
  }),
}));

describe('NavigationMenu', () => {
  it('renders navigation links', () => {
    render(<NavigationMenu />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    // Assuming NAVIGATIONS has some items, check for at least one link
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('tracks click events', () => {
    render(<NavigationMenu />);
    const link = screen.getAllByRole('link')[0];
    fireEvent.click(link);
    expect(mockClickEvent).toHaveBeenCalledWith({
      category: 'navigation',
      label: expect.any(String),
    });
  });
});
