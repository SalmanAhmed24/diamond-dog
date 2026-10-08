import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { MediaHero } from '@/components/MediaHero'
import { ServiceIncludes } from '@/components/ServiceIncludes'
import { ProseBand } from '@/components/ProseBand'
import { PriceTable } from '@/components/PriceTable'
import { DetailPanel } from '@/components/DetailPanel'
import { Faq } from '@/components/Faq'
import { ResourceLinks } from '@/components/ResourceLinks'
import { FinalCta } from '@/components/FinalCta'
import { SiteFooter } from '@/components/SiteFooter'

import { SITE_URL, business, callHref, faqsById, fullGroomPage, phone } from '@/lib/site'
import { addOnsCtaBackdrop, fullGroomBrushing, fullGroomHeroDoodle } from '@/lib/images'

const title = 'Full Dog Grooming in Urbandale'
const description =
  'A complete haircut and bath for doodles, poodles, Shih Tzus and more in Urbandale, Iowa. Full-body cut, bath, blow out, nail trim, ear cleaning and anal gland expression in one service.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/services/full-groom' },
  openGraph: { title, description, url: `${SITE_URL}/services/full-groom` },
  twitter: { title, description },
}

export default function FullGroomPage() {
  const table = fullGroomPage.pricing.tables[0]

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/full-groom#service`,
        name: 'Full Groom',
        description,
        serviceType: 'Full dog groom',
        url: `${SITE_URL}/services/full-groom`,
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
          name: table.caption,
          itemListElement: table.rows.map((row) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: `Full Groom — ${row[0]}` },
            priceCurrency: 'USD',
            price: row[1].replace('$', ''),
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: fullGroomPage.breadcrumb.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.label,
          item: `${SITE_URL}${crumb.href === '/' ? '' : crumb.href}`,
        })),
      },
    ],
  }

  // One question is shared with /faq by id; the other is specific to this page.
  const faqItems = [...faqsById(fullGroomPage.faq.itemIds), ...fullGroomPage.faq.extraItems]

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
      <Breadcrumbs trail={fullGroomPage.breadcrumb} />

      <main id="main">
        <MediaHero
          heading={fullGroomPage.hero.heading}
          headingId="full-groom-heading"
          body={fullGroomPage.hero.body}
          image={fullGroomHeroDoodle}
          imageAlt={fullGroomPage.hero.imageAlt}
          aspect="577 / 455"
          callLabel={fullGroomPage.hero.callLabel}
        />

        <ServiceIncludes
          headingId="full-groom-included-heading"
          blocks={fullGroomPage.included.blocks}
          items={fullGroomPage.included.items}
          image={fullGroomBrushing}
          imageAlt={fullGroomPage.included.imageAlt}
          aspect="600 / 480"
        />

        <ProseBand
          heading={fullGroomPage.matted.heading}
          body={fullGroomPage.matted.body}
          headingId="matted-dogs-heading"
          surface="cream"
          align="left"
          textAlign="left"
        />

        <PriceTable
          eyebrow={fullGroomPage.pricing.eyebrow}
          heading={fullGroomPage.pricing.heading}
          headingId="full-groom-pricing-heading"
          note={fullGroomPage.pricing.note}
          tables={fullGroomPage.pricing.tables}
          callLabel={fullGroomPage.cta.callLabel}
        />

        <DetailPanel
          heading={fullGroomPage.whereIWork.heading}
          body={fullGroomPage.whereIWork.body}
          headingId="full-groom-where-heading"
          rows={[
            { label: 'Studio', value: business.addressLines },
            { label: 'Phone & text', value: phone.display, href: callHref },
            { label: 'Hours', value: business.hours.map((slot) => slot.labelLong) },
            { label: 'Service area', value: business.areaServed.slice(1).join(', ') },
          ]}
        />

        <Faq
          heading={fullGroomPage.faq.heading}
          eyebrow={fullGroomPage.faq.eyebrow}
          items={faqItems}
          headingId="full-groom-faq-heading"
        />

        <ResourceLinks
          eyebrow={fullGroomPage.more.eyebrow}
          heading={fullGroomPage.more.heading}
          items={fullGroomPage.more.items}
        />

        <FinalCta
          heading={fullGroomPage.cta.heading}
          body={fullGroomPage.cta.body}
          callLabel={fullGroomPage.cta.callLabel}
          backdrop={addOnsCtaBackdrop}
        />
      </main>

      <SiteFooter />
    </>
  )
}
