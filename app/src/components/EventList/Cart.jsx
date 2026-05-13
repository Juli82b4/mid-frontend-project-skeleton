import { useCart } from "../../context/CartContext";
import styles from "./Event.module.css";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

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
            <h1 className={styles.title}>Cart</h1>

            <div className={styles.list}>
                {cart.map((item) => (
                    <div key={item.id} className={styles.eventCard}>
                        <div>
                            <h3 className={styles.title}>{item.name}</h3>
                            <p className={styles.meta}>€{item.price}</p>
                            <p className={styles.meta}>
                                Subtotal: €{(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>

                        <div className={styles.quantity}>
                            <button
                                onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                }
                            >
                                -
                            </button>

                            <span className={styles.meta}>{item.quantity}</span>

                            <button
                                onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                }
                            >
                                +
                            </button>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                className={styles.soldOut}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.descriptionBox}>
                <h2 className={styles.title}>
                    Total: €{total.toFixed(2)}
                </h2>

                <button
                    onClick={clearCart}
                    className={styles.addToCart}
                >
                    Clear Cart
                </button>
            </div>
        </div>
    );
}