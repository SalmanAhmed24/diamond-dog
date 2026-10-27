'use client'

import { useEffect } from 'react'

import { trackEvent } from '@/lib/analytics'

/**
 * Click-to-call and click-to-text, reported from one delegated listener on the
 * document rather than an onClick on each button.
 *
 * There are seventeen `tel:` links across the site — in the header drawer, the
 * footer, every hero, every price table, every final CTA — and more arrive with
 * each new service page. Wiring a handler into each one guarantees that the
 * eighteenth is missed. Listening once, in the capture phase, catches every
 * link that exists now and every link added later, including any inside a
 * component that stops propagation on its own clicks.
 */
export function AnalyticsEvents() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target
      if (!(target instanceof Element)) return

      const link = target.closest('a[href^="tel:"], a[href^="sms:"]')
      if (!(link instanceof HTMLAnchorElement)) return

      const href = link.getAttribute('href') ?? ''

      trackEvent(href.startsWith('sms:') ? 'click_to_text' : 'click_to_call', {
        link_url: href,
        // Which button was tapped matters more than the number itself: it is
        // the difference between the header CTA and the footer working.
        link_text: link.textContent?.trim().slice(0, 100) ?? '',
        page_path: window.location.pathname,
      })
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [])

  return null
}
