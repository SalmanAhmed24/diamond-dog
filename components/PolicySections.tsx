import { Reveal } from './Reveal'
import styles from './PolicySections.module.css'

export type PolicySection = {
  id: string
  heading: string
  body: string
}

/**
 * Stacked, ranged-left sections divided by full-bleed hairlines. The rule sits
 * on the outer block so it runs edge to edge, while the copy stays inside the
 * container — which is what the design shows.
 */
export function PolicySections({ sections }: { sections: PolicySection[] }) {
  return (
    <section className={styles.section}>
      {sections.map((item) => (
        <div key={item.id} className={styles.item}>
          <Reveal className="container">
            <h2 id={item.id} className={`serif ${styles.heading}`}>
              {item.heading}
            </h2>
            <p className={styles.body}>{item.body}</p>
          </Reveal>
        </div>
      ))}
    </section>
  )
}
