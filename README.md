# The Diamond Dog — landing page

A Next.js build of the `Home` design. All copy, photography and layout
proportions come from the design file; the logo is the supplied asset.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

Requires Node 18.18+.

---

## Fill these in before launch

Everything editable lives in **`lib/site.ts`** — no copy is hard-coded in components.

| What | Where | Current value |
| --- | --- | --- |
| Production domain | `SITE_URL` | `https://thediamonddog.com` — drives canonical URLs, OG tags, sitemap and JSON-LD |
| Booking link | `BOOKING_URL` | `/book` — the booking page. Service buttons append `?service=<slug>` |
| MoeGo embed | `BOOKING_EMBED_URL` | `null`. Until it is set, `/book` renders the design's placeholder panel; paste the MoeGo share URL and the real scheduler appears in its place with no code change |
| Map coordinates | `business.geo` | Approximate centre of Urbandale — replace with the salon's exact position |
| Social profiles | `social` | Placeholder Facebook / Instagram / X URLs |

The phone number (`515-315-5354`) is live throughout — every Call / Text control
is a real `tel:` link and it is in the structured data.

The nav and footer link to routes that don't exist yet (`/services`, `/about`,
`/faq` and so on). Add those pages, or trim the arrays in `lib/site.ts` — the
sitemap generates from the same data, so it stays in sync either way.

### One asset request

The supplied logo is **367 × 70**, which is roughly 1x density. It renders at
250px wide in the header (the design shows 367px) to keep it from looking soft on
retina screens. A 2x PNG or, better, an SVG export from Figma would let it sit at
the design's full size perfectly crisp — drop it in at
`public/images/logo-the-diamond-dog.png` and raise the `.brand img` width in
`components/SiteHeader.module.css`.

---

## Structure

```
app/
  layout.tsx       fonts, metadata, viewport
  page.tsx         section composition + LocalBusiness JSON-LD
  globals.css      design tokens, reset, buttons, shared utilities
  robots.ts        sitemap.ts        not-found.tsx
  icon.svg         apple-icon.png
components/        one component + one CSS module per section
lib/site.ts        all content and business data
lib/images.ts      static image imports
public/images/     photography from the design file
```

Styling is CSS Modules plus a token layer in `globals.css`. No CSS framework, so
there's no utility-class build step and nothing to purge.

---

## Design tokens

Sampled from the design file rather than eyeballed:

| Token | Value | Use |
| --- | --- | --- |
| `--cream` | `#FFF9EE` | page background, header, cards, gallery |
| `--sand` | `#F5EBD8` | services and wellness bands |
| `--navy` | `#16262C` | stat cards, hero experience badge |
| `--ink` | `#0B0B0B` | footer |
| `--teal` | `#17808F` | button fills |
| `--teal-ink` | `#12707E` | teal *text* on light surfaces |
| `--gold` | `#C2A26B` | eyebrow and figures on the dark band |
| `--radius` | `0px` | the design is square-cornered throughout |

**Why two teals.** Thirteen of the fourteen text/background pairs in this design
clear WCAG AA as drawn. The exception is the hero subhead: the design's `#17808F`
on cream measures **4.43:1**, just under the 4.5 threshold, and it doesn't qualify
for the large-text exemption (~20px at weight 500 at the small end of its clamp;
large text needs 24px regular or 18.7px bold). It uses `--teal-ink` instead at
**5.50:1**. The two are indistinguishable side by side, and the eyebrow labels on
the sand band use it for the same reason (4.87:1 rather than 4.38:1). Button fills
keep the original teal — white on `#17808F` measures 4.65:1 and passes.

The two photo-backed bands ("Why owners choose me" and the final CTA) use a fixed
colour scrim rather than a CSS filter on the image, so white text is legible
before the photo has decoded rather than only after.

Type is Playfair Display (display), Hanken Grotesk (body) and Great Vibes (the
signature), matched to the design's letterforms — the PDF embeds unnamed Type 3
subsets, so these are close visual equivalents rather than confirmed originals.
Swap them in `app/layout.tsx` if the brand has licensed faces. The stats, the hero
subhead and the badge use old-style figures via `font-variant-numeric`, as in the
design.

---

