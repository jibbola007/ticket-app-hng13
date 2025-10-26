import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("ticketapp_session"))?.user || null,
  }),

  actions: {
    signup(email, password) {
      const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
      const exists = users.find((u) => u.email === email);
      if (exists) throw new Error("User already exists");

      users.push({ email, password });
      localStorage.setItem("ticketapp_users", JSON.stringify(users));
      this.login(email, password);
    },

    login(email, password) {
      const users = JSON.parse(localStorage.getItem("ticketapp_users")) || [];
      const found = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!found) throw new Error("Invalid credentials");

      const session = {
        token: crypto.randomUUID(),
        user: { email },
        expires: Date.now() + 24 * 60 * 60 * 1000,
      };
      localStorage.setItem("ticketapp_session", JSON.stringify(session));
      this.user = session.user;
    },

    logout() {
      localStorage.removeItem("ticketapp_session");
      this.user = null;
    },

    isAuthenticated() {
      const session = JSON.parse(localStorage.getItem("ticketapp_session"));
      return session && session.expires > Date.now();
    },
  },
});
