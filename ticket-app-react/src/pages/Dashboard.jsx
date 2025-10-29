import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { isAuthenticated, destroySession, getSession } from "../utils/auth";

export default function Dashboard() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState(null);

  // ✅ Protect route
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      setUser(getSession()?.user || null);
      const savedTickets = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");
      setTickets(savedTickets);
    }
  }, [navigate]);

  // ✅ Compute stats
  const openCount = tickets.filter((t) => t.status === "open").length;
  const progressCount = tickets.filter((t) => t.status === "in_progress").length;
  const closedCount = tickets.filter((t) => t.status === "closed").length;

  // ✅ Logout
  const handleLogout = () => {
    destroySession();
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm py-4">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold text-blue-700">🎫 Ticket Dashboard</h1>

          <div className="flex items-center gap-5">
            <Link
              to="/tickets"
              className="text-gray-700 hover:text-blue-600 font-medium transition-all"
            >
              Manage Tickets
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow-sm transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Stats */}
      <section className="max-w-[1440px] mx-auto p-6 md:p-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Welcome {user?.email || "User"} 👋🏽
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Open Tickets</h3>
            <p className="text-3xl font-bold text-green-600">{openCount}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-amber-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">In Progress</h3>
            <p className="text-3xl font-bold text-amber-600">{progressCount}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-gray-400">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Closed Tickets</h3>
            <p className="text-3xl font-bold text-gray-600">{closedCount}</p>
          </div>
        </div>

        {/* All Tickets List (Optional Preview) */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Tickets</h3>
          {tickets.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tickets.slice(0, 3).map((t) => (
                <div
                  key={t.id}
                  className={`bg-white p-5 rounded-lg shadow-md border-l-4 ${
                    t.status === "open"
                      ? "border-green-500"
                      : t.status === "in_progress"
                      ? "border-amber-500"
                      : "border-gray-400"
                  }`}
                >
                  <h4 className="text-md font-semibold text-gray-800">{t.title}</h4>
                  <p className="text-sm text-gray-500 mb-2 truncate">
                    {t.description || "No description"}
                  </p>
                  <span
                    className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${
                      t.status === "open"
                        ? "bg-green-100 text-green-700"
                        : t.status === "in_progress"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No tickets yet. Create one to see it here!</p>
          )}
        </div>
      </section>

      <footer className="bg-white mt-16 py-6 border-t">
  <div className="max-w-[1440px] mx-auto text-center text-gray-600 text-sm">
    © 2025 TicketFlow. All rights reserved.
  </div>
  </footer>

    </main>
  );
}
