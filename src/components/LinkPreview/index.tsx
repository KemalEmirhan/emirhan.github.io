'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import useHaptic from '@/hooks/useHaptic';

type LinkPreviewProps = {
  href: string;
  image: string;
  domain: string;
  title: string;
  children: React.ReactNode;
};

const OPEN_DELAY = 250;
const CLOSE_DELAY = 100;

// Inline link that shows a screenshot card on mouse hover or keyboard focus. Touch just follows the link.
const LinkPreview = ({
  href,
  image,
  domain,
  title,
  children,
}: LinkPreviewProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const timerRef = useRef(0);
  const [open, setOpen] = useState(false);
  const descriptionId = useId();
  useHaptic(linkRef);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const schedule = (next: boolean, delay: number) => {
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setOpen(next), delay);
  };

  return (
    <span className='preview'>
      <a
        ref={linkRef}
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='preview-link'
        aria-describedby={descriptionId}
        onPointerEnter={event => {
          if (event.pointerType === 'mouse') schedule(true, OPEN_DELAY);
        }}
        onPointerLeave={() => schedule(false, CLOSE_DELAY)}
        onFocus={event => {
          if (event.currentTarget.matches(':focus-visible')) schedule(true, 0);
        }}
        onBlur={() => schedule(false, 0)}
        onKeyDown={event => {
          if (event.key === 'Escape') schedule(false, 0);
        }}
      >
        {children}
        <span className='sr-only'> (opens in a new tab)</span>
      </a>
      <span className='preview-card' data-open={open} role='tooltip'>
        <span className='preview-tape' aria-hidden='true' />
        <Image
          src={image}
          alt=''
          width={126}
          height={79}
          className='preview-image'
        />
        <span className='preview-caption' aria-hidden='true'>
          {domain} ↗
        </span>
        <span id={descriptionId} className='sr-only'>
          {title}
        </span>
      </span>
    </span>
  );
};

export default LinkPreview;
