import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import styles from "../EventList/Event.module.css";

export default function CheckOut() {
  const { user } = useAuth();
  const { cart } = useCart();

  if (!user) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Checkout</h1>
        <p className={styles.message}>
          You must be logged in to checkout.
        </p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Checkout</h1>
        <p className={styles.message}>
          Your cart is empty.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>
      <p className={styles.message}>
        Proceed with your purchase.
      </p>
    </div>
  );
}