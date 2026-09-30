/**
 * Single source of truth for every string, link and business detail on the page.
 * Edit here — the components read from this file, nothing is hard-coded in JSX.
 */

/** Change to the real production domain before deploying. Used for canonical URLs, OG tags and the sitemap. */
export const SITE_URL = 'https://thediamonddog.com'

export const phone = {
  number: '+15153155354',
  display: '515-315-5354',
}

export const callHref = `tel:${phone.number}`

/** Booking provider URL. Swap for the real scheduler (Square, Vagaro, Gingr, …). */
export const BOOKING_URL = '/book'

export const business = {
  name: 'The Diamond Dog',
  legalName: 'The Diamond Dog',
  subtitle: 'Pet Grooming',
  owner: 'Kaylie',
  ownerFullName: 'Kaylie Chalupa',
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
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
      label: 'Mon to Fri 8 to 5',
      labelLong: 'Mon to Fri, 8:00 to 5:00',
    },
    {
      days: ['Saturday'],
      opens: '08:00',
      closes: '15:00',
      label: 'Sat 8 to 3',
      labelLong: 'Sat 8:00 to 3:00, by appointment',
    },
  ],
  hoursSummary: 'Mon to Fri 8 to 5, Sat 8 to 3 by appointment',
  copyright: '\u00A9 2026 The Diamond Dog Pet Grooming',
  priceRange: '$$',
} as const

