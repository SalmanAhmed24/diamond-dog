import { Reveal } from './Reveal'
import { about } from '@/lib/site'
import styles from './AboutProcess.module.css'

export function AboutProcess() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="process-heading">
      <div className="container">
        <Reveal className={styles.inner}>
          <h2 id="process-heading" className={`serif ${styles.heading}`}>
            {about.process.heading}
          </h2>
          <p className={styles.body}>{about.process.body}</p>
        </Reveal>
      </div>
    </section>
  )
}
