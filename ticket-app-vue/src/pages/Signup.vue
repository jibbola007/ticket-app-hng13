<script setup>
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useAuthStore } from "../store/auth";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const router = useRouter();
const auth = useAuthStore();

function handleSignup() {
  try {
    if (!email.value || !password.value || !confirmPassword.value) {
      error.value = "All fields are required.";
      return;
    }
    if (password.value !== confirmPassword.value) {
      error.value = "Passwords do not match.";
      return;
    }
    auth.signup(email.value, password.value);
    router.push("/dashboard");
  } catch (err) {
    error.value = err.message;
  }
}
</script>

<template>
  <main class="flex flex-col items-center justify-center min-h-screen bg-blue-50">
    <div class="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-700 mb-6">Sign Up</h1>

      <form @submit.prevent="handleSignup" class="space-y-4">
        <input v-model="email" type="email" placeholder="Email" class="w-full border rounded-lg p-3" />
        <input v-model="password" type="password" placeholder="Password" class="w-full border rounded-lg p-3" />
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" class="w-full border rounded-lg p-3" />
        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition">
          Sign Up
        </button>
      </form>

      <p v-if="error" class="text-red-500 text-sm mt-2 text-center">{{ error }}</p>

      <p class="mt-4 text-sm text-center">
        Already have an account?
        <RouterLink to="/auth/login" class="text-blue-600 underline">Login</RouterLink>
      </p>
    </div>
  </main>
</template>
