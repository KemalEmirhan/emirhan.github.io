import React from 'react';

import { cn } from '@/lib/utils';

interface CardProps extends React.PropsWithChildren {
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <section
      className={cn(
        'grid bg-[--color-background] border-2 border-gray-800 p-4 has-[h2]:gap-8 rounded-lg relative after:box-shadow',
        className
      )}
    >
      {children}
    </section>
  );
};

export default Card;