export const social = [
  { name: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' as const },
  { name: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' as const },
  { name: 'Google', href: 'https://www.google.com/maps', icon: 'google' as const },
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
      { label: 'Add Ons & Single Services', href: '/services/add-ons' },
    ],
  },
  { label: 'Wellness', href: '/wellness' },
  { label: 'Glow Up Gallery', href: '/glow-up-gallery' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export const hero = {
  headline: ['A more personal', 'approach to dog', 'grooming in Urbandale'],
  subhead: 'No kenneling. Home in 45 minutes to an hour.',
  body:
    'Salon-grade grooming, personally guided by me, with no kenneling and home in 45 minutes to an hour. That\u2019s health over hair, every time, right here in Urbandale.',
  proof: ['Salon-grade equipment', 'Open play pen', '18+ years grooming'],
  badge: { value: '18+', label: 'Years experience' },
  imageAlt: 'Kaylie kneeling outdoors with four freshly groomed dogs around her.',
}

export const philosophy = {
  heading: 'Health over hair, always',
  body:
    'Healthy coats make for happy pups, and a great haircut is the cherry on top. Every pup is a little different, so I tailor each groom to what their skin and coat need most. Whether we\u2019re maintaining a favorite style, starting fresh, working on skin issues and allergies, or working together to grow out that fluffy coat instead of reaching for the clippers.',
  link: { label: 'Read the philosophy', href: '/about' },
  imageAlt: 'Kaylie holding a black and white dog that is licking her cheek.',
}

export type Service = {
  slug: string
  title: string
  description: string
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
    description:
      'A de-shed is a multi step process built specifically to pull dead undercoat out of a double coated dog, helping them cool their temperature naturally. It starts with a high end de shedding shampoo and conditioner that is specifically formulated to loosen and release the dead hair sitting beneath the top coat, that of which I blow out! The win? Your dog is able to control their temperature and maintain comfortability through Iowa seasons\u2014 for you? It reduces shedding by up to 90 percent!',
    imageAlt: 'A double-coated Australian shepherd lying comfortably on the salon floor.',
    badge: 'Most booked',
  } satisfies Service,
  items: [
    {
      slug: 'full-groom',
      title: 'Full Groom',
      description: 'Cut, bath, blow out, nail trim, ear cleaning and anal gland expression',
      imageAlt: 'A goldendoodle standing in the salon after a full groom, wearing a patterned collar.',
    },
    {
      slug: 'bath',
      title: 'Bath',
      description: 'A full clean and refresh for short-coated breeds like Frenchies and bulldogs.',
      imageAlt: 'A short-coated dog covered in suds standing in the grooming tub.',
    },
    {
      slug: 'sanitary-groom',
      title: 'Sanitary Groom',
      description:
        'A clean tidy-up for doodles, Yorkies, Maltese, or any dog we are growing out. (This service is included in the De-shed)',
      imageAlt: 'A relaxed tan dog rolling onto its back on the salon floor.',
    },
    {
      slug: 'cat-grooming',
      title: 'Cat Grooming',
      description: 'Gentle shave-downs and sanitary trims for cats.',
      imageAlt: 'Kaylie holding a long-haired tabby cat in the salon.',
    },
  ] satisfies Service[],
  addOns: {
    slug: 'add-ons',
    title: 'Add Ons & Single Services',
    description: 'Nail trims, Medicated bath, Paw soak, Flea dip and more.',
    imageAlt: 'A close-up of a nail trim in progress on a spotted dog\u2019s paw.',
  } satisfies Service,
  cta: {
    heading: 'Not sure what your pet needs? Call or text and I can help!',
    body: 'Phone number provided can be texted 24 hours a day!',
  },
}

export const whyChoose = {
  eyebrow: 'The difference',
  heading: 'Why owners choose me',
  body:
    'Eighteen-plus years of experience and know-how, a pace that gets your dog in and out without a long, drawn-out day, schedule flexibility, and I treat your pet like my own. It\u2019s a model built around respecting both your time and your dog\u2019s comfort.',
  stats: [
    { value: '18+', label: 'Years of experience' },
    { value: '45\u201360', label: 'Minutes to home' },
    { value: 'No', label: 'Kenneling \u2014 open play pen' },
    { value: '15 min', label: 'Pre-pickup call' },
  ],
}

export const gallery = {
  eyebrow: 'The Glow Up Gallery',
  heading: 'Glow up gallery',
  lede:
    'Real grooms and full before-and-after transformations that show exactly what a health-over-hair plan can do over time.',
  link: { label: 'See more work', href: '/glow-up-gallery' },
  images: [
    {
      key: 'doodle-bookshelf',
      alt: 'A cream goldendoodle standing in front of a bookshelf after a full groom.',
      size: 'large' as const,
    },
    {
      key: 'terrier-pair',
      alt: 'Two freshly groomed terriers in matching donut-print ties on the grooming table.',
      size: 'large' as const,
    },
    {
      key: 'red-poodle',
      alt: 'A red poodle in a patterned bandana sitting on the grooming table.',
      size: 'small' as const,
    },
    {
      key: 'orange-cat',
      alt: 'An orange cat resting on the table after a lion-cut shave-down.',
      size: 'small' as const,
    },
    {
      key: 'corgi-deshed',
      alt: 'A corgi beside the pile of undercoat removed during its de-shedding treatment.',
      size: 'small' as const,
    },
  ],
}

export const wellness = {
  eyebrow: 'Wellness',
  heading: 'Grooming is where wellness starts',
  body:
    'Grooming is the starting point for your dog\u2019s overall comfort and coat and skin health. Call to learn more about how wellness fits into your dog\u2019s plan.',
  cta: 'Call to talk it through',
  note: 'Wellness is a conversation, not a booking. This one is by phone.',
  imageAlt: 'A groomer working carefully through a sleeping goldendoodle\u2019s coat.',
}

export const finalCta = {
  heading: 'Ready to get started!',
  body: 'Let\u2019s get started. Book online, or call or text anytime.',
}

export const about = {
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ],
  hero: {
    heading: 'Health Over Hair - About The Diamond Dog',
    body:
      'Health over hair, personally guided from start to finish. Meet Kaylie Chalupa, the groomer behind The Diamond Dog, with over 18 years of experience in Urbandale.',
    proof: ['Never kenneled', 'One dog at a time', 'Home in 45 min to 1 hr'],
    badge: { value: '18+', label: 'Years experience' },
    imageAlt:
      'A corgi sitting on the grooming table beside the pile of undercoat removed during its de-shed.',
  },
  process: {
    heading: 'How a groom works with me',
    body:
      'Every groom is personally planned and guided by Kaylie. Most dogs are home in 45 minutes to an hour, with large and extra large dogs taking a bit longer, depending on the service and their coat. About 15 minutes before your dog is ready, you\u2019ll get a call, so there\u2019s no unnecessary waiting around while you\u2019re on your way. It\u2019s a small detail, but it\u2019s built directly out of the idea that your dog\u2019s time matters just as much as yours.',
  },
  guide: {
    heading: 'Tell me about your dog, and I\u2019ll guide you',
    body:
      'The best grooming plans start with a real conversation. Come in, tell me about your dog, their coat, their temperament, what\u2019s worked and what hasn\u2019t, and I\u2019ll guide you toward the plan that fits. I don\u2019t do one-size-fits-all packages. Call and tell me about your dog\u2019s skin and coat problems so I can give you a solution that works for you and your pet. I follow up after building a plan, because every client should feel like they\u2019re my only client, not one of many moving through on a schedule.',
    imageAlt: 'A tan and white dog rolling happily on its back on the salon floor.',
  },
  cta: {
    heading: 'Ready to get started?',
    body: 'Ready to bring your dog in? Let\u2019s get started! Book online, or call or text anytime.',
    callLabel: 'Call or text',
  },
}

