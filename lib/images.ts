/**
 * Static imports let Next.js infer intrinsic width/height at build time (no layout
 * shift) and generate a base64 blur placeholder for each photo.
 */
import type { StaticImageData } from 'next/image'

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

import wellnessTowelDog from '@/public/images/wellness-towel-dog.webp'
import wellnessAutumnWalk from '@/public/images/wellness-autumn-walk.webp'

import anxiousHeroCollie from '@/public/images/anxious-hero-collie.webp'
import anxiousGentleBrushing from '@/public/images/anxious-gentle-brushing.webp'
import anxiousPlayPen from '@/public/images/anxious-play-pen.webp'
import anxiousCtaBackdrop from '@/public/images/anxious-cta-backdrop.webp'

import addOnsHeroNailTrim from '@/public/images/addons-hero-nail-trim.webp'
import addOnsNailsScissors from '@/public/images/addons-nails-scissors.webp'
import addOnsFunPaw from '@/public/images/addons-fun-paw.webp'
import addOnsCtaBackdrop from '@/public/images/addons-cta-backdrop.webp'

import bathHeroSuds from '@/public/images/bath-hero-suds.webp'
import bathSetterTub from '@/public/images/bath-setter-tub.webp'

import catHeroKaylie from '@/public/images/cat-hero-kaylie.webp'
import catShaveGinger from '@/public/images/cat-shave-ginger.webp'
import catBannerBlowdry from '@/public/images/cat-banner-blowdry.webp'

import deshedHeroCollie from '@/public/images/deshed-collie.webp'
import deshedProcessChi from '@/public/images/deshed-process-chi.webp'
import deshedIncludedTrio from '@/public/images/deshed-included-trio.webp'

import fullGroomHeroDoodle from '@/public/images/fullgroom-hero-doodle.webp'
import fullGroomBrushing from '@/public/images/fullgroom-brushing.webp'

import sanitaryHeroRolling from '@/public/images/sanitary-hero-rolling.webp'
import sanitaryChihuahua from '@/public/images/sanitary-chihuahua-bowtie.webp'

import glRolling from '@/public/images/glowup-dog-rolling.webp'
import glAussie from '@/public/images/glowup-aussie-resting.webp'
import glBath from '@/public/images/glowup-bath-suds.webp'
import glCreamDoodle from '@/public/images/glowup-cream-doodle.webp'
import glRedPoodle from '@/public/images/glowup-red-poodle-bandana.webp'
import glOrangeCat from '@/public/images/glowup-orange-cat.webp'

/* Glow Up Gallery — client photo drop, one set per tab. Keys are prefixed with
   the tab so the two unrelated `IMG_3588` originals (a Boston terrier pair for
   Bath, a Yorkshire terrier for Sanitary Groom) can't collide. */
import tmMurphy from '@/public/images/testimonial-murphy.webp'
import tmHannah from '@/public/images/testimonial-hannah.webp'
import tmGia from '@/public/images/testimonial-gia.webp'
import tmWinnie from '@/public/images/testimonial-winnie.webp'

import glBathShowerCap from '@/public/images/glowup-bath-shower-cap.webp'
import glBathPointer from '@/public/images/glowup-bath-pointer-doorway.webp'
import glBathBostons from '@/public/images/glowup-bath-boston-pair.webp'
import glBathBasset from '@/public/images/glowup-bath-basset-tub.webp'

import glSanPoodle from '@/public/images/glowup-sanitary-apricot-poodle.webp'
import glSanBichon from '@/public/images/glowup-sanitary-bichon-bowtie.webp'
import glSanCockapoo from '@/public/images/glowup-sanitary-cockapoo-table.webp'
import glSanYorkie from '@/public/images/glowup-sanitary-yorkie.webp'

import glFgOrangeBandana from '@/public/images/glowup-fullgroom-orange-bandana.webp'
import glFgCreamDoodle from '@/public/images/glowup-fullgroom-cream-doodle-sit.webp'
import glFgTanDoodle from '@/public/images/glowup-fullgroom-tan-doodle-floor.webp'
import glFgApricotPoodle from '@/public/images/glowup-fullgroom-apricot-poodle.webp'
import glFgPoodleNecktie from '@/public/images/glowup-fullgroom-poodle-necktie.webp'
import glFgChocolatePoodle from '@/public/images/glowup-fullgroom-chocolate-poodle.webp'
import glFgBrownTerrier from '@/public/images/glowup-fullgroom-brown-terrier.webp'
import glFgLavenderBandana from '@/public/images/glowup-fullgroom-lavender-bandana.webp'
import glFgRedDoodle from '@/public/images/glowup-fullgroom-red-doodle-stand.webp'

