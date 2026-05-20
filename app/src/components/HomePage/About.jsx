import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10">

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                About EventHub
            </h1>

            <p className="text-gray-600 mb-8">
                A simple app for finding and booking events.
            </p>

            <div className="bg-white border rounded-xl p-6 space-y-5">

                <p className="text-gray-700 leading-relaxed">
                    EventHub is a small project built to practice building an event booking app.
                    You can browse events, add tickets to a cart, and place an order.
                </p>

                <p className="text-gray-700 leading-relaxed">
                    It is not meant to be complicated. The goal is just to make something that
                    feels like a real product while keeping it simple.
                </p>

                <div>
                    <h2 className="font-semibold mb-2 text-gray-900">
                        What you can do here
                    </h2>

                    <ul className="space-y-1 text-gray-600">
                        <li>Browse events</li>
                        <li>Add tickets to cart</li>
                        <li>Place a fake order</li>
                        <li>View order history</li>
                    </ul>
                </div>

                <div className="flex gap-3 pt-2">
                    <Link
                        to="/events"
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                    >
                        Browse events
                    </Link>

                    <Link
                        to="/register"
                        className="border px-4 py-2 rounded-lg hover:bg-gray-100"
                    >
                        Create account
                    </Link>
                </div>

            </div>
        </div>
    );
}