/**
 * The two questions shown on /about. Deliberately separate from `faqPage`:
 * only the dedicated FAQ page emits FAQPage structured data, so the two never
 * contradict each other in search results.
 */
export const aboutFaqs = {
  eyebrow: 'Questions',
  heading: 'Frequently asked questions',
  items: [
    {
      question: 'Is my dog kenneled during grooming?',
      answer:
        'No, I don\u2019t kennel your dog during grooming. While waiting, dogs stay in a comfortable, open room or a play pen if they feel more comfortable in a smaller space rather than a cage.',
    },
    {
      question: 'How long will my dog\u2019s grooming take?',
      answer:
        'I have most dogs home in 45 minutes to an hour. Large and extra large dogs typically take a bit longer. The exact time depends on the service and your dog\u2019s size and coat, and I personally plan and guide every groom.',
    },
  ],
}

export const faqPage = {
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'FAQ', href: '/faq' },
  ],
  hero: { heading: 'Dog Grooming FAQ', callLabel: 'Call or text' },
  heading: 'The questions',
  items: [
    {
      id: 'kenneling',
      question: 'Is my dog kenneled during grooming?',
      answer:
        'No, I don\u2019t kennel your dog during grooming. While waiting, dogs stay in a comfortable, open play pen rather than a cage.',
      readMoreHref: '/about',
    },
    {
      id: 'bordetella',
      question: 'Why don\u2019t you require the Bordetella vaccine?',
      answer:
        'I don\u2019t require Bordetella, because it\u2019s meant for long-term boarding, not a grooming visit. The vaccine protects against kennel cough, which spreads through prolonged, close contact between dogs in boarding environments. Since I groom your dog and send them home the same day rather than boarding them, that level of exposure doesn\u2019t apply.',
      readMoreHref: '/vaccine-requirements',
    },
    {
      id: 'how-long',
      question: 'How long will my dog\u2019s grooming take?',
      answer:
        'I have most dogs home in 45 minutes to an hour. Large and extra large dogs typically take a bit longer. The exact time depends on the service and your dog\u2019s size and coat, and I personally plan and guide every groom.',
      readMoreHref: '/about',
    },
    {
      id: 'matting',
      question: 'My dog is matted - what will you do?',
      answer:
        'I\u2019ll remove the unhealthy matted coat humanely, then build a grow-out plan back to the coat you want. Health over hair means I take the mats out safely first, then work back toward your dog\u2019s full coat over time.',
      readMoreHref: '/services/full-groom',
    },
    {
      id: 'vaccines',
      question: 'What vaccines does my dog need before grooming?',
      answer:
        'I only need your dog to have distemper/parvo and rabies - nothing more. Puppies can start after two sets of distemper/parvo, typically around 12 weeks, with rabies added after 16 weeks.',
      readMoreHref: '/vaccine-requirements',
    },
    {
      id: 'bath-vs-deshed',
      question: 'What\u2019s the difference between a bath and a de-shed?',
      answer:
        'A bath cleans the coat; my de-shedding treatment removes the dead undercoat trapped underneath it. Double-coated breeds need the de-shed, not a bath, since a bath alone won\u2019t release that undercoat - and the de-shed can reduce shedding by up to 90%.',
      readMoreHref: '/services/de-shedding-treatment',
    },
    {
      id: 'how-often',
      question: 'How often should I groom my doodle or double-coated dog?',
      answer:
        'I recommend grooming most doodle and double-coated dogs every 4 to 6 weeks. I\u2019ll work with you to build a regular pattern that fits your specific dog\u2019s coat and lifestyle.',
      readMoreHref: '/services',
    },
    {
      id: 'anxious-senior',
      question: 'Do you groom anxious or senior dogs?',
      answer:
        'Yes, anxious and senior dogs are exactly who I built my model for. Personal, unhurried attention with no kennel and no long wait tends to suit a nervous or older dog far better than a typical grooming environment.',
      readMoreHref: '/anxious-and-senior-dogs',
    },
    {
      id: 'puppy-first-groom',
      question: 'When can my puppy have its first groom?',
      answer:
        'I can give your puppy its first groom after two sets of distemper/parvo, usually around 12 weeks. Rabies is required after 16 weeks, in line with standard puppy vaccine timing.',
      readMoreHref: '/vaccine-requirements',
    },
    {
      id: 'holding-pickup',
      question: 'What if I can\u2019t pick up my dog right away?',
      answer:
        'I offer holding for a fee if you can\u2019t pick your dog up right away. A respectful heads-up is appreciated and may waive that fee - communication matters more to me than a strict cutoff time.',
      readMoreHref: '/service-agreement',
    },
  ],
  resources: {
    eyebrow: 'Before you book',
    heading: 'The rest of what you might need',
    items: [
      {
        icon: 'shield',
        title: 'Vaccine Requirements',
        description: 'What\u2019s required before a groom, and what isn\u2019t.',
        href: '/vaccine-requirements',
      },
      { icon: 'check', title: 'Service Agreement', href: '/service-agreement' },
      { icon: 'calendar', title: 'Book a groom', href: BOOKING_URL },
    ],
  },
  cta: {
    heading: 'Ready to get started?',
    body: 'Book online any time, or call or text if you\u2019d rather talk it through first.',
    callLabel: 'Call or text',
  },
}

