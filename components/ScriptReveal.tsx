'use client'

import { m } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * The page's one flourish: Kaylie's signature is written on, left to right, when
 * it scrolls into view. It animates `clip-path` only, so it stays on the
 * compositor and never triggers layout.
 *
 * The negative bottom inset keeps the script's long descenders out of the clip.
 * Reduced motion is handled in globals.css via `data-script-wipe`, not by
 * branching on `useReducedMotion` — that hook reports false during SSR and the
 * real value on the client's first render, which would cause a hydration
 * mismatch. An author `!important` rule also beats the inline styles Framer
 * writes each frame, which a plain stylesheet rule would not.
 */
export function ScriptReveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.span
      className={className}
      data-script-wipe=""
      initial={{ clipPath: 'inset(0 100% -30% 0)' }}
      whileInView={{ clipPath: 'inset(0 0% -30% 0)' }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1.1, ease: [0.33, 0.15, 0.2, 1] }}
    >
      {children}
    </m.span>
  )
}
