// src/utils/auth.js
export const getSession = () => {
    return JSON.parse(localStorage.getItem("ticketapp_session"));
  };
  
  export const isAuthenticated = () => {
    const session = getSession();
    return session && session.expires > Date.now();
  };
  
  export const createSession = (email) => {
    const session = {
      token: crypto.randomUUID(),
      user: { email },
      expires: Date.now() + 24 * 60 * 60 * 1000, // 24h
    };
    localStorage.setItem("ticketapp_session", JSON.stringify(session));
  };
  
  export const destroySession = () => {
    localStorage.removeItem("ticketapp_session");
  };
  
  export const getUsers = () =>
    JSON.parse(localStorage.getItem("ticketapp_users")) || [];
  
  export const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem("ticketapp_users", JSON.stringify(users));
  };
  