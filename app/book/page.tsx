import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { BookHero } from '@/components/BookHero'
import { BookingEmbed } from '@/components/BookingEmbed'
import { BookBeforeYouBook } from '@/components/BookBeforeYouBook'
import { ResourceLinks } from '@/components/ResourceLinks'
import { FinalCta } from '@/components/FinalCta'
import { SiteFooter } from '@/components/SiteFooter'

import { SITE_URL, book, business, phone } from '@/lib/site'
import { bookCtaBackdrop } from '@/lib/images'

const title = 'Book Your Groom'
const description =
  'Book a groom with The Diamond Dog in Urbandale, Iowa. Pick the service that fits your dog by breed, size and coat, or call or text and Kaylie will help you choose.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/book' },
  openGraph: { title, description, url: `${SITE_URL}/book` },
  twitter: { title, description },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/book#page`,
      url: `${SITE_URL}/book`,
      name: title,
      description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#business` },
      // Marks this as the page a booking intent should be sent to.
      potentialAction: {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/book`,
          actionPlatform: [
            'https://schema.org/DesktopWebPlatform',
            'https://schema.org/MobileWebPlatform',
          ],
        },
        result: { '@type': 'Reservation', name: 'Grooming appointment' },
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: book.breadcrumb.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.label,
        item: `${SITE_URL}${crumb.href === '/' ? '' : crumb.href}`,
      })),
    },
    {
      '@type': 'ContactPoint',
      '@id': `${SITE_URL}/book#contact`,
      telephone: phone.number,
      contactType: 'Reservations',
      areaServed: business.areaServed,
      availableLanguage: 'English',
    },
  ],
}

export default function BookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static object defined above, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <a className="skipLink" href="#main">
        Skip to content
      </a>

      <SiteHeader />
      <Breadcrumbs trail={book.breadcrumb} />

      <main id="main">
        <BookHero />
        <BookingEmbed />
        <BookBeforeYouBook />
        <ResourceLinks heading={book.resources.heading} items={book.resources.items} />
        <FinalCta
          heading={book.cta.heading}
          body={book.cta.body}
          callLabel={book.cta.callLabel}
          bookHref="#booking"
          backdrop={bookCtaBackdrop}
        />
      </main>

      <SiteFooter />
    </>
  )
}
