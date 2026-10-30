import type { ReactNode } from 'react'

import { Reveal } from './Reveal'
import styles from './PolicySections.module.css'

/** A line in an address-style block: plain text, or text that links out. */
export type PolicyLine = string | { text: string; href: string }

/**
 * One piece of a section's body. A bare string is a paragraph; the object forms
 * are a bullet list and an address-style run of short lines. Any string here
 * may carry `**bold**` lead-ins and `[text](href)` links, which `Inline` turns
 * into real `<strong>` and `<a>` elements — no HTML is ever injected.
 */
export type PolicyBlock = string | { list: string[] } | { lines: PolicyLine[] }

export type PolicySection = {
  id: string
  heading: string
  /** A single paragraph, or ordered blocks for longer sections. */
  body: string | PolicyBlock[]
}

/** `**bold**` or `[text](href)`, matched in one pass so either can appear. */
const INLINE = /\*\*(.+?)\*\*|\[(.+?)\]\(([^)]+)\)/g

function Inline({ text }: { text: string }) {
  const nodes: ReactNode[] = []
  let cursor = 0

  for (const match of text.matchAll(INLINE)) {
    const at = match.index ?? 0
    if (at > cursor) nodes.push(text.slice(cursor, at))

    if (match[1] !== undefined) {
      nodes.push(<strong key={at}>{match[1]}</strong>)
    } else {
      nodes.push(
        <a key={at} className={styles.link} href={match[3]}>
          {match[2]}
        </a>,
      )
    }

    cursor = at + match[0].length
  }

  if (cursor < text.length) nodes.push(text.slice(cursor))
  return <>{nodes}</>
}

function Block({ block }: { block: PolicyBlock }) {
  if (typeof block === 'string') {
    return (
      <p className={styles.body}>
        <Inline text={block} />
      </p>
    )
  }

  if ('list' in block) {
    return (
      <ul className={styles.list}>
        {block.list.map((entry) => (
          <li key={entry}>
            <Inline text={entry} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <p className={styles.lines}>
      {block.lines.map((line, index) => (
        <span key={typeof line === 'string' ? line : line.href}>
          {typeof line === 'string' ? (
            <Inline text={line} />
          ) : (
            <a className={styles.link} href={line.href}>
              {line.text}
            </a>
          )}
          {index < block.lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </p>
  )
}

/**
 * Stacked, ranged-left sections divided by full-bleed hairlines. The rule sits
 * on the outer block so it runs edge to edge, while the copy stays inside the
 * container — which is what the design shows.
 *
 * `heading` turns the group into a document in its own right: a title, an
 * optional effective date and lead paragraph, and its sections one level down.
 * That is what keeps the privacy policy's outline correct when it sits inside a
 * page whose <h1> is something else.
 */
export function PolicySections({
  sections,
  heading,
  headingId,
  note,
  intro,
  blocks,
  level = 2,
}: {
  sections: PolicySection[]
  heading?: string
  headingId?: string
  note?: string
  intro?: string
  /** Body content that belongs to the document itself, not to a subsection. */
  blocks?: PolicyBlock[]
  level?: 2 | 3
}) {
  const nested = level === 3
  const SectionHeading = nested ? 'h3' : 'h2'

  return (
    <section className={styles.section} aria-labelledby={heading ? headingId : undefined}>
      {heading ? (
        <div className={styles.item}>
          <Reveal className="container">
            <h2 id={headingId} className={`serif ${styles.docHeading}`}>
              {heading}
            </h2>
            {note ? <p className={styles.note}>{note}</p> : null}
            {intro ? (
              <p className={styles.body}>
                <Inline text={intro} />
              </p>
            ) : null}
            {blocks?.map((block, index) => <Block key={index} block={block} />)}
          </Reveal>
        </div>
      ) : null}

      {sections.map((item) => (
        <div key={item.id} className={`${styles.item} ${nested ? styles.itemSub : ''}`}>
          <Reveal className="container">
            <SectionHeading
              id={item.id}
              className={`serif ${styles.heading} ${nested ? styles.headingSub : ''}`}
            >
              {item.heading}
            </SectionHeading>
            {typeof item.body === 'string' ? (
              <p className={styles.body}>{item.body}</p>
            ) : (
              item.body.map((block, index) => <Block key={index} block={block} />)
            )}
          </Reveal>
        </div>
      ))}
    </section>
  )
}