## Performance notes

Two decisions do most of the work, and both are easy to undo by accident:

**Nothing above the fold animates in.** Fading the `<h1>` from `opacity: 0` delays
Largest Contentful Paint by the length of the animation — it's the most common
reason a Framer Motion page lands in the 70s. The hero headline, image, badge and
buttons paint immediately. The page's one flourish is a `clip-path` wipe on
Kaylie's signature in the philosophy section (`components/ScriptReveal.tsx`),
triggered on scroll rather than load; it's compositor-only.

**Framer Motion is loaded through `LazyMotion`.** Importing `motion` directly pulls
in ~34kB. `components/MotionProvider.tsx` uses `LazyMotion` with the `domAnimation`
feature set and the lightweight `m` components instead, roughly 21kB. It's wrapped
in `strict` mode, which throws in development if anyone imports `motion` again, so
the saving can't quietly regress.

Also in place:

- **Images** — static imports give Next intrinsic dimensions (no layout shift) and
  a generated blur placeholder. Sources were re-cropped to the design's framing and
  compressed to WebP, with the two scrimmed backdrops compressed harder since they
  sit under a 64–72% overlay. Only the hero and logo are `priority`; everything
  else is lazy. AVIF and WebP are negotiated per browser, and Next resizes to the
  rendered width, so the 1400px hero source is delivered at a fraction of its file
  size on a typical viewport.
- **Fonts** — self-hosted by `next/font`, so no connection to Google's servers and
  no render-blocking stylesheet. Variable files, `display: swap`, automatic
  fallback metric matching to avoid shift on swap.
- **JavaScript** — server components throughout. Only the header, `Reveal` and
  `ScriptReveal` are client components.
- **Scroll** — the header's stuck state uses an `IntersectionObserver` on a 1px
  sentinel rather than a scroll listener, so scrolling does no main-thread work.
- **Motion preferences** — `prefers-reduced-motion` is respected in both the CSS
  and the Framer Motion components; reveals render as plain elements.

Run `sharp` in production for image optimisation — Next 15 bundles it, but if you
deploy somewhere that strips optional deps, install it explicitly.

---

## A note on the services mosaic

The services grid is flush — no gutters, hairlines between cells. Rather than give
every cell its own border (which double-draws at every shared edge and needs
per-position overrides), the grid uses `gap: 1px` over a rule-coloured background.
The gaps *are* the hairlines. Cells stay border-free, photos butt right to the
edge, and the featured cell spanning two columns needs no special casing.

---

## SEO and accessibility

- Full metadata in `app/layout.tsx`: canonical, Open Graph, Twitter card, robots
  directives, `max-image-preview:large`.
