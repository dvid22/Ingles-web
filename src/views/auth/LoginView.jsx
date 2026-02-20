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
      nav(redirectTo, { replace: true });
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
      nav(redirectTo, { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Background: Floating flags - mismas que en Landing */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Mismas 4 banderas principales con misma opacidad */}
        <div className="absolute left-[5%] top-[10%] h-96 w-96 animate-float-slow opacity-[0.12]">
          <FlagUnitedKingdom className="h-full w-full drop-shadow-2xl" />
        </div>
        <div className="absolute right-[5%] top-[15%] h-96 w-96 animate-float opacity-[0.12]">
          <FlagUnitedStates className="h-full w-full drop-shadow-2xl" />
        </div>
        <div className="absolute bottom-[10%] left-[10%] h-80 w-80 animate-float-slower opacity-[0.12]">
          <FlagCanada className="h-full w-full drop-shadow-2xl" />
        </div>
        <div className="absolute bottom-[15%] right-[10%] h-80 w-80 animate-float-medium opacity-[0.12]">
          <FlagAustralia className="h-full w-full drop-shadow-2xl" />
        </div>
        
        {/* Glow effects muy sutiles como en Landing */}
        <div className="absolute -top-40 left-1/2 h-[820px] w-[820px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute -bottom-56 right-[-180px] h-[880px] w-[880px] rounded-full bg-sky-400/5 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-4 py-10 lg:grid-cols-2">
        {/* Left: brand / pitch - actualizado con colores claros */}
        <div className="hidden lg:block">
          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-200 bg-white/80 px-5 py-1.5 text-sm text-emerald-800 shadow-lg backdrop-blur-sm">
            <div className="relative">
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.55)]" />
            </div>
            <GlobeIcon className="h-4 w-4 text-emerald-600" />
            <span className="font-medium">Tu progreso se guarda automáticamente</span>
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900">
            Aprende inglés con un método{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
              claro, diario y medible
            </span>
            .
          </h1>

          <p className="mt-4 max-w-xl text-base text-slate-600">
            Inicia sesión para continuar tus lecciones, practicar vocabulario y
            mantener tu racha.
          </p>

          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            <StatCard title="Lecciones" value="Cortas" />
            <StatCard title="Práctica" value="Flashcards" />
            <StatCard title="Progreso" value="Rachas" />
          </div>

          {/* Mini banderas decorativas */}
          <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
            <div className="flex -space-x-2">
              <FlagUnitedKingdom className="h-6 w-6 rounded-full border-2 border-white shadow-lg" />
              <FlagUnitedStates className="h-6 w-6 rounded-full border-2 border-white shadow-lg" />
              <FlagCanada className="h-6 w-6 rounded-full border-2 border-white shadow-lg" />
              <FlagAustralia className="h-6 w-6 rounded-full border-2 border-white shadow-lg" />
            </div>
            <span>Únete a +2k estudiantes</span>
          </div>
        </div>

        {/* Right: card - actualizada con colores claros */}
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium tracking-wider text-emerald-700">
                  ENGLISH LEARNING
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">Bienvenido de vuelta</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Inicia sesión para seguir aprendiendo.
                </p>
              </div>

              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500/10 to-sky-500/10">
                <BookIcon />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={onEmailLogin} className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Email</label>
                <div className="mt-1 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-500/20">
                  <MailIcon />
                  <input
                    className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none"
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
                <label className="text-sm font-medium text-slate-700">Contraseña</label>
                <div className="mt-1 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-500/20">
                  <LockIcon />
                  <input
                    className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none"
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
                    className="rounded-xl px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? "Ocultar" : "Ver"}
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Mínimo 6 caracteres</span>
                  <Link to="/auth/reset" className="font-medium text-emerald-700 hover:text-emerald-800">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>

              <button
                disabled={!canSubmit}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-sky-600 px-4 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="relative z-10 inline-flex items-center justify-center gap-2">
                  {loading ? <Spinner /> : null}
                  {loading ? "Entrando..." : "Entrar"}
                </span>
                <span className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(600px_200px_at_50%_0%,rgba(255,255,255,0.3),transparent_60%)]" />
              </button>
            </form>

            {/* Divider */}
            <div className="mt-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-500">o continúa con</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Google */}
            <button
              onClick={onGoogleLogin}
              disabled={loading}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 shadow-md transition-all hover:border-emerald-300 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              <GoogleIcon />
              Google
            </button>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-slate-600">
              ¿No tienes cuenta?{" "}
              <Link to="/auth/register" className="font-semibold text-emerald-700 hover:text-emerald-800">
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

/* --- Small UI bits - actualizados con colores claros --- */

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md">
      <p className="text-xs font-medium text-slate-500">{title}</p>
      <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
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

function GlobeIcon({ className = "" }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-emerald-700">
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-slate-400">
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-slate-400">
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

/* ---------- Banderas (mismas que en Landing) ---------- */

function FlagUnitedKingdom({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 60 40">
      <rect width="60" height="40" fill="#012169"/>
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="white" strokeWidth="6"/>
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="4"/>
      <path d="M0 20 L60 20 M30 0 L30 40" stroke="white" strokeWidth="8"/>
      <path d="M0 20 L60 20 M30 0 L30 40" stroke="#C8102E" strokeWidth="4"/>
    </svg>
  );
}

function FlagUnitedStates({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 60 40">
      {[...Array(13)].map((_, i) => (
        <rect key={i} y={i * 3.076} width="60" height="3.076" fill={i % 2 === 0 ? "#B22234" : "white"}/>
      ))}
      <rect width="24" height="21.538" fill="#3C3B6E"/>
      {[...Array(50)].map((_, i) => {
        const row = Math.floor(i / 6);
        const col = i % 6;
        return (
          <circle key={i} cx={2 + col * 4} cy={2 + row * 3.5} r="0.8" fill="white"/>
        );
      })}
    </svg>
  );
}

function FlagCanada({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 60 40">
      <rect width="60" height="40" fill="white"/>
      <rect width="15" height="40" fill="#C8102E"/>
      <rect x="45" width="15" height="40" fill="#C8102E"/>
      <path d="M30 8 L33 16 L38 16 L34 20 L36 26 L30 22 L24 26 L26 20 L22 16 L27 16 L30 8Z" fill="#C8102E"/>
    </svg>
  );
}

function FlagAustralia({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 60 40">
      <rect width="60" height="40" fill="#012169"/>
      <path d="M0 0 L30 20 M30 0 L0 20" stroke="white" strokeWidth="2"/>
      <path d="M0 0 L30 20 M30 0 L0 20" stroke="#C8102E" strokeWidth="1.5"/>
      <circle cx="15" cy="10" r="6" fill="white"/>
      <circle cx="15" cy="10" r="5" fill="#012169"/>
    </svg>
  );
}

/* Animaciones - mismas que en Landing */
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
  }
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px) rotate(-2deg); }
    50% { transform: translateY(-15px) rotate(0deg); }
  }
  @keyframes float-slower {
    0%, 100% { transform: translateY(0px) rotate(2deg); }
    50% { transform: translateY(-25px) rotate(-2deg); }
  }
  @keyframes float-medium {
    0%, 100% { transform: translateY(0px) rotate(-1deg); }
    50% { transform: translateY(-18px) rotate(1deg); }
  }
  .animate-float { animation: float 8s ease-in-out infinite; }
  .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
  .animate-float-slower { animation: float-slower 12s ease-in-out infinite; }
  .animate-float-medium { animation: float-medium 9s ease-in-out infinite; }
`;
document.head.appendChild(style);