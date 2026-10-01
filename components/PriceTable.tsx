import { Reveal } from './Reveal'
import { Diamond } from './icons'
import { BOOKING_URL, callHref } from '@/lib/site'
import styles from './PriceTable.module.css'

export type PriceTableData = {
  caption: string
  /** First column is the row header; the rest are price columns. */
  columns: string[]
  rows: string[][]
  footnote?: string
}

type PriceTableProps = {
  eyebrow: string
  heading: string
  headingId: string
  note?: string
  tables: PriceTableData[]
  surface?: 'cream' | 'sand'
  callLabel?: string
}

/**
 * Real <table> elements — this is tabular data, so a grid of divs would leave
 * screen readers without row and column context. Each table carries a caption
 * naming the price list, and `scope` ties every cell to its headers, which
 * matters most on the de-shed table where one row has two different prices.
 */
export function PriceTable({
  eyebrow,
  heading,
  headingId,
  note,
  tables,
  surface = 'cream',
  callLabel = 'Call or text',
}: PriceTableProps) {
  return (
    <section
      className={`section ${styles.section} ${surface === 'sand' ? styles.sand : ''}`}
      aria-labelledby={headingId}
    >
      <div className="container">
        <Reveal className={styles.head}>
          <p className="eyebrow">
            <Diamond aria-hidden="true" />
            {eyebrow}
          </p>
          <h2 id={headingId} className={`sectionTitle ${styles.heading}`}>
            {heading}
          </h2>
          {note && <p className={styles.note}>{note}</p>}
        </Reveal>

        {tables.map((table) => (
          <Reveal key={table.caption} className={styles.frame}>
            <table className={styles.table}>
              <caption className={`serif ${styles.caption}`}>{table.caption}</caption>
              <thead>
                <tr>
                  {table.columns.map((column) => (
                    <th key={column} scope="col">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    {row.slice(1).map((cell, index) => (
                      <td key={table.columns[index + 1]}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
              {table.footnote && (
                <tfoot>
                  <tr>
                    <td colSpan={table.columns.length}>{table.footnote}</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </Reveal>
        ))}

        <Reveal className={styles.actions}>
          <a href={BOOKING_URL} className="btn btn--teal">
            Book now
          </a>
          <a href={callHref} className="btn btn--outline">
            {callLabel}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
