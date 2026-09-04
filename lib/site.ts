/**
 * Single source of truth for every string, link and business detail on the page.
 * Edit here — the components read from this file, nothing is hard-coded in JSX.
 */

/** Change to the real production domain before deploying. Used for canonical URLs, OG tags and the sitemap. */
export const SITE_URL = 'https://thediamonddog.com'

/**
 * Phone number. The design says "Phone number pending GBP", so `number` is null
 * and every Call / Text control falls back to the contact page. Fill `number` in
 * (E.164, e.g. '+15155550142') and the buttons become real `tel:` links automatically.
 */
export const phone: { number: string | null; display: string } = {
  number: null,
  display: 'Phone number pending GBP',
}

export const callHref = phone.number ? `tel:${phone.number}` : '/contact'

/** Booking provider URL. Swap for the real scheduler (Square, Vagaro, Gingr, …). */
export const BOOKING_URL = '/book'

export const business = {
  name: 'The Diamond Dog',
  legalName: 'The Diamond Dog',
  tagline: 'Where grooming meets wellness. Personally guided, no kenneling.',
  owner: 'Kaylie',
  ownerRole: 'Owner and groomer',
  city: 'Urbandale',
  region: 'IA',
  regionName: 'Iowa',
  country: 'US',
  addressLine: 'Urbandale, Iowa. Serving Clive, Windsor Heights, Johnston and West Des Moines.',
  areaServed: ['Urbandale', 'Clive', 'Windsor Heights', 'Johnston', 'West Des Moines'],
  // Approximate centre of Urbandale, IA. Replace with the exact salon coordinates.
  geo: { latitude: 41.6266, longitude: -93.7124 },
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00', label: 'Mon to Fri 8 to 5' },
    { days: ['Saturday'], opens: '08:00', closes: '15:00', label: 'Sat 8 to 3' },
  ],
  priceRange: '$$',
} as const

