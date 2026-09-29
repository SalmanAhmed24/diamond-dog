/**
 * Static imports let Next.js infer intrinsic width/height at build time (no layout
 * shift) and generate a base64 blur placeholder for each photo.
 */
import type { StaticImageData } from 'next/image'

import logo from '@/public/images/logo-the-diamond-dog.png'
import heroKaylie from '@/public/images/hero-kaylie-with-dogs.webp'
import philosophyKaylie from '@/public/images/philosophy-kaylie-and-dog.webp'
import differenceBackdrop from '@/public/images/difference-backdrop.webp'
import ctaBackdrop from '@/public/images/cta-backdrop.webp'
import wellnessGroomer from '@/public/images/wellness-groomer-at-work.webp'

import aboutHeroCorgi from '@/public/images/about-hero-corgi.webp'
import aboutGuideDog from '@/public/images/about-guide-dog.webp'
import aboutCtaBackdrop from '@/public/images/about-cta-backdrop.webp'

import bookBeforeYouBook from '@/public/images/book-before-you-book.webp'
import bookCtaBackdrop from '@/public/images/book-cta-backdrop.webp'

import contactWhereIWork from '@/public/images/contact-where-i-work.webp'
import contactCtaBackdrop from '@/public/images/contact-cta-backdrop.webp'

import svcDeShedding from '@/public/images/service-de-shedding.webp'
import svcFullGroom from '@/public/images/service-full-groom.webp'
import svcBath from '@/public/images/service-bath.webp'
import svcSanitary from '@/public/images/service-sanitary-groom.webp'
import svcCat from '@/public/images/service-cat-grooming.webp'
import svcAddOns from '@/public/images/service-add-ons.webp'

import galDoodle from '@/public/images/gallery-doodle-bookshelf.webp'
import galTerriers from '@/public/images/gallery-terrier-pair.webp'
import galPoodle from '@/public/images/gallery-red-poodle.webp'
import galCat from '@/public/images/gallery-orange-cat.webp'
import galCorgi from '@/public/images/gallery-corgi-deshed.webp'

export {
  logo,
  heroKaylie,
  philosophyKaylie,
  differenceBackdrop,
  ctaBackdrop,
  wellnessGroomer,
  aboutHeroCorgi,
  aboutGuideDog,
  aboutCtaBackdrop,
  bookBeforeYouBook,
  bookCtaBackdrop,
  contactWhereIWork,
  contactCtaBackdrop,
}

/** Keyed by the service slug used in lib/site.ts */
export const serviceImages: Record<string, StaticImageData> = {
  'de-shedding-treatment': svcDeShedding,
  'full-groom': svcFullGroom,
  bath: svcBath,
  'sanitary-groom': svcSanitary,
  'cat-grooming': svcCat,
  'add-ons': svcAddOns,
}

/** Keyed by the `key` field on each gallery entry in lib/site.ts */
export const galleryImages: Record<string, StaticImageData> = {
  'doodle-bookshelf': galDoodle,
  'terrier-pair': galTerriers,
  'red-poodle': galPoodle,
  'orange-cat': galCat,
  'corgi-deshed': galCorgi,
}
