import React from 'react';
import { getValue } from './utilities';
import TableRowValue from './TableRowValue';

interface TableData {
  [key: string]: string;
}

interface TableRowProps {
  row: TableData;
  leftHeader: string;
  rightHeader: string;
  linkField?: string;
}

const TableRow = ({
  row,
  leftHeader,
  rightHeader,
  linkField,
}: TableRowProps): React.ReactElement => {
  const leftValue = getValue(row, leftHeader, true);
  const rightValue = getValue(row, rightHeader, false);

  return (
    <div className='px-2 md:px-4 lg:px-0'>
      <div className='flex items-baseline'>
        <div className='text-left pr-2'>
          <TableRowValue
            value={leftValue}
            header={leftHeader}
            linkField={linkField}
            direction='left'
          />
        </div>
        <div className='flex-1 relative overflow-hidden h-[2px]'>
          <div className='absolute inset-0 flex items-center dot-leaders' />
        </div>
        <div className='text-right pl-2'>
          <TableRowValue
            value={rightValue}
            header={rightHeader}
            linkField={linkField}
            direction='right'
          />
        </div>
      </div>
    </div>
  );
};

export default TableRow;
