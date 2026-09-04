# The Diamond Dog — landing page

A Next.js build of the `diamond-dog-landing-page` frame. All copy, photography and
layout proportions come from the design file.

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
| Phone number | `phone.number` | `null`. The design says "Phone number pending GBP", so every Call / Text control falls back to `/contact`. Set an E.164 number (`'+15155550142'`) and they become real `tel:` links automatically |
| Booking link | `BOOKING_URL` | `/book`. Point at the real scheduler; service cards append `?service=<slug>` |
| Map coordinates | `business.geo` | Approximate centre of Urbandale — replace with the salon's exact position |
| Social profiles | `social` | Placeholder Facebook / Instagram / X URLs |

The nav and footer link to routes that don't exist yet (`/services`, `/about`, `/faq`
and so on). Add those pages, or trim the arrays in `lib/site.ts` — the sitemap is
generated from the same data, so it stays in sync either way.

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
public/images/     photography extracted from the design
```

Styling is CSS Modules plus a token layer in `globals.css`. No CSS framework, so
there's no utility-class build step and nothing to purge.

---

## Design tokens

Sampled from the design file rather than eyeballed:

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#0B0B0B` | announcement bar, CTA band, footer |
| `--cream` | `#FBF8F3` | services section |
| `--mist` | `#EAF3F4` | wellness band |
| `--teal` | `#17808F` | fills, script word, diamond marks |
| `--teal-ink` | `#12707E` | teal *text* on light surfaces |
| `--rule` | `#E7E3DD` | hairlines |

**Why two teals.** The design's `#17808F` on the cream background measures 4.38:1,
just under the WCAG AA threshold of 4.5:1. Eyebrow labels and the wellness note use
the slightly darker `#12707E` (5.44:1) instead; fills and white-on-teal buttons keep
the original. The difference is invisible side by side and it's the difference
between passing and failing the accessibility audit.

Type is Playfair Display (display), Hanken Grotesk (body) and Great Vibes (the script
word), matched to the design's letterforms — the PDF embeds unnamed Type 3 subsets,
so these are close visual equivalents rather than confirmed originals. Swap them in
`app/layout.tsx` if the brand has licensed faces. The stats row uses old-style
figures via `font-variant-numeric`, as in the design.

---

## Performance notes

Two decisions do most of the work, and both are easy to undo by accident:

**Nothing above the fold animates in.** Fading the `<h1>` from `opacity: 0` delays
Largest Contentful Paint by the length of the animation — it's the most common reason
a Framer Motion page lands in the 70s. The hero headline, image and buttons paint
immediately. The single load animation is a `clip-path` wipe on "Urbandale"
(`components/ScriptWord.tsx`) that writes it on like a signature; it's
compositor-only and the roman lines above it are painted before it starts.

**Framer Motion is loaded through `LazyMotion`.** Importing `motion` directly pulls
in ~34kB. `components/MotionProvider.tsx` uses `LazyMotion` with the `domAnimation`
feature set and the lightweight `m` components instead, roughly 21kB. It's wrapped in
`strict` mode, which throws in development if anyone imports `motion` again, so the
saving can't quietly regress.

Also in place:

- **Images** — static imports give Next intrinsic dimensions (no layout shift) and a
  generated blur placeholder. Sources were re-cropped to the design's framing and
  compressed to WebP: 440kB for all fourteen, down from 5.6MB in the PDF. Only the
  hero is `priority`; everything else is lazy. AVIF and WebP are negotiated per
  browser.
- **Fonts** — self-hosted by `next/font`, so no connection to Google's servers and no
  render-blocking stylesheet. Variable files, `display: swap`, automatic fallback
  metric matching to avoid shift on swap.
- **JavaScript** — server components throughout. Only the header, `Reveal` and
  `ScriptWord` are client components.
- **Scroll** — the header's stuck state uses an `IntersectionObserver` on a 1px
  sentinel rather than a scroll listener, so scrolling does no main-thread work.
- **Motion preferences** — `prefers-reduced-motion` is respected in both the CSS and
  the Framer Motion components; reveals render as plain elements.

Run `sharp` in production for image optimisation — Next 15 bundles it, but if you
deploy somewhere that strips optional deps, install it explicitly.

---

## SEO and accessibility

- Full metadata in `app/layout.tsx`: canonical, Open Graph, Twitter card, robots
  directives, `max-image-preview:large`.
- `LocalBusiness` JSON-LD in `app/page.tsx` with address, geo, service area, opening
  hours, founder and an `OfferCatalog` built from the same service data the page
  renders — the markup can't drift from the visible content. Validate with
  [Rich Results Test](https://search.google.com/test/rich-results).
- `robots.ts` and `sitemap.ts` generate from `lib/site.ts`.
- One `<h1>`, ordered headings, landmark elements, skip link, visible focus rings,
  `aria-label` on every icon-only control, and alt text written per photo.
- Escape closes the mobile drawer and the services dropdown; focus returns to the
  toggle on close; body scroll is locked without a layout shift.

---

## Verify before shipping

The project was written without a package install available, so run these once
locally:

```bash
npm run build     # type-check and compile
npx serve@latest  # or npm start, then run Lighthouse against the production build
```

Lighthouse against `next dev` will always look bad — dev mode is unminified and
unoptimised. Test `npm run build && npm start`.
