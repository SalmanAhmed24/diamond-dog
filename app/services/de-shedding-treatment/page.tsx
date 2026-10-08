import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { MediaHero } from '@/components/MediaHero'
import { SplitSection } from '@/components/SplitSection'
import { ServiceIncludes } from '@/components/ServiceIncludes'
import { PriceTable } from '@/components/PriceTable'
import { DetailPanel } from '@/components/DetailPanel'
import { Faq } from '@/components/Faq'
import { ResourceLinks } from '@/components/ResourceLinks'
import { FinalCta } from '@/components/FinalCta'
import { SiteFooter } from '@/components/SiteFooter'

import { SITE_URL, business, callHref, deSheddingPage, faqsById, phone } from '@/lib/site'
import {
  addOnsCtaBackdrop,
  deshedHeroAussie,
  deshedIncludedCurly,
  deshedProcessChi,
} from '@/lib/images'

const title = 'De-Shedding Treatment for Dogs in Urbandale'
const description =
  'A multi-step de-shedding treatment that pulls the dead undercoat out of double-coated dogs, reducing shedding by up to 90%. Includes nail trim, ear cleaning, anal gland expression and a sanitary cut.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/services/de-shedding-treatment' },
  openGraph: { title, description, url: `${SITE_URL}/services/de-shedding-treatment` },
  twitter: { title, description },
}

/* Both price tables feed the offer catalogue. The de-shed bath carries two
   prices per weight band, so each row becomes one offer per coat type rather
   than collapsing to a single ambiguous figure. */
export default function DeSheddingTreatmentPage() {
  const deShedBath = deSheddingPage.pricing.tables[0]
  const huskyDeShed = deSheddingPage.pricing.tables[1]

  const offers = [
    ...deShedBath.rows.flatMap((row) =>
      row.slice(1).map((price, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `${deShedBath.caption} — ${row[0]}, ${deShedBath.columns[index + 1]}`,
        },
        priceCurrency: 'USD',
        price: price.replace('$', ''),
      })),
    ),
    ...huskyDeShed.rows.map((row) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: `${huskyDeShed.caption} — ${row[0]}` },
      priceCurrency: 'USD',
      price: row[1].replace('$', ''),
    })),
  ]

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/de-shedding-treatment#service`,
        name: 'De-Shedding Treatment',
        description,
        serviceType: 'Dog de-shedding treatment',
        url: `${SITE_URL}/services/de-shedding-treatment`,
        provider: { '@id': `${SITE_URL}/#business` },
        areaServed: business.areaServed.map((name) => ({
          '@type': 'City',
          name,
          addressRegion: business.region,
        })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'De-Shedding Treatment pricing',
          itemListElement: offers,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: deSheddingPage.breadcrumb.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.label,
          item: `${SITE_URL}${crumb.href === '/' ? '' : crumb.href}`,
        })),
      },
    ],
  }

  // One question is shared with /faq by id; the other is specific to this page.
  const faqItems = [
    ...faqsById(deSheddingPage.faq.itemIds),
    ...deSheddingPage.faq.extraItems,
  ]

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
      <Breadcrumbs trail={deSheddingPage.breadcrumb} />

      <main id="main">
        <MediaHero
          heading={deSheddingPage.hero.heading}
          headingId="de-shedding-heading"
          body={deSheddingPage.hero.body}
          image={deshedHeroAussie}
          imageAlt={deSheddingPage.hero.imageAlt}
          aspect="577 / 455"
          callLabel={deSheddingPage.hero.callLabel}
        />

        <SplitSection
          heading={deSheddingPage.process.heading}
          body={deSheddingPage.process.paragraphs}
          headingId="de-shed-process-heading"
          image={deshedProcessChi}
          imageAlt={deSheddingPage.process.imageAlt}
          aspect="600 / 480"
          mediaRatio={1}
          bodyMeasure={58}
        />

        <ServiceIncludes
          headingId="de-shed-included-heading"
          blocks={deSheddingPage.included.blocks}
          items={deSheddingPage.included.items}
          image={deshedIncludedCurly}
          imageAlt={deSheddingPage.included.imageAlt}
          aspect="600 / 480"
          mediaSide="right"
        />

        <PriceTable
          eyebrow={deSheddingPage.pricing.eyebrow}
          heading={deSheddingPage.pricing.heading}
          headingId="de-shed-pricing-heading"
          note={deSheddingPage.pricing.note}
          tables={deSheddingPage.pricing.tables}
          callLabel={deSheddingPage.cta.callLabel}
        />

        <DetailPanel
          heading={deSheddingPage.whereIWork.heading}
          body={deSheddingPage.whereIWork.body}
          headingId="where-i-work-heading"
          rows={[
            { label: 'Studio', value: business.addressLines },
            { label: 'Phone & text', value: phone.display, href: callHref },
            { label: 'Hours', value: business.hours.map((slot) => slot.labelLong) },
            { label: 'Service area', value: business.areaServed.slice(1).join(', ') },
          ]}
        />

        <Faq
          heading={deSheddingPage.faq.heading}
          eyebrow={deSheddingPage.faq.eyebrow}
          items={faqItems}
          surface="cream"
          headingId="de-shed-faq-heading"
        />

        <ResourceLinks
          eyebrow={deSheddingPage.more.eyebrow}
          heading={deSheddingPage.more.heading}
          items={deSheddingPage.more.items}
        />

        <FinalCta
          heading={deSheddingPage.cta.heading}
          body={deSheddingPage.cta.body}
          callLabel={deSheddingPage.cta.callLabel}
          backdrop={addOnsCtaBackdrop}
        />
      </main>

      <SiteFooter />
    </>
  )
}
