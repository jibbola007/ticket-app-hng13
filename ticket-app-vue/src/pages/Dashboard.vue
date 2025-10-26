<script setup>
import { useAuthStore } from "../store/auth";
import { useRouter, RouterLink } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

function logout() {
  auth.logout();
  router.push("/auth/login");
}
</script>

<template>
  <main class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <div class="text-center space-y-6">
      <h1 class="text-3xl font-bold text-blue-700">Welcome, {{ auth.user?.email }}</h1>
      <div class="flex gap-4 justify-center">
        <RouterLink to="/tickets" class="px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          Manage Tickets
        </RouterLink>
        <button @click="logout" class="px-5 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700">
          Logout
        </button>
      </div>
    </div>
  </main>
</template>
