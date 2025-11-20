import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Table from '../index';

const mockData = {
  columns: [
    { key: 'col1', label: 'Column 1' },
    { key: 'col2', label: 'Column 2' },
  ],
  rows: [
    {
      col1: { value: 'Row 1 Col 1', isLink: false },
      col2: { value: 'Row 1 Col 2', isLink: false },
    },
    {
      col1: { value: 'Row 2 Col 1', isLink: false },
      col2: { value: 'Row 2 Col 2', isLink: false },
    },
  ],
};

describe('Table', () => {
  it('renders table with headers and rows', () => {
    render(<Table data={mockData} />);

    // Check headers
    expect(screen.getByText('Column 1')).toBeInTheDocument();
    expect(screen.getByText('Column 2')).toBeInTheDocument();

    // Check rows
    expect(screen.getByText('Row 1 Col 1')).toBeInTheDocument();
    expect(screen.getByText('Row 2 Col 2')).toBeInTheDocument();
  });
});
