import { useState } from "react";
import { useParams } from "react-router-dom";
import events from "../../data/events.js";
import styles from "./Event.module.css";

export default function EventDetail() {
  const { id } = useParams();
  const event = events.find((e) => String(e.id) === id);

  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("info");
  const [showMore, setShowMore] = useState(false);

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

      <div className={styles.tabs}>
        <button
          onClick={() => setTab("info")}
          className={tab === "info" ? styles.activeTab : styles.tab}
        >
          Info
        </button>

        <button
          onClick={() => setTab("description")}
          className={tab === "description" ? styles.activeTab : styles.tab}
        >
          Description
        </button>
      </div>

      {tab === "info" && (
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
            <p className={styles.label}>Tickets</p>

            <div className={styles.quantity}>
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
          </div>
        </div>
      )}

      {tab === "description" && (
        <div className={styles.descriptionBox}>
          <p className={styles.label}>Description</p>

          <p className={styles.description}>
            {showMore
              ? event.description
              : event.description.slice(0, 120) + "..."}
          </p>

          <button
            onClick={() => setShowMore(!showMore)}
            className={styles.link}
          >
            {showMore ? "Show less" : "Show more"}
          </button>
        </div>
      )}
    </div>
  );
}