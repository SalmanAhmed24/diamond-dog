import Image from 'next/image'

import { callHref, wellnessPage } from '@/lib/site'
import { wellnessTowelDog } from '@/lib/images'
import styles from './WellnessHero.module.css'

export function WellnessHero() {
  const { hero } = wellnessPage

  return (
    <section className={styles.hero} aria-labelledby="wellness-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          {/* Painted immediately, never faded in — this is the LCP text block. */}
          <h1 id="wellness-heading" className={styles.headline}>
            {hero.heading}
          </h1>
          <p className={styles.body}>{hero.body}</p>

          {/* No Book now here: wellness is deliberately a phone conversation,
              not something the scheduler handles. */}
          <div className={styles.actions}>
            <a href={callHref} className="btn btn--teal">
              {hero.callLabel}
            </a>
          </div>
        </div>

        <div className={`frame ${styles.media}`}>
          <Image
            src={wellnessTowelDog}
            alt={hero.imageAlt}
            priority
            placeholder="blur"
            sizes="(max-width: 899px) 100vw, 42vw"
          />
        </div>
      </div>
    </section>
  )
}
