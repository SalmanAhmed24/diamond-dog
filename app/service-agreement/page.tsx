import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { PageHero } from '@/components/PageHero'
import { ProseBand } from '@/components/ProseBand'
import { Faq } from '@/components/Faq'
import { FinalCta } from '@/components/FinalCta'
import { SiteFooter } from '@/components/SiteFooter'

import { SITE_URL, faqsById, serviceAgreement } from '@/lib/site'
import { contactCtaBackdrop } from '@/lib/images'

const title = 'Service Agreement'
const description =
  'The Diamond Dog service agreement in plain terms: how the matting and behavior fee works, and how holding and pickup are handled after your dog\u2019s groom is finished.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/service-agreement' },
  openGraph: { title, description, url: `${SITE_URL}/service-agreement` },
  twitter: { title, description },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/service-agreement#page`,
      url: `${SITE_URL}/service-agreement`,
      name: title,
      description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#business` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: serviceAgreement.breadcrumb.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.label,
        item: `${SITE_URL}${crumb.href === '/' ? '' : crumb.href}`,
      })),
    },
  ],
}

export default function ServiceAgreementPage() {
  // Reused verbatim from the FAQ page rather than restated, so the two can
  // never drift. FAQPage markup stays on /faq only.
  const faqItems = faqsById(serviceAgreement.faq.itemIds)

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
      <Breadcrumbs trail={serviceAgreement.breadcrumb} align="center" />

      <main id="main">
        <PageHero
          heading={serviceAgreement.heading}
          headingId="service-agreement-heading"
          callLabel={serviceAgreement.callLabel}
          align="center"
        />

        {serviceAgreement.sections.map((section, index) => (
          <ProseBand
            key={section.id}
            heading={section.heading}
            body={section.body}
            headingId={section.id}
            surface={index % 2 === 0 ? 'sand' : 'cream'}
          />
        ))}

        <Faq
          heading={serviceAgreement.faq.heading}
          eyebrow={serviceAgreement.faq.eyebrow}
          items={faqItems}
          headingId="agreement-faq-heading"
        />

        <FinalCta
          heading={serviceAgreement.cta.heading}
          body={serviceAgreement.cta.body}
          callLabel={serviceAgreement.cta.callLabel}
          backdrop={contactCtaBackdrop}
        />
      </main>

      <SiteFooter />
    </>
  )
}
