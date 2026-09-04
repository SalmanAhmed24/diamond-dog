import Image from 'next/image'

import { ScriptWord } from './ScriptWord'
import { Diamond } from './icons'
import { BOOKING_URL, callHref, hero } from '@/lib/site'
import { heroGolden } from '@/lib/images'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          {/* Rendered immediately and never faded in — this is the LCP candidate. */}
          <h1 id="hero-heading" className={styles.headline}>
            <span className={styles.headlineLine}>{hero.headline.before}</span>
            <span className={styles.headlineLine}>{hero.headline.middle}</span>
            <ScriptWord className={styles.script}>{hero.headline.script}</ScriptWord>
          </h1>

          <p className={styles.subhead}>{hero.subhead}</p>
          <p className={styles.body}>{hero.body}</p>

          <div className={styles.actions}>
            <a href={BOOKING_URL} className="btn btn--dark">
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

        <div className={`frame ${styles.media}`}>
          <Image
            src={heroGolden}
            alt={hero.imageAlt}
            priority
            placeholder="blur"
            sizes="(max-width: 900px) 100vw, 46vw"
          />
        </div>
      </div>
    </section>
  )
}
