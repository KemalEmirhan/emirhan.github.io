'use client';

import React from 'react';
import Avatar from '@/components/Avatar';

const Header = () => {
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className='w-full md:max-w-5xl mx-auto'>
      <div className='grid md:grid-cols-[145px_1fr] items-center py-6 px-4 lg:px-0 md:py-8 gap-6'>
        <div className='hidden md:block border-r border-black border-dashed pr-4 h-full'>
          <Avatar />
        </div>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>emrhnkml.</h1>
          <time dateTime={date}>{date}</time>
        </div>
      </div>
    </header>
  );
};

export default Header;
