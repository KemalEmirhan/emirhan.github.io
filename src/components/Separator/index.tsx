import React from 'react';

interface SeparatorProps {
  className?: string;
}

const Separator = ({ className }: SeparatorProps) => (
  <hr
    className={`separator max-w-6xl mx-auto bg-black w-full h-1 ${className}`}
  />
);

export default Separator;
