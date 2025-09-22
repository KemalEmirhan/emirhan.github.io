import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TableRowValue from '../TableRowValue';
import { type TTableCell } from '@/schemas';

describe('TableRowValue', () => {
  it('should render dash when cell is null', () => {
    const { getByText } = render(
      <TableRowValue cell={null as unknown as TTableCell} />
    );
    expect(getByText('-')).toBeInTheDocument();
  });

  it('should render dash when cell is undefined', () => {
    const { getByText } = render(
      <TableRowValue cell={undefined as unknown as TTableCell} />
    );
    expect(getByText('-')).toBeInTheDocument();
  });

  it('should render link when cell is a link', () => {
    const linkCell: TTableCell = {
      value: 'https://example.com',
      isLink: true,
      linkProps: {
        href: 'https://example.com',
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    };

    const { getByRole } = render(<TableRowValue cell={linkCell} />);
    const link = getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveTextContent('https://example.com');
  });

  it('should render text when cell is not a link', () => {
    const textCell: TTableCell = {
      value: 'Regular Text',
      isLink: false,
    };

    const { getByText } = render(<TableRowValue cell={textCell} />);
    expect(getByText('Regular Text')).toBeInTheDocument();
  });
});
