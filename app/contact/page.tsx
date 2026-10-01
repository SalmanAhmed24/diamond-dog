import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ContactHero } from '@/components/ContactHero'
import { ContactMap } from '@/components/ContactMap'
import { SplitSection } from '@/components/SplitSection'
import { ResourceLinks } from '@/components/ResourceLinks'
import { FinalCta } from '@/components/FinalCta'
import { SiteFooter } from '@/components/SiteFooter'

import { SITE_URL, book, business, contact, phone } from '@/lib/site'
import { contactCtaBackdrop, contactWhereIWork } from '@/lib/images'

const title = 'Contact & Hours'

const description = `Call or text The Diamond Dog in Urbandale, Iowa on ${phone.display}. Open Monday to Friday 8 to 5 and Saturday 8 to 3 by appointment, serving Clive, Windsor Heights, Johnston and West Des Moines.`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/contact' },
  openGraph: { title, description, url: `${SITE_URL}/contact` },
  twitter: { title, description },
}

export default function ContactPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${SITE_URL}/contact#page`,
        url: `${SITE_URL}/contact`,
        name: title,
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#business` },
        mainEntity: { '@id': `${SITE_URL}/#business` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: contact.breadcrumb.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.label,
          item: `${SITE_URL}${crumb.href === '/' ? '' : crumb.href}`,
        })),
      },
      {
        '@type': 'ContactPoint',
        '@id': `${SITE_URL}/contact#point`,
        telephone: phone.number,
        contactType: 'Customer service',
        areaServed: business.areaServed,
        availableLanguage: 'English',
        hoursAvailable: business.hours.map((slot) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: slot.days,
          opens: slot.opens,
          closes: slot.closes,
        })),
      },
    ],
  }

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
      <Breadcrumbs trail={contact.breadcrumb} />

      <main id="main">
        <ContactHero />
        <ContactMap />
        <SplitSection
          heading={contact.whereIWork.heading}
          body={contact.whereIWork.body}
          headingId="where-heading"
          image={contactWhereIWork}
          imageAlt={contact.whereIWork.imageAlt}
          aspect="412 / 312"
          mediaRatio={0.6}
        />
        <ResourceLinks heading={book.resources.heading} items={book.resources.items} />
        <FinalCta
          heading={contact.cta.heading}
          body={contact.cta.body}
          callLabel={contact.cta.callLabel}
          backdrop={contactCtaBackdrop}
        />
      </main>

      <SiteFooter />
    </>
  )
}
