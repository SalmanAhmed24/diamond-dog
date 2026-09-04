import Image from 'next/image'

import { Reveal } from './Reveal'
import { Diamond } from './icons'
import { BOOKING_URL, services } from '@/lib/site'
import { serviceImages } from '@/lib/images'
import styles from './Services.module.css'

export function Services() {
  const { featured, items, addOns } = services

  return (
    <section id="services" className={`section ${styles.section}`} aria-labelledby="services-heading">
      <div className="container">
        <Reveal className={styles.head}>
          <p className="eyebrow">
            <Diamond aria-hidden="true" />
            {services.eyebrow}
          </p>
          <h2 id="services-heading" className={`sectionTitle ${styles.heading}`}>
            {services.heading}
          </h2>
          <p className={`lede ${styles.lede}`}>{services.lede}</p>
        </Reveal>

        <ul className={styles.grid}>
          {/* Featured — spans two rows on desktop, so the rest auto-flow around it. */}
          <Reveal as="li" className={`${styles.card} ${styles.cardFeatured}`}>
            <div className={`frame ${styles.mediaFeatured}`}>
              <Image
                src={serviceImages[featured.slug]}
                alt={featured.imageAlt}
                placeholder="blur"
                sizes="(max-width: 767px) 100vw, (max-width: 1200px) 48vw, 580px"
              />
            </div>

            <div className={styles.cardBody}>
              {featured.badge && <p className={`eyebrow ${styles.badge}`}>{featured.badge}</p>}
              <h3 className={`serif ${styles.titleLarge}`}>{featured.title}</h3>
              <p className={styles.description}>{featured.description}</p>
              <a
                href={`${BOOKING_URL}?service=${featured.slug}`}
                className={`btn btn--teal ${styles.bookFeatured}`}
              >
                Book now
                <span className="visuallyHidden"> — {featured.title}</span>
              </a>
            </div>
          </Reveal>

          {items.map((service, index) => (
            <Reveal as="li" key={service.slug} className={styles.card} delayStep={Math.min(index + 1, 3)}>
              <div className={`frame ${styles.media}`}>
                <Image
                  src={serviceImages[service.slug]}
                  alt={service.imageAlt}
                  placeholder="blur"
                  sizes="(max-width: 767px) 100vw, (max-width: 1200px) 48vw, 556px"
                />
              </div>

              <div className={styles.cardBody}>
                <h3 className={`serif ${styles.title}`}>{service.title}</h3>
                <p className={styles.description}>{service.description}</p>
                <a href={`${BOOKING_URL}?service=${service.slug}`} className={`btn btn--outline ${styles.book}`}>
                  Book now
                  <span className="visuallyHidden"> — {service.title}</span>
                </a>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <div className={styles.addOns}>
            <div className={`frame ${styles.addOnsMedia}`}>
              <Image
                src={serviceImages[addOns.slug]}
                alt={addOns.imageAlt}
                placeholder="blur"
                sizes="160px"
              />
            </div>

            <div className={styles.addOnsCopy}>
              <h3 className={`serif ${styles.title}`}>{addOns.title}</h3>
              <p className={styles.description}>{addOns.description}</p>
            </div>

            <a href={`${BOOKING_URL}?service=${addOns.slug}`} className={`btn btn--dark ${styles.addOnsBook}`}>
              Book now
              <span className="visuallyHidden"> — {addOns.title}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
