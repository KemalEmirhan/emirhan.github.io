import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { Inter } from 'next/font/google';
import SEOData from '@/components/SEOData';
import '@/styles/globals.css';

import { isProd, gtmId, gaId } from '@/config/env';
import SkipToMainContent from '@/components/SkipToMainContent';
import { metadata } from '@/constants/metadata';

const inter = Inter({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-inter',
});

export { metadata };

export const viewport = {
  themeColor: '#e8ecee',
  colorScheme: 'light',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang='en' className={inter.variable}>
      <head>
        <SEOData />
        {isProd && gtmId && <GoogleTagManager gtmId={gtmId} />}
      </head>
      <body className='antialiased'>
        <SkipToMainContent />
        {children}
        {isProd && gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
