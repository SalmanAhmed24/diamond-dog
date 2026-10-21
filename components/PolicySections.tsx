import { Reveal } from './Reveal'
import styles from './PolicySections.module.css'

/** A line in an address-style block: plain text, or text that links out. */
export type PolicyLine = string | { text: string; href: string }

/**
 * One piece of a section's body. A bare string is a paragraph; the object forms
 * are a bullet list and an address-style run of short lines. Any string here
 * may carry `**bold**` lead-ins, which `Inline` turns into real `<strong>`
 * elements — no HTML is ever injected.
 */
export type PolicyBlock = string | { list: string[] } | { lines: PolicyLine[] }

export type PolicySection = {
  id: string
  heading: string
  /** A single paragraph, or ordered blocks for longer sections. */
  body: string | PolicyBlock[]
}

function Inline({ text }: { text: string }) {
  // Odd indices are the captured groups, i.e. the bolded runs.
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? <strong key={index}>{part}</strong> : part,
      )}
    </>
  )
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
  level = 2,
}: {
  sections: PolicySection[]
  heading?: string
  headingId?: string
  note?: string
  intro?: string
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
