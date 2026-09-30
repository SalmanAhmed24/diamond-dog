type IconProps = { className?: string; size?: number }

/** The small rotated square used as a bullet and eyebrow mark throughout the design. */
export function Diamond({ className, size = 11 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 1 11 6 6 11 1 6Z" />
    </svg>
  )
}

export function ArrowRight({ className, size = 16 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3.5 10h13M11.5 5l5 5-5 5" />
    </svg>
  )
}

export function ChevronDown({ className, size = 14 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 6.5 8 10.5l4-4" />
    </svg>
  )
}

export function MenuIcon({ size = 22 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </svg>
  )
}

export function CloseIcon({ size = 22 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
    </svg>
  )
}

/* ---------- Outline marks used on the booking page ---------- */

const markPaths: Record<string, string> = {
  // Shield with a tick — vaccine records
  shield:
    'M12 3.2 5.5 5.6v5.3c0 4 2.7 7.7 6.5 8.9 3.8-1.2 6.5-4.9 6.5-8.9V5.6L12 3.2Zm3.1 5.9-4.2 4.6-2-2.1',
  // Circle with a tick — the service agreement
  check: 'M12 3.6a8.4 8.4 0 1 0 0 16.8 8.4 8.4 0 0 0 0-16.8Zm4 5.8-5.3 5.5-2.7-2.8',
  // Circle with an i — FAQ
  info: 'M12 3.6a8.4 8.4 0 1 0 0 16.8 8.4 8.4 0 0 0 0-16.8Zm0 7.1v5.6m0-8.7v.6',
  // Handset — phone and text
  phone:
    'M20.2 16.4v2.5a1.7 1.7 0 0 1-1.85 1.7 16.8 16.8 0 0 1-7.32-2.6 16.5 16.5 0 0 1-5.1-5.1A16.8 16.8 0 0 1 3.33 5.5 1.7 1.7 0 0 1 5 3.65h2.5a1.7 1.7 0 0 1 1.7 1.46c.1.82.3 1.62.58 2.38a1.7 1.7 0 0 1-.38 1.8l-1.06 1.05a13.6 13.6 0 0 0 5.1 5.1l1.06-1.06a1.7 1.7 0 0 1 1.79-.38c.76.29 1.56.48 2.38.58a1.7 1.7 0 0 1 1.47 1.72Z',
  // Clock — hours
  clock: 'M12 3.6a8.4 8.4 0 1 0 0 16.8 8.4 8.4 0 0 0 0-16.8ZM12 7.3V12l3.1 1.8',
  // Sparkles — coat health
  sparkle:
    'M9.1 3.6 10.4 7l3.4 1.3-3.4 1.3-1.3 3.4-1.3-3.4L4.4 8.3 7.8 7l1.3-3.4Zm8.2 8.1.85 2.2 2.2.85-2.2.85-.85 2.2-.85-2.2-2.2-.85 2.2-.85.85-2.2Z',
  // Leaf — skin
  leaf: 'M19.4 4.6c0 8-4.7 12.6-10.2 12.6a5 5 0 0 1-5-4.7C4.2 7.2 10.7 4.6 19.4 4.6ZM7 19.4c1.6-4.4 4.6-7.6 8.4-9.5',
  // Heart — comfort
  heart:
    'M12 20.3s-7.6-4.6-7.6-10a4.4 4.4 0 0 1 7.6-3 4.4 4.4 0 0 1 7.6 3c0 5.4-7.6 10-7.6 10Z',
  // Speech bubble — call or text
  chat:
    'M20.4 12.2a7.4 7.4 0 0 1-8 7.4 8.4 8.4 0 0 1-2.4-.4l-4.4 1.4 1.4-4.1a7.3 7.3 0 0 1-1-3.7 7.4 7.4 0 0 1 7.4-7.4h.6a7.4 7.4 0 0 1 6.4 6.4v.4Z',
  // Calendar — book a groom
  calendar:
    'M7.6 3.4v2.8m8.8-2.8v2.8M4.4 9.3h15.2M5.8 5.7h12.4a1.4 1.4 0 0 1 1.4 1.4v11.5a1.4 1.4 0 0 1-1.4 1.4H5.8a1.4 1.4 0 0 1-1.4-1.4V7.1a1.4 1.4 0 0 1 1.4-1.4Z',
  // Map pin — studio
  pin: 'M19 10.3c0 5-7 11-7 11s-7-6-7-11a7 7 0 0 1 14 0Zm-4.4 0a2.6 2.6 0 1 1-5.2 0 2.6 2.6 0 0 1 5.2 0Z',
}

