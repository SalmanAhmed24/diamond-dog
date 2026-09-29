import { Reveal } from './Reveal'
import { Diamond } from './icons'
import { MapEmbed } from './MapEmbed'
import { BOOKING_URL, callHref, contact } from '@/lib/site'
import styles from './ContactMap.module.css'

export function ContactMap() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="reach-heading">
      <div className="container">
        <Reveal className={styles.head}>
          <p className="eyebrow">
            <Diamond aria-hidden="true" />
            {contact.reach.eyebrow}
          </p>
          <h2 id="reach-heading" className={`sectionTitle ${styles.heading}`}>
            {contact.reach.heading}
          </h2>
        </Reveal>

        <MapEmbed />

        <div className={styles.actions}>
          <a href={BOOKING_URL} className="btn btn--teal">
            Book now
          </a>
          <a href={callHref} className="btn btn--outline">
            {contact.cta.callLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
