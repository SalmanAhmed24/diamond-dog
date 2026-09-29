import Link from 'next/link'

import { Mark } from './icons'
import { book, callHref } from '@/lib/site'
import styles from './BookHero.module.css'

export function BookHero() {
  const { hero, checklist } = book

  return (
    <section className={styles.hero} aria-labelledby="book-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          {/* Painted immediately, never faded in — this is the LCP text block. */}
          <h1 id="book-heading" className={styles.headline}>
            {hero.heading}
          </h1>
          <p className={styles.body}>{hero.body}</p>

          <div className={styles.actions}>
            {/* On this page "Book now" scrolls to the scheduler rather than
                linking back to the page you are already on. */}
            <a href="#booking" className="btn btn--teal">
              Book now
            </a>
            <a href={callHref} className="btn btn--outline">
              {book.cta.callLabel}
            </a>
          </div>
        </div>

        <aside className={styles.card} aria-labelledby="checklist-title">
          <h2 id="checklist-title" className={`eyebrow ${styles.cardTitle}`}>
            {checklist.title}
          </h2>

          <ul className={styles.cardList}>
            {checklist.items.map((item) => (
              <li key={item.label} className={styles.cardItem}>
                <span className={styles.cardIcon}>
                  <Mark name={item.icon} size={20} />
                </span>
                <div className={styles.cardCopy}>
                  <p className={styles.cardLabel}>{item.label}</p>
                  <p className={styles.cardText}>
                    {item.text}{' '}
                    <Link href={item.link.href} className={styles.cardLink}>
                      {item.link.label}
                    </Link>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}
