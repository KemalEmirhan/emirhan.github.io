import { afterAll, describe, expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import StickyBottomNavigation from '../';

const mockPathname = vi.fn();

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}));

describe('StickyBottomNavigation', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  test('should render', () => {
    mockPathname.mockReturnValue('/');
    const { container } = render(<StickyBottomNavigation />);
    expect(container).toMatchSnapshot();
  });

  test('should handle /', () => {
    mockPathname.mockReturnValue('/');
    const { container, getByText } = render(<StickyBottomNavigation />);
    expect(getByText('About')).toHaveAttribute('data-active', 'true');
    expect(container).toMatchSnapshot();
  });

  test('should handle /socials', () => {
    mockPathname.mockReturnValue('/socials');
    const { container, getByText } = render(<StickyBottomNavigation />);
    expect(getByText('Socials')).toHaveAttribute('data-active', 'true');
    expect(container).toMatchSnapshot();
  });
});
