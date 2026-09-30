'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import styles from './SignatureReveal.module.css'

/**
 * Signs Kaylie's name on when it scrolls into view, once.
 *
 * Deliberately a CSS animation driven by an IntersectionObserver rather than a
 * Framer `whileInView` on `clip-path`. The difference matters: Framer writes its
 * `initial` state into the server-rendered markup, so the signature shipped
 * fully clipped and depended on the animation firing to ever become visible. If
 * anything stopped that animation from running, the signature was simply gone.
 *
 * Here the default state is visible. The observer only ever *adds* the
 * animation class, so the worst case is no animation rather than no signature.
 */
export function SignatureReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [signed, setSigned] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSigned(true)
          observer.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <span
      ref={ref}
      className={`${styles.mark} ${signed ? styles.signing : ''} ${className ?? ''}`}
    >
      {children}
    </span>
  )
}
