'use client'

import Image from 'next/image'
import { m, type Variants } from 'framer-motion'
import { useMemo, useState } from 'react'

import { Diamond } from './icons'
import { GALLERY_TAGS, glowUpGallery, type GalleryTag } from '@/lib/site'
import { glowUpImages } from '@/lib/images'
import { EASE } from '@/lib/motion'
import styles from './GalleryGrid.module.css'

/* Re-keying the list on filter change replays a short stagger, which reads as a
   deliberate transition without needing Framer's layout projection. That matters:
   layout animations require the `domMax` feature bundle, roughly 10kB more than
   the `domAnimation` set the rest of the site runs on. */
const listVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.035 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE } },
}

export function GalleryGrid() {
  const [activeTag, setActiveTag] = useState<GalleryTag>('All')

  const visible = useMemo(
    () =>
      activeTag === 'All'
        ? glowUpGallery.items
        : glowUpGallery.items.filter((item) => item.tag === activeTag),
    [activeTag],
  )

  return (
    <section className={`section ${styles.section}`} aria-labelledby="gallery-heading">
      <div className="container">
        <p className="eyebrow">
          <Diamond aria-hidden="true" />
          {glowUpGallery.eyebrow}
        </p>
        <h2 id="gallery-heading" className={`sectionTitle ${styles.heading}`}>
          {glowUpGallery.heading}
        </h2>

        {/* Toggle buttons rather than a tablist: these filter one grid, they
            don't switch between panels, so aria-pressed is the honest mapping. */}
        <div className={styles.filters} role="group" aria-label="Filter the gallery by service">
          {GALLERY_TAGS.map((tag) => {
            const isActive = tag === activeTag
            return (
              <button
                key={tag}
                type="button"
                className={`${styles.filter} ${isActive ? styles.filterActive : ''}`}
                aria-pressed={isActive}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            )
          })}
        </div>

        <p className="visuallyHidden" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'photo' : 'photos'} shown
          {activeTag === 'All' ? '' : ` for ${activeTag}`}.
        </p>

        <m.ul
          key={activeTag}
          className={styles.grid}
          variants={listVariants}
          initial="hidden"
          animate="shown"
        >
          {visible.map((item) => (
            <m.li
              key={item.key}
              data-reveal=""
              variants={itemVariants}
              className={item.shape === 'wide' ? styles.wide : styles.square}
            >
              <div className={styles.tile}>
                <Image
                  src={glowUpImages[item.key]}
                  alt={item.alt}
                  placeholder="blur"
                  className={styles.photo}
                  sizes={
                    item.shape === 'wide'
                      ? '(max-width: 599px) 100vw, (max-width: 1023px) 100vw, 630px'
                      : '(max-width: 599px) 100vw, (max-width: 1023px) 50vw, 414px'
                  }
                />
              </div>
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  )
}
