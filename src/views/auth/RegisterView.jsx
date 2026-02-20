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
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Background: premium gradient + glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[-80px] h-[520px] w-[520px] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-44 right-[-140px] h-[560px] w-[560px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(99,102,241,0.18),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:44px_44px]" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-4 py-10 lg:grid-cols-2">
        {/* Left: brand / pitch */}
        <div className="hidden lg:block">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
            <span className="h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_18px_rgba(99,102,241,0.7)]" />
            Empieza tu racha hoy
          </div>

          <h1 className="mt-5 text-4xl font-bold leading-tight">
            Crea tu cuenta y aprende{" "}
            <span className="bg-gradient-to-r from-indigo-300 to-cyan-200 bg-clip-text text-transparent">
              inglés
            </span>{" "}
            con consistencia.
          </h1>

          <p className="mt-4 max-w-xl text-base text-slate-300">
            Guarda tu progreso, completa lecciones y practica vocabulario con un
            plan diario.
          </p>

          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            <StatCard title="Meta" value="Diaria" />
            <StatCard title="Vocab" value="Smart" />
            <StatCard title="Racha" value="🔥" />
          </div>
        </div>

        {/* Right: card */}
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium tracking-wider text-slate-400">
                  CREATE ACCOUNT
                </p>
                <h2 className="mt-1 text-2xl font-bold">Crea tu cuenta</h2>
                <p className="mt-1 text-sm text-slate-300">
                  En menos de un minuto.
                </p>
              </div>

              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-cyan-400/10">
                <SparkIcon />
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
            <form onSubmit={onRegister} className="mt-5 space-y-4">
              <div>
                <label className="text-sm text-slate-200">Nombre</label>
                <div className="mt-1 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500/60">
                  <UserIcon />
                  <input
                    className="w-full bg-transparent text-slate-100 placeholder:text-slate-400 focus:outline-none"
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
                    className="rounded-xl px-2 py-1 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? "Ocultar" : "Ver"}
                  </button>
                </div>
                <p className="mt-2 text-xs text-slate-400">Usa una contraseña segura y única.</p>
              </div>

              <div>
                <label className="text-sm text-slate-200">Confirmar contraseña</label>
                <div
                  className={[
                    "mt-1 flex items-center gap-2 rounded-2xl border bg-white/5 px-3 py-2 focus-within:ring-2",
                    passwordMismatch
                      ? "border-red-500/40 focus-within:ring-red-500/40"
                      : "border-white/10 focus-within:ring-indigo-500/60",
                  ].join(" ")}
                >
                  <LockIcon />
                  <input
                    className="w-full bg-transparent text-slate-100 placeholder:text-slate-400 focus:outline-none"
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
                  <p className="mt-2 text-xs text-red-200">Las contraseñas no coinciden.</p>
                ) : null}
              </div>

              <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent accent-indigo-500"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
                <span>
                  Acepto los{" "}
                  <span className="text-indigo-300">términos</span> y la{" "}
                  <span className="text-indigo-300">política de privacidad</span>.
                </span>
              </label>

              <button
                disabled={!canSubmit}
                className="group relative w-full overflow-hidden rounded-2xl bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="relative z-10 inline-flex items-center justify-center gap-2">
                  {loading ? <Spinner /> : null}
                  {loading ? "Creando..." : "Crear cuenta"}
                </span>
                <span className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(600px_200px_at_50%_0%,rgba(255,255,255,0.22),transparent_60%)]" />
              </button>
            </form>

            {/* Divider */}
            <div className="mt-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-slate-400">o regístrate con</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Google */}
            <button
              onClick={onGoogleRegister}
              disabled={loading}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-slate-100 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <GoogleIcon />
              Google
            </button>

            <div className="mt-6 text-center text-sm text-slate-300">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="font-semibold text-indigo-300 hover:text-indigo-200">
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

function SparkIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-slate-100">
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-slate-300">
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