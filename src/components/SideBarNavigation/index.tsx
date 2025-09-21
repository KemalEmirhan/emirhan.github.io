import Link from 'next/link';
import React from 'react';

const SideBarNavigation = () => {
  return (
    <aside className='hidden lg:block border-b md:border-b-0 md:border-r border-black border-dashed md:pr-4'>
      <nav className='flex md:flex-col items-end gap-4 py-4 md:py-0 md:pr-4'>
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
        {/* <Link
          href='/bookmarks'
          className='text-gray-700 hover:text-gray-900 transition-colors duration-150 underline text-xl uppercase'
        >
          Bookmarks
        </Link> */}
      </nav>
    </aside>
  );
};

export default SideBarNavigation;
