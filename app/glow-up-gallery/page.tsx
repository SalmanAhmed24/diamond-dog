import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { PageHero } from '@/components/PageHero'
import { GalleryGrid } from '@/components/GalleryGrid'
import { FinalCta } from '@/components/FinalCta'
import { SiteFooter } from '@/components/SiteFooter'

import { SITE_URL, glowUpGallery } from '@/lib/site'
import { contactCtaBackdrop } from '@/lib/images'

const title = 'The Glow Up Gallery'
const description =
  'Real dogs, real transformations. Before-and-after grooms from The Diamond Dog in Urbandale, Iowa, filterable by service: de-shedding, full grooms, baths, sanitary grooms, cat grooming and add-ons.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/glow-up-gallery' },
  openGraph: { title, description, url: `${SITE_URL}/glow-up-gallery` },
  twitter: { title, description },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/glow-up-gallery#page`,
      url: `${SITE_URL}/glow-up-gallery`,
      name: title,
      description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#business` },
      // Every photo is listed, so the set is discoverable even though the grid
      // is filtered client-side.
      mainEntity: {
        '@type': 'ImageGallery',
        name: glowUpGallery.heading,
        numberOfItems: glowUpGallery.items.length,
        associatedMedia: glowUpGallery.items.map((item) => ({
          '@type': 'ImageObject',
          contentUrl: `${SITE_URL}/images/glowup-${item.key}.webp`,
          caption: item.alt,
          keywords: item.tag,
        })),
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: glowUpGallery.breadcrumb.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.label,
        item: `${SITE_URL}${crumb.href === '/' ? '' : crumb.href}`,
      })),
    },
  ],
}

export default function GlowUpGalleryPage() {
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
      <Breadcrumbs trail={glowUpGallery.breadcrumb} />

      <main id="main">
        <PageHero
          heading={glowUpGallery.hero.heading}
          headingId="gallery-page-heading"
          body={glowUpGallery.hero.body}
          callLabel={glowUpGallery.hero.callLabel}
        />
        <GalleryGrid />
        <FinalCta
          heading={glowUpGallery.cta.heading}
          body={glowUpGallery.cta.body}
          callLabel={glowUpGallery.cta.callLabel}
          backdrop={contactCtaBackdrop}
        />
      </main>

      <SiteFooter />
    </>
  )
}
