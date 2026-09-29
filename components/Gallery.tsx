import Image from 'next/image'

import { Reveal } from './Reveal'
import { ArrowRight, Diamond } from './icons'
import { gallery } from '@/lib/site'
import { galleryImages } from '@/lib/images'
import styles from './Gallery.module.css'

export function Gallery() {
  return (
    <section id="gallery" className={`section ${styles.section}`} aria-labelledby="gallery-heading">
      <div className="container">
        <Reveal className={styles.head}>
          <div className={styles.headCopy}>
            <p className="eyebrow">
              <Diamond aria-hidden="true" />
              {gallery.eyebrow}
            </p>
            <h2 id="gallery-heading" className={`sectionTitle ${styles.heading}`}>
              {gallery.heading}
            </h2>
            <p className={`lede ${styles.lede}`}>{gallery.lede}</p>
          </div>

          <a className={`arrowLink ${styles.link}`} href={gallery.link.href}>
            {gallery.link.label}
            <ArrowRight />
          </a>
        </Reveal>

        <ul className={styles.grid}>
          {gallery.images.map((image, index) => (
            <Reveal
              as="li"
              key={image.key}
              delayStep={index < 2 ? index : index - 2}
              className={image.size === 'large' ? styles.itemLarge : styles.itemSmall}
            >
              <div className={`frame ${styles.tile}`}>
                <Image
                  src={galleryImages[image.key]}
                  alt={image.alt}
                  placeholder="blur"
                  loading="lazy"
                  className={styles.photo}
                  sizes={
                    image.size === 'large'
                      ? '(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 628px'
                      : '(max-width: 599px) 100vw, (max-width: 1200px) 33vw, 411px'
                  }
                />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
