import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { MediaHero } from '@/components/MediaHero'
import { SplitSection } from '@/components/SplitSection'
import { ProseBand } from '@/components/ProseBand'
import { Faq } from '@/components/Faq'
import { FullBleedPhoto } from '@/components/FullBleedPhoto'
import { PriceTable } from '@/components/PriceTable'
import { ResourceLinks } from '@/components/ResourceLinks'
import { FinalCta } from '@/components/FinalCta'
import { SiteFooter } from '@/components/SiteFooter'

import { SITE_URL, business, catGroomingPage } from '@/lib/site'
import {
  addOnsCtaBackdrop,
  catBannerBlowdry,
  catHeroKaylie,
  catShaveGinger,
} from '@/lib/images'

const title = 'Cat Grooming in Urbandale'
const description =
  'Gentle, one-on-one cat grooming in Urbandale, Iowa: shave-downs, sanitary trims, nail trims and ear cleaning. A calm, quick process built around how cats differ from dogs.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/services/cat-grooming' },
  openGraph: { title, description, url: `${SITE_URL}/services/cat-grooming` },
  twitter: { title, description },
}

export default function CatGroomingPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/cat-grooming#service`,
        name: 'Cat Grooming',
        description,
        serviceType: 'Cat grooming',
        url: `${SITE_URL}/services/cat-grooming`,
        provider: { '@id': `${SITE_URL}/#business` },
        audience: { '@type': 'Audience', audienceType: 'Cat owners' },
        areaServed: business.areaServed.map((name) => ({
          '@type': 'City',
          name,
          addressRegion: business.region,
        })),
        // Built from the same rows the price table renders, so the markup can
        // never advertise a price the page doesn't show.
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: catGroomingPage.pricing.tables[0].caption,
          itemListElement: catGroomingPage.pricing.tables[0].rows.map((row) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: row[0] },
            priceCurrency: 'USD',
            price: row[1].replace('$', ''),
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: catGroomingPage.breadcrumb.map((crumb, index) => ({
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
      <Breadcrumbs trail={catGroomingPage.breadcrumb} />

      <main id="main">
        <MediaHero
          heading={catGroomingPage.hero.heading}
          headingId="cat-grooming-heading"
          body={catGroomingPage.hero.body}
          image={catHeroKaylie}
          imageAlt={catGroomingPage.hero.imageAlt}
          aspect="577 / 455"
          showCall={false}
        />

        <SplitSection
          heading={catGroomingPage.shave.heading}
          body={catGroomingPage.shave.body}
          headingId="cat-shave-heading"
          image={catShaveGinger}
          imageAlt={catGroomingPage.shave.imageAlt}
          aspect="600 / 480"
          mediaRatio={1}
        />

        <ProseBand
          heading={catGroomingPage.sanitary.heading}
          body={catGroomingPage.sanitary.body}
          headingId="cat-sanitary-heading"
          surface="sand"
        />

        <Faq
          heading={catGroomingPage.faq.heading}
          eyebrow={catGroomingPage.faq.eyebrow}
          items={catGroomingPage.faq.items}
          surface="cream"
          headingId="cat-faq-heading"
        />

        <FullBleedPhoto image={catBannerBlowdry} alt={catGroomingPage.banner.imageAlt} />

        <PriceTable
          eyebrow={catGroomingPage.pricing.eyebrow}
          heading={catGroomingPage.pricing.heading}
          headingId="cat-pricing-heading"
          note={catGroomingPage.pricing.note}
          tables={catGroomingPage.pricing.tables}
          surface="sand"
          callLabel={catGroomingPage.cta.callLabel}
        />

        <ResourceLinks heading={catGroomingPage.more.heading} items={catGroomingPage.more.items} />

        <FinalCta
          heading={catGroomingPage.cta.heading}
          body={catGroomingPage.cta.body}
          callLabel={catGroomingPage.cta.callLabel}
          backdrop={addOnsCtaBackdrop}
        />
      </main>

      <SiteFooter />
    </>
  )
}
