export const isProd = process.env.NODE_ENV === 'production';
export const isDev = process.env.NODE_ENV === 'development';

export const gtmId = process.env.GTM_ID || '';
export const gaId = process.env.GA_ID || '';
