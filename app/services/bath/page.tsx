import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { MediaHero } from '@/components/MediaHero'
import { ServiceIncludes } from '@/components/ServiceIncludes'
import { ProseBand } from '@/components/ProseBand'
import { Faq } from '@/components/Faq'
import { PriceTable } from '@/components/PriceTable'
import { ResourceLinks } from '@/components/ResourceLinks'
import { FinalCta } from '@/components/FinalCta'
import { SiteFooter } from '@/components/SiteFooter'

import { SITE_URL, bathPage, business, faqsById } from '@/lib/site'
import { addOnsCtaBackdrop, bathHeroSuds, bathSetterTub } from '@/lib/images'

const title = 'Dog Bath & Tidy in Urbandale'
const description =
  'A full clean and tidy-up for short-coated dogs in Urbandale, Iowa: nail trim, ear cleaning, anal gland expression, full bath, brush-out and blow out. Priced by weight from $35.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/services/bath' },
  openGraph: { title, description, url: `${SITE_URL}/services/bath` },
  twitter: { title, description },
}

export default function BathPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/bath#service`,
        name: 'Bath',
        description,
        serviceType: 'Dog bath',
        url: `${SITE_URL}/services/bath`,
        provider: { '@id': `${SITE_URL}/#business` },
        areaServed: business.areaServed.map((name) => ({
          '@type': 'City',
          name,
          addressRegion: business.region,
        })),
        // Built from the same rows the price table renders, so the markup can
        // never advertise a price the page doesn't show.
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: bathPage.pricing.tables[0].caption,
          itemListElement: bathPage.pricing.tables[0].rows.map((row) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: `Bath — ${row[0]}` },
            priceCurrency: 'USD',
            price: row[1].replace('$', ''),
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: bathPage.breadcrumb.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.label,
          item: `${SITE_URL}${crumb.href === '/' ? '' : crumb.href}`,
        })),
      },
    ],
  }

  // Reused verbatim from the FAQ page rather than restated, so the two can
  // never drift. FAQPage markup stays on /faq only.
  const faqItems = faqsById(bathPage.faq.itemIds)

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
      <Breadcrumbs trail={bathPage.breadcrumb} />

      <main id="main">
        <MediaHero
          heading={bathPage.hero.heading}
          headingId="bath-heading"
          body={bathPage.hero.body}
          image={bathHeroSuds}
          imageAlt={bathPage.hero.imageAlt}
          aspect="577 / 455"
          showCall={false}
        />

        <ServiceIncludes
          headingId="included-heading"
          blocks={bathPage.included.blocks}
          items={bathPage.included.items}
          image={bathSetterTub}
          imageAlt={bathPage.included.imageAlt}
          aspect="600 / 480"
        />

        <ProseBand
          heading={bathPage.doubleCoated.heading}
          body={bathPage.doubleCoated.body}
          headingId="double-coated-heading"
          surface="sand"
        />

        <Faq
          heading={bathPage.faq.heading}
          eyebrow={bathPage.faq.eyebrow}
          items={faqItems}
          surface="cream"
          headingId="bath-faq-heading"
        />

        <PriceTable
          eyebrow={bathPage.pricing.eyebrow}
          heading={bathPage.pricing.heading}
          headingId="bath-pricing-heading"
          note={bathPage.pricing.note}
          tables={bathPage.pricing.tables}
          surface="sand"
          callLabel={bathPage.cta.callLabel}
        />

        <ResourceLinks heading={bathPage.more.heading} items={bathPage.more.items} />

        <FinalCta
          heading={bathPage.cta.heading}
          body={bathPage.cta.body}
          callLabel={bathPage.cta.callLabel}
          backdrop={addOnsCtaBackdrop}
        />
      </main>

      <SiteFooter />
    </>
  )
}
