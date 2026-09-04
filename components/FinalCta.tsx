import { Reveal } from './Reveal'
import { BOOKING_URL, callHref, finalCta } from '@/lib/site'
import styles from './FinalCta.module.css'

export function FinalCta() {
  return (
    <section className={styles.section} aria-labelledby="cta-heading">
      <div className="container">
        <Reveal className={styles.inner}>
          <h2 id="cta-heading" className={`serif ${styles.heading}`}>
            {finalCta.heading}
          </h2>
          <p className={styles.body}>{finalCta.body}</p>

          <div className={styles.actions}>
            <a href={BOOKING_URL} className="btn btn--teal">
              Book now
            </a>
            <a href={callHref} className="btn btn--onDark">
              Call / Text
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
