import { Reveal } from './Reveal'
import { Diamond, Mark } from './icons'
import styles from './FeatureGrid.module.css'

export type Feature = {
  icon: string
  title: string
  description: string
}

/**
 * Informational cells, not links — which is why this isn't `ResourceLinks`.
 * Hairlines come from the 1px grid gap over a rule-coloured panel, the same
 * technique used by the services mosaic and the resources band.
 */
export function FeatureGrid({
  eyebrow,
  heading,
  headingId,
  items,
}: {
  eyebrow: string
  heading: string
  headingId: string
  items: Feature[]
}) {
  return (
    <section className={`section ${styles.section}`} aria-labelledby={headingId}>
      <div className="container">
        <Reveal className={styles.head}>
          <p className="eyebrow">
            <Diamond aria-hidden="true" />
            {eyebrow}
          </p>
          <h2 id={headingId} className={`sectionTitle ${styles.heading}`}>
            {heading}
          </h2>
        </Reveal>

        <Reveal>
          <ul className={styles.grid}>
            {items.map((item) => (
              <li key={item.title} className={styles.cell}>
                <span className={styles.icon}>
                  <Mark name={item.icon} size={24} />
                </span>
                <h3 className={`serif ${styles.title}`}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
