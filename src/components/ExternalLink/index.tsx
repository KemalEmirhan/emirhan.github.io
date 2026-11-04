'use client';

import React, { useRef } from 'react';
import useHaptic from '@/hooks/useHaptic';
import { cn } from '@/utilities/common';

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

// Every outbound link ticks on tap (browser-haptic) and says it opens a new tab.
const ExternalLink = ({ href, children, className }: ExternalLinkProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  useHaptic(ref);

  return (
    <a
      ref={ref}
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={cn('tap-target', className)}
    >
      <span>
        {children} <span aria-hidden='true'>↗</span>
        <span className='sr-only'> (opens in a new tab)</span>
      </span>
    </a>
  );
};

export default ExternalLink;
