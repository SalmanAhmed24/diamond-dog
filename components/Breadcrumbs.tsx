import Link from 'next/link'

import styles from './Breadcrumbs.module.css'

export type Crumb = { label: string; href: string }

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav className={`container ${styles.wrap}`} aria-label="Breadcrumb">
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
