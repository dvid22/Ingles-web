import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Background: glow + gradient + grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-500/18 blur-3xl" />
        <div className="absolute -bottom-56 right-[-180px] h-[780px] w-[780px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(99,102,241,0.18),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:44px_44px]" />
      </div>

      <main className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
        {/* Top badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.55)]" />
            Método diario • Progreso medible • Enfocado en fluidez
          </div>
        </div>

        {/* Hero */}
        <section className="mt-10 text-center">
          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
            Aprende inglés con un sistema{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-sky-200 to-cyan-200 bg-clip-text text-transparent">
              premium
            </span>{" "}
            diseñado para resultados.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Lecciones cortas, práctica inteligente y rachas que te mantienen consistente.
            Construye vocabulario y confianza, sin perderte en teoría.
          </p>

          {/* CTA row */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/auth/login"
              className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-2xl bg-indigo-500 px-8 py-3 font-semibold text-white transition hover:bg-indigo-400 sm:w-auto"
            >
              Empezar ahora
              <span className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(700px_240px_at_50%_0%,rgba(255,255,255,0.25),transparent_60%)]" />
            </Link>

            <Link
              to="/auth/register"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-8 py-3 text-center font-semibold text-slate-100 transition hover:bg-white/10 sm:w-auto"
            >
              Crear cuenta gratis
            </Link>
          </div>

          {/* Social proof */}
          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-3 text-sm text-slate-400 sm:flex-row sm:justify-center">
            <div className="flex items-center gap-2">
              <Stars />
              <span>Diseño enfocado en consistencia</span>
            </div>
            <span className="hidden sm:inline text-white/10">•</span>
            <span>Sin anuncios</span>
            <span className="hidden sm:inline text-white/10">•</span>
            <span>Tu progreso se guarda con tu cuenta</span>
          </div>
        </section>

        {/* Showcase */}
        <section className="mt-16">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left: cards */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium tracking-wider text-slate-400">
                      YOUR DASHBOARD
                    </p>
                    <h2 className="mt-1 text-xl font-semibold">
                      Aprende con foco. Mide tu avance.
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                      Una vista clara: lecciones, práctica y progreso en un solo lugar.
                    </p>
                  </div>
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-cyan-400/10">
                    <BookIcon />
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <MiniStat label="Racha" value="7 días" tone="emerald" />
                  <MiniStat label="Lecciones" value="18" tone="indigo" />
                  <MiniStat label="Vocab" value="120" tone="cyan" />
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-500/15 to-cyan-400/10 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Progreso semanal</p>
                    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                      +12% esta semana
                    </span>
                  </div>
                  <div className="mt-4 h-24 rounded-xl bg-white/5" />
                  <div className="mt-3 flex justify-between text-xs text-slate-400">
                    <span>Consistencia</span>
                    <span>Alta</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: feature list */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
                <p className="text-xs font-medium tracking-wider text-slate-400">
                  WHY IT WORKS
                </p>
                <h3 className="mt-1 text-xl font-semibold">Un método simple, bien hecho.</h3>

                <div className="mt-6 space-y-4">
                  <FeatureRow
                    title="Lecciones cortas y claras"
                    desc="Aprendes lo esencial, sin ruido. Ideal para construir hábito."
                    icon={<CheckIcon />}
                  />
                  <FeatureRow
                    title="Práctica inteligente"
                    desc="Refuerza lo que realmente se te olvida con ejercicios."
                    icon={<BoltIcon />}
                  />
                  <FeatureRow
                    title="Progreso visible"
                    desc="Rachas, métricas y objetivos. Motivación real, no promesas."
                    icon={<ChartIcon />}
                  />
                </div>

                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-300">
                    Empieza hoy y mantén tu racha. Tu yo del futuro te lo va a agradecer.
                  </p>
                  <div className="mt-3 flex gap-3">
                    <Link
                      to="/auth/login"
                      className="flex-1 rounded-2xl bg-indigo-500 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-indigo-400"
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      to="/auth/register"
                      className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-center text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                    >
                      Registrarme
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <section className="mt-16 grid gap-6 md:grid-cols-3">
          <Card
            title="Vocabulario útil"
            desc="Aprende palabras y frases que realmente usarás en conversación."
          />
          <Card
            title="Pronunciación guiada"
            desc="Espacios listos para integrar práctica de speaking más adelante."
          />
          <Card
            title="Ritmo sostenible"
            desc="Diseñado para 10–15 min/día. Mejor poco constante que mucho una vez."
          />
        </section>

        {/* Final CTA */}
        <section className="mt-16">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-500/15 to-cyan-400/10 p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div>
                <h3 className="text-2xl font-bold">¿Listo para empezar?</h3>
                <p className="mt-2 text-slate-300">
                  Crea tu cuenta y guarda tu progreso desde el día 1.
                </p>
              </div>
              <div className="flex w-full gap-3 sm:w-auto">
                <Link
                  to="/auth/login"
                  className="flex-1 rounded-2xl bg-indigo-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-indigo-400 sm:flex-none"
                >
                  Entrar
                </Link>
                <Link
                  to="/auth/register"
                  className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-center font-semibold text-slate-100 transition hover:bg-white/10 sm:flex-none"
                >
                  Crear cuenta
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-14 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} English Learning Platform — Built with focus.
        </footer>
      </main>
    </div>
  );
}

/* ---------- UI bits ---------- */

function Card({ title, desc }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/10">
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="mt-3 text-sm text-slate-400">{desc}</p>
    </div>
  );
}

function FeatureRow({ title, desc, icon }) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-2xl border border-white/10 bg-white/5">
        {icon}
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm text-slate-400">{desc}</p>
      </div>
    </div>
  );
}

function MiniStat({ label, value, tone }) {
  const toneClass =
    tone === "emerald"
      ? "bg-emerald-500/15 text-emerald-300"
      : tone === "cyan"
      ? "bg-cyan-400/10 text-cyan-200"
      : "bg-indigo-500/15 text-indigo-200";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-lg font-semibold">{value}</p>
        <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${toneClass}`}>
          Live
        </span>
      </div>
    </div>
  );
}

function Stars() {
  return (
    <div className="flex items-center gap-1" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-amber-300/90">
          <path d="M12 17.3l-6.18 3.64 1.64-7.03L2 9.24l7.19-.61L12 2l2.81 6.63 7.19.61-5.46 4.67 1.64 7.03z" />
        </svg>
      ))}
    </div>
  );
}

/* Icons */
function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-emerald-300">
      <path d="M20 7L10 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-indigo-200">
      <path d="M13 2L3 14h7l-1 8 12-14h-7l1-6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-cyan-200">
      <path d="M4 19V5m6 14V9m6 10V7m6 12V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
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
      <path d="M8 7h8M8 10h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}