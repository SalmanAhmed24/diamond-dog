import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/site'

/**
 * Every indexable page, with the date its main content last changed.
 *
 * This list is explicit on purpose. It used to be scraped from the footer,
 * which pulled in a /blog that didn't exist and a #privacy-policy fragment that
 * can never be indexed as a page of its own, and it stamped every URL with the
 * build time, so Google saw one identical lastmod on every entry and learned
 * to ignore it.
 *
 * When you change a page's own content, update its date here. Changes to the
 * shared header or footer don't count; they aren't that page's content. Don't
 * replace these with `new Date()` or file timestamps: Vercel checks the repo out
 * fresh on every deploy, so file times always read as "now".
 *
 * `scripts/check-seo.mjs` runs after every build and fails it if this list and
 * the real pages drift apart in either direction.
 */
const pages: { path: string; lastModified: string }[] = [
  { path: '/', lastModified: '2026-11-24' },
  { path: '/services', lastModified: '2026-11-24' },
  { path: '/services/de-shedding-treatment', lastModified: '2026-11-24' },
  { path: '/services/full-groom', lastModified: '2026-11-24' },
  { path: '/services/bath', lastModified: '2026-11-24' },
  { path: '/services/sanitary-groom', lastModified: '2026-10-18' },
  { path: '/services/cat-grooming', lastModified: '2026-11-24' },
  { path: '/services/add-ons', lastModified: '2026-10-07' },
  { path: '/book', lastModified: '2026-10-07' },
  { path: '/about', lastModified: '2026-11-24' },
  { path: '/contact', lastModified: '2026-10-14' },
  { path: '/faq', lastModified: '2026-11-24' },
  { path: '/glow-up-gallery', lastModified: '2026-10-19' },
  { path: '/wellness', lastModified: '2026-10-07' },
  { path: '/anxious-and-senior-dogs', lastModified: '2026-11-24' },
  { path: '/vaccine-requirements', lastModified: '2026-11-24' },
  { path: '/service-agreement', lastModified: '2026-11-24' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, lastModified }) => ({
    // The home page is the bare origin, matching its canonical exactly.
    url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === '/' || path === '/book' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === '/book' ? 0.9 : path.startsWith('/services') ? 0.8 : 0.6,
  }))
}
