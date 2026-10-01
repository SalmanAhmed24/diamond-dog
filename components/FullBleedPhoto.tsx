import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import type { CSSProperties } from 'react'

import styles from './FullBleedPhoto.module.css'

/**
 * A single photo spanning the full viewport width, with no copy over it.
 * Unlike the scrimmed CTA backdrops this one carries nothing on top, so it gets
 * a real alt rather than being hidden — it is the only place on the page a
 * reader is shown the service actually happening.
 */
export function FullBleedPhoto({
  image,
  alt,
  aspect = '1440 / 420',
}: {
  image: StaticImageData
  alt: string
  aspect?: string
}) {
  return (
    <div
      className={styles.band}
      style={{ '--band-aspect': aspect } as CSSProperties}
    >
      <Image src={image} alt={alt} placeholder="blur" loading="lazy" sizes="100vw" />
    </div>
  )
}
