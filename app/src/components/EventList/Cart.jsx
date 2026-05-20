import { useCart } from "../../context/CartContext";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity } = useCart();

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    if (cart.length === 0) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-12 text-center">
                <div className="border rounded-xl p-8 bg-white">
                    <h2 className="text-xl font-semibold mb-2">
                        Your cart is empty
                    </h2>

                    <p className="text-gray-500 mb-6">
                        Add events to your cart to see them here.
                    </p>

                    <Link
                        to="/events"
                        className="inline-block bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
                    >
                        Browse Events
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">

            <div className="space-y-4">

                {cart.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white border rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {item.name}
                            </h3>

                            <p className="text-gray-500">€{item.price}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                }
                                className="px-3 py-1 border rounded-lg"
                            >
                                -
                            </button>

                            <span className="text-lg font-medium">
                                {item.quantity}
                            </span>

                            <button
                                onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                }
                                className="px-3 py-1 border rounded-lg"
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm"
                        >
                            <FaTrash />
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-8 border rounded-xl p-6 bg-white">

                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Total</h2>
                    <p className="text-xl font-bold">€{total.toFixed(2)}</p>
                </div>

                <Link
                    to="/checkout"
                    className="block w-full text-center bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                >
                    Go to Checkout
                </Link>
            </div>
        </div>
    );
}