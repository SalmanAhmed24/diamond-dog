'use client'

import { useEffect, useRef } from 'react'

import { trackEvent } from '@/lib/analytics'
import { BOOKING_EMBED_URL } from '@/lib/site'

/**
 * The MoeGo origin, used to reject messages from anywhere else. `null` when the
 * embed URL is unset or unparseable, in which case the message listener below
 * never attaches — there is no origin to trust.
 */
const bookingOrigin = (() => {
  if (!BOOKING_EMBED_URL) return null
  try {
    return new URL(BOOKING_EMBED_URL).origin
  } catch {
    return null
  }
})()

/**
 * MoeGo publishes no documented postMessage contract, so this matches on what
 * a completion message would plausibly be called. It is deliberately narrow,
 * and it only ever runs on messages that already passed the origin check.
 */
const COMPLETION = /book(ing)?[_\- ]?(complete|completed|success|confirmed)|appointment[_\- ]?(booked|created|confirmed|complete)|payment[_\- ]?success/i

/**
 * Analytics for the booking scheduler.
 *
 * Two things are reported, and they are not equally solid:
 *
 * - `booking_embed_view` fires once when the scheduler actually comes into
 *   view. This is reliable, and it is the denominator worth having: how many
 *   people reached the booking step at all.
 *
 * - `booking_completed` fires if MoeGo posts a message that reads like a
 *   completion. The scheduler is a cross-origin iframe, so nothing inside it
 *   can be observed directly — no URL, no DOM, no form submit. If MoeGo sends
 *   nothing, this never fires, and no amount of code here changes that. The
 *   dependable alternative is a MoeGo redirect to a thank-you URL on this site,
 *   which would be a plain pageview conversion.
 *
 * To find out which it is: open /book in development and complete a test
 * booking. Every message MoeGo posts is logged to the console below.
 */
export function BookingEvents({ frameId }: { frameId: string }) {
  const reported = useRef({ view: false, completed: false })

  useEffect(() => {
    const frame = document.getElementById(frameId)
    if (!frame) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || reported.current.view) continue
          reported.current.view = true
          trackEvent('booking_embed_view', { page_path: window.location.pathname })
          observer.disconnect()
        }
      },
      // A third of the scheduler on screen means it was reached, not skimmed
      // past on the way to the footer.
      { threshold: 0.33 },
    )

    observer.observe(frame)
    return () => observer.disconnect()
  }, [frameId])

  useEffect(() => {
    if (!bookingOrigin) return

    function handleMessage(event: MessageEvent) {
      if (event.origin !== bookingOrigin) return

      if (process.env.NODE_ENV === 'development') {
        // The breadcrumb that turns the guess above into a known contract.
        console.info('[booking] message from MoeGo:', event.data)
      }

      let payload = ''
      try {
        payload = typeof event.data === 'string' ? event.data : JSON.stringify(event.data)
      } catch {
        return
      }

      if (!COMPLETION.test(payload) || reported.current.completed) return
      reported.current.completed = true
      trackEvent('booking_completed', { method: 'moego_embed' })
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return null
}
