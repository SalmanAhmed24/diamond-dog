import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { PageHero } from '@/components/PageHero'
import { Faq } from '@/components/Faq'
import { ResourceLinks } from '@/components/ResourceLinks'
import { FinalCta } from '@/components/FinalCta'
import { SiteFooter } from '@/components/SiteFooter'

import { SITE_URL, faqPage } from '@/lib/site'
import { contactCtaBackdrop } from '@/lib/images'

const title = 'Dog Grooming FAQ'

const description =
  'Answers to what owners ask most about grooming at The Diamond Dog in Urbandale, Iowa: kenneling, vaccines, matting, de-shedding, timings, puppies, and anxious or senior dogs.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/faq' },
  openGraph: { title, description, url: `${SITE_URL}/faq` },
  twitter: { title, description },
}

export default function FaqPage() {
  /**
   * This is the only page that emits FAQPage markup. The two questions repeated
   * on /about are worded differently, and marking both up would hand search
   * engines two answers to the same question.
   */
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/faq#page`,
        url: `${SITE_URL}/faq`,
        name: title,
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#business` },
        mainEntity: faqPage.items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: faqPage.breadcrumb.map((crumb, index) => ({
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
      <Breadcrumbs trail={faqPage.breadcrumb} />

      <main id="main">
        <PageHero
          heading={faqPage.hero.heading}
          headingId="faq-page-heading"
          callLabel={faqPage.hero.callLabel}
        />
        <Faq
          heading={faqPage.heading}
          items={faqPage.items}
          surface="cream"
          headingId="questions-heading"
        />
        <ResourceLinks
          eyebrow={faqPage.resources.eyebrow}
          heading={faqPage.resources.heading}
          items={faqPage.resources.items}
        />
        <FinalCta
          heading={faqPage.cta.heading}
          body={faqPage.cta.body}
          callLabel={faqPage.cta.callLabel}
          backdrop={contactCtaBackdrop}
        />
      </main>

      <SiteFooter />
    </>
  )
}