import glDsWhiteSpitz from '@/public/images/glowup-deshed-white-spitz.webp'
import glDsBlackCollie from '@/public/images/glowup-deshed-black-collie.webp'
import glDsCorgi from '@/public/images/glowup-deshed-corgi.webp'
import glDsNewfoundland from '@/public/images/glowup-deshed-newfoundland.webp'
import glDsThreeDogs from '@/public/images/glowup-deshed-three-dogs.webp'
import glDsKelpie from '@/public/images/glowup-deshed-kelpie.webp'
import glDsBorderCollie from '@/public/images/glowup-deshed-border-collie.webp'

import svcDeShedding from '@/public/images/deshed-collie.webp'
import svcFullGroom from '@/public/images/service-full-groom.webp'
import svcBath from '@/public/images/service-bath.webp'
import svcSanitary from '@/public/images/service-sanitary-groom.webp'
import svcCat from '@/public/images/service-cat-grooming.webp'
import svcAddOns from '@/public/images/service-add-ons.webp'

import galCorgiTable from '@/public/images/gallery-corgi-table.webp'
import galBostons from '@/public/images/gallery-boston-pair.webp'
import galTrio from '@/public/images/gallery-trio-floor.webp'
import galNewfoundland from '@/public/images/gallery-newfoundland.webp'
import galSpitz from '@/public/images/gallery-white-spitz.webp'

export {
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
  wellnessTowelDog,
  wellnessAutumnWalk,
  anxiousHeroCollie,
  anxiousGentleBrushing,
  anxiousPlayPen,
  anxiousCtaBackdrop,
  addOnsHeroNailTrim,
  addOnsNailsScissors,
  addOnsFunPaw,
  addOnsCtaBackdrop,
  bathHeroSuds,
  bathSetterTub,
  catHeroKaylie,
  catShaveGinger,
  catBannerBlowdry,
  deshedHeroCollie,
  deshedProcessChi,
  deshedIncludedTrio,
  fullGroomHeroDoodle,
  fullGroomBrushing,
  sanitaryHeroRolling,
  sanitaryChihuahua,
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

/** Keyed by the `photo` field on a `testimonials.items` entry */
export const testimonialPhotos: Record<string, StaticImageData> = {
  gia: tmGia,
  winnie: tmWinnie,
  hannah: tmHannah,
  murphy: tmMurphy,
}

/** Keyed by the `key` field on each entry in `glowUpGallery.items` */
export const glowUpImages: Record<string, StaticImageData> = {
  'dog-rolling': glRolling,
  'aussie-resting': glAussie,
  'bath-suds': glBath,
  'cream-doodle': glCreamDoodle,
  'red-poodle-bandana': glRedPoodle,
  'orange-cat': glOrangeCat,

  'bath-shower-cap': glBathShowerCap,
  'bath-pointer-doorway': glBathPointer,
  'bath-boston-pair': glBathBostons,
  'bath-basset-tub': glBathBasset,

  'sanitary-apricot-poodle': glSanPoodle,
  'sanitary-bichon-bowtie': glSanBichon,
  'sanitary-cockapoo-table': glSanCockapoo,
  'sanitary-yorkie': glSanYorkie,

  'fullgroom-orange-bandana': glFgOrangeBandana,
  'fullgroom-cream-doodle-sit': glFgCreamDoodle,
  'fullgroom-tan-doodle-floor': glFgTanDoodle,
  'fullgroom-apricot-poodle': glFgApricotPoodle,
  'fullgroom-poodle-necktie': glFgPoodleNecktie,
  'fullgroom-chocolate-poodle': glFgChocolatePoodle,
  'fullgroom-brown-terrier': glFgBrownTerrier,
  'fullgroom-lavender-bandana': glFgLavenderBandana,
  'fullgroom-red-doodle-stand': glFgRedDoodle,

  'deshed-white-spitz': glDsWhiteSpitz,
  'deshed-black-collie': glDsBlackCollie,
  'deshed-corgi': glDsCorgi,
  'deshed-newfoundland': glDsNewfoundland,
  'deshed-three-dogs': glDsThreeDogs,
  'deshed-kelpie': glDsKelpie,
  'deshed-border-collie': glDsBorderCollie,
}

/** Keyed by the `key` field on each home-page gallery entry in lib/site.ts */
export const galleryImages: Record<string, StaticImageData> = {
  'corgi-table': galCorgiTable,
  'boston-pair': galBostons,
  'trio-floor': galTrio,
  'newfoundland': galNewfoundland,
  'white-spitz': galSpitz,
}

