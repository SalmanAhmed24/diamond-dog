import { Reveal } from './Reveal'
import { ArrowRight, Star } from './icons'
import { testimonials } from '@/lib/site'
import styles from './Testimonials.module.css'

const RATING = 5

function Stars() {
  return (
    <span className={styles.stars} aria-hidden="true">
      {Array.from({ length: RATING }, (_, i) => (
        <Star key={i} />
      ))}
    </span>
  )
}

/**
 * Republished Google reviews. These carry no Review or AggregateRating
 * structured data on purpose: they are third-party reviews about this business,
 * shown on this business's own site, which is exactly the self-serving case
 * Google excludes from review rich results. Marking them up would risk a manual
 * action rather than earn stars in search.
 */
export function Testimonials() {
  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        <Reveal className={styles.head}>
          <div className={styles.headCopy}>
            {/* No diamond on this eyebrow — the design sets it flush left. */}
            <p className="eyebrow">{testimonials.eyebrow}</p>
            <h2 id="testimonials-heading" className="sectionTitle">
              {testimonials.heading}
            </h2>
            <p className={`lede ${styles.lede}`}>{testimonials.lede}</p>
          </div>

          <a
            className={styles.badge}
            href={testimonials.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.badgeMark} aria-hidden="true">
              G
            </span>
            <span className={styles.badgeText}>
              <Stars />
              <span className={styles.badgeLabel}>
                {testimonials.reviewsLabel}
                <ArrowRight />
              </span>
            </span>
          </a>
        </Reveal>

        <ul className={styles.grid}>
          {testimonials.items.map((item, index) => (
            <Reveal as="li" key={item.name} delayStep={index % 4}>
              <figure className={styles.card}>
                <div className={styles.cardTop}>
                  <Stars />
                  <span className={styles.quoteMark} aria-hidden="true">
                    &ldquo;
                  </span>
                </div>

                <p className="visuallyHidden">
                  Rated {RATING} out of {RATING}.
                </p>
                <blockquote className={styles.quote}>
                  {(Array.isArray(item.quote) ? item.quote : [item.quote]).map(
                    (paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ),
                  )}
                </blockquote>

                <figcaption className={styles.attribution}>
                  <span className={styles.person}>
                    <span className={styles.avatar} aria-hidden="true">
                      {item.name.charAt(0)}
                    </span>
                    <span className={styles.who}>
                      <span className={styles.name}>{item.name}</span>
                      <span className={styles.meta}>
                        {item.pet} &middot; {item.detail}
                      </span>
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
