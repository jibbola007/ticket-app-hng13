import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('ticketapp_session'))?.user || null,
  login: (user) => {
    const session = { token: crypto.randomUUID(), user, expires: Date.now() + 24 * 60 * 60 * 1000 };
    localStorage.setItem('ticketapp_session', JSON.stringify(session));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem('ticketapp_session');
    set({ user: null });
  },
  isAuthenticated: () => {
    const s = JSON.parse(localStorage.getItem('ticketapp_session'));
    return s && s.expires > Date.now();
  },
}));
