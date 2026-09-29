import Link from 'next/link'

import { SocialIcon } from './icons'
import { business, callHref, footerColumns, phone, social } from '@/lib/site'
import styles from './SiteFooter.module.css'

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brandBlock}>
            <p className={`serif ${styles.brand}`}>{business.name}</p>
            <address className={styles.address}>{business.addressLine}</address>

            <div className={styles.contact}>
              <a href={callHref} className={styles.contactLink}>
                {phone.display}
              </a>
              {business.hours.map((slot) => (
                <span key={slot.labelLong}>{slot.labelLong}</span>
              ))}
            </div>

            <ul className={styles.social} aria-label="Social media">
              {social.map((item) => (
                <li key={item.name}>
                  <a
                    className={styles.socialLink}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${business.name} on ${item.name}`}
                  >
                    <SocialIcon name={item.icon} size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} className={styles.column} aria-label={column.title}>
              <h2 className={styles.columnTitle}>{column.title}</h2>
              <ul className={styles.columnList}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.columnLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.meta}>
          <span>
            {business.city}, {business.region}
          </span>
          <a href={callHref} className={styles.metaLink}>
            {phone.display}
          </a>
          <span>{business.hoursSummary}</span>
          <span className={styles.copyright}>{business.copyright}</span>
        </div>
      </div>
    </footer>
  )
}