/**
 * MoeGo booking embed. Leave null and the page renders the design's placeholder
 * panel instead of an empty iframe; set the share URL from MoeGo and the real
 * scheduler appears in its place with no other change.
 */
export const BOOKING_EMBED_URL: string | null = null

export const book = {
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Book', href: '/book' },
  ],
  hero: {
    heading: 'Book Your Groom',
    body:
      'Booking below will walk you through exactly which services fit your dog, based on their breed, size, and coat, so you\u2019re never left guessing which one to pick.',
  },
  checklist: {
    title: 'Have these ready',
    items: [
      {
        icon: 'shield' as const,
        label: 'Vaccine records',
        text: 'Distemper/parvo and rabies.',
        link: { label: 'What is required', href: '/vaccine-requirements' },
      },
      {
        icon: 'check' as const,
        label: 'The service agreement',
        text: 'Fees and pickup, in plain terms.',
        link: { label: 'Read it first', href: '/service-agreement' },
      },
      {
        icon: 'paw' as const,
        label: 'Which service fits',
        text: 'Priced by coat and size.',
        link: { label: 'Compare services', href: '/services' },
      },
    ],
  },
  booking: {
    eyebrow: 'Booking',
    heading: 'The booking',
    lede:
      'Pick your service and time below. If you\u2019re not sure which service fits, call or text and I\u2019ll help you choose.',
    placeholder: 'MoeGo booking embed',
    caption: 'Booking runs on MoeGo. Wellness enquiries are by phone, not through this form.',
  },
  beforeYouBook: {
    heading: 'Before you book',
    body:
      'A couple of things worth a quick look before your appointment: our vaccine requirements and our service agreement, so there are no surprises on the day.',
    imageAlt: 'Someone booking an appointment on a laptop calendar at a sunlit desk.',
  },
  resources: {
    heading: 'The rest of what you might need',
    items: [
      {
        icon: 'info',
        title: 'FAQ',
        description: 'Straight answers to what owners ask most.',
        href: '/faq',
      },
      { icon: 'shield', title: 'Vaccine Requirements', href: '/vaccine-requirements' },
      { icon: 'check', title: 'Service Agreement', href: '/service-agreement' },
    ],
  },
  cta: {
    heading: 'Ready to get started?',
    body: 'Book online any time, or call or text if you\u2019d rather talk it through first.',
    callLabel: 'Call or text',
  },
}

