import type { MetadataRoute } from 'next'

import { SITE_URL, footerColumns, services } from '@/lib/site'

/**
 * Built from the same nav data the page renders, so new pages appear here
 * automatically once they are added to lib/site.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const servicePaths = [services.featured, ...services.items, services.addOns].map(
    (service) => `/services/${service.slug}`,
  )

  const contentPaths = footerColumns
    .flatMap((column) => column.links.map((link) => link.href))
    .filter((href) => href.startsWith('/') && !href.startsWith('/services/') && href !== '/book')

  const paths = Array.from(new Set(['/', '/services', ...servicePaths, ...contentPaths]))

  return paths.map((path) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/services') ? 0.8 : 0.6,
  }))
}
