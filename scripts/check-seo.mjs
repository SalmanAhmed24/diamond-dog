#!/usr/bin/env node
/**
 * Post-build SEO guard. Runs after `next build` (see "build" in package.json)
 * and fails the build — so Vercel refuses the deploy — if any of these slip:
 *
 *   - a page's canonical isn't its own absolute URL on SITE_URL
 *   - og:url disagrees with the canonical
 *   - the old domain appears anywhere in a page
 *   - a JSON-LD @id points off SITE_URL
 *   - a page is noindex
 *   - an accordion's button points at an answer panel the server didn't render
 *   - FAQPage structured data claims an answer the visible page doesn't show
 *   - the sitemap lists a fragment, a query string, an off-site URL, a URL with
 *     no page behind it, or a build timestamp instead of a real date
 *   - a real page is missing from the sitemap
 *   - robots.txt stops pointing at the sitemap
 *
 * It reads the prerendered HTML Next writes to .next/server/app, so it checks
 * exactly what will be served. No dependencies.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const ROOT = process.cwd()
const APP = join(ROOT, '.next', 'server', 'app')

/** Domains this site must never reference. Add to it if the site ever moves again. */
const RETIRED_DOMAINS = ['thediamonddog.com']

// The one place the site URL is written is lib/site.ts; read it from there.
const siteSource = readFileSync(join(ROOT, 'lib', 'site.ts'), 'utf8')
const siteMatch = siteSource.match(/export const SITE_URL\s*=\s*'([^']+)'/)
if (!siteMatch) fail(['Could not find SITE_URL in lib/site.ts'])
const SITE_URL = siteMatch[1].replace(/\/$/, '')

const problems = []
const report = []

function fail(list) {
  console.error('\nSEO check FAILED:\n' + list.map((p) => '  - ' + p).join('\n') + '\n')
  process.exit(1)
}

if (!existsSync(APP)) fail([`No build output at ${APP}. Run next build first.`])

/* ---------- Collect prerendered pages ---------- */

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })
}

const pageFiles = walk(APP).filter((file) => {
  if (!file.endsWith('.html')) return false
  // _not-found, _global-error and similar are Next internals, not pages.
  return !relative(APP, file).split(sep).some((part) => part.startsWith('_'))
})

