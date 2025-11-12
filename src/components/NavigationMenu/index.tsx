'use client';

import Link from 'next/link';
import React from 'react';
import { NAVIGATIONS } from '@/constants/navigations';
import useTracking from '@/hooks/useTracking';

const NavigationMenu = () => {
  const { clickEvent } = useTracking('Navigation Menu');

  const handleClick = (href: string) => {
    clickEvent({
      category: 'navigation',
      label: href,
    });
  };

  return (
    <nav className='items-center gap-4 hidden lg:flex'>
      {NAVIGATIONS.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className='text-gray-700 transition-colors duration-150 font-bold hover:bg-[--color-background-secondary] rounded-md px-2 py-1 underline-offset-2 underline focus-ring'
          onClick={() => handleClick(item.href)}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavigationMenu;
