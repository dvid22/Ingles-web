import { useAuth } from "../app/AuthProvider";
import { authController } from "../controllers/authController";

export default function HomeView() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-100 px-4">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl w-full max-w-lg">
        <h1 className="text-2xl font-bold">Home ✅</h1>
        <p className="mt-2 text-slate-300">
          Sesión activa como:{" "}
          <span className="font-semibold text-slate-100">
            {user?.displayName || user?.email}
          </span>
        </p>

        <button
          onClick={() => authController.logout()}
          className="mt-6 w-full rounded-2xl bg-white/5 px-4 py-3 font-semibold text-slate-100 transition hover:bg-white/10"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}