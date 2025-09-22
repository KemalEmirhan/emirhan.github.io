'use client';

import Link from 'next/link';
import React, { useState, useCallback } from 'react';
import { NAVIGATIONS } from '@/constants/navigations';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import {
  getActiveLinkIndex,
  calculateDotPosition,
} from '@/components/StickyBottomNavigation/utils';
import useTracking from '@/hooks/useTracking';

const SideBarNavigation = () => {
  const pathname = usePathname();
  const [arrowY, setArrowY] = useState(14);
  const { clickEvent } = useTracking('Side Bar Navigation');

  const activeIndex = getActiveLinkIndex(pathname);

  const navRef = useCallback(
    (navElement: HTMLElement | null) => {
      if (!navElement) return;

      const centerY = calculateDotPosition(navElement, activeIndex, 'vertical');
      setArrowY(centerY);
    },
    [activeIndex]
  );

  const handleClick = (href: string) => {
    clickEvent({
      category: 'navigation',
      label: href,
    });
  };

  return (
    <aside className='hidden lg:block border-r border-black border-dashed'>
      <nav
        ref={navRef}
        className='relative flex md:flex-col items-end gap-4 py-0 mr-8'
      >
        <motion.div
          className='absolute flex items-center justify-center right-[-24px]'
          initial={false}
          animate={{ top: arrowY - 8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <ArrowRight className='w-4 h-4' />
        </motion.div>

        {NAVIGATIONS.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className='text-gray-700 hover:text-gray-900 transition-colors duration-150 underline text-xl uppercase flex items-center gap-2'
            onClick={() => handleClick(item.href)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SideBarNavigation;
