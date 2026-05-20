import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function EventDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(0);
  const [tab, setTab] = useState("info");
  const [showMore, setShowMore] = useState(false);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `http://localhost:3001/api/events/${id}`
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
    return (
      <div className="text-center py-10 text-gray-500">
        Loading event details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Something went wrong: {error}
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-10 text-gray-500">
        Event not found
      </div>
    );
  }

  const soldOut = event.ticketsAvailable === 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {event.name}
        </h1>

        <p className="text-xl font-semibold text-gray-900">
          {event.price === 0 ? "Free" : `€${event.price}`}
        </p>
      </div>

      <div className="flex gap-4 border-b mb-6">
        <button
          onClick={() => setTab("info")}
          className={`pb-2 text-sm font-medium ${tab === "info"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
            }`}
        >
          Info
        </button>

        <button
          onClick={() => setTab("description")}
          className={`pb-2 text-sm font-medium ${tab === "description"
              ? "border-b-2 border-black text-black"
              : "text-gray-500"
            }`}
        >
          Description
        </button>
      </div>

      {tab === "info" && (
        <div className="grid md:grid-cols-2 gap-4">

          <div className="p-4 border rounded-lg">
            <p className="text-xs text-gray-500">Date</p>
            <p className="text-gray-900">{event.date}</p>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-xs text-gray-500">Time</p>
            <p className="text-gray-900">{event.time}</p>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-xs text-gray-500">Venue</p>
            <p className="text-gray-900">{event.venue}</p>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-xs text-gray-500">City</p>
            <p className="text-gray-900">{event.city}</p>
          </div>

          <div className="p-4 border rounded-lg md:col-span-2">
            <p className="text-xs text-gray-500 mb-2">Tickets</p>

            {soldOut ? (
              <p className="text-red-500 font-medium">Sold out</p>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-3">

                  <button
                    onClick={() =>
                      setQuantity((q) => Math.max(0, q - 1))
                    }
                    className="px-3 py-1 border rounded-lg"
                  >
                    -
                  </button>

                  <span className="text-lg font-medium">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity((q) =>
                        Math.min(event.ticketsAvailable, q + 1)
                      )
                    }
                    className="px-3 py-1 border rounded-lg"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart(event, quantity)}
                  disabled={quantity === 0}
                  className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
                >
                  Add to cart
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {tab === "description" && (
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-gray-500 mb-2">
            Description
          </p>

          <p className="text-gray-700 leading-relaxed">
            {showMore
              ? event.description
              : event.description.slice(0, 120) + "..."}
          </p>

          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-3 text-sm text-black underline"
          >
            {showMore ? "Show less" : "Show more"}
          </button>
        </div>
      )}
    </div>
  );
}