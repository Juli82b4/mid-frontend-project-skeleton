import { Link } from "react-router-dom";
import cardPic from "../../assets/card-pic.jpg";

export default function EventCard({ event }) {
  const soldOut = event.ticketsAvailable === 0;

  return (
    <li className="list-none">
      <Link
        to={`/events/${event.id}`}
        className="block bg-blue-100 border rounded-xl overflow-hidden hover:shadow-md transition hover:-translate-y-0.5"
      >
        <img
          src={event.image || cardPic}
          alt={event.name}
          className="w-full h-40 object-cover"
        />

        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            {event.name}
          </h2>

          <p className="text-sm text-gray-500">
            {event.date} • {event.time}
          </p>

          <p className="text-sm text-gray-600 mt-1">
            {event.venue}, {event.city}
          </p>

          <div className="mt-2">
            <span className="inline-block text-xs px-3 py-1 bg-blue-200 rounded-full text-gray-600">
              {event.category}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-base font-semibold text-gray-900">
              {event.price === 0 ? "Free" : `€${event.price}`}
            </p>

            {soldOut ? (
              <span className="text-xs font-medium text-red-400 bg-red-50 px-4 py-1 rounded-full">
                Sold out
              </span>
            ) : (
              <span className="text-xs text-green-800 bg-green-50 px-4 py-1 rounded-full">
                {event.ticketsAvailable} left
              </span>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
}
