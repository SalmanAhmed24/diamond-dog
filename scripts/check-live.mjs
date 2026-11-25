#!/usr/bin/env node
/**
 * Checks the LIVE site for the SEO fixes, bypassing caches.
 *
 *   node scripts/check-live.mjs                     (checks the production domain)
 *   node scripts/check-live.mjs https://<preview>   (checks a Vercel preview URL)
 *
 * Needs Node 18+. No dependencies. Exits 1 if anything fails.
 */
const BASE = (process.argv[2] || 'https://www.diamonddogpetgrooming.com').replace(/\/$/, '')
const SITE = 'https://www.diamonddogpetgrooming.com'
const SERVICES = ['de-shedding-treatment', 'full-groom', 'bath', 'sanitary-groom', 'cat-grooming', 'add-ons']

let failed = 0
const check = (ok, label) => {
  if (!ok) failed++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`)
}

async function get(path) {
  const res = await fetch(BASE + path, {
    headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache', 'User-Agent': 'diamond-dog-seo-check' },
    redirect: 'manual',
  })
  return { status: res.status, html: await res.text(), cache: res.headers.get('x-vercel-cache') }
}

const noScripts = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ' ')
const hrefs = (html) => [...noScripts(html).matchAll(/<a\b[^>]*?\shref="([^"]+)"/g)].map((m) => m[1])

const home = await get('/')
const header = noScripts(home.html).match(/<header\b[\s\S]*?<\/header>/)?.[0] ?? ''
const main = noScripts(home.html).match(/<main\b[\s\S]*?<\/main>/)?.[0] ?? ''
console.log(`Checking ${BASE}  (home page cache: ${home.cache ?? 'n/a'})\n`)

check(hrefs(header).includes('/services'), 'Nav contains <a href="/services">')
for (const slug of SERVICES) {
  check(hrefs(main).includes(`/services/${slug}`), `Home page cards link to /services/${slug}`)
}

const sitemap = await get('/sitemap.xml')
const urls = [...sitemap.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
check(sitemap.status === 200 && urls.length > 0, `sitemap.xml returns 200 with ${urls.length} URLs`)

let blogLinks = 0
for (const url of urls) {
  const path = url.slice(SITE.length) || '/'
  const page = await get(path)
  const canonical = page.html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
  const robots = page.html.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? 'index, follow'
  blogLinks += hrefs(page.html).filter((h) => h === '/blog' || h.startsWith('/blog/') || h.startsWith('/blog?')).length
  check(
    page.status === 200 && canonical === url && !/noindex|nofollow/.test(robots),
    `${path.padEnd(34)} ${page.status}  canonical=${canonical ?? '(none)'}  robots=${robots}`,
  )
}
check(blogLinks === 0, `No <a href="/blog"> on any sitemap page (found ${blogLinks})`)

const fullGroom = await get('/services/full-groom')
const text = noScripts(fullGroom.html).replace(/<[^>]+>/g, ' ').replace(/&#x27;|&#39;/g, "'").replace(/\s+/g, ' ')
check(
  text.includes('Most doodles do best with a full groom every 4 to 6 weeks'),
  '/services/full-groom has the doodle FAQ answer in its server HTML',
)

console.log(failed ? `\n${failed} check(s) FAILED` : '\nAll checks passed')
process.exit(failed ? 1 : 0)
