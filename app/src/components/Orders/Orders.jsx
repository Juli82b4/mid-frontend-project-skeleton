import { useAuth } from "../../context/AuthContext";

export default function Orders() {
  const { user } = useAuth();

  if (!user) {
    return <p>You must be logged in to view orders.</p>;
  }

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) {
    return <p>No orders yet.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Orders</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Total:</strong> €{order.total}</p>
          <p><strong>Date:</strong> {order.date}</p>

          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}