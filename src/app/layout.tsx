import { Inter } from 'next/font/google';
import SEOData from '@/components/SEOData';
import '@/styles/globals.css';

import { shouldTrack, gtmId, gaId } from '@/config/env';
import SkipToMainContent from '@/components/SkipToMainContent';
import Analytics from '@/components/Analytics';
import ConsentBanner from '@/components/ConsentBanner';
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
      </head>
      <body className='antialiased'>
        <SkipToMainContent />
        {children}
        <ConsentBanner />
        <Analytics gaId={gaId} gtmId={gtmId} enabled={shouldTrack} />
      </body>
    </html>
  );
}
