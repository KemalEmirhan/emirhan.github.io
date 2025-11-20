import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TableRow from '../TableRow';

const mockColumns = [
  { key: 'col1', label: 'Column 1' },
  { key: 'col2', label: 'Column 2' },
];

const mockRow = {
  col1: { type: 'text', value: 'Value 1' },
  col2: { type: 'text', value: 'Value 2' },
};

describe('TableRow', () => {
  it('renders cells for each column', () => {
    // @ts-expect-error - mocking data structure partially
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
