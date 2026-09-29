import { BOOKING_URL, callHref, faqPage } from '@/lib/site'
import styles from './FaqHero.module.css'

export function FaqHero() {
  return (
    <section className={styles.hero} aria-labelledby="faq-page-heading">
      <div className="container">
        {/* Painted immediately, never faded in — this is the LCP text block. */}
        <h1 id="faq-page-heading" className={styles.headline}>
          {faqPage.hero.heading}
        </h1>

        <div className={styles.actions}>
          <a href={BOOKING_URL} className="btn btn--teal">
            Book now
          </a>
          <a href={callHref} className="btn btn--outline">
            {faqPage.hero.callLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