/**
 * Map embed. The design gives the studio as "Urbandale, Iowa" with no street
 * address, so the map is centred on the town.
 *
 * `embedUrl` uses Google's keyless embed endpoint, which needs no API key and
 * no billing account. If you would rather use the official Maps Embed API,
 * swap in:
 *   https://www.google.com/maps/embed/v1/place?key=YOUR_KEY&q=Urbandale,IA
 */
export const map = {
  query: 'Urbandale, Iowa',
  zoom: 12,
  embedUrl: 'https://maps.google.com/maps?q=Urbandale%2C%20Iowa&z=12&output=embed',
  linkUrl: 'https://www.google.com/maps/place/Urbandale,+IA',
  title: 'Map showing Urbandale, Iowa, where The Diamond Dog is based',
}

export const contact = {
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact' },
  ],
  hero: {
    heading: 'Contact & Hours',
    body:
      'The easiest ways to reach me is by phone, text, or booking directly online, and most clients find texting the fastest way to get a quick answer. Hours are Monday through Friday 8 to 5, and Saturday 8 to 3, by appointment.',
  },
  details: {
    phoneLabel: 'Phone and text',
    hoursLabel: 'Hours',
    studioLabel: 'Studio',
    studioValue: 'Urbandale, Iowa',
  },
  reach: {
    eyebrow: 'Contact',
    heading: 'How to reach me',
  },
  whereIWork: {
    heading: 'Where I work',
    body:
      'Diamond Dog Grooming serves Urbandale and the surrounding area, including Clive, Windsor Heights, Johnston, and West Des Moines.',
    imageAlt: 'A deep red velvet sofa in the bright, plant-filled waiting area.',
  },
  cta: {
    heading: 'Ready to get started?',
    body: 'Let\u2019s get started! Book online, or call or text anytime.',
    callLabel: 'Call or text',
  },
}

export const GALLERY_TAGS = [
  'All',
  'De-Shedding Treatment',
  'Full Groom',
  'Bath',
  'Sanitary Groom',
  'Cat Grooming',
  'Add-Ons & Single Services',
] as const

export type GalleryTag = (typeof GALLERY_TAGS)[number]

export const glowUpGallery = {
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Gallery', href: '/glow-up-gallery' },
  ],
  hero: {
    heading: 'The Glow Up Gallery - before, after, and the plan in between',
    body:
      'Welcome to the Glow Up Gallery. Real dogs, real transformations, including full before-and-after photos that show what a health-over-hair plan looks like over time.',
    callLabel: 'Call or text',
  },
  eyebrow: 'The Glow Up Gallery',
  heading: 'The gallery',
  /** Order here is the order shown under "All". */
  items: [
    {
      key: 'terrier-pair-ties',
      tag: 'Add-Ons & Single Services',
      shape: 'wide',
      alt: 'Two freshly groomed terriers in matching donut-print ties on the grooming table.',
    },
    {
      key: 'dog-rolling',
      tag: 'Sanitary Groom',
      shape: 'wide',
      alt: 'A tan and white dog rolling happily on its back on the salon floor after a sanitary groom.',
    },
    {
      key: 'bw-coat-before',
      tag: 'De-Shedding Treatment',
      shape: 'square',
      alt: 'A black and white double-coated dog standing on the table before its de-shedding treatment.',
    },
    {
      key: 'aussie-resting',
      tag: 'De-Shedding Treatment',
      shape: 'square',
      alt: 'An Australian shepherd resting on the salon floor with a bright, de-shedded coat.',
    },
    {
      key: 'bath-suds',
      tag: 'Bath',
      shape: 'square',
      alt: 'A short-coated dog covered in suds standing in the grooming tub.',
    },
    {
      key: 'cream-doodle',
      tag: 'Full Groom',
      shape: 'square',
      alt: 'A cream goldendoodle standing in front of a bookshelf after a full groom.',
    },
    {
      key: 'red-doodle-floor',
      tag: 'Full Groom',
      shape: 'square',
      alt: 'A red goldendoodle lying on a wooden floor after a full groom, wearing a patterned collar.',
    },
    {
      key: 'red-poodle-bandana',
      tag: 'Add-Ons & Single Services',
      shape: 'square',
      alt: 'A red poodle in a paw-print bandana sitting on the grooming table.',
    },
    {
      key: 'orange-cat',
      tag: 'Cat Grooming',
      shape: 'square',
      alt: 'An orange cat resting on the table after a lion-cut shave-down.',
    },
  ] satisfies {
    key: string
    tag: GalleryTag
    shape: 'wide' | 'square'
    alt: string
  }[],
  cta: {
    heading: 'Ready to get started?',
    body: 'Like what you see? Let\u2019s get started! Book online, or call or text anytime.',
    callLabel: 'Call or text',
  },
}

