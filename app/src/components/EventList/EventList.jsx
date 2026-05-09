import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import styles from "./Event.module.css";

export default function EventList() {
  const [sortBy, setSortBy] = useState("date");
  const [filter, setFilter] = useState("");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    async function fetchEvents() {
      try {

        setLoading(true);
        setError(null);

        const res = await fetch(`http://localhost:3001/api/events?_page=${page}&_limit=${limit}`)
        if (!res.ok) throw new Error("Failed to load events");

        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [page]);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;

  //week 2 - seach bar options
  const filteredEvents = events
    .filter((event) =>

      event.name.toLowerCase().includes(filter.toLowerCase())
      ||
      event.city.toLowerCase().includes(filter.toLowerCase())
      ||
      (filter.toLowerCase() === "free" ? event.price === 0 : false)
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
      {/* week 2 -  wired up event card using .map*/}
      {filteredEvents.length === 0 ? (
        <p>No events found</p>
      ) : (
        <ul className={styles.list}>
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </ul>
      )}

      {/* week 3- pagination*/}
      <div>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
          Prev
        </button>

        <span> Page {page} </span>

        <button onClick={() => setPage((p) => p + 1)}>
          Next
        </button>

      </div>
       </div>
  );
}

