import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authController } from "../controllers/authController";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsub = authController.onAuthChange((u) => {
      setUser(u ?? null);
      setInitializing(false);
    });
    return () => unsub();
  }, []);

  const value = useMemo(() => ({ user, initializing }), [user, initializing]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider />");
  return ctx;
}