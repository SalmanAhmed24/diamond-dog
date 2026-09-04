import { Reveal } from './Reveal'
import { whyChoose } from '@/lib/site'
import styles from './WhyChooseMe.module.css'

export function WhyChooseMe() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="why-heading">
      <div className="container">
        <Reveal className={styles.head}>
          <h2 id="why-heading" className={`sectionTitle ${styles.heading}`}>
            {whyChoose.heading}
          </h2>
          <p className={`lede ${styles.body}`}>{whyChoose.body}</p>
        </Reveal>

        <Reveal>
          {/* Term first in the DOM so screen readers hear "Years of experience,
              18+". column-reverse lifts the figure above it visually, so no text
              has to be duplicated or hidden. */}
          <dl className={styles.stats}>
            {whyChoose.stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt className={styles.statLabel}>{stat.label}</dt>
                <dd className={`serif oldstyle ${styles.statValue}`}>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
