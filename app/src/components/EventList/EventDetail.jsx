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
      <h1 className={styles.title}>{event.title}</h1>

      <p className={styles.meta}>
        <span className={styles.label}>Date:</span> {event.date}
      </p>

      <p className={styles.meta}>
        <span className={styles.label}>Time:</span> {event.time}
      </p>

      <p className={styles.meta}>
        <span className={styles.label}>Venue:</span> {event.venue}
      </p>

      <p className={styles.meta}>
        <span className={styles.label}>City:</span> {event.city}
      </p>

      <div>
        <p className={styles.label}>Description:</p>
        <p className={styles.description}>{event.description}</p>
      </div>
    </div>
  );
}