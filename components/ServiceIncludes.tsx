import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import type { CSSProperties } from 'react'

import { Reveal } from './Reveal'
import { Mark } from './icons'
import styles from './ServiceIncludes.module.css'

export type IncludedItem = { icon: string; label: string }
export type CopyBlock = { heading: string; body: string }

type ServiceIncludesProps = {
  /** First block renders as the section heading, the rest as sub-headings. */
  blocks: CopyBlock[]
  items: IncludedItem[]
  /** Omit the image and the copy spans the container instead. */
  image?: StaticImageData
  imageAlt?: string
  aspect?: string
  headingId: string
  /** Full-bleed hairline above the section. */
  divider?: boolean
  mediaSide?: 'left' | 'right'
  mediaRatio?: number
}

/** Photo beside a "what's included" write-up and a two-column checklist. */
export function ServiceIncludes({
  blocks,
  items,
  image,
  imageAlt,
  aspect,
  headingId,
  divider = false,
  mediaSide = 'left',
  mediaRatio = 0.9,
}: ServiceIncludesProps) {
  const media = image ? (
    <Reveal className={`frame ${styles.media}`}>
      <Image
        src={image}
        alt={imageAlt ?? ''}
        placeholder="blur"
        sizes="(max-width: 899px) 100vw, 44vw"
      />
    </Reveal>
  ) : null

  const copy = (
    <Reveal className={styles.copy} delayStep={1}>
      {blocks.map((block, index) =>
        index === 0 ? (
          <div key={block.heading}>
            <h2 id={headingId} className={`sectionTitle ${styles.heading}`}>
              {block.heading}
            </h2>
            <p className={styles.body}>{block.body}</p>
          </div>
        ) : (
          <div key={block.heading} className={styles.block}>
            <h3 className={`serif ${styles.subheading}`}>{block.heading}</h3>
            <p className={styles.body}>{block.body}</p>
          </div>
        ),
      )}

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.label} className={styles.item}>
            <span className={styles.icon}>
              <Mark name={item.icon} size={18} />
            </span>
            {item.label}
          </li>
        ))}
      </ul>
    </Reveal>
  )

  return (
    <section
      className={`section ${styles.section} ${divider ? styles.divided : ''}`}
      aria-labelledby={headingId}
      style={
        {
          '--media-ratio': `${mediaRatio}fr`,
          '--media-aspect': aspect ?? '600 / 480',
        } as CSSProperties
      }
    >
      <div className={`container ${styles.grid} ${media ? '' : styles.gridSolo}`}>
        {media && mediaSide === 'left' && media}
        {copy}
        {media && mediaSide === 'right' && media}
      </div>
    </section>
  )
}
