import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { PageHero } from '@/components/PageHero'
import { Services } from '@/components/Services'
import { FinalCta } from '@/components/FinalCta'
import { SiteFooter } from '@/components/SiteFooter'

import { SITE_URL, business, services, servicesHub } from '@/lib/site'

const title = 'Dog Grooming Services in Urbandale, IA'
const description =
  'De-shedding, full grooms, baths, sanitary grooms, cat grooming and add-ons at The Diamond Dog in Urbandale, Iowa. Personally guided, with no kenneling.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/services' },
  openGraph: { title, description, url: `${SITE_URL}/services` },
  twitter: { title, description },
}

/**
 * The services hub. It was listed in the sitemap, linked from the nav, from
 * every service page's breadcrumb and from an FAQ answer, but never existed, so
 * all of those pointed at a 404. It renders the same service mosaic as the home
 * page, whose cards link through to each /services/<slug> page.
 */
export default function ServicesPage() {
  const allServices = [services.featured, ...services.items, services.addOns]

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/services#page`,
        url: `${SITE_URL}/services`,
        name: title,
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#business` },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: allServices.length,
          itemListElement: allServices.map((service, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Service',
              name: service.title,
              description: service.description,
              url: `${SITE_URL}/services/${service.slug}`,
              provider: { '@id': `${SITE_URL}/#business` },
              areaServed: business.areaServed.join(', '),
            },
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: servicesHub.breadcrumb.map((crumb, index) => ({
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
      <Breadcrumbs trail={servicesHub.breadcrumb} />

      <main id="main">
        <PageHero heading={servicesHub.heading} headingId="services-hub-heading" body={servicesHub.body} />

        <Services />

        <FinalCta />
      </main>

      <SiteFooter />
    </>
  )
}
