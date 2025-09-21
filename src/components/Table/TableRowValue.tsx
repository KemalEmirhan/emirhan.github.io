'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { isLinkField } from './utilities';

interface TableRowValueProps {
  value: string;
  header: string;
  linkField?: string;
  direction: 'left' | 'right';
}

const TableRowValue = ({
  value,
  header,
  linkField,
  direction,
}: TableRowValueProps): React.ReactElement => {
  if (isLinkField(header, linkField)) {
    return (
      <Link
        href={value}
        target='_blank'
        rel='noopener noreferrer'
        className='text-gray-500 hover:text-gray-800 underline flex items-center text-base'
      >
        <span className='whitespace-nowrap max-w-[100px] truncate md:max-w-none'>
          {value}
        </span>
        {direction === 'right' && (
          <ArrowUpRight className='w-3 h-3 md:w-4 md:h-4 flex-shrink-0 ml-1' />
        )}
      </Link>
    );
  }

  return <span className='text-base uppercase'>{value}</span>;
};

export default TableRowValue;
