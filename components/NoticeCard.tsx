import { Reveal } from './Reveal'
import { Mark } from './icons'
import styles from './NoticeCard.module.css'

/** A bordered aside for a boundary or caveat that shouldn't read as body copy. */
export function NoticeCard({
  heading,
  body,
  headingId,
}: {
  heading: string
  body: string
  headingId: string
}) {
  return (
    <section className={`section ${styles.section}`} aria-labelledby={headingId}>
      <div className="container">
        <Reveal className={styles.card}>
          <div className={styles.head}>
            <span className={styles.icon}>
              <Mark name="info" size={22} />
            </span>
            <h2 id={headingId} className={`serif ${styles.heading}`}>
              {heading}
            </h2>
          </div>
          <p className={styles.body}>{body}</p>
        </Reveal>
      </div>
    </section>
  )
}
