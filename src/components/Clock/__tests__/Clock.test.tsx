import { render, screen } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import Clock from '../';

describe('Clock', () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-11-04T12:42:00Z'));
  });
  afterAll(() => vi.useRealTimers());

  it('shows Berlin time', () => {
    render(<Clock />);
    expect(screen.getByText('13:42')).toBeInTheDocument();
  });
});
