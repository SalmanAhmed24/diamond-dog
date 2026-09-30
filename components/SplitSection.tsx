import Image from 'next/image'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import type { StaticImageData } from 'next/image'

import { Reveal } from './Reveal'
import { ArrowRight } from './icons'
import styles from './SplitSection.module.css'

type SplitSectionProps = {
  heading: string
  body: string
  headingId: string
  image: StaticImageData
  imageAlt: string
  /** CSS aspect-ratio for the frame, e.g. '600 / 480'. */
  aspect: string
  mediaSide?: 'left' | 'right'
  surface?: 'cream' | 'sand'
  /** Media column width relative to the copy column. */
  mediaRatio?: number
  link?: { label: string; href: string }
  /** Copy measure in ch. /wellness runs a wider column than the others. */
  bodyMeasure?: number
  priority?: boolean
}

/**
 * One image beside one block of copy — the shape used by /about, /book,
 * /contact and /wellness. Only the side the photo sits on, the surface, the
 * frame ratio and the column split differ between them.
 */
export function SplitSection({
  heading,
  body,
  headingId,
  image,
  imageAlt,
  aspect,
  mediaSide = 'left',
  surface = 'cream',
  mediaRatio = 1,
  link,
  bodyMeasure = 54,
  priority = false,
}: SplitSectionProps) {
  const media = (
    <Reveal className={`frame ${styles.media}`} delayStep={mediaSide === 'left' ? 0 : 1}>
      <Image
        src={image}
        alt={imageAlt}
        placeholder="blur"
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        sizes="(max-width: 899px) 100vw, 45vw"
      />
    </Reveal>
  )

  const copy = (
    <Reveal className={styles.copy} delayStep={mediaSide === 'left' ? 1 : 0}>
      <h2 id={headingId} className={`sectionTitle ${styles.heading}`}>
        {heading}
      </h2>
      <p className={styles.body}>{body}</p>
      {link && (
        <Link href={link.href} className={`arrowLink ${styles.link}`}>
          {link.label}
          <ArrowRight />
        </Link>
      )}
    </Reveal>
  )

  return (
    <section
      className={`section ${styles.section} ${surface === 'sand' ? styles.sand : ''}`}
      aria-labelledby={headingId}
      style={
        {
          // Must carry the unit: `minmax(0, 0.86)` is not a valid grid track,
          // and an invalid track drops the whole grid-template-columns
          // declaration, collapsing the section to a single column.
          '--media-ratio': `${mediaRatio}fr`,
          '--media-aspect': aspect,
          '--body-measure': `${bodyMeasure}ch`,
        } as CSSProperties
      }
    >
      <div className={`container ${styles.grid}`}>
        {mediaSide === 'left' ? (
          <>
            {media}
            {copy}
          </>
        ) : (
          <>
            {copy}
            {media}
          </>
        )}
      </div>
    </section>
  )
}
