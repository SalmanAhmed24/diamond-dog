import Image from 'next/image'
import type { StaticImageData } from 'next/image'

import { Reveal } from './Reveal'
import { BOOKING_URL, callHref, finalCta } from '@/lib/site'
import { ctaBackdrop } from '@/lib/images'
import styles from './FinalCta.module.css'

type FinalCtaProps = {
  heading?: string
  body?: string
  callLabel?: string
  /** Defaults to the booking provider; /book points at its own embed. */
  bookHref?: string
  /** Each page passes its own backdrop; defaults to the home page photo. */
  backdrop?: StaticImageData
  backdropScrim?: 'default' | 'strong'
}

export function FinalCta({
  heading = finalCta.heading,
  body = finalCta.body,
  callLabel = 'Call / Text',
  bookHref = BOOKING_URL,
  backdrop = ctaBackdrop,
  backdropScrim = 'default',
}: FinalCtaProps = {}) {
  return (
    <section className={styles.section} aria-labelledby="cta-heading">
      <Image
        src={backdrop}
        alt=""
        aria-hidden="true"
        placeholder="blur"
        loading="lazy"
        className={styles.backdrop}
        sizes="100vw"
      />
      <div
        className={`${styles.scrim} ${backdropScrim === 'strong' ? styles.scrimStrong : ''}`}
        aria-hidden="true"
      />

      <div className="container">
        <Reveal className={styles.inner}>
          <h2 id="cta-heading" className={`serif ${styles.heading}`}>
            {heading}
          </h2>
          <p className={styles.body}>{body}</p>

          <div className={styles.actions}>
            <a href={bookHref} className="btn btn--teal">
              Book now
            </a>
            <a href={callHref} className="btn btn--onDark">
              {callLabel}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
