import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: Parameters<typeof classNames>) => {
  return twMerge(classNames(...inputs));
};