export const social = [
  { name: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' as const },
  { name: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' as const },
  { name: 'X', href: 'https://x.com/', icon: 'x' as const },
]

export const primaryNav = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'De-Shedding Treatment', href: '/services/de-shedding-treatment' },
      { label: 'Full Groom', href: '/services/full-groom' },
      { label: 'Bath', href: '/services/bath' },
      { label: 'Sanitary Groom', href: '/services/sanitary-groom' },
      { label: 'Cat Grooming', href: '/services/cat-grooming' },
      { label: 'Add-Ons & Single Services', href: '/services/add-ons' },
    ],
  },
  { label: 'Wellness', href: '/wellness' },
  { label: 'Glow Up Gallery', href: '/glow-up-gallery' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export const hero = {
  headline: { before: 'Personally guided', middle: 'dog grooming in', script: 'Urbandale' },
  subhead: 'No kenneling. Home in 45 minutes to an hour.',
  body:
    'Salon-grade grooming, personally guided by me, with no kenneling and home in 45 minutes to an hour. That\u2019s health over hair, every time, right here in Urbandale.',
  proof: ['Salon-grade equipment', 'Open play pen', '18+ years grooming'],
  imageAlt: 'A golden retriever sitting upright and smiling after a full groom at The Diamond Dog.',
}

export const philosophy = {
  heading: 'Health over hair, always',
  body:
    'Healthy coats make for happy pups, and a great haircut is the cherry on top. Every pup is a little different, so I tailor each groom to what their skin and coat need most. Whether we\u2019re maintaining a favorite style, starting fresh, working on skin issues and allergies, or working together to grow out that fluffy coat instead of reaching for the clippers.',
  link: { label: 'Read the philosophy', href: '/about' },
  imageAlt: 'Kaylie gently brushing a white Maltese during a relaxed one-on-one grooming session.',
}

export type Service = {
  slug: string
  title: string
  description: string
  image: string
  imageAlt: string
  badge?: string
}

export const services = {
  eyebrow: 'Services',
  heading: 'A service built around what your dog needs',
  lede:
    'Whatever your dog needs, there\u2019s a service built around it, each with its own booking option so you\u2019re never stuck hunting for the right link.',
  featured: {
    slug: 'de-shedding-treatment',
    title: 'De-Shedding Treatment',
    description: 'Reduces shedding by up to 90% for double-coated breeds like huskies, goldens, and shepherds.',
    image: '/images/service-de-shedding-husky.webp',
    imageAlt: 'A husky with a bright, healthy double coat after a de-shedding treatment.',
    badge: 'Most booked',
  } satisfies Service,
  items: [
    {
      slug: 'full-groom',
      title: 'Full Groom',
      description: 'A complete cut and bath for doodles, poodles, Shih Tzus, and more.',
      image: '/images/service-full-groom-doodle.webp',
      imageAlt: 'A freshly trimmed white doodle wearing a blue bandana on the grooming table.',
    },
    {
      slug: 'bath',
      title: 'Bath',
      description: 'A full clean and refresh for short-coated breeds like Frenchies and bulldogs.',
      image: '/images/service-bath-corgi.webp',
      imageAlt: 'A corgi enjoying a bubbly bath in a grooming tub.',
    },
    {
      slug: 'sanitary-groom',
      title: 'Sanitary Groom',
      description: 'A clean tidy-up for belly, paws, and face, with body length unchanged.',
      image: '/images/service-sanitary-groom.webp',
      imageAlt: 'A groomer carefully trimming the paw pads of a long-haired golden retriever.',
    },
    {
      slug: 'cat-grooming',
      title: 'Cat Grooming',
      description: 'Gentle shave-downs and sanitary trims for cats.',
      image: '/images/service-cat-grooming.webp',
      imageAlt: 'A cream-coloured cat being combed calmly on a soft cushion.',
    },
  ] satisfies Service[],
  addOns: {
    slug: 'add-ons',
    title: 'Add-Ons & Single Services',
    description: 'Nail trims, medicated baths, and more, on their own or added to a groom.',
    image: '/images/service-add-ons-nail-trim.webp',
    imageAlt: 'A close-up of a nail trim in progress on a golden retriever\u2019s paw.',
  } satisfies Service,
}

export const whyChoose = {
  heading: 'Why owners choose me',
  body:
    'Eighteen-plus years of experience and know-how, a pace that gets your dog in and out without a long, drawn-out day, schedule flexibility, and a dog treated like she\u2019s my own. It\u2019s a model built around respecting both your time and your dog\u2019s comfort.',
  stats: [
    { value: '18+', label: 'Years of experience' },
    { value: '45\u201360', label: 'Minutes to home' },
    { value: 'No', label: 'Kenneling, open play pen' },
    { value: '15m', label: 'Pre-pickup call' },
  ],
}

export const gallery = {
  eyebrow: 'The Glow Up Gallery',
  heading: 'The work',
  lede:
    'A look inside the Glow Up Gallery, real grooms and full before-and-after transformations that show exactly what a health-over-hair plan can do over time.',
  link: { label: 'See more work', href: '/glow-up-gallery' },
  images: [
    {
      src: '/images/gallery-goldendoodle-suite.webp',
      alt: 'A goldendoodle sitting beside its bed in a bright, calm grooming suite.',
      size: 'large' as const,
    },
    {
      src: '/images/gallery-white-doodle-sunlight.webp',
      alt: 'A white doodle with a freshly rounded face standing in afternoon sunlight.',
      size: 'large' as const,
    },
    {
      src: '/images/gallery-goldendoodle-bandana.webp',
      alt: 'A red goldendoodle in a plaid bandana standing tall after a full groom.',
      size: 'small' as const,
    },
    {
      src: '/images/gallery-maltese-table.webp',
      alt: 'A small white Maltese looking at the camera from the grooming table.',
      size: 'small' as const,
    },
    {
      src: '/images/gallery-golden-puppy-station.webp',
      alt: 'A golden retriever puppy in a bow tie sitting at the grooming station.',
      size: 'small' as const,
    },
  ],
}

export const wellness = {
  eyebrow: 'Wellness',
  heading: { line1: 'Grooming is where', line2: 'wellness starts' },
  body:
    'Grooming is the starting point for your dog\u2019s overall comfort and coat and skin health. Call to learn more about how wellness fits into your dog\u2019s plan.',
  cta: 'Call to talk it through',
  link: { label: 'Wellness', href: '/wellness' },
  note: 'Wellness is a conversation, not a booking. This one is by phone.',
  imageAlt: 'Kaylie working through a sleeping goldendoodle\u2019s coat at the grooming table.',
}

export const finalCta = {
  heading: 'Ready to get started?',
  body: 'Let\u2019s get started. Book online, or call or text anytime.',
}

export const footerColumns = [
  {
    title: 'Services',
    links: [
      { label: 'De-Shedding Treatment', href: '/services/de-shedding-treatment' },
      { label: 'Full Groom', href: '/services/full-groom' },
      { label: 'Bath', href: '/services/bath' },
      { label: 'Sanitary Groom', href: '/services/sanitary-groom' },
      { label: 'Cat Grooming', href: '/services/cat-grooming' },
      { label: 'Add-Ons', href: '/services/add-ons' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Wellness', href: '/wellness' },
      { label: 'Anxious & Senior Dogs', href: '/anxious-and-senior-dogs' },
      { label: 'About', href: '/about' },
      { label: 'Glow Up Gallery', href: '/glow-up-gallery' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Before you book',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Vaccine Requirements', href: '/vaccine-requirements' },
      { label: 'Service Agreement', href: '/service-agreement' },
      { label: 'Contact', href: '/contact' },
      { label: 'Book now', href: BOOKING_URL },
    ],
  },
]

export const seo = {
  title: 'Dog Grooming in Urbandale, IA',
  titleFull: 'The Diamond Dog | Personally Guided Dog Grooming in Urbandale, IA',
  description:
    'Salon-grade dog grooming in Urbandale, Iowa, personally guided by Kaylie. No kenneling, home in 45 minutes to an hour, and 18+ years of health-over-hair experience.',
  keywords: [
    'dog grooming Urbandale',
    'dog groomer Urbandale IA',
    'de-shedding treatment Des Moines',
    'no kennel dog grooming',
    'cat grooming Urbandale',
    'mobile-friendly dog salon Iowa',
  ],
}
