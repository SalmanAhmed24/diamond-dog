import { Reveal } from "./Reveal";
import { Diamond } from "./icons";
import { BOOKING_EMBED_URL, book } from "@/lib/site";
import styles from "./BookingEmbed.module.css";

/**
 * Renders the MoeGo scheduler when `BOOKING_EMBED_URL` is set in lib/site.ts,
 * and the design's placeholder panel until it is. That keeps the page shippable
 * before the embed URL exists, and swapping it in needs no code change.
 */
export function BookingEmbed() {
  const { booking } = book;

  return (
    <section
      id="booking"
      className={`section ${styles.section}`}
      aria-labelledby="booking-heading"
    >
      <div className="container">
        <Reveal className={styles.head}>
          <p className="eyebrow">
            <Diamond aria-hidden="true" />
            {booking.eyebrow}
          </p>
          <h2 id="booking-heading" className={`sectionTitle ${styles.heading}`}>
            {booking.heading}
          </h2>
          <p className={`lede ${styles.lede}`}>{booking.lede}</p>
        </Reveal>

        <div className={styles.frame}>
          <iframe
            src="https://booking.moego.pet/ol/TheDiamondDogPetGrooming130030/landing?utm_medium=embed"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Online booking"
            scrolling="no"
          ></iframe>
          {/* {BOOKING_EMBED_URL ? (
            <iframe
              src={BOOKING_EMBED_URL}
              title="Book an appointment with The Diamond Dog"
              className={styles.iframe}
              loading="lazy"
              // The scheduler needs to size itself and take payment details.
              allow="payment"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <p className={styles.placeholder}>{booking.placeholder}</p>
          )} */}
        </div>

        <p className={styles.caption}>{booking.caption}</p>
      </div>
    </section>
  );
}
