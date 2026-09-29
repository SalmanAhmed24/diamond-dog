import Image from 'next/image'

import { Reveal } from './Reveal'
import { whyChoose } from '@/lib/site'
import { differenceBackdrop } from '@/lib/images'
import styles from './WhyChooseMe.module.css'

export function WhyChooseMe() {
  return (
    <section className={styles.section} aria-labelledby="why-heading">
      {/* Decorative backdrop: empty alt, and the scrim lives in CSS so the
          overlay can never be missing while the photo is still loading. */}
      <Image
        src={differenceBackdrop}
        alt=""
        aria-hidden="true"
        placeholder="blur"
        className={styles.backdrop}
        sizes="100vw"
      />
      <div className={styles.scrim} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <Reveal className={styles.head}>
          <p className="eyebrow eyebrow--gold">{whyChoose.eyebrow}</p>
          <h2 id="why-heading" className={`serif ${styles.heading}`}>
            {whyChoose.heading}
          </h2>
          <p className={styles.body}>{whyChoose.body}</p>
        </Reveal>

        {/* Term first in the DOM so screen readers hear "Years of experience,
            18+". column-reverse lifts the figure above it visually, so no text
            has to be duplicated or hidden. */}
        <dl className={styles.stats}>
          {whyChoose.stats.map((stat, index) => (
            <Reveal as="div" key={stat.label} className={styles.stat} delayStep={index}>
              <dt className={styles.statLabel}>{stat.label}</dt>
              <dd className={`serif oldstyle ${styles.statValue}`}>{stat.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
