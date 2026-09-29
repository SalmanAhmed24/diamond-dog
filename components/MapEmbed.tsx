'use client'

import { useEffect, useRef, useState } from 'react'

import { map } from '@/lib/site'
import styles from './MapEmbed.module.css'

/**
 * A real, interactive Google map — but mounted only once it is close to the
 * viewport.
 *
 * Loading a Maps iframe eagerly pulls roughly a megabyte of third-party
 * JavaScript into the critical path and is usually the single biggest drag on a
 * Lighthouse performance score. Because this sits well below the fold, an
 * IntersectionObserver with a generous rootMargin means it is never fetched
 * during a cold page load or an audit, yet it is already there by the time
 * anyone scrolls to it. The placeholder holds the exact same box, so swapping
 * one for the other shifts nothing.
 */
export function MapEmbed() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const holderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = holderRef.current
    if (!el) return

    // No observer support: just load it.
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={holderRef} className={styles.holder}>
      {shouldLoad ? (
        <iframe
          src={map.embedUrl}
          title={map.title}
          className={styles.frame}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className={styles.placeholder} aria-hidden="true" />
      )}

      {/* Always present, so the location is reachable without JavaScript and
          for anyone who would rather open the map properly. */}
      <a
        className={styles.openLink}
        href={map.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in Google Maps
      </a>
    </div>
  )
}
