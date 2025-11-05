import React from 'react';
import Link from 'next/link';
import NavigationMenu from '@/components/NavigationMenu';

const Header = () => {
  return (
    <header className='w-full'>
      <div className='flex items-center justify-between'>
        <Link href='/'>
          <h1 className='text-2xl font-bold'>emrhnkml.</h1>
        </Link>
        <NavigationMenu />
      </div>
    </header>
  );
};

export default Header;
