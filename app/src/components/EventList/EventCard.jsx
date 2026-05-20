import { Link } from "react-router-dom";

export default function EventCard({ event }) {
    const soldOut = event.ticketsAvailable === 0;

    return (
        <li className="list-none">
            <Link
                to={`/events/${event.id}`}
                className="block bg-white border rounded-xl p-4 hover:shadow-md transition hover:-translate-y-0.5"
            >

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
                    <span className="inline-block text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                        {event.category}
                    </span>
                </div>

                <div className="mt-3 flex items-center justify-between">

                    <p className="text-base font-semibold text-gray-900">
                        {event.price === 0 ? "Free" : `€${event.price}`}
                    </p>

                    {soldOut ? (
                        <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                            Sold out
                        </span>
                    ) : (
                        <span className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full">
                            {event.ticketsAvailable} left
                        </span>
                    )}
                </div>
            </Link>
        </li>
    );
}