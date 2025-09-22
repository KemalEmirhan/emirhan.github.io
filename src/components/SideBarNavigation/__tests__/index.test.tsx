import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SideBarNavigation from '../index';

describe('SideBarNavigation', () => {
  it('should render', () => {
    const { container } = render(<SideBarNavigation />);
    expect(container).toMatchSnapshot();
  });

  it('should render all navigation links', () => {
    const { getByRole } = render(<SideBarNavigation />);

    const aboutLink = getByRole('link', { name: 'About' });
    const socialsLink = getByRole('link', { name: 'Socials' });

    expect(aboutLink).toBeInTheDocument();
    expect(socialsLink).toBeInTheDocument();
  });

  it('should have correct href attributes', () => {
    const { getByRole } = render(<SideBarNavigation />);

    const aboutLink = getByRole('link', { name: 'About' });
    const socialsLink = getByRole('link', { name: 'Socials' });

    expect(aboutLink).toHaveAttribute('href', '/');
    expect(socialsLink).toHaveAttribute('href', '/socials');
  });

  it('should have proper accessibility attributes', () => {
    const { getByRole, getAllByRole } = render(<SideBarNavigation />);

    const nav = getByRole('navigation');
    expect(nav).toBeInTheDocument();

    const links = getAllByRole('link');
    expect(links).toHaveLength(2);
  });
});
