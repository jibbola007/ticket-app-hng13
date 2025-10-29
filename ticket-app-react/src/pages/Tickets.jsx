import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../utils/tickets";
import { isAuthenticated } from "../utils/auth"; // ✅ added this import

export default function Tickets() {
  const navigate = useNavigate(); // ✅ added for redirection

  // ✅ Protect page
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("open");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [editingTicket, setEditingTicket] = useState(null);

  useEffect(() => {
    setTickets(getTickets());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !status) {
      setError("Title and status are required.");
      return;
    }

    if (editingTicket) {
      updateTicket(editingTicket.id, { title, status, description });
    } else {
      createTicket({ title, status, description });
    }

    setTickets(getTickets());
    resetForm();
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setTitle(ticket.title);
    setStatus(ticket.status);
    setDescription(ticket.description);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      deleteTicket(id);
      setTickets(getTickets());
    }
  };

  const resetForm = () => {
    setTitle("");
    setStatus("open");
    setDescription("");
    setError("");
    setEditingTicket(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-1440 mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">
            Ticket Management
          </h1>

          {/* ✅ Back to Dashboard button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md mb-10"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingTicket ? "Edit Ticket" : "Create New Ticket"}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter ticket title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                className="w-full border rounded-lg p-3"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full border rounded-lg p-3"
              rows="3"
              placeholder="Enter details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              {editingTicket ? "Update Ticket" : "Add Ticket"}
            </button>

            {editingTicket && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-3 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Ticket List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`bg-white p-5 rounded-lg shadow-md border-l-4 ${
                  ticket.status === "open"
                    ? "border-green-500"
                    : ticket.status === "in_progress"
                    ? "border-amber-500"
                    : "border-gray-400"
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {ticket.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {ticket.description || "No description provided"}
                </p>

                <span
                  className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${
                    ticket.status === "open"
                      ? "bg-green-100 text-green-700"
                      : ticket.status === "in_progress"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {ticket.status}
                </span>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(ticket)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No tickets yet. Create one above!
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
