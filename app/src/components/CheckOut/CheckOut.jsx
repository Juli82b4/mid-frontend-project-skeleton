import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import styles from "../EventList/Event.module.css";

export default function CheckOut() {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  if (!user) {
    return <p>You must be logged in to checkout.</p>;
  }

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  function handleOrder() {
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      items: cart,
      total: total,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, newOrder])
    );

    clearCart();

    navigate("/orders");
  }

  return (
    <div className={styles.container}>
      <h1>Checkout</h1>

      <p>Total: €{total.toFixed(2)}</p>

      <button onClick={handleOrder}>
        Place Order
      </button>
    </div>
  );
}