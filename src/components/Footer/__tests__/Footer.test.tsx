import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import Footer from '../index';

describe('Footer', () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01T12:00:00Z'));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('links to every social account in a new tab', () => {
    render(<Footer />);
    for (const name of ['github', 'linkedin', 'x', 'bluesky']) {
      const link = screen.getByRole('link', { name: new RegExp(`^${name}`) });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('shows the year and a sound toggle', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2024/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sound off/ })
    ).toBeInTheDocument();
  });
});
