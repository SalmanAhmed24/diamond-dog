import { Mark } from './icons'
import { BOOKING_URL, business, callHref, contact, phone } from '@/lib/site'
import styles from './ContactHero.module.css'

export function ContactHero() {
  const { hero, details } = contact

  return (
    <section className={styles.hero} aria-labelledby="contact-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          {/* Painted immediately, never faded in — this is the LCP text block. */}
          <h1 id="contact-heading" className={styles.headline}>
            {hero.heading}
          </h1>
          <p className={styles.body}>{hero.body}</p>

          <div className={styles.actions}>
            <a href={BOOKING_URL} className="btn btn--teal">
              Book now
            </a>
            <a href={callHref} className="btn btn--outline">
              {contact.cta.callLabel}
            </a>
          </div>
        </div>

        <aside className={styles.card} aria-label="Contact details">
          <div className={styles.row}>
            <span className={styles.icon}>
              <Mark name="phone" size={20} />
            </span>
            <div>
              <p className={styles.label}>{details.phoneLabel}</p>
              <p className={`serif oldstyle ${styles.phone}`}>
                <a href={callHref} className={styles.phoneLink}>
                  {phone.display}
                </a>
              </p>
            </div>
          </div>

          <div className={styles.row}>
            <span className={styles.icon}>
              <Mark name="clock" size={20} />
            </span>
            <div>
              <p className={styles.label}>{details.hoursLabel}</p>
              <ul className={styles.hours}>
                {business.hours.map((slot) => (
                  <li key={slot.labelLong}>{slot.labelLong}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.row}>
            <span className={styles.icon}>
              <Mark name="pin" size={20} />
            </span>
            <div>
              <p className={styles.label}>{details.studioLabel}</p>
              {/* Street and locality on their own lines, the way a postal
                  address is normally set. */}
              <address className={styles.studio}>
                {details.studioValue.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
