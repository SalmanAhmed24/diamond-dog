'use client'

import { m } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'
import { EASE } from '@/lib/motion'

type RevealProps = {
  children: ReactNode
  /** Stagger index — each step adds 70ms. Keep the range small (0–4). */
  delayStep?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article'
}

/**
 * One restrained entrance, reused everywhere below the fold: 10px rise + fade.
 * `once: true` disconnects the observer after it fires, so there is no ongoing
 * scroll work. Nothing above the fold uses this — animating the hero from
 * opacity 0 would push back Largest Contentful Paint.
 *
 * Reduced motion is handled by an `!important` rule in globals.css keyed off
 * `data-reveal`, not by branching on `useReducedMotion` here. Framer's hook
 * reports false during SSR and the real value on the client's first render, so
 * branching on it produces a hydration mismatch. An author `!important` rule
 * also beats the inline styles Framer writes each frame, which a plain
 * stylesheet rule would not.
 */
export function Reveal({ children, delayStep = 0, className, as = 'div' }: RevealProps) {
  const Component = m[as] as ElementType

  return (
    <Component
      className={className}
      data-reveal=""
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -60px 0px' }}
      transition={{
        duration: 0.5,
        delay: delayStep * 0.07,
        ease: EASE,
      }}
    >
      {children}
    </Component>
  )
}
