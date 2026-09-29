'use client'

import { LazyMotion, domAnimation } from 'framer-motion'

/**
 * Framer Motion ships ~34kB if you import `motion` directly. `LazyMotion` with the
 * `domAnimation` feature set and the lightweight `m` components brings that down to
 * roughly 6kB of runtime plus 15kB of features — which is what keeps the JS budget
 * inside Lighthouse's green band.
 *
 * `strict` throws in development if a component imports `motion` instead of `m`,
 * so the saving can't silently regress later.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
