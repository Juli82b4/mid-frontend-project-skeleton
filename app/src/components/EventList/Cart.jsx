import { useCart } from "../../context/CartContext";
import styles from "./Event.module.css";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity } = useCart();

    //total
    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    //emptycart
    if (cart.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.descriptionBox}>
                    <h2 className={styles.title}>Your cart is empty</h2>
                    <p className={styles.meta}>
                        Add events to your cart to see them here.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.list}>
                {cart.map((item) => (
                    <div key={item.id} className={styles.eventCard}>
                        <h3 className={styles.title}>{item.name}</h3>

                        <p className={styles.meta}>€{item.price}</p>

                        <div className={styles.quantity}>
                            <button
                                onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                }
                            >
                                -
                            </button>

                            <span>{item.quantity}</span>

                            <button
                                onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                }
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={() => removeFromCart(item.id)}
                            className={styles.removeBtn}
                        >
                            <FaTrash />
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className={styles.descriptionBox}>
                <h2>Total: €{total.toFixed(2)}</h2>

                <Link to="/checkout">
                    Go to Checkout
                </Link>
            </div>
        </div>
    );
}