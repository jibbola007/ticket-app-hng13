<template>
  <main class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <nav class="bg-white shadow-sm py-4">
      <div class="max-w-[1440px] mx-auto flex justify-between items-center px-6">
        <h1 class="text-2xl font-bold text-blue-700">🎫 Ticket Dashboard</h1>

        <div class="flex items-center gap-5">
          <RouterLink
            to="/tickets"
            class="text-gray-700 hover:text-blue-600 font-medium transition-all"
          >
            Manage Tickets
          </RouterLink>
          <button
            @click="handleLogout"
            class="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow-sm transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>

    <!-- Dashboard Stats -->
    <section class="max-w-[1440px] mx-auto p-6 md:p-10">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">
        Welcome {{ user?.email || 'User' }} 👋🏽
      </h2>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <h3 class="text-lg font-semibold text-gray-800 mb-1">Open Tickets</h3>
          <p class="text-3xl font-bold text-green-600">{{ openCount }}</p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-amber-500">
          <h3 class="text-lg font-semibold text-gray-800 mb-1">In Progress</h3>
          <p class="text-3xl font-bold text-amber-600">{{ progressCount }}</p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-gray-400">
          <h3 class="text-lg font-semibold text-gray-800 mb-1">Closed Tickets</h3>
          <p class="text-3xl font-bold text-gray-600">{{ closedCount }}</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white mt-16 py-6 border-t">
      <div class="max-w-[1440px] mx-auto text-center text-gray-600 text-sm">
        © 2025 TicketFlow. All rights reserved.
      </div>
    </footer>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { isAuthenticated, destroySession, getSession } from "../utils/auth";

const router = useRouter();

const user = ref(null);
const tickets = ref([]);

const openCount = ref(0);
const progressCount = ref(0);
const closedCount = ref(0);

onMounted(() => {
  if (!isAuthenticated()) {
    router.push("/login");
  } else {
    user.value = getSession()?.user || null;
    const savedTickets = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");
    tickets.value = savedTickets;
    openCount.value = savedTickets.filter((t) => t.status === "open").length;
    progressCount.value = savedTickets.filter((t) => t.status === "in_progress").length;
    closedCount.value = savedTickets.filter((t) => t.status === "closed").length;
  }
});

const handleLogout = () => {
  destroySession();
  router.push("/login");
};
</script>
