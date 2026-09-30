import Link from 'next/link'

import { Reveal } from './Reveal'
import { ArrowRight, Mark } from './icons'
import { callHref, wellnessPage } from '@/lib/site'
import styles from './WellnessAssess.module.css'

export function WellnessAssess() {
  const { assess } = wellnessPage

  return (
    <section className={`section ${styles.section}`} aria-labelledby="assess-heading">
      <div className="container">
        <Reveal>
          <h2 id="assess-heading" className={`sectionTitle ${styles.heading}`}>
            {assess.heading}
          </h2>
          <p className={styles.body}>{assess.body}</p>

          <div className={styles.actions}>
            <a href={callHref} className={`btn btn--outline ${styles.call}`}>
              <Mark name="chat" size={17} />
              {assess.callLabel}
            </a>
          </div>

          <Link href={assess.link.href} className={`arrowLink ${styles.link}`}>
            {assess.link.label}
            <ArrowRight />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
