import { defineStore } from "pinia";

export const useTicketStore = defineStore("tickets", {
  state: () => ({
    tickets: JSON.parse(localStorage.getItem("ticketapp_tickets")) || [],
  }),

  actions: {
    loadTickets() {
      this.tickets = JSON.parse(localStorage.getItem("ticketapp_tickets")) || [];
    },

    saveTickets() {
      localStorage.setItem("ticketapp_tickets", JSON.stringify(this.tickets));
    },

    createTicket(ticket) {
      const newTicket = {
        id: crypto.randomUUID(),
        title: ticket.title,
        status: ticket.status,
        description: ticket.description || "",
        createdAt: new Date().toISOString(),
      };
      this.tickets.push(newTicket);
      this.saveTickets();
    },

    updateTicket(id, updatedData) {
      const index = this.tickets.findIndex((t) => t.id === id);
      if (index !== -1) {
        this.tickets[index] = { ...this.tickets[index], ...updatedData };
        this.saveTickets();
      }
    },

    deleteTicket(id) {
      this.tickets = this.tickets.filter((t) => t.id !== id);
      this.saveTickets();
    },
  },
});

