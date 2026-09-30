import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { WellnessHero } from '@/components/WellnessHero'
import { FeatureGrid } from '@/components/FeatureGrid'
import { SplitSection } from '@/components/SplitSection'
import { WellnessAssess } from '@/components/WellnessAssess'
import { NoticeCard } from '@/components/NoticeCard'
import { FinalCta } from '@/components/FinalCta'
import { SiteFooter } from '@/components/SiteFooter'

import { SITE_URL, wellnessPage } from '@/lib/site'
import { contactCtaBackdrop, wellnessAutumnWalk } from '@/lib/images'

const title = 'Where Grooming Meets Wellness'
const description =
  'Every groom at The Diamond Dog is a window into how your dog is really doing: coat health, skin, comfort and the right schedule. Call or text Kaylie in Urbandale, Iowa to talk it through.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/wellness' },
  openGraph: { title, description, url: `${SITE_URL}/wellness` },
  twitter: { title, description },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/wellness#page`,
      url: `${SITE_URL}/wellness`,
      name: title,
      description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#business` },
      // Deliberately not marked up as a bookable Service: this page says
      // plainly that wellness is a phone conversation, not an appointment.
      significantLink: [`${SITE_URL}/about`, `${SITE_URL}/contact`],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: wellnessPage.breadcrumb.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.label,
        item: `${SITE_URL}${crumb.href === '/' ? '' : crumb.href}`,
      })),
    },
  ],
}

export default function WellnessPage() {
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
      <Breadcrumbs trail={wellnessPage.breadcrumb} />

      <main id="main">
        <WellnessHero />

        <FeatureGrid
          eyebrow={wellnessPage.signals.eyebrow}
          heading={wellnessPage.signals.heading}
          headingId="signals-heading"
          items={wellnessPage.signals.items}
        />

        <SplitSection
          heading={wellnessPage.philosophy.heading}
          body={wellnessPage.philosophy.body}
          headingId="wellness-philosophy-heading"
          image={wellnessAutumnWalk}
          imageAlt={wellnessPage.philosophy.imageAlt}
          aspect="600 / 480"
          mediaRatio={1}
          bodyMeasure={72}
          link={wellnessPage.philosophy.link}
        />

        <WellnessAssess />

        <NoticeCard
          heading={wellnessPage.boundary.heading}
          body={wellnessPage.boundary.body}
          headingId="boundary-heading"
        />

        <FinalCta
          heading={wellnessPage.cta.heading}
          body={wellnessPage.cta.body}
          callLabel={wellnessPage.cta.callLabel}
          note={wellnessPage.cta.note}
          variant="callOnly"
          backdrop={contactCtaBackdrop}
        />
      </main>

      <SiteFooter />
    </>
  )
}
