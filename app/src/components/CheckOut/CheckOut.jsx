import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function CheckOut() {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 mb-4">
          You must be logged in to checkout.
        </p>

        <Link
          to="/login"
          className="inline-block bg-black text-white px-5 py-2 rounded-lg"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 mb-4">
          Your cart is empty.
        </p>

        <Link
          to="/events"
          className="inline-block bg-black text-white px-5 py-2 rounded-lg"
        >
          Browse Events
        </Link>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  function handleOrder() {
    setLoading(true);

    setTimeout(() => {
      const existingOrders =
        JSON.parse(localStorage.getItem("orders")) || [];

      const newOrder = {
        id: Date.now(),
        items: cart,
        total: total.toFixed(2),
        date: new Date().toLocaleString(),
      };

      localStorage.setItem(
        "orders",
        JSON.stringify([...existingOrders, newOrder])
      );

      clearCart();
      setLoading(false);

      navigate("/orders");
    }, 800);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      <h1 className="text-2xl font-bold mb-6">
        Checkout
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="md:col-span-2 space-y-4">

          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-900">
                  {item.name}
                </p>

                <p className="text-sm text-gray-500">
                  €{item.price} × {item.quantity}
                </p>
              </div>

              <p className="font-semibold">
                €{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white border rounded-xl p-5 h-fit sticky top-20">

          <h2 className="text-lg font-semibold mb-4">
            Order Summary
          </h2>

          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>€{total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Fees</span>
              <span>€0.00</span>
            </div>
          </div>

          <div className="border-t pt-3 flex justify-between mb-4">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-lg">
              €{total.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleOrder}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>

          <p className="text-xs text-gray-400 text-center mt-3">
            Secure checkout (demo)
          </p>
        </div>
      </div>
    </div>
  );
}