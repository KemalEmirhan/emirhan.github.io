import React, { forwardRef } from 'react';

type StoneProps = {
  artRef: React.Ref<SVGSVGElement>;
  shadowRef: React.Ref<HTMLSpanElement>;
};

// The stone hovers above its shadow; the shadow marks where it will land.
const Stone = forwardRef<HTMLSpanElement, StoneProps>(
  ({ artRef, shadowRef }, ref) => (
    <span ref={ref} className='pond-stone' aria-hidden='true'>
      <span ref={shadowRef} className='pond-stone-shadow' />
      <svg
        ref={artRef}
        className='pond-stone-art'
        width='28'
        height='18'
        viewBox='0 0 28 18'
      >
        <path
          d='M2.5 10.5 5.5 5 12.5 2.2 20.5 3 25.5 7.2 24.6 12.4 18.5 15.6 9.2 15.8 3.8 13.6Z'
          fill='#13254F'
          stroke='#13254F'
          strokeWidth='1.6'
          strokeLinejoin='round'
        />
        <path d='M5.5 5 12.5 2.2 20.5 3 16.5 6.4 8.4 7.6Z' fill='#4A5C86' />
        <path
          d='M20.5 3 25.5 7.2 24.6 12.4 18.6 9.6 16.5 6.4Z'
          fill='#2A3B64'
        />
        <path
          d='M8.4 7.6 16.5 6.4 18.6 9.6 13 11.4Z'
          fill='#36487A'
          opacity='0.8'
        />
      </svg>
    </span>
  )
);

Stone.displayName = 'Stone';

export default Stone;
