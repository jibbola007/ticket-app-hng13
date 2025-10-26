import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  createSession,
  getUsers,
  isAuthenticated,
} from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (isAuthenticated()) navigate("/dashboard");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return setError("All fields are required.");

    const users = getUsers();
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) return setError("Invalid credentials.");

    createSession(email);
    navigate("/dashboard");
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-700 text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Login
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/auth/signup" className="text-blue-600 underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
