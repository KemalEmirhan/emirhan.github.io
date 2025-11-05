import type { Metadata } from 'next';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { Inter } from 'next/font/google';
import SEOData from '@/components/SEOData';
import '@/styles/globals.css';
import Header from '@/components/Header';
import StickyBottomNavigation from '@/components/StickyBottomNavigation';

import { isProd, gtmId, gaId } from '@/utilities/common';
import SkipToMainContent from '@/components/SkipToMainContent';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Emirhan Kemal Kosem - Frontend Software Engineer',
    template: '%s | Emirhan Kemal Kosem',
  },
  description:
    'Frontend Software Engineer with 8+ years of experience in React, Next.js, TypeScript, and GraphQL. Based in Berlin, specializing in high-performance web applications, accessibility, and modern web standards.',
  keywords: [
    'Emirhan Kemal Kosem',
    'Emir Kemal',
    'Emirhan Kemal',
    'Emir Kosem',
    'Emirhan Kosem',
    'Frontend Developer',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'JavaScript Developer',
    'Web Developer',
    'Software Engineer',
    'Web Accessibility',
    'Frontend Engineer',
    'UI/UX Developer',
    'Web Performance',
  ],
  authors: [{ name: 'Emirhan Kemal Kosem', url: 'https://emirkemal.com' }],
  creator: 'Emirhan Kemal Kosem',
  publisher: 'Emirhan Kemal Kosem',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://emirkemal.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://emirkemal.com',
    siteName: 'Emirhan Kemal Kosem',
    title: 'Emirhan Kemal Kosem - Frontend Software Engineer',
    description:
      'Frontend Software Engineer with 8+ years of experience in React, Next.js, TypeScript, and GraphQL. Based in Berlin, specializing in high-performance web applications.',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'Emirhan Kemal Kosem - Frontend Software Engineer',
        type: 'image/png',
      },
      {
        url: '/og-square',
        width: 1200,
        height: 1200,
        alt: 'Emirhan Kemal Kosem - Frontend Software Engineer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@KsemEmir',
    creator: '@KsemEmir',
    title: 'Emirhan Kemal Kosem - Frontend Software Engineer',
    description:
      'Frontend Software Engineer with 8+ years of experience in React, Next.js, TypeScript, and GraphQL. Based in Berlin.',
    images: ['/og'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  category: 'technology',
  classification: 'Personal Website',
  other: {
    'theme-color': '#ffffff',
    'color-scheme': 'light',
    'msapplication-TileColor': '#ffffff',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang='en'>
      <head>
        <SEOData />
        {isProd && gtmId && <GoogleTagManager gtmId={gtmId} />}
      </head>
      <body className={`${inter.variable} antialiased container`}>
        <SkipToMainContent />
        <div className='flex flex-col items-center justify-center gap-6 md:gap-8 px-4 md:px-0 mb-24'>
          <Header />
          <main
            id='main-content'
            className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center'
          >
            {children}
          </main>
        </div>
        <StickyBottomNavigation />
        <Footer />
        {isProd && gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