export const serviceAgreement = {
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Service Agreement', href: '/service-agreement' },
  ],
  heading: 'Service Agreement',
  callLabel: 'Call or text',
  sections: [
    {
      id: 'matting-behavior-fee',
      heading: 'The matting & behavior fee',
      body:
        'Some grooms carry an added fee for heavy matting or difficult behavior, assessed in person when your dog arrives. It reflects the real time and care a harder groom takes, and is assessed honestly on the day of arrival.',
    },
    {
      id: 'holding-pickup',
      heading: 'Holding & pickup',
      body:
        'A fee applies if your dog is held for an extended time after their groom is finished, since holding your dog isn\u2019t the same as daycare and takes up time and space meant for the next appointment. That said, communication goes a long way here, a respectful heads-up that you\u2019ll be running late is genuinely appreciated and may waive that fee entirely.',
    },
  ],
  faq: {
    eyebrow: 'Questions',
    heading: 'Frequently asked questions',
    /** Pulled from faqPage.items by id, so the wording can never drift. */
    itemIds: ['holding-pickup'],
  },
  cta: {
    heading: 'Ready to get started?',
    body: 'Like what you see? Let\u2019s get started! Book online, or call or text anytime.',
    callLabel: 'Call or text',
  },
}

/** Look up FAQ entries by id for pages that reuse a question. */
export function faqsById(ids: string[]) {
  return ids
    .map((id) => faqPage.items.find((item) => item.id === id))
    .filter((item): item is (typeof faqPage.items)[number] => Boolean(item))
}

export const vaccineRequirements = {
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Vaccine Requirements', href: '/vaccine-requirements' },
  ],
  heading: 'Vaccine Requirements',
  callLabel: 'Call or text',
  sections: [
    {
      id: 'what-the-law-requires',
      heading: 'What the law requires',
      body:
        'Only two vaccines are actually required before grooming: distemper/parvo and rabies. Nothing else is needed to book.',
    },
    {
      id: 'why-no-bordetella',
      heading: 'Why we don\u2019t require the Bordetella vaccine',
      body:
        'Bordetella is typically required for long-term boarding, not for a grooming visit. Most groomers require it because dogs are co-mingled and kenneled together over extended stays, which is exactly the environment where airborne illness like kennel cough spreads. A grooming appointment here doesn\u2019t create that kind of prolonged exposure, so the vaccine that exists to guard against it isn\u2019t required.',
    },
    {
      id: 'puppies',
      heading: 'Puppies',
      body:
        'A puppy\u2019s earliest groom can happen after two sets of distemper/parvo vaccines, typically around 12 weeks old. Rabies vaccination is required after 16 weeks, which lines up with standard puppy vaccine schedules most owners are already following with their vet.',
    },
    {
      id: 'how-to-send-records',
      heading: 'How to send your records',
      body:
        'Sending vaccine records is simple. Just email them over ahead of your appointment, and they\u2019ll be kept on file so you don\u2019t need to bring paperwork every visit.',
    },
  ],
  faq: {
    eyebrow: 'Questions',
    heading: 'Frequently asked questions',
    /** Pulled from faqPage.items by id, so the wording can never drift. */
    itemIds: ['bordetella', 'puppy-first-groom'],
  },
  cta: {
    heading: 'Ready to get started?',
    body: 'Let\u2019s get started! Book online, or call or text anytime.',
    callLabel: 'Call or text',
  },
}

