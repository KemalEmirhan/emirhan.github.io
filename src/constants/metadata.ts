import type { Metadata } from 'next';

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
    'Berlin Developer',
    'GraphQL Developer',
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
      'Frontend Software Engineer with 8+ years of experience in React, Next.js, TypeScript, and GraphQL. Based in Berlin, specializing in high-performance web applications, accessibility, and modern web standards.',
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
      'Frontend Software Engineer with 8+ years of experience in React, Next.js, TypeScript, and GraphQL. Based in Berlin, specializing in high-performance web applications, accessibility, and modern web standards.',
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
