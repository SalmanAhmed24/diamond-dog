import { Reveal } from './Reveal'
import styles from './DetailPanel.module.css'

/* `readonly string[]`, not `string[]`: the address lines come from an `as const`
   object, so a mutable array type would reject them. */
export type DetailRow = { label: string; value: string | readonly string[]; href?: string }

/** Heading and copy on the left, a labelled detail list on the right. */
export function DetailPanel({
  heading,
  body,
  headingId,
  rows,
  surface = 'sand',
}: {
  heading: string
  body: string
  headingId: string
  rows: DetailRow[]
  surface?: 'cream' | 'sand'
}) {
  return (
    <section
      className={`section ${styles.section} ${surface === 'cream' ? styles.cream : ''}`}
      aria-labelledby={headingId}
    >
      <div className={`container ${styles.grid}`}>
        <Reveal>
          <h2 id={headingId} className={`sectionTitle ${styles.heading}`}>
            {heading}
          </h2>
          <p className={styles.body}>{body}</p>
        </Reveal>

        <Reveal delayStep={1}>
          <dl className={styles.list}>
            {rows.map((row) => (
              <div key={row.label} className={styles.row}>
                <dt className={styles.label}>{row.label}</dt>
                <dd className={styles.value}>
                  {row.href ? (
                    <a href={row.href} className={styles.link}>
                      {row.value}
                    </a>
                  ) : Array.isArray(row.value) ? (
                    row.value.map((line) => <span key={line}>{line}</span>)
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
