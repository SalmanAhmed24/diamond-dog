'use client'

import { m } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * The one deliberate page-load animation: the place name is written on, left to
 * right, the way a signature is. It animates `clip-path` only, so it stays on the
 * compositor and never triggers layout, and the roman lines of the headline above
 * it paint immediately — LCP is unaffected.
 *
 * The negative bottom inset keeps the script's long descenders out of the clip.
 * Reduced motion is handled in globals.css via `data-script-wipe`.
 */
export function ScriptWord({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.span
      className={className}
      data-script-wipe=""
      initial={{ clipPath: 'inset(0 100% -25% 0)', opacity: 0.35 }}
      animate={{ clipPath: 'inset(0 0% -25% 0)', opacity: 1 }}
      transition={{
        clipPath: { duration: 1.05, delay: 0.2, ease: [0.33, 0.15, 0.2, 1] },
        opacity: { duration: 0.3, delay: 0.2 },
      }}
    >
      {children}
    </m.span>
  )
}
