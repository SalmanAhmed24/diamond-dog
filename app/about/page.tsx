import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { MediaHero } from '@/components/MediaHero'
import { ProseBand } from '@/components/ProseBand'
import { SplitSection } from '@/components/SplitSection'
import { Faq } from '@/components/Faq'
import { FinalCta } from '@/components/FinalCta'
import { SiteFooter } from '@/components/SiteFooter'

import { SITE_URL, about, aboutFaqs, business } from '@/lib/site'
import { aboutCtaBackdrop, aboutGuideDog, aboutHeroCorgi } from '@/lib/images'

const title = 'About The Diamond Dog | Health Over Hair'
const description =
  'Meet Kaylie Chalupa, the groomer behind The Diamond Dog in Urbandale, Iowa. Over 18 years of experience, never kenneled, one dog at a time, home in 45 minutes to an hour.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/about' },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/about`,
    type: 'profile',
  },
  twitter: { title, description },
}

/**
 * Two graphs: the page itself and the breadcrumb trail. FAQPage markup lives
 * only on /faq — emitting it from two pages with differently worded answers
 * gives search engines contradicting data for the same questions.
 */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${SITE_URL}/about#page`,
      url: `${SITE_URL}/about`,
      name: title,
      description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#business` },
      mainEntity: {
        '@type': 'Person',
        name: business.ownerFullName,
        jobTitle: business.ownerRole,
        worksFor: { '@id': `${SITE_URL}/#business` },
        knowsAbout: ['Dog grooming', 'De-shedding treatments', 'Coat and skin health'],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: about.breadcrumb.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.label,
        item: `${SITE_URL}${crumb.href === '/' ? '' : crumb.href}`,
      })),
    },
  ],
}

export default function AboutPage() {
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
      <Breadcrumbs trail={about.breadcrumb} />

      <main id="main">
        <MediaHero
          heading={about.hero.heading}
          headingId="about-heading"
          body={about.hero.body}
          image={aboutHeroCorgi}
          imageAlt={about.hero.imageAlt}
          aspect="577 / 455"
          callLabel={about.cta.callLabel}
          proof={about.hero.proof}
          badge={about.hero.badge}
        />
        <ProseBand
          heading={about.process.heading}
          body={about.process.body}
          headingId="process-heading"
          textAlign="left"
        />
        <SplitSection
          heading={about.guide.heading}
          body={about.guide.body}
          headingId="guide-heading"
          image={aboutGuideDog}
          imageAlt={about.guide.imageAlt}
          aspect="599 / 486"
          mediaSide="right"
          mediaRatio={1.02}
        />
        <Faq
          heading={aboutFaqs.heading}
          eyebrow={aboutFaqs.eyebrow}
          items={aboutFaqs.items}
        />
        <FinalCta
          heading={about.cta.heading}
          body={about.cta.body}
          callLabel={about.cta.callLabel}
          backdrop={aboutCtaBackdrop}
          backdropScrim="strong"
        />
      </main>

      <SiteFooter />
    </>
  )
}
