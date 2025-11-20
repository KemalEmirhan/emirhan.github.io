import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TableRowValue from '../TableRowValue';

describe('TableRowValue', () => {
  it('renders text value', () => {
    const cell = { value: 'Test Value', isLink: false };
    render(<TableRowValue cell={cell} />);
    expect(screen.getByText('Test Value')).toBeInTheDocument();
  });

  it('renders link value', () => {
    const cell = {
      value: 'Link Text',
      isLink: true,
      linkProps: {
        href: 'http://example.com',
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    };
    render(<TableRowValue cell={cell} />);

    const link = screen.getByRole('link', { name: /link text/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'http://example.com');
  });

  it('renders dash for empty cell', () => {
    // @ts-expect-error - mocking null cell
    render(<TableRowValue cell={null} />);
    expect(screen.getByText('-')).toBeInTheDocument();
  });
});
