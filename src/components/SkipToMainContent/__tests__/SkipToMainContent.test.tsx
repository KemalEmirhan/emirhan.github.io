import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SkipToMainContent from '../index';

describe('SkipToMainContent', () => {
  it('renders skip link with correct attributes', () => {
    render(<SkipToMainContent />);
    const link = screen.getByRole('link', { name: /skip to main content/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('is initially hidden (visually)', () => {
    render(<SkipToMainContent />);
    const link = screen.getByRole('link', { name: /skip to main content/i });
    expect(link).toHaveClass('transform', '-translate-y-[200%]');
  });
});
