// src/utils/tickets.js

export const getTickets = () =>
    JSON.parse(localStorage.getItem("ticketapp_tickets")) || [];
  
  export const saveTickets = (tickets) =>
    localStorage.setItem("ticketapp_tickets", JSON.stringify(tickets));
  
  export const createTicket = (ticket) => {
    const tickets = getTickets();
    tickets.push({
      id: crypto.randomUUID(),
      title: ticket.title,
      description: ticket.description || "",
      status: ticket.status,
      createdAt: new Date().toISOString(),
    });
    saveTickets(tickets);
  };
  
  export const updateTicket = (id, updatedData) => {
    const tickets = getTickets().map((t) =>
      t.id === id ? { ...t, ...updatedData } : t
    );
    saveTickets(tickets);
  };
  
  export const deleteTicket = (id) => {
    const tickets = getTickets().filter((t) => t.id !== id);
    saveTickets(tickets);
  };
  