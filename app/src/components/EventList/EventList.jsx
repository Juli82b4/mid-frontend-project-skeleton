import { useState, useEffect } from "react";
import EventCard from "./EventCard";

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

        const res = await fetch(
          `http://localhost:3001/api/events?_page=${page}&_limit=${limit}`
        );

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

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading events...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error}
      </div>
    );
  }

  const filteredEvents = events
    .filter((event) => {
      const q = filter.toLowerCase();

      return (
        event.name.toLowerCase().includes(q) ||
        event.city.toLowerCase().includes(q) ||
        (q === "free" ? event.price === 0 : false)
      );
    })
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return new Date(a.date) - new Date(b.date);
    });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between mb-6">

        <input
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Search events (name, city, or 'free')"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <select
          className="w-full md:w-48 px-4 py-2 border rounded-lg bg-white"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Sort by date</option>
          <option value="price">Sort by price</option>
          <option value="name">Sort by name</option>
        </select>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No events found
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </ul>
      )}

      <div className="flex items-center justify-center gap-4 mt-8">

        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
          disabled={page === 1}
        >
          Prev
        </button>

        <span className="text-sm text-gray-600">
          Page {page}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
}