import Image from 'next/image'
import type { CSSProperties } from 'react'
import type { StaticImageData } from 'next/image'

import { Mark } from './icons'
import { BOOKING_URL, callHref } from '@/lib/site'
import styles from './MediaHero.module.css'

export type ProofItem = { label: string; icon?: string }

type MediaHeroProps = {
  heading: string
  headingId: string
  body: string
  image: StaticImageData
  imageAlt: string
  /** CSS aspect-ratio for the frame, e.g. '577 / 455'. */
  aspect: string
  callLabel?: string
  proof?: ProofItem[]
  /** The About page overlays a years-of-experience badge on the photo. */
  badge?: { value: string; label: string }
  mediaRatio?: number
  /** Some service pages show Book now on its own. */
  showCall?: boolean
}

/** Copy beside a photo, with buttons and a row of proof points underneath. */
export function MediaHero({
  heading,
  headingId,
  body,
  image,
  imageAlt,
  aspect,
  callLabel = 'Call or text',
  proof,
  badge,
  mediaRatio = 0.92,
  showCall = true,
}: MediaHeroProps) {
  return (
    <section
      className={styles.hero}
      aria-labelledby={headingId}
      style={
        {
          '--media-ratio': `${mediaRatio}fr`,
          '--media-aspect': aspect,
        } as CSSProperties
      }
    >
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          {/* Painted immediately, never faded in — this is the LCP text block. */}
          <h1 id={headingId} className={styles.headline}>
            {heading}
          </h1>
          <p className={styles.body}>{body}</p>

          <div className={styles.actions}>
            <a href={BOOKING_URL} className="btn btn--teal">
              Book now
            </a>
            {showCall && (
              <a href={callHref} className="btn btn--outline">
                {callLabel}
              </a>
            )}
          </div>

          {proof && proof.length > 0 && (
            <ul className={styles.proof}>
              {proof.map((item) => (
                <li key={item.label} className={styles.proofItem}>
                  {item.icon && (
                    <span className={styles.proofIcon}>
                      <Mark name={item.icon} size={17} />
                    </span>
                  )}
                  {item.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.media}>
          <Image
            src={image}
            alt={imageAlt}
            priority
            placeholder="blur"
            className={styles.photo}
            sizes="(max-width: 899px) 100vw, 45vw"
          />

          {badge && (
            <p className={styles.badge}>
              <span className={`serif oldstyle ${styles.badgeValue}`}>{badge.value}</span>
              <span className={styles.badgeLabel}>{badge.label}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
