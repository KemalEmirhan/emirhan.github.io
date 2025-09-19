import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Header from '../index';

describe('Header', () => {
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

    const timeElement = screen.getByRole('time');
    expect(timeElement).toBeInTheDocument();

    // Check that the date is in the expected format
    const dateText = timeElement.textContent;
    expect(dateText).toMatch(/^\w+ \d{1,2}, \d{4}$/);
  });

  it('should have proper accessibility attributes', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    const timeElement = screen.getByRole('time');
    expect(timeElement).toHaveAttribute('dateTime');
  });
});
