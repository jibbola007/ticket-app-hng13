import { Link, useNavigate } from "react-router-dom";
import { getSession, destroySession } from "../utils/auth";

export default function Dashboard() {
  const navigate = useNavigate();
  const session = getSession();

  const logout = () => {
    destroySession();
    navigate("/auth/login");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-blue-700">
          Welcome, {session?.user?.email}
        </h1>
        <div className="flex gap-4 justify-center">
          <Link
            to="/tickets"
            className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Manage Tickets
          </Link>
          <button
            onClick={logout}
            className="px-5 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}
