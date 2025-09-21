'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { motion } from 'motion/react';

const StickyBottomNavigation = () => {
  const pathname = usePathname();

  // Calculate the position of the blue dot based on active link
  const getActiveLinkIndex = () => {
    if (pathname === '/') return 0;
    if (pathname === '/socials') return 1;
    return 0; // default to first link
  };

  const activeIndex = getActiveLinkIndex();

  return (
    <div className='fixed lg:hidden bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-3xl shadow-lg px-4 py-2 drop-shadow-lg border border-gray-500 w-fit z-50'>
      <nav className='flex justify-evenly items-center gap-4'>
        {/* Blue dot indicator */}
        <motion.div
          className='absolute w-2 h-2 bg-blue-500 rounded-full'
          initial={false}
          animate={{
            x: activeIndex * 64,
          }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 25,
          }}
          style={{
            bottom: '2px',
            left: '30px',
          }}
        />

        <Link href='/' className='flex flex-col items-center'>
          <span
            className='text-gray-500 data-[active=true]:text-gray-900 transition-colors duration-150'
            data-active={pathname === '/'}
          >
            About
          </span>
        </Link>
        <Link href='/socials' className='flex flex-col items-center'>
          <span
            className='text-gray-500 data-[active=true]:text-gray-900 transition-colors duration-150'
            data-active={pathname === '/socials'}
          >
            Socials
          </span>
        </Link>
      </nav>
    </div>
  );
};

export default StickyBottomNavigation;
