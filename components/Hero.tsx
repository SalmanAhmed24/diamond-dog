import Image from 'next/image'

import { Diamond } from './icons'
import { BOOKING_URL, callHref, hero } from '@/lib/site'
import { heroKaylie } from '@/lib/images'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.copy}>
        <div className={styles.copyInner}>
          {/* Painted immediately and never faded in — this is the LCP text block. */}
          <h1 id="hero-heading" className={styles.headline}>
            {hero.headline.map((line) => (
              <span key={line} className={styles.headlineLine}>
                {line}
              </span>
            ))}
          </h1>

          <p className={`oldstyle ${styles.subhead}`}>{hero.subhead}</p>
          <p className={styles.body}>{hero.body}</p>

          <div className={styles.actions}>
            <a href={BOOKING_URL} className="btn btn--teal">
              Book now
            </a>
            <a href={callHref} className="btn btn--outline">
              Call / Text
            </a>
          </div>

          <hr className={styles.rule} />

          <ul className={styles.proof}>
            {hero.proof.map((item) => (
              <li key={item} className={styles.proofItem}>
                <Diamond className={styles.proofMark} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bleeds off the right edge of the viewport, as in the design. */}
      <div className={styles.media}>
        <Image
          src={heroKaylie}
          alt={hero.imageAlt}
          priority
          placeholder="blur"
          className={styles.photo}
          sizes="(max-width: 899px) 100vw, 52vw"
        />

        {/* Cream feather over the photo's left edge, so it dissolves into the
            page rather than butting against it with a hard seam. */}
        <div className={styles.fade} aria-hidden="true" />

        <p className={styles.badge}>
          <span className={`serif oldstyle ${styles.badgeValue}`}>{hero.badge.value}</span>
          <span className={styles.badgeLabel}>{hero.badge.label}</span>
        </p>
      </div>
    </section>
  )
}