export const wellnessPage = {
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Wellness', href: '/wellness' },
  ],
  hero: {
    heading: 'Where Grooming Meets Wellness',
    body:
      'When I groom your dog, I\u2019m looking at more than the haircut - I\u2019m looking at their comfort, their skin, and their coat health. That\u2019s where grooming meets wellness. Call or text to book a wellness check or visit.',
    callLabel: 'Call or text',
    imageAlt: 'A freshly bathed white spitz wrapped in a bright blue towel, tongue out and happy.',
  },
  signals: {
    eyebrow: 'What I watch while I work',
    heading: 'A groom is a window into how your dog is doing',
    items: [
      { icon: 'sparkle', title: 'Coat health', description: 'A coat that\u2019s gone dull' },
      { icon: 'leaf', title: 'Skin', description: 'Skin that reacts differently than it used to' },
      {
        icon: 'heart',
        title: 'Comfort',
        description: 'A dog suddenly uncomfortable being brushed in one spot',
      },
      {
        icon: 'calendar',
        title: 'The right schedule',
        description: 'The right bath, the right schedule, the things to watch',
      },
    ],
  },
  philosophy: {
    heading: 'The wellness philosophy',
    body:
      '\u201CWhere grooming meets wellness\u201D means I treat every groom as a window into how your dog is really doing. A coat that\u2019s gone dull, skin that reacts differently than it used to, a dog who\u2019s suddenly uncomfortable being brushed in one spot - I notice those things while I work, because I\u2019m with your dog one-on-one from start to finish, not rushing them through a line. To me, none of that is separate from grooming. It\u2019s the same health-over-hair thinking that shapes every cut I do: your dog\u2019s comfort and long-term skin and coat health come first, and the look follows from that. So instead of sending you home with a nice haircut and nothing else, I\u2019ll tell you what I\u2019m seeing and help you build a plan around it - the right bath, the right schedule, the things to keep an eye on. It\u2019s a plan built around your whole dog, not just today\u2019s appointment.',
    link: { label: 'Read the philosophy', href: '/about' },
    imageAlt: 'An owner crouching beside her golden retriever among autumn leaves.',
  },
  assess: {
    heading: 'Come in and let me assess your dog',
    body:
      'The best way to start is simple: bring your dog in and tell me about them. What their coat\u2019s been doing, how they handle grooming, what\u2019s worked and what hasn\u2019t, anything you\u2019ve been wondering about. From there I\u2019ll take a real look and guide you on what they actually need - both the grooming side and the wellness side. I don\u2019t do one-size-fits-all packages, and I don\u2019t guess. I\u2019d rather have a real conversation with you, because that\u2019s genuinely how I work best. I also follow up after we build a plan, because I want every client to feel like they\u2019re my only client, not one dog moving through a busy day. If that sounds like what you\u2019ve been looking for, give me a call and let\u2019s talk through your dog.',
    callLabel: 'Call or text',
    link: { label: 'Anxious and senior dogs', href: '/anxious-and-senior-dogs' },
  },
  boundary: {
    heading: 'Where wellness ends and the vet begins',
    body:
      'To be clear about where my line is: wellness with me means comfort, skin, and coat health - nothing medical. I\u2019m not diagnosing or treating anything. If I notice something that looks like it needs a vet, I\u2019ll tell you plainly and point you to your vet or the right specialist. That boundary matters to me, and I take it seriously. It\u2019s part of taking real care of your dog.',
  },
  cta: {
    heading: 'Want to talk through your dog\u2019s coat, comfort, or overall wellness?',
    body:
      'Give me a call or text and let\u2019s start the conversation - no booking widget, just a real talk about your dog.',
    callLabel: 'Call or text',
    note: 'Wellness is a conversation, not a booking. This one is by phone.',
  },
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
      { label: 'Add-Ons & Single Services', href: '/services/add-ons' },
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
  titleFull: 'The Diamond Dog | Personal Dog Grooming in Urbandale, IA',
  description:
    'A more personal approach to dog grooming in Urbandale, Iowa. No kenneling, home in 45 minutes to an hour, and 18+ years of health-over-hair experience with Kaylie.',
  keywords: [
    'dog grooming Urbandale',
    'dog groomer Urbandale IA',
    'de-shedding treatment Des Moines',
    'no kennel dog grooming',
    'cat grooming Urbandale',
    'pet grooming Iowa',
  ],
}