export function Mark({ name, size = 22 }: { name: string; size?: number }) {
  // The paw needs fills rather than a single stroked path.
  if (name === 'paw') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <ellipse cx="7.1" cy="8.4" rx="1.9" ry="2.5" />
        <ellipse cx="12" cy="6.9" rx="1.9" ry="2.6" />
        <ellipse cx="16.9" cy="8.4" rx="1.9" ry="2.5" />
        <ellipse cx="19.6" cy="13" rx="1.7" ry="2.1" />
        <path d="M12 12.3c2.6 0 5.2 2.2 5.2 4.6 0 1.7-1.3 2.8-3 2.8-1 0-1.6-.4-2.2-.4s-1.2.4-2.2.4c-1.7 0-3-1.1-3-2.8 0-2.4 2.6-4.6 5.2-4.6Z" />
        <ellipse cx="4.4" cy="13" rx="1.7" ry="2.1" />
      </svg>
    )
  }

  const d = markPaths[name]
  if (!d) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  )
}

const socialPaths: Record<string, string> = {
  facebook:
    'M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.29-.04-1.27-.12-2.41-.12-2.39 0-4.02 1.46-4.02 4.13V9.9H7.55V13h2.72v8h3.23Z',
  instagram:
    'M12 2.9c2.96 0 3.31.01 4.48.06 1.08.05 1.67.23 2.06.38.52.2.89.44 1.28.83.39.39.63.76.83 1.28.15.39.33.98.38 2.06.05 1.17.06 1.52.06 4.49s-.01 3.32-.06 4.49c-.05 1.08-.23 1.67-.38 2.06-.2.52-.44.89-.83 1.28-.39.39-.76.63-1.28.83-.39.15-.98.33-2.06.38-1.17.05-1.52.06-4.48.06s-3.31-.01-4.48-.06c-1.08-.05-1.67-.23-2.06-.38-.52-.2-.89-.44-1.28-.83a3.45 3.45 0 0 1-.83-1.28c-.15-.39-.33-.98-.38-2.06-.05-1.17-.06-1.52-.06-4.49s.01-3.32.06-4.49c.05-1.08.23-1.67.38-2.06.2-.52.44-.89.83-1.28.39-.39.76-.63 1.28-.83.39-.15.98-.33 2.06-.38C8.69 2.91 9.04 2.9 12 2.9Zm0 4.42a4.68 4.68 0 1 0 0 9.36 4.68 4.68 0 0 0 0-9.36Zm0 7.72a3.04 3.04 0 1 1 0-6.08 3.04 3.04 0 0 1 0 6.08Zm5.96-7.9a1.09 1.09 0 1 1-2.18 0 1.09 1.09 0 0 1 2.18 0Z',
  x: 'M17.53 3h3.02l-6.6 7.54L21.75 21h-6.02l-4.72-6.17L5.6 21H2.58l7.06-8.07L2.5 3h6.17l4.27 5.64L17.53 3Zm-1.06 16.2h1.67L7.6 4.72H5.81l10.66 14.48Z',
  google:
    'M21.35 11.1H12v3.2h5.35c-.23 1.4-1.66 4.1-5.35 4.1a5.9 5.9 0 0 1 0-11.8c1.68 0 2.8.72 3.45 1.33l2.35-2.27C16.29 4.2 14.35 3.4 12 3.4a8.6 8.6 0 1 0 0 17.2c4.97 0 8.25-3.49 8.25-8.4 0-.56-.06-.99-.15-1.4l1.25.3Z',
}

export function SocialIcon({ name, size = 15 }: { name: string; size?: number }) {
  const d = socialPaths[name]
  if (!d) return null
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={d} />
    </svg>
  )
}
