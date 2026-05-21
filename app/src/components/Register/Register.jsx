import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

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
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await register(email, password);
      navigate("/events");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-xl"
      >
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Create Account
        </h1>

        <input
          className="w-full mb-3 px-4 py-2 rounded bg-slate-950 border border-slate-800 text-white placeholder-gray-500 focus:outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-4 px-4 py-2 rounded bg-slate-950 border border-slate-800 text-white placeholder-gray-500 focus:outline-none"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        {error && (
          <p className="text-red-400 text-sm mt-3 text-center">
            {error}
          </p>
        )}
      </form>

    </div>
  );
}