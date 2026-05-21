// TODO: build a login form with relevant fields
// TODO: call login(email, password) from useAuth() on submit
// TODO: show a clear error message if login fails
// TODO: redirect to the event list on success
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./Login.module.css"

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await login(email, password);

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <input
          className={styles.input}
          placeholder="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={styles.input}
          placeholder="Email"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className={styles.button}
          disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  )
}
