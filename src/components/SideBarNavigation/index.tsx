import Link from 'next/link';
import React from 'react';

const SideBarNavigation = () => {
  return (
    <div className='border-r border-black border-dashed pr-4 h-full'>
      <nav className='flex flex-col items-end gap-4 pr-4'>
        <Link
          href='/'
          className='text-gray-700 hover:text-gray-900 transition-colors duration-150 underline text-xl uppercase'
        >
          About
        </Link>
        <Link
          href='/socials'
          className='text-gray-700 hover:text-gray-900 transition-colors duration-150 underline text-xl uppercase'
        >
          Socials
        </Link>
        <Link
          href='/bookmarks'
          className='text-gray-700 hover:text-gray-900 transition-colors duration-150 underline text-xl uppercase'
        >
          Bookmarks
        </Link>
      </nav>
    </div>
  );
};

export default SideBarNavigation;
