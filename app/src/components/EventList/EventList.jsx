import { useState } from "react";
import events from "../../data/events.js";
import EventCard from "./EventCard";
import styles from "./Event.module.css";

export default function EventList() {
  const [sortBy, setSortBy] = useState("date");
  const [filter, setFilter] = useState("");

  const filteredEvents = events
    .filter((event) =>
      event.name.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return new Date(a.date) - new Date(b.date);
    });

  return (
    <div>
      <div className={styles.controls}>
        <input
          className={styles.input}
          placeholder="Search events..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <select
          className={styles.select}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Sort by date</option>
          <option value="price">Sort by price</option>
          <option value="name">Sort by name</option>
        </select>
      </div>

      <ul className={styles.list}>
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ul>
    </div>
  );
}