- `LocalBusiness` JSON-LD in `app/page.tsx` with address, geo, telephone, service
  area, opening hours, founder and an `OfferCatalog` built from the same service
  data the page renders — the markup can't drift from the visible content.
  Validate with [Rich Results Test](https://search.google.com/test/rich-results).
- `robots.ts` and `sitemap.ts` generate from `lib/site.ts`.
- One `<h1>`, ordered headings, landmark elements, skip link, visible focus rings,
  `aria-label` on every icon-only control, and alt text written per photo. The two
  decorative backdrops carry empty alt and `aria-hidden`.
- Escape closes the mobile drawer and the services dropdown; focus returns to the
  toggle on close; body scroll is locked without a layout shift.
- The stats use a `<dl>` with the label first in the DOM and `column-reverse` in
  CSS, so screen readers hear "Years of experience, 18+" while the figure still
  sits on top visually — no duplicated or hidden text.

---

## Pages

| Route | File | Notes |
| --- | --- | --- |
| `/` | `app/page.tsx` | LocalBusiness + WebSite JSON-LD |
| `/about` | `app/about/page.tsx` | AboutPage + Person + BreadcrumbList + FAQPage JSON-LD |
| `/book` | `app/book/page.tsx` | WebPage + ReserveAction + BreadcrumbList + ContactPoint JSON-LD |
| `/contact` | `app/contact/page.tsx` | ContactPage + BreadcrumbList + ContactPoint JSON-LD |
| `/faq` | `app/faq/page.tsx` | FAQPage + BreadcrumbList JSON-LD |

`BOOKING_URL` is `/book`, so every "Book now" across the site now lands on a real
page. On `/book` itself the button anchors to `#booking` instead of linking to
the page you are already on.

`FinalCta` is shared. It takes `heading`, `body`, `callLabel`, `backdrop` and
`backdropScrim`, defaulting to the home page's copy and photo, so a new page can
reuse it with its own backdrop in one line.

`Faq` and `ResourceLinks` are shared the same way, each taking its heading and
items as props:

- `Faq` is used by `/faq` (ten questions, each with a "Read more" link) and
  `/about` (two, no links). `surface` switches between the sand and cream
  backgrounds the two designs use.
- `ResourceLinks` is the "rest of what you might need" band on `/book`,
  `/contact` and `/faq`. The first two share `book.resources`; `/faq` passes its
  own list and an eyebrow.

**FAQPage markup lives only on `/faq`.** The two questions repeated on `/about`
are worded differently there, and marking both pages up would hand search
engines two different answers to the same question. `/about` renders its
accordion with no schema attached; `faqPage.items` is the single source for the
rich result.

Nav highlighting is route-aware via `usePathname`, so `aria-current="page"` lands
on the right item on every route.

### The map

`/contact` shows a real, interactive Google map, not a screenshot — but it is
mounted only when it comes close to the viewport.

Loading a Maps iframe eagerly pulls roughly a megabyte of third-party JavaScript
into the critical path, and it is normally the single biggest drag on a
Lighthouse performance score. `components/MapEmbed.tsx` uses an
`IntersectionObserver` with a 400px `rootMargin`, so the map is never fetched
during a cold load or an audit, yet it is already there by the time anyone
scrolls down to it. The placeholder occupies the identical box, so the swap
shifts nothing, and an "Open in Google Maps" link is always in the DOM for
anyone without JavaScript.

The design gives the studio only as "Urbandale, Iowa" with no street address, so
the map is centred on the town. `map.embedUrl` in `lib/site.ts` uses Google's
keyless embed endpoint — no API key, no billing account. To move to the official
Maps Embed API, swap in
`https://www.google.com/maps/embed/v1/place?key=YOUR_KEY&q=Urbandale,IA`.
Add a street address and the marker can be exact.

### The booking embed

`components/BookingEmbed.tsx` renders an iframe when `BOOKING_EMBED_URL` is set
and the design's placeholder panel when it isn't, so the page ships before the
embed URL exists. The panel and the iframe share a `min-height`, which means the
slot reserves its space either way and the sections below never jump when the
scheduler loads.

### Footer

The Book and Contact designs both show a revised footer, so the shared component
now matches them and all four pages pick the change up: phone and hours in the
brand block, social icons in bordered squares, Google in place of X, "Add-Ons &
Single Services" spelled out, and a copyright line in the meta row. Hours live in
`business.hours` with both a short `label` and a long `labelLong`, plus
`business.hoursSummary` for the single-line version.

### Scrim opacities

The three photo-backed bands use flat colour scrims rather than CSS filters, so
white text is legible before the image decodes. The opacities aren't guesses —
each was solved from the design render by dividing the composited band by the
source photo:

| Band | Measured | Built |
| --- | --- | --- |
| Home — "Why owners choose me" | 0.73 | 0.69 mid, 0.73 edges |
| Home — final CTA | 0.48 | 0.48 mid, 0.54 edges |
| About — final CTA | 0.63 | 0.60 mid, 0.65 edges |

Each is a flat layer plus a slight vertical gradient, so the middle matches the
design while the top and bottom edges sit marginally darker. One caveat worth
knowing: over the very brightest parts of a backdrop photo, white body copy at
these opacities lands near 3.7:1 rather than 4.5:1. That is true of the design
itself, and in practice the area behind the text is mid-tone in all three
photos. If you want a guaranteed pass, raise the flat layer by about 0.1.

---

## Verify before shipping

The project was written without a package install available, so run these once
locally:

```bash
npm run build     # type-check and compile
npm start         # then run Lighthouse against the production build
```

Lighthouse against `next dev` will always look bad — dev mode is unminified and
unoptimised. Test `npm run build && npm start`.
