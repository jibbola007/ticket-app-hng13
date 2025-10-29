// src/utils/auth.js

// ✅ Get current session
export const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem("ticketapp_session"));
  } catch {
    return null;
  }
};

// ✅ Check if a valid session exists
export const isAuthenticated = () => {
  const session = getSession();
  return session && session.expires > Date.now();
};

// ✅ Create a new session (valid for 24 hours)
export const createSession = (email) => {
  const session = {
    token: crypto.randomUUID(),
    user: { email },
    expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };
  localStorage.setItem("ticketapp_session", JSON.stringify(session));
};

// ✅ Destroy session (logout)
export const destroySession = () => {
  localStorage.removeItem("ticketapp_session");
};

// ✅ Simulated user storage system
export const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem("ticketapp_users")) || [];
  } catch {
    return [];
  }
};

// ✅ Save a new user (signup)
export const saveUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("ticketapp_users", JSON.stringify(users));
};

  