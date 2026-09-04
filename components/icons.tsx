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

const socialPaths: Record<string, string> = {
  facebook:
    'M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.29-.04-1.27-.12-2.41-.12-2.39 0-4.02 1.46-4.02 4.13V9.9H7.55V13h2.72v8h3.23Z',
  instagram:
    'M12 2.9c2.96 0 3.31.01 4.48.06 1.08.05 1.67.23 2.06.38.52.2.89.44 1.28.83.39.39.63.76.83 1.28.15.39.33.98.38 2.06.05 1.17.06 1.52.06 4.49s-.01 3.32-.06 4.49c-.05 1.08-.23 1.67-.38 2.06-.2.52-.44.89-.83 1.28-.39.39-.76.63-1.28.83-.39.15-.98.33-2.06.38-1.17.05-1.52.06-4.48.06s-3.31-.01-4.48-.06c-1.08-.05-1.67-.23-2.06-.38-.52-.2-.89-.44-1.28-.83a3.45 3.45 0 0 1-.83-1.28c-.15-.39-.33-.98-.38-2.06-.05-1.17-.06-1.52-.06-4.49s.01-3.32.06-4.49c.05-1.08.23-1.67.38-2.06.2-.52.44-.89.83-1.28.39-.39.76-.63 1.28-.83.39-.15.98-.33 2.06-.38C8.69 2.91 9.04 2.9 12 2.9Zm0 4.42a4.68 4.68 0 1 0 0 9.36 4.68 4.68 0 0 0 0-9.36Zm0 7.72a3.04 3.04 0 1 1 0-6.08 3.04 3.04 0 0 1 0 6.08Zm5.96-7.9a1.09 1.09 0 1 1-2.18 0 1.09 1.09 0 0 1 2.18 0Z',
  x: 'M17.53 3h3.02l-6.6 7.54L21.75 21h-6.02l-4.72-6.17L5.6 21H2.58l7.06-8.07L2.5 3h6.17l4.27 5.64L17.53 3Zm-1.06 16.2h1.67L7.6 4.72H5.81l10.66 14.48Z',
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
