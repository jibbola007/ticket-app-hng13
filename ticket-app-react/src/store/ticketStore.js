import { create } from 'zustand';

export const useTicketStore = create((set) => ({
  tickets: JSON.parse(localStorage.getItem('ticketapp_tickets')) || [],
  loadTickets: () => {
    const saved = JSON.parse(localStorage.getItem('ticketapp_tickets')) || [];
    set({ tickets: saved });
  },
  createTicket: (ticket) => {
    set((state) => {
      const newTickets = [...state.tickets, { ...ticket, id: crypto.randomUUID(), createdAt: Date.now() }];
      localStorage.setItem('ticketapp_tickets', JSON.stringify(newTickets));
      return { tickets: newTickets };
    });
  },
  updateTicket: (id, updated) => {
    set((state) => {
      const updatedTickets = state.tickets.map((t) => t.id === id ? { ...t, ...updated, updatedAt: Date.now() } : t);
      localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets));
      return { tickets: updatedTickets };
    });
  },
  deleteTicket: (id) => {
    set((state) => {
      const remaining = state.tickets.filter((t) => t.id !== id);
      localStorage.setItem('ticketapp_tickets', JSON.stringify(remaining));
      return { tickets: remaining };
    });
  },
}));
