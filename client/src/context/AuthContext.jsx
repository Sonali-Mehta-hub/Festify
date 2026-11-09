import { createContext, useContext, useEffect, useState } from "react";
import request from "../api/request.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  async function refreshUser() {
    try {
      const data = await request("/api/me");
      setUser(data.user);
      setAuthError("");
    } catch (error) {
      setUser(null);
      setAuthError(error.message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  }

  useEffect(() => {
    refreshUser().catch(() => {});
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, refreshUser, authLoading, authError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
