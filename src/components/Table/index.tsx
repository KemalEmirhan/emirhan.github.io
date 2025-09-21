import React from 'react';
import TableRow from './TableRow';

interface TableData {
  [key: string]: string;
}

interface TableProps {
  headers: [string, string];
  data: TableData[];
  className?: string;
  linkField?: string;
}

const Table = ({
  headers,
  data,
  className = '',
  linkField,
}: TableProps): React.ReactElement => {
  const [leftHeader, rightHeader] = headers;

  return (
    <div className={`w-full max-w-4xl ${className}`}>
      <table className='w-full text-black bg-white text-sm md:text-base'>
        <thead>
          <tr className='border-b border-black'>
            <th className='text-left text-base md:text-lg font-semibold pr-2 pb-1 mb-1 px-2 md:px-4 lg:px-0'>
              {leftHeader}
            </th>
            <th className='text-right text-base md:text-lg font-semibold pl-2 pb-1 mb-1 px-2 md:px-4 lg:px-0'>
              {rightHeader}
            </th>
          </tr>
        </thead>
        <tbody className='space-y-2 md:space-y-1'>
          {data.map((row, index) => (
            <TableRow
              key={index}
              row={row}
              leftHeader={leftHeader}
              rightHeader={rightHeader}
              linkField={linkField}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
