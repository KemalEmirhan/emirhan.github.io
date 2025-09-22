import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Table from '../';
import { mockTableData, mockTableDataWithLinks } from '@/mocks/mockTableData';
import { type TTableData } from '@/schemas';

describe('Table Component', () => {
  it('should render with new generic data structure', () => {
    const { container } = render(<Table data={mockTableData} />);
    expect(container).toMatchSnapshot();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-table-class';
    const dataWithClass = { ...mockTableData, className: customClass };
    const { container } = render(<Table data={dataWithClass} />);

    expect(container.firstChild).toHaveClass(customClass);
    expect(container).toMatchSnapshot();
  });

  it('renders with empty data array', () => {
    const emptyData: TTableData = {
      columns: mockTableData.columns,
      rows: [],
    };
    const { container, getByText } = render(<Table data={emptyData} />);

    expect(getByText('PLATFORM')).toBeInTheDocument();
    expect(getByText('ACCOUNT')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders links when cell is marked as link', () => {
    const { container, getByRole } = render(
      <Table data={mockTableDataWithLinks} />
    );

    const link = getByRole('link', { name: 'https://github.com/KemalEmirhan' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/KemalEmirhan');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(container).toMatchSnapshot();
  });

  it('renders regular text when cell is not a link', () => {
    const { container, getByText, queryByRole } = render(
      <Table data={mockTableData} />
    );

    expect(getByText('GITHUB')).toBeInTheDocument();
    expect(getByText('LINKEDIN')).toBeInTheDocument();
    expect(
      getByText('https://www.linkedin.com/in/emirhan-kemal-kosem-259569b3/')
    ).toBeInTheDocument();
    expect(getByText('MEDIUM')).toBeInTheDocument();
    expect(
      getByText('https://medium.com/emirhankemalkosem')
    ).toBeInTheDocument();

    // Should not be links
    expect(queryByRole('link')).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
