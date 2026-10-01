import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { MediaHero } from '@/components/MediaHero'
import { ServiceIncludes } from '@/components/ServiceIncludes'
import { PriceTable } from '@/components/PriceTable'
import { ResourceLinks } from '@/components/ResourceLinks'
import { FinalCta } from '@/components/FinalCta'
import { SiteFooter } from '@/components/SiteFooter'

import { SITE_URL, business, sanitaryGroomPage } from '@/lib/site'
import { addOnsCtaBackdrop, sanitaryHeroRolling, sanitaryYorkieComb } from '@/lib/images'

const title = 'Sanitary Groom in Urbandale'
const description =
  'A clean tidy-up for the belly, privates, paw pads and face without changing your dog\u2019s body length. Includes nail trim, ear cleaning, bath and blow out in Urbandale, Iowa.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/services/sanitary-groom' },
  openGraph: { title, description, url: `${SITE_URL}/services/sanitary-groom` },
  twitter: { title, description },
}

export default function SanitaryGroomPage() {
  const table = sanitaryGroomPage.pricing.tables[0]

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/sanitary-groom#service`,
        name: 'Sanitary Groom',
        description,
        serviceType: 'Dog sanitary groom',
        url: `${SITE_URL}/services/sanitary-groom`,
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
            itemOffered: { '@type': 'Service', name: `Sanitary Groom — ${row[0]}` },
            priceCurrency: 'USD',
            price: row[1].replace('$', ''),
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: sanitaryGroomPage.breadcrumb.map((crumb, index) => ({
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
      <Breadcrumbs trail={sanitaryGroomPage.breadcrumb} />

      <main id="main">
        <MediaHero
          heading={sanitaryGroomPage.hero.heading}
          headingId="sanitary-groom-heading"
          body={sanitaryGroomPage.hero.body}
          image={sanitaryHeroRolling}
          imageAlt={sanitaryGroomPage.hero.imageAlt}
          aspect="577 / 455"
          showCall={false}
        />

        <ServiceIncludes
          headingId="sanitary-included-heading"
          blocks={sanitaryGroomPage.included.blocks}
          items={sanitaryGroomPage.included.items}
          image={sanitaryYorkieComb}
          imageAlt={sanitaryGroomPage.included.imageAlt}
          aspect="600 / 480"
        />

        {/* Same checklist again, deliberately: the point is that a de-shed
            already covers it, so the two lists must match exactly. */}
        <ServiceIncludes
          headingId="in-de-shed-heading"
          blocks={sanitaryGroomPage.inDeShed.blocks}
          items={sanitaryGroomPage.inDeShed.items}
          divider
        />

        <PriceTable
          eyebrow={sanitaryGroomPage.pricing.eyebrow}
          heading={sanitaryGroomPage.pricing.heading}
          headingId="sanitary-pricing-heading"
          note={sanitaryGroomPage.pricing.note}
          tables={sanitaryGroomPage.pricing.tables}
          callLabel={sanitaryGroomPage.cta.callLabel}
        />

        <ResourceLinks
          eyebrow={sanitaryGroomPage.more.eyebrow}
          heading={sanitaryGroomPage.more.heading}
          items={sanitaryGroomPage.more.items}
        />

        <FinalCta
          heading={sanitaryGroomPage.cta.heading}
          body={sanitaryGroomPage.cta.body}
          callLabel={sanitaryGroomPage.cta.callLabel}
          backdrop={addOnsCtaBackdrop}
        />
      </main>

      <SiteFooter />
    </>
  )
}
