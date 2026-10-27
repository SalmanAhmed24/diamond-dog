/**
 * Google Analytics 4.
 *
 * The property is wired up in `components/GoogleAnalytics.tsx`, which injects
 * gtag.js from the root layout. Everything else here is the small typed surface
 * the rest of the site uses to report events.
 */

/**
 * The live property's Measurement ID. An environment variable wins when one is
 * set, so a staging property can be pointed at without a code change, but the
 * literal keeps the tag working on a deploy where nothing was configured —
 * which is the failure mode that silently loses a month of data.
 */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-YMRE9ZQCDY'

/**
 * Loaded everywhere except `next dev`, so a developer's own clicking never
 * reaches the property while preview deployments still report — which is what
 * makes it possible to confirm the tag in GA4 Realtime before going live.
 */
export const analyticsEnabled =
  process.env.NODE_ENV !== 'development' && Boolean(GA_MEASUREMENT_ID)

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * The events this site reports beyond pageviews. Keeping them in a union means
 * a typo becomes a build error rather than an event that quietly never shows up
 * in GA4.
 */
export type GaEventName =
  | 'click_to_call'
  | 'click_to_text'
  | 'booking_embed_view'
  | 'booking_completed'

export function trackEvent(
  name: GaEventName,
  params: Record<string, unknown> = {},
) {
  // gtag.js loads `afterInteractive`, so an early click can land before it is
  // ready. Dropping that one event is the right trade against queueing into a
  // dataLayer that may never be flushed.
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}
