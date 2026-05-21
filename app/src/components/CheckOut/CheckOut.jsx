import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import styles from "../EventList/Event.module.css";

export default function CheckOut() {
  const { user } = useAuth();
  const { cart } = useCart();

  let message;

  if (!user) {
    message = "You must be logged in to checkout.";
  } else if (cart.length === 0) {
    message = "Your cart is empty.";
  } else {
    message = "Proceed with your purchase.";
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>
      <p className={styles.message}>{message}</p>
    </div>
  );
}