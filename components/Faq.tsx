'use client'

import Link from 'next/link'
import { AnimatePresence, m } from 'framer-motion'
import { useId, useState } from 'react'

import { ArrowRight, Diamond } from './icons'
import styles from './Faq.module.css'
import { EASE } from '@/lib/motion'

export type FaqItem = {
  question: string
  answer: string
  /** Optional "Read more" target; the FAQ page uses these, /about doesn't. */
  readMoreHref?: string
}

type FaqProps = {
  heading: string
  items: FaqItem[]
  eyebrow?: string
  /** /about sits on sand; the FAQ page keeps the page's cream. */
  surface?: 'sand' | 'cream'
  headingId?: string
}

export function Faq({
  heading,
  items,
  eyebrow,
  surface = 'sand',
  headingId = 'faq-heading',
}: FaqProps) {
  // The designs show the first answer open on load.
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const baseId = useId()

  return (
    <section
      className={`section ${styles.section} ${surface === 'cream' ? styles.sectionCream : ''}`}
      aria-labelledby={headingId}
    >
      <div className="container">
        {eyebrow && (
          <p className="eyebrow">
            <Diamond aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h2 id={headingId} className={`sectionTitle ${styles.heading}`}>
          {heading}
        </h2>

        <ul className={styles.list}>
          {items.map((item, index) => {
            const isOpen = openIndex === index
            const panelId = `${baseId}-panel-${index}`
            const buttonId = `${baseId}-button-${index}`

            return (
              <li key={item.question} className={styles.item}>
                <h3 className={styles.questionWrap}>
                  <button
                    type="button"
                    id={buttonId}
                    className={styles.question}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className="serif">{item.question}</span>
                    {/* A rotating bar doubles as the minus, so both states
                        share one element and animate between them. */}
                    <span className={styles.toggle} aria-hidden="true">
                      <span className={styles.toggleBar} />
                      <span
                        className={`${styles.toggleBar} ${styles.toggleBarV} ${
                          isOpen ? styles.toggleBarOpen : ''
                        }`}
                      />
                    </span>
                  </button>
                </h3>

                {/* initial={false} stops every panel animating on first paint. */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={styles.panel}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.28, ease: EASE },
                        opacity: { duration: 0.2 },
                      }}
                    >
                      <div className={styles.panelInner}>
                        <p className={styles.answer}>{item.answer}</p>
                        {item.readMoreHref && (
                          <Link href={item.readMoreHref} className={`arrowLink ${styles.readMore}`}>
                            Read more
                            <ArrowRight />
                          </Link>
                        )}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
