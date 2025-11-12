import React from 'react';
import { type TTableRow, type TTableColumn } from '@/schemas';
import TableRowValue from './TableRowValue';

type TableRowProps = {
  row: TTableRow;
  columns: TTableColumn[];
};

const TableRow = ({ row, columns }: TableRowProps): React.ReactElement => (
  <tr className='px-2 md:px-4 lg:px-0 relative border-b border-black border-dashed translate-x-0 translate-y-0 [clip-path:inset(0)]'>
    {columns.map(column => (
      <td
        key={column.key}
        className='align-baseline py-2'
        style={{ textAlign: column.align }}
      >
        <TableRowValue cell={row[column.key]} />
      </td>
    ))}
  </tr>
);

export default TableRow;
