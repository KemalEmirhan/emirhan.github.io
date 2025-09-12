import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Account from '../index';
import accountLinks from '@/constants/accountLinks';

describe('Account Component', () => {
  test('should render', () => {
    const { container } = render(<Account />);
    expect(container).toMatchSnapshot();
  });

  test('should render all account links', () => {
    render(<Account />);

    // Test with actual account links data
    accountLinks.forEach(account => {
      expect(
        screen.getByRole('link', { name: new RegExp(account.name, 'i') })
      ).toBeInTheDocument();
    });
  });

  test('should render account links with correct href attributes', () => {
    render(<Account />);

    // Test with actual account links data
    accountLinks.forEach(account => {
      const link = screen.getByRole('link', {
        name: new RegExp(account.name, 'i'),
      });
      expect(link).toHaveAttribute('href', account.url);
    });
  });

  test('should have proper accessibility attributes', () => {
    render(<Account />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'account links');
  });
});
