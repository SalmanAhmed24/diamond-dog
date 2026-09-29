import Image from 'next/image'

import { Reveal } from './Reveal'
import { book } from '@/lib/site'
import { bookBeforeYouBook } from '@/lib/images'
import styles from './BookBeforeYouBook.module.css'

export function BookBeforeYouBook() {
  const { beforeYouBook } = book

  return (
    <section className={`section ${styles.section}`} aria-labelledby="before-heading">
      <div className={`container ${styles.grid}`}>
        <Reveal className={`frame ${styles.media}`}>
          <Image
            src={bookBeforeYouBook}
            alt={beforeYouBook.imageAlt}
            placeholder="blur"
            loading="lazy"
            sizes="(max-width: 899px) 100vw, 34vw"
          />
        </Reveal>

        <Reveal className={styles.copy} delayStep={1}>
          <h2 id="before-heading" className={`sectionTitle ${styles.heading}`}>
            {beforeYouBook.heading}
          </h2>
          <p className={styles.body}>{beforeYouBook.body}</p>
        </Reveal>
      </div>
    </section>
  )
}
