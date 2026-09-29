import Link from 'next/link'

import { Reveal } from './Reveal'
import { Diamond, Mark } from './icons'
import styles from './ResourceLinks.module.css'

export type ResourceItem = {
  icon: string
  title: string
  href: string
  description?: string
}

type ResourceLinksProps = {
  heading: string
  items: ResourceItem[]
  /** Optional teal eyebrow above the heading — the FAQ page uses one. */
  eyebrow?: string
}

/** Shared by /book, /contact and /faq, which each pass their own items. */
export function ResourceLinks({ heading, items, eyebrow }: ResourceLinksProps) {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="resources-heading">
      <div className="container">
        <Reveal className={styles.head}>
          {eyebrow && (
            <p className="eyebrow">
              <Diamond aria-hidden="true" />
              {eyebrow}
            </p>
          )}
          <h2 id="resources-heading" className={`sectionTitle ${styles.heading}`}>
            {heading}
          </h2>
        </Reveal>

        <Reveal>
          {/* Hairlines come from the 1px grid gap over a rule-coloured panel,
              the same trick the services mosaic uses on the home page. */}
          <ul className={styles.grid}>
            {items.map((item) => (
              <li key={item.title} className={styles.cell}>
                <Link href={item.href} className={styles.link}>
                  <span className={styles.icon}>
                    <Mark name={item.icon} size={22} />
                  </span>
                  <span className={`serif ${styles.title}`}>{item.title}</span>
                  {item.description && (
                    <span className={styles.description}>{item.description}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
