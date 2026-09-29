import Image from 'next/image'

import { Reveal } from './Reveal'
import { about } from '@/lib/site'
import { aboutGuideDog } from '@/lib/images'
import styles from './AboutGuide.module.css'

export function AboutGuide() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="guide-heading">
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.copy}>
          <h2 id="guide-heading" className={`sectionTitle ${styles.heading}`}>
            {about.guide.heading}
          </h2>
          <p className={styles.body}>{about.guide.body}</p>
        </Reveal>

        <Reveal className={`frame ${styles.media}`} delayStep={1}>
          <Image
            src={aboutGuideDog}
            alt={about.guide.imageAlt}
            placeholder="blur"
            loading="lazy"
            sizes="(max-width: 899px) 100vw, 47vw"
          />
        </Reveal>
      </div>
    </section>
  )
}
