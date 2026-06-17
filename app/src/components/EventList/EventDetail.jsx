import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function EventDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(0);
  const [tab, setTab] = useState("info");

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/events/${id}`,
        );
        if (!res.ok) throw new Error("Event not found");

        const data = await res.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10 text-gray-400">Loading...</div>;
  }

  if (error || !event) {
    return (
      <div className="text-center py-10 text-red-400">Event not found</div>
    );
  }

  const soldOut = event.ticketsAvailable === 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{event.name}</h1>
        <p className="text-gray-400 mt-1">
          {event.price === 0 ? "Free" : `€${event.price}`}
        </p>
      </div>

      <div className="flex gap-6 border-b border-slate-800 mb-6 text-sm">
        <button
          onClick={() => setTab("info")}
          className={`pb-2 ${
            tab === "info"
              ? "border-b-2 border-white text-white"
              : "text-gray-400"
          }`}
        >
          Info
        </button>

        <button
          onClick={() => setTab("description")}
          className={`pb-2 ${
            tab === "description"
              ? "border-b-2 border-white text-white"
              : "text-gray-400"
          }`}
        >
          Description
        </button>
      </div>

      {tab === "info" && (
        <div className="grid md:grid-cols-2 gap-4">
          {[
            ["Date", event.date],
            ["Time", event.time],
            ["Venue", event.venue],
            ["City", event.city],
          ].map(([label, value]) => (
            <div
              key={label}
              className="bg-slate-900 border border-slate-800 p-4 rounded-lg"
            >
              <p className="text-xs text-gray-500">{label}</p>
              <p className="text-white">{value}</p>
            </div>
          ))}

          <div className="md:col-span-2 bg-slate-900 border border-slate-800 p-4 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">Tickets</p>

            {soldOut ? (
              <p className="text-red-400">Sold out</p>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => setQuantity((q) => Math.max(0, q - 1))}
                    className="px-3 py-1 border border-slate-700 rounded"
                  >
                    -
                  </button>

                  <span className="text-lg">{quantity}</span>

                  <button
                    onClick={() =>
                      setQuantity((q) =>
                        Math.min(event.ticketsAvailable, q + 1),
                      )
                    }
                    className="px-3 py-1 border border-slate-700 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    addToCart(event, quantity);
                    setQuantity(1);
                  }}
                  disabled={quantity === 0}
                  className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 disabled:opacity-40"
                >
                  Add to cart
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {tab === "description" && (
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
          <p className="text-sm text-gray-400 mb-2">Description</p>

          <p className="text-gray-300 leading-relaxed">{event.description}</p>
        </div>
      )}
    </div>
  );
}
