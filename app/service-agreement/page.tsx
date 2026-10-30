import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { PageHero } from '@/components/PageHero'
import { ProseBand } from '@/components/ProseBand'
import { PolicySections } from '@/components/PolicySections'
import { Faq } from '@/components/Faq'
import { FinalCta } from '@/components/FinalCta'
import { SiteFooter } from '@/components/SiteFooter'

import { SITE_URL, faqsById, privacyPolicy, serviceAgreement, smsTerms } from '@/lib/site'
import { contactCtaBackdrop } from '@/lib/images'

const title = 'Service Agreement'

const description =
  'The Diamond Dog service agreement and privacy policy in plain terms: the matting and behavior fee, holding and pickup, and what we do with your information.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/service-agreement' },
  openGraph: { title, description, url: `${SITE_URL}/service-agreement` },
  twitter: { title, description },
}

export default function ServiceAgreementPage() {
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

        {/* The terms sit directly above the privacy policy, so the carrier's
            checklist and the policy it links to read as one block. Anchored at
            #terms-and-conditions for a direct link. */}
        <PolicySections
          heading={smsTerms.heading}
          headingId={smsTerms.id}
          blocks={smsTerms.blocks}
          sections={[]}
        />

        {/* The privacy policy closes the page, ahead of the call to action that
            ends every page on the site. Its own heading carries
            id="privacy-policy", so /service-agreement#privacy-policy is a
            direct link for anyone reviewing it. */}
        <PolicySections
          heading={privacyPolicy.heading}
          headingId={privacyPolicy.id}
          note={privacyPolicy.effective}
          intro={privacyPolicy.intro}
          sections={privacyPolicy.sections}
          level={3}
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
