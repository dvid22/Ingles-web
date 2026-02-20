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
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Background: premium gradient + glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[-80px] h-[520px] w-[520px] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-44 right-[-140px] h-[560px] w-[560px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(99,102,241,0.18),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:44px_44px]" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-4 py-10 lg:grid-cols-2">
        {/* Left: info */}
        <div className="hidden lg:block">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.7)]" />
            Recupera tu cuenta en minutos
          </div>

          <h1 className="mt-5 text-4xl font-bold leading-tight">
            Volver a tu aprendizaje{" "}
            <span className="bg-gradient-to-r from-indigo-300 to-cyan-200 bg-clip-text text-transparent">
              es fácil
            </span>
            .
          </h1>

          <p className="mt-4 max-w-xl text-base text-slate-300">
            Te enviaremos un correo con instrucciones para restablecer tu contraseña
            y continuar tu progreso.
          </p>

          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            <StatCard title="Seguridad" value="Email" />
            <StatCard title="Tiempo" value="Rápido" />
            <StatCard title="Soporte" value="24/7" />
          </div>
        </div>

        {/* Right: card */}
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium tracking-wider text-slate-400">
                  PASSWORD RESET
                </p>
                <h2 className="mt-1 text-2xl font-bold">Recuperar contraseña</h2>
                <p className="mt-1 text-sm text-slate-300">
                  Escribe tu email y te enviamos un enlace.
                </p>
              </div>

              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-cyan-400/10">
                <KeyIcon />
              </div>
            </div>

            {/* Alerts */}
            {error && (
              <div
                role="alert"
                className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
              >
                {error}
              </div>
            )}

            {ok && (
              <div
                role="status"
                className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200"
              >
                Listo ✅ Enviamos el correo. Revisa también <b>spam</b> o <b>promociones</b>.
              </div>
            )}

            {/* Form */}
            <form onSubmit={onReset} className="mt-5 space-y-4">
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
                <p className="mt-2 text-xs text-slate-400">
                  Si el email existe, recibirás instrucciones (por seguridad).
                </p>
              </div>

              <button
                disabled={!canSubmit}
                className="group relative w-full overflow-hidden rounded-2xl bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="relative z-10 inline-flex items-center justify-center gap-2">
                  {loading ? <Spinner /> : null}
                  {loading ? "Enviando..." : "Enviar enlace"}
                </span>
                <span className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(600px_200px_at_50%_0%,rgba(255,255,255,0.22),transparent_60%)]" />
              </button>
            </form>

            {/* Footer links */}
            <div className="mt-6 flex items-center justify-between text-sm">
              <Link to="/login" className="text-slate-300 hover:text-white">
                Volver a iniciar sesión
              </Link>
              <Link to="/register" className="font-semibold text-indigo-300 hover:text-indigo-200">
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

function KeyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-slate-100">
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