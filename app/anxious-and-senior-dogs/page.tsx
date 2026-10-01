import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { MediaHero } from '@/components/MediaHero'
import { SplitSection } from '@/components/SplitSection'
import { Faq } from '@/components/Faq'
import { FinalCta } from '@/components/FinalCta'
import { SiteFooter } from '@/components/SiteFooter'

import { SITE_URL, anxiousSeniorDogs, business, faqsById } from '@/lib/site'
import {
  anxiousCtaBackdrop,
  anxiousGentleBrushing,
  anxiousHeroCollie,
  anxiousPlayPen,
} from '@/lib/images'

const title = 'Grooming for Anxious & Senior Dogs'

const description =
  'Calm, unhurried grooming for anxious and senior dogs in Urbandale, Iowa. Never kenneled, one dog at a time, and home in 45 minutes to an hour with no long wait built into the day.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/anxious-and-senior-dogs' },
  openGraph: { title, description, url: `${SITE_URL}/anxious-and-senior-dogs` },
  twitter: { title, description },
}

export default function AnxiousSeniorDogsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/anxious-and-senior-dogs#page`,
        url: `${SITE_URL}/anxious-and-senior-dogs`,
        name: title,
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#business` },
        // Named audience, so the page can surface for "anxious dog groomer" style
        // searches rather than competing with the general service pages.
        audience: {
          '@type': 'Audience',
          audienceType: 'Owners of anxious or senior dogs',
          geographicArea: business.areaServed.join(', '),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: anxiousSeniorDogs.breadcrumb.map((crumb, index) => ({
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
  const faqItems = faqsById(anxiousSeniorDogs.faq.itemIds)

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
      <Breadcrumbs trail={anxiousSeniorDogs.breadcrumb} />

      <main id="main">
        <MediaHero
          heading={anxiousSeniorDogs.hero.heading}
          headingId="anxious-heading"
          body={anxiousSeniorDogs.hero.body}
          image={anxiousHeroCollie}
          imageAlt={anxiousSeniorDogs.hero.imageAlt}
          aspect="577 / 476"
          callLabel={anxiousSeniorDogs.hero.callLabel}
          proof={anxiousSeniorDogs.hero.proof}
        />

        <SplitSection
          heading={anxiousSeniorDogs.why.heading}
          body={anxiousSeniorDogs.why.body}
          headingId="why-this-model-heading"
          image={anxiousGentleBrushing}
          imageAlt={anxiousSeniorDogs.why.imageAlt}
          aspect="600 / 480"
          mediaRatio={1}
          bodyMeasure={62}
        />

        <SplitSection
          heading={anxiousSeniorDogs.exception.heading}
          body={anxiousSeniorDogs.exception.body}
          headingId="one-exception-heading"
          image={anxiousPlayPen}
          imageAlt={anxiousSeniorDogs.exception.imageAlt}
          aspect="590 / 473"
          mediaSide="right"
          mediaRatio={1}
          bodyMeasure={54}
        />

        <Faq
          heading={anxiousSeniorDogs.faq.heading}
          eyebrow={anxiousSeniorDogs.faq.eyebrow}
          items={faqItems}
          headingId="anxious-faq-heading"
        />

        <FinalCta
          heading={anxiousSeniorDogs.cta.heading}
          body={anxiousSeniorDogs.cta.body}
          callLabel={anxiousSeniorDogs.cta.callLabel}
          backdrop={anxiousCtaBackdrop}
        />
      </main>

      <SiteFooter />
    </>
  )
}
