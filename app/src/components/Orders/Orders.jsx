import { useAuth } from "../../context/AuthContext";

export default function Orders() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Orders</h1>
        <p>You must be logged in to view your orders.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Orders</h1>
      <p>No orders yet.</p>
    </div>
  );
}