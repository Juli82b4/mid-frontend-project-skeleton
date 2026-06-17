import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Orders() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 mb-4">
          You must be logged in to view orders.
        </p>

        <Link
          to="/login"
          className="inline-block bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <h2 className="text-xl font-semibold mb-2">No orders yet</h2>

        <p className="text-gray-500 mb-6">
          Once you book events, they will appear here.
        </p>

        <Link
          to="/events"
          className="inline-block bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
        >
          Browse Events
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-xl bg-blue-200 p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <p className="text-sm text-gray-500">
                Order ID:{" "}
                <span className="text-gray-900 font-medium">{order.id}</span>
              </p>

              <p className="text-sm text-gray-500">
                Date:{" "}
                <span className="text-gray-900 font-medium">{order.date}</span>
              </p>
            </div>

            <div className="space-y-1 mb-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-gray-700"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <span>€{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between border-t pt-3">
              <span className="font-semibold  text-slate-900">Total</span>
              <span className="font-bold text-slate-900">€{order.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
