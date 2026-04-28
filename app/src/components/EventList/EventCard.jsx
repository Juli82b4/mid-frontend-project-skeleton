import { Link } from "react-router-dom";
import styles from "./Event.module.css";

export default function EventCard({ event }) {
    return (
        <li className={styles.eventCard}>
            <Link to={`/events/${event.id}`} className={styles.link}>
                <h2 className={styles.title}>{event.name}</h2>

                <p className={styles.meta}>
                    {event.date} at {event.time}
                </p>

                <p className={styles.meta}>
                    {event.venue}, {event.city}
                </p>

                <p className={styles.meta}>{event.category}</p>

                <p className={styles.price}>
                    {event.price === 0 ? "Free" : `€${event.price}`}
                </p>

                <p className={event.ticketsAvailable === 0 ? styles.soldOut : styles.meta}>
                    {event.ticketsAvailable === 0
                        ? "Sold out"
                        : `${event.ticketsAvailable} tickets left`}
                </p>
            </Link>
        </li>
    );
}