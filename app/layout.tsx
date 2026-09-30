import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Hanken_Grotesk } from 'next/font/google'

import { MotionProvider } from '@/components/MotionProvider'
import { SITE_URL, business, seo } from '@/lib/site'

import './globals.css'

/* Fonts are self-hosted by next/font — no third-party requests, no layout shift.
   `adjustFontFallback` is on by default, which matches the fallback metrics. */
const serif = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
})

const sans = Hanken_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: seo.titleFull,
    template: `%s | ${business.name}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  applicationName: business.name,
  authors: [{ name: business.name, url: SITE_URL }],
  creator: business.name,
  publisher: business.name,
  alternates: {
    canonical: '/',
  },
  category: 'Pet Services',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: business.name,
    title: seo.titleFull,
    description: seo.description,
    images: [
      {
        url: '/images/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'A golden retriever freshly groomed at The Diamond Dog in Urbandale, Iowa.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.titleFull,
    description: seo.description,
    images: ['/images/og-cover.jpg'],
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
  formatDetection: {
    telephone: true,
    address: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0b' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
