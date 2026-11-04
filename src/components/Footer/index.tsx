import React from 'react';
import { SOCIALS } from '@/constants/content';
import Clock from '@/components/Clock';
import SoundToggle from '@/components/SoundToggle';
import ExternalLink from '@/components/ExternalLink';

const Footer = () => (
  <footer
    className='rise flex flex-col gap-2 border-t border-ink/20 pt-2 md:flex-row md:items-center md:justify-between md:pt-6'
    style={{ '--i': 5 } as React.CSSProperties}
  >
    <ul className='grid grid-cols-2 md:flex md:gap-5'>
      {SOCIALS.map(({ label, href }) => (
        <li key={label}>
          <ExternalLink href={href} className='social'>
            {label}
          </ExternalLink>
        </li>
      ))}
    </ul>
    <p className='label pt-2 md:pt-0'>
      <Clock /> · <SoundToggle /> · © {new Date().getFullYear()}
    </p>
  </footer>
);

export default Footer;
