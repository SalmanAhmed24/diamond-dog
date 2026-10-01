import { Reveal } from './Reveal'
import styles from './ProseBand.module.css'

type ProseBandProps = {
  heading: string
  body: string
  headingId: string
  surface?: 'sand' | 'cream'
  /** /about sets its paragraph left; the policy pages centre theirs. */
  textAlign?: 'left' | 'center'
  /** The service pages range the whole block left rather than centring it. */
  align?: 'left' | 'center'
}

/** A single centred heading with one paragraph, on a sand or cream band. */
export function ProseBand({
  heading,
  body,
  headingId,
  surface = 'sand',
  textAlign = 'center',
  align = 'center',
}: ProseBandProps) {
  return (
    <section
      className={`section ${styles.section} ${surface === 'cream' ? styles.cream : ''}`}
      aria-labelledby={headingId}
    >
      <div className="container">
        <Reveal className={`${styles.inner} ${align === 'left' ? styles.alignLeft : ''}`}>
          <h2 id={headingId} className={`serif ${styles.heading}`}>
            {heading}
          </h2>
          <p className={`${styles.body} ${textAlign === 'left' ? styles.bodyLeft : ''}`}>{body}</p>
        </Reveal>
      </div>
    </section>
  )
}
