import { SocialIcon } from './icons'
import { business, social } from '@/lib/site'
import styles from './AnnouncementBar.module.css'

export function AnnouncementBar() {
  return (
    <div className={styles.bar}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.tagline}>{business.tagline}</p>
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
                <SocialIcon name={item.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
