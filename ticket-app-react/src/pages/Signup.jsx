import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  createSession,
  getUsers,
  saveUser,
} from "../utils/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !password || !confirm)
      return setError("All fields are required.");
    if (password !== confirm)
      return setError("Passwords do not match.");

    const users = getUsers();
    const exists = users.find((u) => u.email === email);
    if (exists) return setError("User already exists.");

    saveUser({ email, password });
    createSession(email);
    navigate("/dashboard");
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-700 text-center mb-6">
          Sign Up
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border rounded-lg p-3"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Sign Up
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
