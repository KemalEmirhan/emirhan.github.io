import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { Inter } from 'next/font/google';
import SEOData from '@/components/SEOData';
import '@/styles/globals.css';
import Header from '@/components/Header';
import StickyBottomNavigation from '@/components/StickyBottomNavigation';

import { isProd, gtmId, gaId } from '@/utilities/common';
import SkipToMainContent from '@/components/SkipToMainContent';
import Footer from '@/components/Footer';
import { metadata } from '@/constants/metadata';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export { metadata };

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang='en'>
      <head>
        <SEOData />
        {isProd && gtmId && <GoogleTagManager gtmId={gtmId} />}
      </head>
      <body
        className={`${inter.variable} antialiased container min-h-screen flex flex-col`}
      >
        <SkipToMainContent />
        <Header />
        <main
          id='main-content'
          className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center'
        >
          {children}
        </main>
        <StickyBottomNavigation />
        <Footer />
        {isProd && gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
