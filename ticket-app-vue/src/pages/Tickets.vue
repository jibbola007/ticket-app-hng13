<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTicketStore } from "../store/tickets";
import { isAuthenticated } from "../utils/auth";

const router = useRouter();
const ticketStore = useTicketStore();

const title = ref("");
const description = ref("");
const status = ref("open");
const error = ref("");
const editingTicket = ref(null);

// ✅ Auth guard
onMounted(() => {
  if (!isAuthenticated()) {
    router.push("/login");
  } else {
    ticketStore.loadTickets();
  }
});

function resetForm() {
  title.value = "";
  description.value = "";
  status.value = "open";
  editingTicket.value = null;
  error.value = "";
}

function handleSubmit() {
  try {
    if (!title.value || !status.value) {
      error.value = "Title and status are required.";
      return;
    }

    if (editingTicket.value) {
      ticketStore.updateTicket(editingTicket.value.id, {
        title: title.value,
        description: description.value,
        status: status.value,
      });
    } else {
      ticketStore.createTicket({
        title: title.value,
        description: description.value,
        status: status.value,
      });
    }

    resetForm();
  } catch (err) {
    error.value = err.message;
  }
}

function handleEdit(ticket) {
  editingTicket.value = ticket;
  title.value = ticket.title;
  description.value = ticket.description;
  status.value = ticket.status;
}

function handleDelete(id) {
  if (confirm("Are you sure you want to delete this ticket?")) {
    ticketStore.deleteTicket(id);
  }
}
</script>

<template>
  <main class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-[1440px] mx-auto px-4">
      <h1 class="text-3xl font-bold text-blue-700 mb-6">Ticket Management</h1>

      <!-- Ticket Form -->
      <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 class="text-xl font-semibold mb-4">
          {{ editingTicket ? "Edit Ticket" : "Create New Ticket" }}
        </h2>

        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              v-model="title"
              type="text"
              placeholder="Enter ticket title"
              class="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status *</label>
            <select v-model="status" class="w-full border rounded-lg p-3">
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="description"
            placeholder="Enter details..."
            rows="3"
            class="w-full border rounded-lg p-3"
          ></textarea>
        </div>

        <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>

        <div class="mt-4 flex gap-3">
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            {{ editingTicket ? "Update Ticket" : "Add Ticket" }}
          </button>

          <button
            v-if="editingTicket"
            type="button"
            @click="resetForm"
            class="bg-gray-300 hover:bg-gray-400 text-black px-6 py-3 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>

      <!-- Ticket List -->
      <div v-if="ticketStore.tickets.length" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="ticket in ticketStore.tickets"
          :key="ticket.id"
          class="bg-white p-5 rounded-lg shadow-md border-l-4"
          :class="{
            'border-green-500': ticket.status === 'open',
            'border-amber-500': ticket.status === 'in_progress',
            'border-gray-400': ticket.status === 'closed'
          }"
        >
          <h3 class="text-lg font-semibold text-gray-800">{{ ticket.title }}</h3>
          <p class="text-sm text-gray-500 mb-2">{{ ticket.description || 'No description provided' }}</p>
          <span
            class="inline-block text-xs px-3 py-1 rounded-full font-medium"
            :class="{
              'bg-green-100 text-green-700': ticket.status === 'open',
              'bg-amber-100 text-amber-700': ticket.status === 'in_progress',
              'bg-gray-100 text-gray-700': ticket.status === 'closed'
            }"
          >
            {{ ticket.status }}
          </span>

          <div class="flex gap-3 mt-4">
            <button
              @click="handleEdit(ticket)"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Edit
            </button>
            <button
              @click="handleDelete(ticket.id)"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <p v-else class="text-gray-500 text-center">No tickets yet. Create one above!</p>
    </div>

    <!-- ✅ Footer -->
    <footer class="bg-white mt-16 py-6 border-t">
      <div class="max-w-[1440px] mx-auto text-center text-gray-600 text-sm">
        © 2025 TicketFlow. All rights reserved.
      </div>
    </footer>
  </main>
</template>
