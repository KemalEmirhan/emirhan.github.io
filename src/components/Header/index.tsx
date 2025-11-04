import React from 'react';
import Link from 'next/link';
import NavigationMenu from '@/components/NavigationMenu';

const Header = () => {
  return (
    <header className='container flex items-center justify-between px-4 py-6 md:mb-6 border-2 border-gray-800 rounded-lg'>
      <Link href='/'>
        <h1 className='text-2xl font-bold'>emrhnkml.</h1>
      </Link>
      <NavigationMenu />
    </header>
  );
};

export default Header;
