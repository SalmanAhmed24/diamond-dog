import Link from 'next/link'

import styles from './Breadcrumbs.module.css'

export type Crumb = { label: string; href: string }

export function Breadcrumbs({
  trail,
  align = 'left',
}: {
  trail: Crumb[]
  /** The Service Agreement design centres its trail; the rest sit left. */
  align?: 'left' | 'center'
}) {
  return (
    <nav
      className={`container ${styles.wrap} ${align === 'center' ? styles.center : ''}`}
      aria-label="Breadcrumb"
    >
      <ol className={styles.list}>
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1
          return (
            <li key={crumb.href} className={styles.item}>
              {isLast ? (
                <span aria-current="page" className={styles.current}>
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className={styles.link}>
                  {crumb.label}
                </Link>
              )}
              {!isLast && (
                <span className={styles.sep} aria-hidden="true">
                  /
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
