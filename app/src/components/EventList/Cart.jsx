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
            <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
                <div className="w-full max-w-md text-center border border-slate-800 rounded-xl p-8 bg-slate-900 text-white">
                    <h2 className="font-semibold mb-2">Your cart is empty</h2>

                    <p className="text-gray-400 mb-6">
                        Add events to your cart to see them here.
                    </p>

                    <Link
                        to="/events"
                        className="inline-block bg-white text-black px-5 py- rounded-lg hover:bg-gray-200"
                    >
                        Browse Events
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex justify-center bg-slate-950 px-4 py-10">

            <div className="w-full max-w-3xl space-y-4">

                {cart.map((item) => (
                    <div
                        key={item.id}
                        className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-white"
                    >

                        <div>
                            <h3 className="text-gray-300 font-semibold">{item.name}</h3>
                            <p className="text-gray-400">€{item.price}</p>
                        </div>

                        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1">

                            <button
                                onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-8 h-8 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700"
                            >
                                -
                            </button>

                            <span className="w-6 text-center font-medium text-gray-400">
                                {item.quantity}
                            </span>

                            <button
                                onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-8 h-8 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700"
                            >
                                +
                            </button>

                        </div>

                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm"
                        >
                            <FaTrash />
                            Remove
                        </button>

                    </div>
                ))}

                <div className="border border-slate-800 rounded-xl p-6 bg-slate-900 text-white">

                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold">Total</h2>
                        <p className="font-bold">€{total.toFixed(2)}</p>
                    </div>

                    <Link
                        to="/checkout"
                        className="block w-full text-center bg-blue-200 text-black py-3 rounded-lg hover:bg-gray-200 transition"
                    >
                        Go to Checkout
                    </Link>

                </div>

            </div>
        </div>
    );
}