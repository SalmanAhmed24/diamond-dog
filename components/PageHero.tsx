import { BOOKING_URL, callHref } from '@/lib/site'
import styles from './PageHero.module.css'

type PageHeroProps = {
  heading: string
  headingId: string
  body?: string
  callLabel?: string
  align?: 'left' | 'center'
}

/**
 * The plain heading-plus-buttons hero shared by /faq, /glow-up-gallery and
 * /service-agreement. Only the alignment and whether there is a body paragraph
 * differ between the three designs.
 */
export function PageHero({
  heading,
  headingId,
  body,
  callLabel = 'Call or text',
  align = 'left',
}: PageHeroProps) {
  return (
    <section
      className={`${styles.hero} ${align === 'center' ? styles.center : ''}`}
      aria-labelledby={headingId}
    >
      <div className="container">
        {/* Painted immediately, never faded in — this is the LCP text block. */}
        <h1 id={headingId} className={styles.headline}>
          {heading}
        </h1>

        {body && <p className={styles.body}>{body}</p>}

        <div className={styles.actions}>
          <a href={BOOKING_URL} className="btn btn--teal">
            Book now
          </a>
          <a href={callHref} className="btn btn--outline">
            {callLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
