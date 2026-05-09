// TODO: build a register form with relevant fields
// TODO: call register(email, password) from useAuth() on submit
// TODO: show a clear error message if registration fails
// TODO: redirect to the event list on success

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Register.module.css"

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 5 characters");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await register(email, password);

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Register</h1>

        <input
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={styles.input}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className={styles.button}
          disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}