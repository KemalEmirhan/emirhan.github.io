import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NavigationMenu from '../index';

describe('NavigationMenu', () => {
  it('should render', () => {
    const { container } = render(<NavigationMenu />);
    expect(container).toMatchSnapshot();
  });

  it('should render all navigation links', () => {
    const { getByRole } = render(<NavigationMenu />);

    const resumeLink = getByRole('link', { name: 'Resume' });
    const socialsLink = getByRole('link', { name: 'Socials' });
    const linksLink = getByRole('link', { name: 'Links' });

    expect(resumeLink).toBeInTheDocument();
    expect(socialsLink).toBeInTheDocument();
    expect(linksLink).toBeInTheDocument();
  });

  it('should have correct href attributes', () => {
    const { getByRole } = render(<NavigationMenu />);

    const resumeLink = getByRole('link', { name: 'Resume' });
    const socialsLink = getByRole('link', { name: 'Socials' });
    const linksLink = getByRole('link', { name: 'Links' });

    expect(resumeLink).toHaveAttribute('href', '/resume');
    expect(socialsLink).toHaveAttribute('href', '/socials');
    expect(linksLink).toHaveAttribute('href', '/links');
  });

  it('should have proper accessibility attributes', () => {
    const { getByRole, getAllByRole } = render(<NavigationMenu />);

    const nav = getByRole('navigation');
    expect(nav).toBeInTheDocument();

    const links = getAllByRole('link');
    expect(links).toHaveLength(3);
  });
});
