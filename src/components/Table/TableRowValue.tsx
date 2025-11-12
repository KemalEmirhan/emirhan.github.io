'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { type TTableCell } from '../../schemas';

type TableRowValueProps = {
  cell: TTableCell;
};

const TableRowValue = ({ cell }: TableRowValueProps) => {
  if (!cell) {
    return <span className='text-base uppercase'>-</span>;
  }

  const { value, isLink, linkProps } = cell;

  if (isLink && linkProps) {
    return (
      <Link
        href={linkProps.href}
        target={linkProps.target}
        rel={linkProps.rel}
        className='text-gray-500 hover:text-gray-800 underline flex items-center justify-end text-base after:absolute after:inset-0 focus-visible:focus-ring'
      >
        <span className='whitespace-nowrap max-w-[100px] truncate md:max-w-none'>
          {value}
        </span>
        <ArrowUpRight className='w-3 h-3 md:w-4 md:h-4 flex-shrink-0 ml-1' />
      </Link>
    );
  }

  return <span className='text-base uppercase'>{value}</span>;
};

export default TableRowValue;
