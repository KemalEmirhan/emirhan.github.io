import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import Footer from '../index';

describe('Footer', () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01'));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('renders footer content correctly', () => {
    render(<Footer />);
    expect(screen.getByText('This is Footer')).toBeInTheDocument();
    expect(
      screen.getByText('Thank you for visiting and hope to see you again!')
    ).toBeInTheDocument();
  });

  it('displays the current year', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2024 Emirhan Kemal Kosem/)).toBeInTheDocument();
  });
});
