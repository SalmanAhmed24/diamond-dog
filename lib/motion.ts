/**
 * The site's standard easing curve.
 *
 * Typed as a fixed 4-tuple on purpose. Framer's `Easing` accepts
 * `[number, number, number, number]`, but a bare array literal written outside
 * a contextually typed position widens to `number[]`, which does not match —
 * that is exactly what failed the production type-check. Importing this
 * constant gives every call site the right type whether it is inline in JSX or
 * extracted into a variable.
 */
export const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1]

/** Slower, weightier curve used for the signature and other drawn-on motion. */
export const EASE_DRAW: [number, number, number, number] = [0.35, 0.05, 0.25, 1]
