import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TableRow from '../TableRow';

const mockColumns = [
  { key: 'col1', label: 'Column 1', align: 'left' as const },
  { key: 'col2', label: 'Column 2', align: 'left' as const },
];

const mockRow = {
  col1: { value: 'Value 1', isLink: false },
  col2: { value: 'Value 2', isLink: false },
};

describe('TableRow', () => {
  it('renders cells for each column', () => {
    render(
      <table>
        <tbody>
          <TableRow row={mockRow} columns={mockColumns} />
        </tbody>
      </table>
    );

    expect(screen.getByText('Value 1')).toBeInTheDocument();
    expect(screen.getByText('Value 2')).toBeInTheDocument();
  });
});
