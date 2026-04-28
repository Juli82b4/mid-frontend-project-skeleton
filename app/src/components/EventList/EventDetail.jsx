import { useParams } from "react-router-dom";
import events from "../../data/events.js";
import styles from "./Event.module.css";

export default function EventDetail() {
  const { id } = useParams();

  const event = events.find((e) => String(e.id) === id);

  if (!event) {
    return <p className={styles.notFound}>Event not found</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{event.name}</h1>
        <p className={styles.price}>
          {event.price === 0 ? "Free" : `€${event.price}`}
        </p>
      </div>

      <div className={styles.detailGrid}>
        <div className={styles.box}>
          <p className={styles.label}>Date</p>
          <p className={styles.meta}>{event.date}</p>
        </div>

        <div className={styles.box}>
          <p className={styles.label}>Time</p>
          <p className={styles.meta}>{event.time}</p>
        </div>

        <div className={styles.box}>
          <p className={styles.label}>Venue</p>
          <p className={styles.meta}>{event.venue}</p>
        </div>

        <div className={styles.box}>
          <p className={styles.label}>City</p>
          <p className={styles.meta}>{event.city}</p>
        </div>

        <div className={styles.box}>
          <p className={styles.label}>Category</p>
          <p className={styles.meta}>{event.category}</p>
        </div>

        <div className={styles.box}>
          <p className={styles.label}>Tickets</p>
          <p className={styles.meta}>
            {event.ticketsAvailable === 0
              ? "Sold out"
              : `${event.ticketsAvailable} available`}
          </p>
        </div>
      </div>

      <div className={styles.descriptionBox}>
        <p className={styles.label}>Description</p>
        <p className={styles.description}>{event.description}</p>
      </div>
    </div>
  );
}