const pathOf = (file) => {
  const rel = relative(APP, file).split(sep).join('/').replace(/\.html$/, '')
  return rel === 'index' ? '/' : `/${rel}`
}
const urlOf = (path) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`)

const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')

const squash = (s) => s.replace(/\s+/g, ' ').trim()

/* ---------- Per-page checks ---------- */

const pagePaths = new Set()

for (const file of pageFiles) {
  const path = pathOf(file)
  const expected = urlOf(path)
  pagePaths.add(path)

  const raw = readFileSync(file, 'utf8')
  // Next serialises the RSC payload into <script> tags; the visible page is the rest.
  const dom = raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ' ')
  const visibleText = squash(decode(dom.replace(/<[^>]+>/g, ' ')))

  const canonicals = [...raw.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map((m) => decode(m[1]))
  const ogUrl = raw.match(/<meta property="og:url" content="([^"]*)"/)
  const robots = raw.match(/<meta name="robots" content="([^"]*)"/)

  if (canonicals.length !== 1) {
    problems.push(`${path}: expected exactly one canonical, found ${canonicals.length}`)
  } else if (canonicals[0] !== expected) {
    problems.push(`${path}: canonical is ${canonicals[0]}, expected ${expected}`)
  }

  if (ogUrl && decode(ogUrl[1]) !== expected) {
    problems.push(`${path}: og:url is ${decode(ogUrl[1])}, expected ${expected}`)
  }

  if (robots && /noindex|nofollow/i.test(robots[1])) {
    problems.push(`${path}: robots meta is "${robots[1]}"`)
  }

  for (const domain of RETIRED_DOMAINS) {
    if (raw.includes(domain)) problems.push(`${path}: contains retired domain ${domain}`)
  }

  // Every FAQ button must control an answer panel that is actually in the HTML.
  // components/Faq.tsx names its panels "<id>-panel-<n>"; other aria-controls
  // targets (the nav submenu) aren't answer content.
  for (const [, id] of dom.matchAll(/aria-controls="([^"]+-panel-\d+)"/g)) {
    const panel = dom.match(new RegExp(`id="${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>([\\s\\S]*?)</div>\\s*</div>`))
    if (!panel || squash(decode(panel[1].replace(/<[^>]+>/g, ' '))).length < 10) {
      problems.push(`${path}: aria-controls="${id}" has no server-rendered content`)
    }
  }

  // Structured data: @ids stay on-site, and FAQ answers must be visible.
  let faqAnswers = 0
  for (const [, json] of raw.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let data
    try {
      data = JSON.parse(json)
    } catch {
      problems.push(`${path}: JSON-LD block does not parse`)
      continue
    }
    const visit = (node) => {
      if (Array.isArray(node)) return node.forEach(visit)
      if (!node || typeof node !== 'object') return
      if (typeof node['@id'] === 'string' && !node['@id'].startsWith(SITE_URL)) {
        problems.push(`${path}: JSON-LD @id ${node['@id']} is not on ${SITE_URL}`)
      }
      if (node['@type'] === 'Question' && node.acceptedAnswer?.text) {
        faqAnswers++
        if (!visibleText.includes(squash(node.acceptedAnswer.text))) {
          problems.push(`${path}: FAQPage answer to "${node.name}" is not in the visible HTML`)
        }
      }
      Object.values(node).forEach(visit)
    }
    visit(data)
  }

  report.push({
    path,
    canonical: canonicals[0] ?? '(none)',
    robots: robots ? robots[1] : '(default: index, follow)',
    faq: faqAnswers,
  })
}

/* ---------- Sitemap ---------- */

const sitemapFile = join(APP, 'sitemap.xml.body')
if (!existsSync(sitemapFile)) {
  problems.push('sitemap.xml was not generated')
} else {
  const xml = readFileSync(sitemapFile, 'utf8')
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, body]) => ({
    loc: decode(body.match(/<loc>([^<]*)<\/loc>/)?.[1] ?? ''),
    lastmod: body.match(/<lastmod>([^<]*)<\/lastmod>/)?.[1],
  }))
  const listed = new Set()

  for (const { loc, lastmod } of entries) {
    if (!loc.startsWith(SITE_URL)) problems.push(`sitemap: ${loc} is not on ${SITE_URL}`)
    if (/[#?]/.test(loc)) problems.push(`sitemap: ${loc} has a fragment or query string`)
    const path = loc.slice(SITE_URL.length) || '/'
    if (listed.has(path)) problems.push(`sitemap: ${loc} is listed twice`)
    listed.add(path)
    if (!pagePaths.has(path)) problems.push(`sitemap: ${loc} has no page behind it (would 404)`)
    if (lastmod !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) {
      problems.push(`sitemap: ${loc} lastmod "${lastmod}" looks like a build timestamp; use a plain date`)
    }
  }

  for (const path of pagePaths) {
    if (!listed.has(path)) problems.push(`sitemap: page ${path} is missing from app/sitemap.ts`)
  }
}

/* ---------- robots.txt ---------- */

const robotsFile = join(APP, 'robots.txt.body')
if (!existsSync(robotsFile) || !readFileSync(robotsFile, 'utf8').includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
  problems.push(`robots.txt does not point at ${SITE_URL}/sitemap.xml`)
}

/* ---------- Result ---------- */

if (problems.length) fail(problems)

console.log(`\nSEO check passed: ${report.length} pages, all canonicals self-referencing on ${SITE_URL}.`)
for (const row of report) {
  console.log(`  ${row.path.padEnd(34)} ${row.robots.padEnd(26)}${row.faq ? `  FAQPage answers visible: ${row.faq}` : ''}`)
}
