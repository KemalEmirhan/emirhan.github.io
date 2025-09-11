import React from 'react';
import { ICON_REGISTRY } from './icon.registry';
import { TBaseIconProps } from '@/schemas';

const Icon = ({ iconName, color, ...props }: TBaseIconProps) => {
  const iconData = ICON_REGISTRY[iconName];

  if (!iconData) return null;

  const { title, viewBox, path, width = 20, height = 20 } = iconData;

  return (
    <svg
      viewBox={viewBox}
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      {...props}
    >
      <title>{title}</title>
      <path fill={color ?? 'currentColor'} d={path} />
    </svg>
  );
};

export default Icon;
