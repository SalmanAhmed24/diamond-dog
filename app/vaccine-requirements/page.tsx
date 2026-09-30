import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { PageHero } from '@/components/PageHero'
import { PolicySections } from '@/components/PolicySections'
import { Faq } from '@/components/Faq'
import { ResourceLinks } from '@/components/ResourceLinks'
import { FinalCta } from '@/components/FinalCta'
import { SiteFooter } from '@/components/SiteFooter'

import { SITE_URL, faqPage, faqsById, vaccineRequirements } from '@/lib/site'
import { contactCtaBackdrop } from '@/lib/images'

const title = 'Vaccine Requirements'
const description =
  'Only distemper/parvo and rabies are required before grooming at The Diamond Dog in Urbandale, Iowa. Why Bordetella is not required, when puppies can start, and how to send your records.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/vaccine-requirements' },
  openGraph: { title, description, url: `${SITE_URL}/vaccine-requirements` },
  twitter: { title, description },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/vaccine-requirements#page`,
      url: `${SITE_URL}/vaccine-requirements`,
      name: title,
      description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#business` },
      // The four policy sections, so each is addressable in search.
      hasPart: vaccineRequirements.sections.map((section) => ({
        '@type': 'WebPageElement',
        '@id': `${SITE_URL}/vaccine-requirements#${section.id}`,
        name: section.heading,
        text: section.body,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: vaccineRequirements.breadcrumb.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.label,
        item: `${SITE_URL}${crumb.href === '/' ? '' : crumb.href}`,
      })),
    },
  ],
}

export default function VaccineRequirementsPage() {
  // Reused verbatim from the FAQ page rather than restated, so the two can
  // never drift. FAQPage markup stays on /faq only.
  const faqItems = faqsById(vaccineRequirements.faq.itemIds)

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
      <Breadcrumbs trail={vaccineRequirements.breadcrumb} />

      <main id="main">
        <PageHero
          heading={vaccineRequirements.heading}
          headingId="vaccine-requirements-heading"
          callLabel={vaccineRequirements.callLabel}
        />

        <PolicySections sections={vaccineRequirements.sections} />

        <Faq
          heading={vaccineRequirements.faq.heading}
          eyebrow={vaccineRequirements.faq.eyebrow}
          items={faqItems}
          headingId="vaccine-faq-heading"
        />

        <ResourceLinks
          eyebrow={faqPage.resources.eyebrow}
          heading={faqPage.resources.heading}
          items={faqPage.resources.items}
        />

        <FinalCta
          heading={vaccineRequirements.cta.heading}
          body={vaccineRequirements.cta.body}
          callLabel={vaccineRequirements.cta.callLabel}
          backdrop={contactCtaBackdrop}
        />
      </main>

      <SiteFooter />
    </>
  )
}
