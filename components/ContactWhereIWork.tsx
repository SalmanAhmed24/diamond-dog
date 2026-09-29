import Image from 'next/image'

import { Reveal } from './Reveal'
import { contact } from '@/lib/site'
import { contactWhereIWork } from '@/lib/images'
import styles from './ContactWhereIWork.module.css'

export function ContactWhereIWork() {
  const { whereIWork } = contact

  return (
    <section className={`section ${styles.section}`} aria-labelledby="where-heading">
      <div className={`container ${styles.grid}`}>
        <Reveal className={`frame ${styles.media}`}>
          <Image
            src={contactWhereIWork}
            alt={whereIWork.imageAlt}
            placeholder="blur"
            loading="lazy"
            sizes="(max-width: 899px) 100vw, 33vw"
          />
        </Reveal>

        <Reveal className={styles.copy} delayStep={1}>
          <h2 id="where-heading" className={`sectionTitle ${styles.heading}`}>
            {whereIWork.heading}
          </h2>
          <p className={styles.body}>{whereIWork.body}</p>
        </Reveal>
      </div>
    </section>
  )
}
