import Link from 'next/link'

import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="container section" style={{ minHeight: '46vh' }}>
        <h1 className="sectionTitle">That page has wandered off</h1>
        <p className="lede" style={{ marginTop: '1rem' }}>
          The link may be out of date. Head back to the home page, or get in touch and we&rsquo;ll point you
          the right way.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.75rem' }}>
          <Link href="/" className="btn btn--teal">
            Back to home
          </Link>
          <Link href="/contact" className="btn btn--outline">
            Contact
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
