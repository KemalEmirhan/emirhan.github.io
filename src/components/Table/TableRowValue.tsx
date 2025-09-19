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
        {value}
        {direction === 'right' && <ArrowUpRight className='w-4 h-4' />}
      </Link>
    );
  }

  return <span className='text-base uppercase'>{value}</span>;
};

export default TableRowValue;
