/**
 * Static imports let Next.js infer intrinsic width/height at build time (no CLS)
 * and generate a base64 blur placeholder for each photo.
 */
import type { StaticImageData } from 'next/image'

import heroGolden from '@/public/images/hero-golden-retriever.webp'
import philosophyMaltese from '@/public/images/philosophy-brushing-maltese.webp'
import svcDeShedding from '@/public/images/service-de-shedding-husky.webp'
import svcFullGroom from '@/public/images/service-full-groom-doodle.webp'
import svcBath from '@/public/images/service-bath-corgi.webp'
import svcSanitary from '@/public/images/service-sanitary-groom.webp'
import svcCat from '@/public/images/service-cat-grooming.webp'
import svcAddOns from '@/public/images/service-add-ons-nail-trim.webp'
import galleryDoodleSuite from '@/public/images/gallery-goldendoodle-suite.webp'
import galleryWhiteDoodle from '@/public/images/gallery-white-doodle-sunlight.webp'
import galleryBandana from '@/public/images/gallery-goldendoodle-bandana.webp'
import galleryMaltese from '@/public/images/gallery-maltese-table.webp'
import galleryPuppy from '@/public/images/gallery-golden-puppy-station.webp'
import wellnessGroomer from '@/public/images/wellness-groomer-at-work.webp'

export {
  heroGolden,
  philosophyMaltese,
  wellnessGroomer,
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

/** Keyed by the public path used in lib/site.ts */
export const galleryImages: Record<string, StaticImageData> = {
  '/images/gallery-goldendoodle-suite.webp': galleryDoodleSuite,
  '/images/gallery-white-doodle-sunlight.webp': galleryWhiteDoodle,
  '/images/gallery-goldendoodle-bandana.webp': galleryBandana,
  '/images/gallery-maltese-table.webp': galleryMaltese,
  '/images/gallery-golden-puppy-station.webp': galleryPuppy,
}
