import Image from 'next/image'

import { Reveal } from './Reveal'
import { ScriptReveal } from './ScriptReveal'
import { ArrowRight } from './icons'
import { business, philosophy } from '@/lib/site'
import { philosophyKaylie } from '@/lib/images'
import styles from './Philosophy.module.css'

export function Philosophy() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="philosophy-heading">
      <div className={`container ${styles.grid}`}>
        <Reveal className={`frame ${styles.media}`}>
          <Image
            src={philosophyKaylie}
            alt={philosophy.imageAlt}
            placeholder="blur"
            sizes="(max-width: 899px) 100vw, 47vw"
          />
        </Reveal>

        <Reveal className={styles.copy} delayStep={1}>
          <h2 id="philosophy-heading" className="sectionTitle">
            {philosophy.heading}
          </h2>

          <p className={styles.body}>{philosophy.body}</p>

          <figure className={styles.signature}>
            <figcaption className={styles.signatureName}>
              <ScriptReveal className="script">{business.owner}</ScriptReveal>
            </figcaption>
            <div className={styles.signatureMeta}>
              <span>{business.ownerRole}</span>
              <span>{business.name}</span>
            </div>
          </figure>

          <a className={`arrowLink ${styles.link}`} href={philosophy.link.href}>
            {philosophy.link.label}
            <ArrowRight />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
