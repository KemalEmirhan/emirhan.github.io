import React, { useMemo } from 'react';
import { TableDataSchema, type TTableData } from '@/schemas';
import TableRow from './TableRow';
import { getColumnWidth } from './utilities';

interface TableProps {
  data: TTableData;
}

const Table = ({ data }: TableProps): React.ReactElement => {
  const validatedData = TableDataSchema.parse(data);
  const { columns, rows, className = '' } = validatedData;

  const columnWidth = useMemo(() => getColumnWidth(columns), [columns]);

  return (
    <div className={`w-full max-w-4xl ${className}`}>
      <table className='w-full text-black bg-white text-sm md:text-base table-fixed'>
        <colgroup>
          {columns.map(column => (
            <col key={column.key} className={column.width || columnWidth} />
          ))}
        </colgroup>
        <thead>
          <tr className='border-b border-black'>
            {columns.map(column => (
              <th
                key={column.key}
                className='text-base md:text-lg font-semibold pb-1 mb-1 px-0'
                style={{ textAlign: column.align }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='space-y-2 md:space-y-1'>
          {rows.map((row, index) => (
            <TableRow key={index} row={row} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
