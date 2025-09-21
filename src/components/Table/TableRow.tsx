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
    <tr className='px-2 md:px-4 lg:px-0 relative border-b border-black border-dashed'>
      <td className='relative pr-2 pl-0 align-baseline py-2'>
        <TableRowValue
          value={leftValue}
          header={leftHeader}
          linkField={linkField}
          direction='left'
        />
      </td>

      <td className='relative pr-0 pl-2 align-baseline py-2'>
        <TableRowValue
          value={rightValue}
          header={rightHeader}
          linkField={linkField}
          direction='right'
        />
      </td>
    </tr>
  );
};

export default TableRow;
