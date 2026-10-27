import Script from 'next/script'

import { GA_MEASUREMENT_ID, analyticsEnabled } from '@/lib/analytics'

/**
 * gtag.js, loaded the App Router way: `next/script` with `afterInteractive`, so
 * the tag is deferred until the page is usable rather than blocking the first
 * paint. A raw <script> in <head> is the Pages Router pattern and does not get
 * the same treatment here.
 *
 * Pageviews are left to the tag itself. `gtag('config', …)` sends the one for
 * the initial load, and GA4's Enhanced Measurement sends the rest off browser
 * history events, which is what the App Router's client-side navigation fires.
 * That is also exactly what Google's own `@next/third-parties` integration
 * relies on. Sending them from a route-change effect as well is what produces
 * the doubled pageviews seen in most of the guides on this.
 */
export function GoogleAnalytics() {
  if (!analyticsEnabled) return null

  const id = JSON.stringify(GA_MEASUREMENT_ID)

  return (
    <>
      <Script
        id="ga4-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', ${id});`}
      </Script>
    </>
  )
}
