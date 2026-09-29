import Image from 'next/image'

import { BOOKING_URL, about, callHref } from '@/lib/site'
import { aboutHeroCorgi } from '@/lib/images'
import styles from './AboutHero.module.css'

export function AboutHero() {
  const { hero } = about

  return (
    <section className={styles.hero} aria-labelledby="about-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          {/* Painted immediately, never faded in — this is the LCP text block. */}
          <h1 id="about-heading" className={styles.headline}>
            {hero.heading}
          </h1>

          <p className={styles.body}>{hero.body}</p>

          <div className={styles.actions}>
            <a href={BOOKING_URL} className="btn btn--teal">
              Book now
            </a>
            <a href={callHref} className="btn btn--outline">
              {about.cta.callLabel}
            </a>
          </div>

          <ul className={styles.proof}>
            {hero.proof.map((item) => (
              <li key={item} className={styles.proofItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.media}>
          <Image
            src={aboutHeroCorgi}
            alt={hero.imageAlt}
            priority
            placeholder="blur"
            className={styles.photo}
            sizes="(max-width: 899px) 100vw, 45vw"
          />

          <p className={styles.badge}>
            <span className={`serif oldstyle ${styles.badgeValue}`}>{hero.badge.value}</span>
            <span className={styles.badgeLabel}>{hero.badge.label}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
