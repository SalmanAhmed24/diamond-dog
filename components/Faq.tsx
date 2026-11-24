'use client'

import Link from 'next/link'
import { m } from 'framer-motion'
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

                {/* Every answer is always in the HTML; closed ones are collapsed,
                    not unmounted. Mounting only the open panel meant the server
                    sent one answer per list, so search engines saw questions
                    with no answers, and /faq's FAQPage markup described text the
                    page didn't contain. `inert` keeps a closed answer and its
                    "Read more" link out of the tab order and away from screen
                    readers, which is what unmounting used to do for free.
                    initial={false} renders each panel straight into its state
                    on first paint, so nothing animates on load. */}
                <m.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={styles.panel}
                  inert={!isOpen}
                  initial={false}
                  animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
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
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
