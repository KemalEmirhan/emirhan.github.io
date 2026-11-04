import React from 'react';
import { BIO_NAME } from '@/constants/content';
import type { Weather } from '@/lib/weather';

type HeaderProps = {
  weather?: Weather | null;
};

const Header = ({ weather }: HeaderProps) => (
  <header
    className='rise flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1'
    style={{ '--i': 0 } as React.CSSProperties}
  >
    <h1 className='whitespace-nowrap text-[15px] font-medium tracking-[-0.01em] text-ink'>
      {BIO_NAME}
    </h1>
    <p className='label whitespace-nowrap'>
      berlin
      {weather && (
        <>
          {' · '}
          {weather.temperature}° {weather.label}
        </>
      )}
    </p>
  </header>
);

export default Header;
