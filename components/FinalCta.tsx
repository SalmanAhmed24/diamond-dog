import Image from 'next/image'
import type { StaticImageData } from 'next/image'

import { Reveal } from './Reveal'
import { Mark } from './icons'
import { BOOKING_URL, callHref, finalCta } from '@/lib/site'
import { ctaBackdrop } from '@/lib/images'
import styles from './FinalCta.module.css'

type FinalCtaProps = {
  heading?: string
  body?: string
  callLabel?: string
  /** Defaults to the booking provider; /book points at its own embed. */
  bookHref?: string
  /** 'callOnly' drops the Book now button — wellness is a phone conversation. */
  variant?: 'default' | 'callOnly'
  /** Small line under the buttons. */
  note?: string
  /** Each page passes its own backdrop; defaults to the home page photo. */
  backdrop?: StaticImageData
  backdropScrim?: 'default' | 'strong'
}

export function FinalCta({
  heading = finalCta.heading,
  body = finalCta.body,
  callLabel = 'Call / Text',
  bookHref = BOOKING_URL,
  variant = 'default',
  note,
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
            {variant === 'default' && (
              <a href={bookHref} className="btn btn--teal">
                Book now
              </a>
            )}
            <a
              href={callHref}
              className={variant === 'callOnly' ? 'btn btn--teal' : 'btn btn--onDark'}
            >
              {variant === 'callOnly' && <Mark name="chat" size={17} />}
              {callLabel}
            </a>
          </div>

          {note && <p className={styles.note}>{note}</p>}
        </Reveal>
      </div>
    </section>
  )
}
