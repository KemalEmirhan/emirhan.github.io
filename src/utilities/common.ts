import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: Parameters<typeof classNames>) => {
  return twMerge(classNames(inputs));
};

export const isProd = process.env.NODE_ENV === 'production';
export const isDev = process.env.NODE_ENV === 'development';

export const gtmId = process.env.GTM_ID || '';
export const gaId = process.env.GA_ID || '';

export const getFormattedDate = () => {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
