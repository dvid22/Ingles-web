import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { authController, getAuthErrorMessage } from "../../controllers/authController";

export default function ForgotPasswordView() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  const canSubmit = useMemo(() => {
    return email.trim().length > 3 && !loading;
  }, [email, loading]);

  const onReset = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setError("");
    setOk(false);
    setLoading(true);
    try {
      await authController.resetPassword(email.trim());
      setOk(true);
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Background: Floating flags - mismas que en Landing, Login y Register */}
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
        {/* Left: info - actualizado con colores claros */}
        <div className="hidden lg:block">
          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-200 bg-white/80 px-5 py-1.5 text-sm text-emerald-800 shadow-lg backdrop-blur-sm">
            <div className="relative">
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.55)]" />
            </div>
            <KeyIcon className="h-4 w-4 text-emerald-600" />
            <span className="font-medium">Recupera tu cuenta en minutos</span>
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900">
            Volver a tu aprendizaje{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
              es fácil
            </span>
            .
          </h1>

          <p className="mt-4 max-w-xl text-base text-slate-600">
            Te enviaremos un correo con instrucciones para restablecer tu contraseña
            y continuar tu progreso.
          </p>

          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            <StatCard title="Seguridad" value="Email" />
            <StatCard title="Tiempo" value="Rápido" />
            <StatCard title="Soporte" value="24/7" />
          </div>

          {/* Mini banderas decorativas (igual que en Login/Register) */}
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
                  PASSWORD RESET
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">Recuperar contraseña</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Escribe tu email y te enviamos un enlace.
                </p>
              </div>

              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500/10 to-sky-500/10">
                <KeyIcon />
              </div>
            </div>

            {/* Alerts */}
            {error && (
              <div
                role="alert"
                className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {ok && (
              <div
                role="status"
                className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">✅</span>
                  <span>
                    <strong>Listo!</strong> Enviamos el correo. Revisa también <strong>spam</strong> o <strong>promociones</strong>.
                  </span>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={onReset} className="mt-5 space-y-4">
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
                <p className="mt-2 text-xs text-slate-500">
                  Si el email existe, recibirás instrucciones (por seguridad).
                </p>
              </div>

              <button
                disabled={!canSubmit}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-sky-600 px-4 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="relative z-10 inline-flex items-center justify-center gap-2">
                  {loading ? <Spinner /> : null}
                  {loading ? "Enviando..." : "Enviar enlace"}
                </span>
                <span className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(600px_200px_at_50%_0%,rgba(255,255,255,0.3),transparent_60%)]" />
              </button>
            </form>

            {/* Footer links */}
            <div className="mt-6 flex items-center justify-between text-sm">
              <Link to="/login" className="text-slate-600 hover:text-emerald-700">
                Volver a iniciar sesión
              </Link>
              <Link to="/register" className="font-semibold text-emerald-700 hover:text-emerald-800">
                Crear cuenta
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Consejo: si no llega en 2–3 minutos, intenta reenviar o revisa filtros.
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

function KeyIcon({ className = "" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={className || "text-emerald-700"}>
      <path
        d="M14.5 10.5a4.5 4.5 0 1 0-4.2 4.49"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10.3 15H21v3h-2v2h-3v-2h-2v-3h-3.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
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

/* ---------- Banderas (mismas que en Landing, Login y Register) ---------- */

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

/* Animaciones - mismas que en Landing, Login y Register */
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