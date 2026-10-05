'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

import { ChevronDown, CloseIcon, MenuIcon } from './icons'
import { BOOKING_URL, business, callHref, primaryNav } from '@/lib/site'
import styles from './SiteHeader.module.css'
import { EASE } from '@/lib/motion'

export function SiteHeader() {
  const [stuck, setStuck] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const pathname = usePathname()
  const reduce = useReducedMotion()
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const toggleRef = useRef<HTMLButtonElement | null>(null)
  const navRef = useRef<HTMLElement | null>(null)

  /* An IntersectionObserver on a 1px sentinel replaces a scroll listener, so the
     header's stuck state costs nothing on the main thread while scrolling. */
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), {
      threshold: 1,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  /* Lock the page behind the mobile drawer, compensating for the scrollbar so
     locking never shifts the layout. */
  useEffect(() => {
    if (!drawerOpen) return
    const { body } = document
    const previousOverflow = body.style.overflow
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`
    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = ''
    }
  }, [drawerOpen])

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
    toggleRef.current?.focus()
  }, [])

  /* Escape closes whichever layer is open. */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (drawerOpen) closeDrawer()
      else if (openSubmenu) setOpenSubmenu(null)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [drawerOpen, openSubmenu, closeDrawer])

  /* A pointer press outside the nav dismisses the desktop dropdown. */
  useEffect(() => {
    if (!openSubmenu) return
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenSubmenu(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [openSubmenu])

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className={styles.sentinel} />

      {/* The drawer lives inside the sticky header rather than being fixed to a
          hard-coded offset, so it always sits flush beneath the bar no matter how
          tall the announcement strip wraps on small screens. */}
      <header
        className={`${styles.header} ${stuck ? styles.headerStuck : ''} ${
          drawerOpen ? styles.headerOpen : ''
        }`}
      >
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.brand} aria-label={`${business.name} — home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-the-diamond-dog.svg"
              alt={`${business.name} — ${business.subtitle}`}
              width={367}
              height={70}
              fetchPriority="high"
            />
          </Link>

          <nav ref={navRef} className={styles.nav} aria-label="Primary">
            <ul className={styles.navList}>
              {primaryNav.map((item) => {
                const hasChildren = Boolean(item.children?.length)
                const isOpen = openSubmenu === item.label

                if (!hasChildren) {
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={styles.navLink}
                        aria-current={pathname === item.href ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                }

                return (
                  <li
                    key={item.label}
                    className={styles.navItemWithMenu}
                    onMouseEnter={() => setOpenSubmenu(item.label)}
                    onMouseLeave={() => setOpenSubmenu(null)}
                  >
                    <button
                      type="button"
                      className={styles.navLink}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={() => setOpenSubmenu(isOpen ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDown className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <m.ul
                          className={styles.submenu}
                          initial={reduce ? false : { opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                          transition={{ duration: 0.18, ease: EASE }}
                        >
                          {item.children?.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={styles.submenuLink}
                                onClick={() => setOpenSubmenu(null)}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </m.ul>
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className={styles.actions}>
            <a href={BOOKING_URL} className={`btn btn--teal ${styles.headerBtn}`}>
              Book now
            </a>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className={styles.menuToggle}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((open) => !open)}
          >
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
            <span className="visuallyHidden">{drawerOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>

        <AnimatePresence>
          {drawerOpen && (
            <m.div
              className={styles.drawer}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: EASE }}
            >
              <nav className={`container ${styles.drawerInner}`} aria-label="Mobile">
                <ul className={styles.drawerList}>
                  {primaryNav.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={styles.drawerLink}
                        aria-current={pathname === item.href ? 'page' : undefined}
                        onClick={closeDrawer}
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <ul className={styles.drawerSubList}>
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={styles.drawerSubLink}
                                onClick={closeDrawer}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>

                <div className={styles.drawerActions}>
                  <a href={BOOKING_URL} className="btn btn--teal" onClick={closeDrawer}>
                    Book now
                  </a>
                  <a href={callHref} className="btn btn--outline" onClick={closeDrawer}>
                    Call / Text
                  </a>
                </div>
              </nav>
            </m.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
