import { render, screen } from '@testing-library/react';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import Header from '../';

describe('Header', () => {
  beforeAll(() => vi.useFakeTimers());
  beforeEach(() => vi.setSystemTime(new Date('2025-01-01T00:00:00Z')));
  afterAll(() => vi.useRealTimers());

  it('should render', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });

  it('should render the main heading', () => {
    render(<Header />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('emrhnkml.');
  });

  it('should render the current date', () => {
    render(<Header />);

    const timeElement = screen.getByText(/^\w+ \d{1,2}, \d{4}$/);
    expect(timeElement).toBeInTheDocument();
    expect(timeElement.tagName).toBe('TIME');

    // Check that the date is in the expected format
    const dateText = timeElement.textContent;
    expect(dateText).toMatch(/^\w+ \d{1,2}, \d{4}$/);
  });

  it('should have proper accessibility attributes', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    const timeElement = screen.getByText(/^\w+ \d{1,2}, \d{4}$/);
    expect(timeElement).toHaveAttribute('dateTime');
  });
});
