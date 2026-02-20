import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authController, getAuthErrorMessage } from "../../controllers/authController";

export default function RegisterView() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [acceptTerms, setAcceptTerms] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordMismatch = useMemo(() => {
    return confirmPassword.length > 0 && password !== confirmPassword;
  }, [password, confirmPassword]);

  const canSubmit = useMemo(() => {
    return (
      name.trim().length >= 2 &&
      email.trim().length > 3 &&
      password.length >= 6 &&
      confirmPassword.length >= 6 &&
      !passwordMismatch &&
      acceptTerms &&
      !loading
    );
  }, [name, email, password, confirmPassword, passwordMismatch, acceptTerms, loading]);

  const onRegister = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setError("");
    setLoading(true);
    try {
      await authController.registerWithEmail({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      nav("/", { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const onGoogleRegister = async () => {
    setError("");
    setLoading(true);
    try {
      await authController.loginWithGoogle();
      nav("/", { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Background: Floating flags - mismas que en Landing y Login */}
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
            <SparkIcon className="h-4 w-4 text-emerald-600" />
            <span className="font-medium">Empieza tu racha hoy</span>
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900">
            Crea tu cuenta y aprende{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
              inglés
            </span>{" "}
            con consistencia.
          </h1>

          <p className="mt-4 max-w-xl text-base text-slate-600">
            Guarda tu progreso, completa lecciones y practica vocabulario con un
            plan diario.
          </p>

          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            <StatCard title="Meta" value="Diaria" />
            <StatCard title="Vocab" value="Smart" />
            <StatCard title="Racha" value="🔥" />
          </div>

          {/* Mini banderas decorativas (igual que en Login) */}
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
                  CREATE ACCOUNT
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">Crea tu cuenta</h2>
                <p className="mt-1 text-sm text-slate-600">
                  En menos de un minuto.
                </p>
              </div>

              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500/10 to-sky-500/10">
                <SparkIcon />
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
            <form onSubmit={onRegister} className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Nombre</label>
                <div className="mt-1 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-500/20">
                  <UserIcon />
                  <input
                    className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    type="text"
                    autoComplete="name"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    minLength={2}
                  />
                </div>
              </div>

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
                    autoComplete="new-password"
                    placeholder="mín. 6 caracteres"
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
                <p className="mt-2 text-xs text-slate-500">Usa una contraseña segura y única.</p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Confirmar contraseña</label>
                <div
                  className={[
                    "mt-1 flex items-center gap-2 rounded-2xl border bg-white px-3 py-2 focus-within:ring-2",
                    passwordMismatch
                      ? "border-red-300 focus-within:border-red-300 focus-within:ring-red-500/20"
                      : "border-slate-200 focus-within:border-emerald-300 focus-within:ring-emerald-500/20",
                  ].join(" ")}
                >
                  <LockIcon />
                  <input
                    className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="repite tu contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                {passwordMismatch ? (
                  <p className="mt-2 text-xs text-red-600">Las contraseñas no coinciden.</p>
                ) : null}
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 transition hover:border-emerald-200">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/20"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
                <span>
                  Acepto los{" "}
                  <span className="font-medium text-emerald-700 hover:text-emerald-800">términos</span> y la{" "}
                  <span className="font-medium text-emerald-700 hover:text-emerald-800">política de privacidad</span>.
                </span>
              </label>

              <button
                disabled={!canSubmit}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-sky-600 px-4 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="relative z-10 inline-flex items-center justify-center gap-2">
                  {loading ? <Spinner /> : null}
                  {loading ? "Creando..." : "Crear cuenta"}
                </span>
                <span className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(600px_200px_at_50%_0%,rgba(255,255,255,0.3),transparent_60%)]" />
              </button>
            </form>

            {/* Divider */}
            <div className="mt-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-500">o regístrate con</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Google */}
            <button
              onClick={onGoogleRegister}
              disabled={loading}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 shadow-md transition-all hover:border-emerald-300 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              <GoogleIcon />
              Google
            </button>

            <div className="mt-6 text-center text-sm text-slate-600">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="font-semibold text-emerald-700 hover:text-emerald-800">
                Inicia sesión
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Tip: podrás cambiar tu nombre y avatar después.
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

function SparkIcon({ className = "" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={className || "text-emerald-700"}>
      <path
        d="M12 2l1.2 4.2L17 7.4l-3.8 1.2L12 12l-1.2-3.4L7 7.4l3.8-1.2L12 2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M5 12l.8 2.8L8.5 16l-2.7.8L5 19l-.8-2.2L1.5 16l2.7-1.2L5 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M19 13l.8 2.8L22.5 17l-2.7.8L19 20l-.8-2.2L15.5 17l2.7-1.2L19 13Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-slate-400">
      <path
        d="M20 21a8 8 0 0 0-16 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
        stroke="currentColor"
        strokeWidth="1.8"
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

/* ---------- Banderas (mismas que en Landing y Login) ---------- */

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

/* Animaciones - mismas que en Landing y Login */
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