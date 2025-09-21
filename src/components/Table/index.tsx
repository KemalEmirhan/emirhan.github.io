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
    <div className={`text-black bg-white text-sm md:text-base ${className}`}>
      <div className='w-full max-w-4xl'>
        <div className='flex items-center pb-1 mb-1 px-2 md:px-4 lg:px-0'>
          <div className='text-left text-base md:text-lg font-semibold w-1/2 pr-2'>
            {leftHeader}
          </div>
          <div className='text-right text-base md:text-lg font-semibold w-1/2 pl-2'>
            {rightHeader}
          </div>
        </div>
        <div className='border-b border-black mb-2'></div>
        <div className='space-y-2 md:space-y-1'>
          {data.map((row, index) => (
            <TableRow
              key={index}
              row={row}
              leftHeader={leftHeader}
              rightHeader={rightHeader}
              linkField={linkField}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
