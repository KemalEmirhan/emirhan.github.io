'use client';

import React from 'react';
import Avatar from '@/components/Avatar';
import Separator from '@/components/Separator';

const Header = () => {
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className='flex flex-col gap-2 max-w-5xl mx-auto py-12'>
      <div className='grid grid-cols-[145px_1fr] items-center py-6 sm:py-8 gap-6'>
        <div className='border-r border-black border-dashed pr-4 h-full'>
          <Avatar />
        </div>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>emrhnkml.</h1>
          <time dateTime={date}>{date}</time>
        </div>
      </div>
      <Separator />
      <Separator />
    </header>
  );
};

export default Header;
