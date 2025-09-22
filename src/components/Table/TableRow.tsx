import React from 'react';
import { type TTableRow, type TTableColumn } from '@/schemas';
import TableRowValue from './TableRowValue';

interface TableRowProps {
  row: TTableRow;
  columns: TTableColumn[];
}

const TableRow = ({ row, columns }: TableRowProps): React.ReactElement => (
  <tr className='px-2 md:px-4 lg:px-0 relative border-b border-black border-dashed'>
    {columns.map(column => (
      <td
        key={column.key}
        className={`text-${column.align} align-baseline py-2`}
      >
        <TableRowValue cell={row[column.key]} />
      </td>
    ))}
  </tr>
);

export default TableRow;
