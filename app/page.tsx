import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'
import { Hero } from '@/components/Hero'
import { Philosophy } from '@/components/Philosophy'
import { Services } from '@/components/Services'
import { WhyChooseMe } from '@/components/WhyChooseMe'
import { Gallery } from '@/components/Gallery'
import { Wellness } from '@/components/Wellness'
import { FinalCta } from '@/components/FinalCta'
import { SiteFooter } from '@/components/SiteFooter'

import { SITE_URL, business, phone, seo, services, social } from '@/lib/site'

export const metadata: Metadata = {
  title: seo.titleFull,
  description: seo.description,
  alternates: { canonical: '/' },
}

export default function HomePage() {
  const allServices = [services.featured, ...services.items, services.addOns]

  /**
   * LocalBusiness is the schema Google uses for the local pack and rich results.
   * The service catalogue, opening hours and service area all come from lib/site.ts,
   * so the markup can never drift from what is rendered on the page.
   */
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#business`,
        name: business.name,
        legalName: business.legalName,
        description: seo.description,
        url: SITE_URL,
        image: `${SITE_URL}/images/og-cover.jpg`,
        logo: `${SITE_URL}/images/logo-the-diamond-dog.svg`,
        priceRange: business.priceRange,
        telephone: phone.number,
        address: {
          '@type': 'PostalAddress',
          addressLocality: business.city,
          addressRegion: business.region,
          addressCountry: business.country,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: business.geo.latitude,
          longitude: business.geo.longitude,
        },
        areaServed: business.areaServed.map((name) => ({
          '@type': 'City',
          name,
          addressRegion: business.region,
        })),
        openingHoursSpecification: business.hours.map((slot) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: slot.days,
          opens: slot.opens,
          closes: slot.closes,
        })),
        founder: {
          '@type': 'Person',
          name: business.owner,
          jobTitle: business.ownerRole,
        },
        sameAs: social.map((item) => item.href),
        knowsAbout: ['Dog grooming', 'De-shedding treatments', 'Cat grooming', 'Coat and skin health'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Grooming services',
          itemListElement: allServices.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.title,
              description: service.description,
              serviceType: service.title,
              url: `${SITE_URL}/services/${service.slug}`,
              provider: { '@id': `${SITE_URL}/#business` },
              areaServed: business.areaServed.join(', '),
            },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: business.name,
        description: seo.description,
        publisher: { '@id': `${SITE_URL}/#business` },
        inLanguage: 'en-US',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        // Structured data is a static object defined above, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <a className="skipLink" href="#main">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <Hero />
        <Philosophy />
        <Services />
        <WhyChooseMe />
        <Gallery />
        <Wellness />
        <FinalCta />
      </main>

      <SiteFooter />
    </>
  )
}
