import React from 'react';

import GithubIcon from './github.icon';
import LinkedInIcon from './linkedIn.icon';
import MediumIcon from './medium.icon';
import TwitterIcon from './twitter.icon';

import { TBaseIconProps } from './icons.type';

const Icon = ({
  iconName,
  color,
}: TBaseIconProps): React.ReactElement | null => {
  switch (iconName) {
    case 'Github':
      return <GithubIcon bgColor={color} />;

    case 'LinkedIn':
      return <LinkedInIcon bgColor={color} />;

    case 'Medium':
      return <MediumIcon bgColor={color} />;

    case 'Twitter':
      return <TwitterIcon bgColor={color} />;

    default:
      return null;
  }
};

export default Icon;
