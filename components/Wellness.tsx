import Image from 'next/image'

import { Reveal } from './Reveal'
import { Diamond } from './icons'
import { callHref, wellness } from '@/lib/site'
import { wellnessGroomer } from '@/lib/images'
import styles from './Wellness.module.css'

export function Wellness() {
  return (
    <section id="wellness" className={`section ${styles.section}`} aria-labelledby="wellness-heading">
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.copy}>
          <p className="eyebrow">
            <Diamond aria-hidden="true" />
            {wellness.eyebrow}
          </p>

          <h2 id="wellness-heading" className={`sectionTitle ${styles.heading}`}>
            {wellness.heading}
          </h2>

          <p className={`lede ${styles.body}`}>{wellness.body}</p>

          <div className={styles.actions}>
            <a href={callHref} className="btn btn--teal">
              {wellness.cta}
            </a>
          </div>

          <p className={styles.note}>{wellness.note}</p>
        </Reveal>

        <Reveal className={`frame ${styles.media}`} delayStep={1}>
          <Image
            src={wellnessGroomer}
            alt={wellness.imageAlt}
            placeholder="blur"
            loading="lazy"
            sizes="(max-width: 899px) 100vw, 48vw"
          />
        </Reveal>
      </div>
    </section>
  )
}
