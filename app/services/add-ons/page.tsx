import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { MediaHero } from '@/components/MediaHero'
import { SplitSection } from '@/components/SplitSection'
import { ProseBand } from '@/components/ProseBand'
import { PriceTable } from '@/components/PriceTable'
import { ResourceLinks } from '@/components/ResourceLinks'
import { FinalCta } from '@/components/FinalCta'
import { SiteFooter } from '@/components/SiteFooter'

import { SITE_URL, addOnsPage, business } from '@/lib/site'
import {
  addOnsCtaBackdrop,
  addOnsFunPaw,
  addOnsHeroNailTrim,
  addOnsNailsScissors,
} from '@/lib/images'

const title = 'Add-Ons & Single Services in Urbandale'
const description =
  'Nail trims, anal gland expression, medicated and flea baths, skunk treatment, paw soaks, coat colour and nail polish — on their own or added to a groom. Walk-ins welcome for nail trims in Urbandale, Iowa.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/services/add-ons' },
  openGraph: { title, description, url: `${SITE_URL}/services/add-ons` },
  twitter: { title, description },
}

export default function AddOnsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/add-ons#service`,
        name: 'Add-Ons & Single Services',
        description,
        serviceType: 'Pet grooming add-on services',
        url: `${SITE_URL}/services/add-ons`,
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
          name: addOnsPage.pricing.tables[0].caption,
          itemListElement: addOnsPage.pricing.tables[0].rows.map((row) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: row[0] },
            priceCurrency: 'USD',
            description: row[1],
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: addOnsPage.breadcrumb.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.label,
          item: `${SITE_URL}${crumb.href === '/' ? '' : crumb.href}`,
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
      <Breadcrumbs trail={addOnsPage.breadcrumb} />

      <main id="main">
        <MediaHero
          heading={addOnsPage.hero.heading}
          headingId="add-ons-heading"
          body={addOnsPage.hero.body}
          image={addOnsHeroNailTrim}
          imageAlt={addOnsPage.hero.imageAlt}
          aspect="577 / 455"
          showCall={false}
        />

        <SplitSection
          heading={addOnsPage.nails.heading}
          body={addOnsPage.nails.body}
          headingId="nails-heading"
          image={addOnsNailsScissors}
          imageAlt={addOnsPage.nails.imageAlt}
          aspect="600 / 480"
          mediaRatio={1}
          bodyMeasure={62}
          details={addOnsPage.nails.details}
        />

        <ProseBand
          heading={addOnsPage.overview.heading}
          body={addOnsPage.overview.body}
          headingId="single-services-heading"
          surface="sand"
          align="left"
          textAlign="left"
        />

        <SplitSection
          heading={addOnsPage.fun.heading}
          body={addOnsPage.fun.body}
          headingId="fun-ones-heading"
          image={addOnsFunPaw}
          imageAlt={addOnsPage.fun.imageAlt}
          aspect="600 / 480"
          mediaSide="right"
          mediaRatio={1}
        />

        <PriceTable
          eyebrow={addOnsPage.pricing.eyebrow}
          heading={addOnsPage.pricing.heading}
          headingId="prices-heading"
          note={addOnsPage.pricing.note}
          tables={addOnsPage.pricing.tables}
          callLabel={addOnsPage.cta.callLabel}
        />

        <ResourceLinks
          eyebrow={addOnsPage.more.eyebrow}
          heading={addOnsPage.more.heading}
          items={addOnsPage.more.items}
        />

        <FinalCta
          heading={addOnsPage.cta.heading}
          body={addOnsPage.cta.body}
          callLabel={addOnsPage.cta.callLabel}
          backdrop={addOnsCtaBackdrop}
        />
      </main>

      <SiteFooter />
    </>
  )
}
