import React from 'react';
import { ICON_REGISTRY } from './icon.registry';
import { TBaseIconProps } from '@/schemas';

const Icon = ({ name, ...props }: TBaseIconProps) => {
  const iconProps = ICON_REGISTRY[name];

  if (!iconProps) return null;

  const {
    title,
    viewBox,
    path,
    color: iconColor,
    width = 20,
    height = 20,
  } = iconProps;

  return (
    <svg
      viewBox={viewBox}
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      {...props}
    >
      <title>{title}</title>
      <path fill={iconColor} d={path} />
    </svg>
  );
};

export default Icon;
