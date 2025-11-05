import React from 'react';

import { cn } from '@/utilities/common';

interface CardProps extends React.PropsWithChildren {
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <section
      className={cn(
        'grid bg-[--color-background] border-2 border-gray-800 p-4 gap-4 has-[h2]:gap-8 rounded-lg relative lg:after:box-shadow height-fit',
        'after:transition-transform after:duration-200 after:ease-out hover:after:-translate-x-4 hover:after:-translate-y-4',
        className
      )}
    >
      {children}
    </section>
  );
};

export default Card;
