import Image from 'next/image'

import { Reveal } from './Reveal'
import { Diamond } from './icons'
import { BOOKING_URL, callHref, services } from '@/lib/site'
import { serviceImages } from '@/lib/images'
import styles from './Services.module.css'

function BookLink({ slug, title, className }: { slug: string; title: string; className?: string }) {
  return (
    <a href={`${BOOKING_URL}?service=${slug}`} className={`btn btn--teal ${className ?? ''}`}>
      Book now
      <span className="visuallyHidden"> — {title}</span>
    </a>
  )
}

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

        {/* A flush mosaic: the 1px gap over a rule-coloured background draws the
            hairlines between cells, so no cell needs its own border. */}
        <ul className={styles.grid}>
          <Reveal as="li" className={styles.featured}>
            <div className={styles.featuredMedia}>
              <Image
                src={serviceImages[featured.slug]}
                alt={featured.imageAlt}
                placeholder="blur"
                className={styles.photo}
                sizes="(max-width: 767px) 100vw, 30vw"
              />
            </div>

            <div className={styles.featuredBody}>
              {featured.badge && <p className={`eyebrow ${styles.badge}`}>{featured.badge}</p>}
              <h3 className={`serif ${styles.titleLarge}`}>{featured.title}</h3>
              <p className={styles.description}>{featured.description}</p>
              <BookLink slug={featured.slug} title={featured.title} className={styles.book} />
            </div>
          </Reveal>

          {items.map((service, index) => (
            <Reveal as="li" key={service.slug} className={styles.card} delayStep={Math.min(index, 2)}>
              <div className={styles.media}>
                <Image
                  src={serviceImages[service.slug]}
                  alt={service.imageAlt}
                  placeholder="blur"
                  className={styles.photo}
                  sizes="(max-width: 767px) 100vw, 30vw"
                />
              </div>

              <div className={styles.cardBody}>
                <h3 className={`serif ${styles.title}`}>{service.title}</h3>
                <p className={styles.description}>{service.description}</p>
                <BookLink slug={service.slug} title={service.title} className={styles.book} />
              </div>
            </Reveal>
          ))}

          <Reveal as="li" className={styles.addOns}>
            <div className={styles.addOnsMedia}>
              <Image
                src={serviceImages[addOns.slug]}
                alt={addOns.imageAlt}
                placeholder="blur"
                className={styles.photo}
                sizes="(max-width: 767px) 100vw, 340px"
              />
            </div>

            <div className={styles.addOnsBody}>
              <h3 className={`serif ${styles.title}`}>{addOns.title}</h3>
              <p className={styles.description}>{addOns.description}</p>
            </div>

            <BookLink slug={addOns.slug} title={addOns.title} className={styles.addOnsBook} />
          </Reveal>
        </ul>

        <Reveal className={styles.cta}>
          <h3 className={`serif ${styles.ctaHeading}`}>{services.cta.heading}</h3>
          <p className={styles.ctaBody}>{services.cta.body}</p>
          <div className={styles.ctaActions}>
            <a href={BOOKING_URL} className="btn btn--teal">
              Book now
            </a>
            <a href={callHref} className="btn btn--outline">
              Call / Text
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
