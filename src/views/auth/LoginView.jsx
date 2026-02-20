import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authController, getAuthErrorMessage } from "../../controllers/authController";
import { useAuth } from "../../app/AuthProvider";

export default function LoginView() {
  const nav = useNavigate();
  const location = useLocation();
  const { user, initializing } = useAuth();

  const redirectTo = useMemo(() => {
    // si ProtectedRoute mandó a login, viene algo como state.from = "/app"
    return location.state?.from || "/app";
  }, [location.state]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    return email.trim().length > 3 && password.length >= 6 && !loading;
  }, [email, password, loading]);

  // Si ya está logueado, no tiene sentido mostrar login
  useEffect(() => {
    if (!initializing && user) {
      nav(redirectTo, { replace: true });
    }
  }, [user, initializing, nav, redirectTo]);

  const onEmailLogin = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setError("");
    setLoading(true);
    try {
      await authController.loginWithEmail(email.trim(), password);
      nav(redirectTo, { replace: true }); // ✅ aquí estaba el problema
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const onGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await authController.loginWithGoogle();
      nav(redirectTo, { replace: true }); // ✅ aquí también
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Background: premium gradient + glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(99,102,241,0.20),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:44px_44px]" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-4 py-10 lg:grid-cols-2">
        {/* Left: brand / pitch */}
        <div className="hidden lg:block">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.7)]" />
            Tu progreso se guarda automáticamente
          </div>

          <h1 className="mt-5 text-4xl font-bold leading-tight">
            Aprende inglés con un método{" "}
            <span className="bg-gradient-to-r from-indigo-300 to-cyan-200 bg-clip-text text-transparent">
              claro, diario y medible
            </span>
            .
          </h1>

          <p className="mt-4 max-w-xl text-base text-slate-300">
            Inicia sesión para continuar tus lecciones, practicar vocabulario y
            mantener tu racha.
          </p>

          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            <StatCard title="Lecciones" value="Cortas" />
            <StatCard title="Práctica" value="Flashcards" />
            <StatCard title="Progreso" value="Rachas" />
          </div>
        </div>

        {/* Right: card */}
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium tracking-wider text-slate-400">
                  ENGLISH LEARNING
                </p>
                <h2 className="mt-1 text-2xl font-bold">Bienvenido de vuelta</h2>
                <p className="mt-1 text-sm text-slate-300">
                  Inicia sesión para seguir aprendiendo.
                </p>
              </div>

              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-cyan-400/10">
                <BookIcon />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
              >
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={onEmailLogin} className="mt-5 space-y-4">
              <div>
                <label className="text-sm text-slate-200">Email</label>
                <div className="mt-1 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500/60">
                  <MailIcon />
                  <input
                    className="w-full bg-transparent text-slate-100 placeholder:text-slate-400 focus:outline-none"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    inputMode="email"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-200">Contraseña</label>
                <div className="mt-1 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500/60">
                  <LockIcon />
                  <input
                    className="w-full bg-transparent text-slate-100 placeholder:text-slate-400 focus:outline-none"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="rounded-xl px-2 py-1 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? "Ocultar" : "Ver"}
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Mínimo 6 caracteres</span>
                  {/* ✅ ruta correcta */}
                  <Link to="/auth/reset" className="text-indigo-300 hover:text-indigo-200">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>

              <button
                disabled={!canSubmit}
                className="group relative w-full overflow-hidden rounded-2xl bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="relative z-10 inline-flex items-center justify-center gap-2">
                  {loading ? <Spinner /> : null}
                  {loading ? "Entrando..." : "Entrar"}
                </span>
                <span className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(600px_200px_at_50%_0%,rgba(255,255,255,0.22),transparent_60%)]" />
              </button>
            </form>

            {/* Divider */}
            <div className="mt-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-slate-400">o continúa con</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Google */}
            <button
              onClick={onGoogleLogin}
              disabled={loading}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-slate-100 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <GoogleIcon />
              Google
            </button>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-slate-300">
              ¿No tienes cuenta?{" "}
              {/* ✅ ruta correcta */}
              <Link to="/auth/register" className="font-semibold text-indigo-300 hover:text-indigo-200">
                Crear cuenta
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Al continuar, aceptas nuestros términos y política de privacidad.
          </p>
        </div>
      </div>
    </div>
  );
}

/* --- Small UI bits --- */

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-medium text-slate-400">{title}</p>
      <p className="mt-1 text-lg font-semibold text-slate-100">{value}</p>
    </div>
  );
}

function Spinner() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
      aria-hidden="true"
    />
  );
}

function BookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-slate-100">
      <path
        d="M4 5.5C4 4.12 5.12 3 6.5 3H20v16.5c0 .83-.67 1.5-1.5 1.5H7.5C5.57 21 4 19.43 4 17.5V5.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M20 17H7.5C5.57 17 4 18.57 4 20.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8 7h8M8 10h6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-slate-300">
      <path
        d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m6.5 8 5.5 4 5.5-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-slate-300">
      <path
        d="M7 11V8.5A5 5 0 0 1 12 3.5a5 5 0 0 1 5 5V11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6.5 11h11A2.5 2.5 0 0 1 20 13.5v5A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5v-5A2.5 2.5 0 0 1 6.5 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.613 32.651 29.189 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.843 1.154 7.961 3.039l5.657-5.657C34.71 6.053 29.616 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20c0-1.341-.138-2.65-.389-3.917Z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691 12.87 19.51C14.648 15.108 18.977 12 24 12c3.059 0 5.843 1.154 7.961 3.039l5.657-5.657C34.71 6.053 29.616 4 24 4c-7.682 0-14.3 4.327-17.694 10.691Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.082 0 9.993-1.947 13.576-5.111l-6.267-5.303C29.243 35.091 26.736 36 24 36c-5.166 0-9.574-3.33-11.276-7.946l-6.51 5.017C9.57 39.556 16.227 44 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.03 12.03 0 0 1-4.0 5.586l.003-.002 6.267 5.303C36.93 40.0 44 35.5 44 24c0-1.341-.138-2.65-.389-3.917Z"
      />
    </svg>
  );
}