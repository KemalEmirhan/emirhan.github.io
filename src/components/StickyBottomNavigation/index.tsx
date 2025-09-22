'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { getActiveLinkIndex, calculateDotPosition } from './utils';
import { NAVIGATIONS } from '@/constants/navigations';
import useTracking from '@/hooks/useTracking';

const StickyBottomNavigation = () => {
  const pathname = usePathname();
  const [dotX, setDotX] = useState(20); // Initially set to the center of the first link
  const { clickEvent } = useTracking('Sticky Bottom Navigation');
  const activeIndex = getActiveLinkIndex(pathname);

  const navRef = useCallback(
    (navElement: HTMLElement | null) => {
      if (!navElement) return;

      const centerX = calculateDotPosition(navElement, activeIndex);
      setDotX(centerX);
    },
    [activeIndex]
  );

  const handleClick = (href: string) => {
    clickEvent({
      category: 'navigation',
      label: href,
      value: activeIndex,
    });
  };

  return (
    <div className='fixed lg:hidden bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-3xl shadow-lg px-4 py-2 drop-shadow-lg border border-gray-500 w-fit z-50'>
      <nav
        ref={navRef}
        className='flex justify-evenly items-center gap-4 relative'
      >
        <motion.div
          className='absolute w-2 h-2 bg-blue-500 rounded-full bottom-[-4px]'
          initial={false}
          animate={{ left: dotX - 4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />

        {NAVIGATIONS.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className='flex flex-col items-center'
            onClick={() => handleClick(item.href)}
          >
            <span
              className='text-gray-500 data-[active=true]:text-gray-900 transition-colors duration-150'
              data-active={pathname === item.href}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default StickyBottomNavigation;
