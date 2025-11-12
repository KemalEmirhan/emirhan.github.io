import React from 'react';
import Link from 'next/link';
import NavigationMenu from '@/components/NavigationMenu';

const Header = () => {
  return (
    <header className='w-full mb-24'>
      <div className='flex items-center justify-between'>
        <Link href='/' className='focus-visible:focus-ring'>
          <h1 className='text-2xl font-bold'>emrhnkml.</h1>
        </Link>
        <NavigationMenu />
      </div>
    </header>
  );
};

export default Header;
