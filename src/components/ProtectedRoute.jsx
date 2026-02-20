import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../app/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { user, initializing } = useAuth();
  const location = useLocation();

  // Mientras Firebase decide si hay sesión o no
  if (initializing) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-100">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 shadow-xl backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            <span className="text-sm text-slate-200">Cargando sesión...</span>
          </div>
        </div>
      </div>
    );
  }

  // Si no hay usuario, manda a login y guarda la ruta para volver
  if (!user) {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}