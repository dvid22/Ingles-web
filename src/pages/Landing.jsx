import { Link } from "react-router-dom";
import { 
  Globe, 
  BookOpen, 
  TrendingUp, 
  Sparkles, 
  Award, 
  Star, 
  Calendar,
  ChevronRight,
  CheckCircle2,
  Zap,
  BarChart3,
  Languages,
  Target,
  Volume2,
  Clock,
  Shield,
  MapPin
} from "lucide-react";

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Background: Floating flags - minimal y elegante */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Solo 4 banderas principales, bien espaciadas */}
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
        
        {/* Glow effects muy sutiles */}
        <div className="absolute -top-40 left-1/2 h-[820px] w-[820px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute -bottom-56 right-[-180px] h-[880px] w-[880px] rounded-full bg-sky-400/5 blur-3xl" />
      </div>

      <main className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
        {/* Top badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-200 bg-white/80 px-5 py-1.5 text-sm text-emerald-800 shadow-lg backdrop-blur-sm">
            <div className="relative">
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.55)]" />
            </div>
            <Globe className="h-4 w-4 text-emerald-600" />
            <span className="font-medium">Método diario • Progreso medible • Fluidez real</span>
          </div>
        </div>

        {/* Hero */}
        <section className="mt-12 text-center">
          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Aprende inglés con un sistema{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
              premium
            </span>{" "}
            diseñado para resultados.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl">
            Lecciones cortas, práctica inteligente y rachas que te mantienen consistente.
            Construye vocabulario y confianza, sin perderte en teoría.
          </p>

          {/* CTA row */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/auth/login"
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-sky-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30 sm:w-auto"
            >
              <span>Empezar ahora</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/auth/register"
              className="group w-full rounded-2xl border border-slate-200 bg-white px-8 py-4 text-center font-semibold text-slate-700 shadow-lg transition-all hover:border-emerald-300 hover:shadow-xl sm:w-auto"
            >
              Crear cuenta gratis
            </Link>
          </div>

          {/* Social proof - más compacto */}
          <div className="mx-auto mt-8 flex items-center justify-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <FlagUnitedKingdom className="h-6 w-6 rounded-full border-2 border-white shadow-lg" />
                <FlagUnitedStates className="h-6 w-6 rounded-full border-2 border-white shadow-lg" />
                <FlagCanada className="h-6 w-6 rounded-full border-2 border-white shadow-lg" />
              </div>
              <span className="font-medium text-slate-700">+2k estudiantes</span>
            </div>
            <div className="h-4 w-px bg-slate-300" />
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span className="text-slate-700">4.9/5</span>
            </div>
            <div className="h-4 w-px bg-slate-300" />
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-emerald-600" />
              <span className="text-slate-700">25+ países</span>
            </div>
          </div>
        </section>

        {/* Showcase */}
        <section className="mt-24">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left: cards */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-emerald-700">
                      <Sparkles className="h-3 w-3" />
                      <span>TU DASHBOARD</span>
                    </div>
                    <h2 className="mt-2 text-xl font-semibold text-slate-900">
                      Aprende con foco. Mide tu avance.
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                      Una vista clara: lecciones, práctica y progreso en un solo lugar.
                    </p>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500/10 to-sky-500/10">
                    <BookOpen className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <MiniStat label="Racha" value="7 días" />
                  <MiniStat label="Lecciones" value="18" />
                  <MiniStat label="Palabras" value="120" />
                </div>

                <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-800">Progreso semanal</p>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      ↑ +12%
                    </span>
                  </div>
                  <div className="mt-4 flex h-20 items-end gap-1">
                    {[65, 70, 80, 75, 85, 90, 82].map((height, i) => (
                      <div
                        key={i}
                        className="h-full w-full rounded-t-lg bg-gradient-to-t from-emerald-500 to-sky-400"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: feature list */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-emerald-700">
                  <Target className="h-3 w-3" />
                  <span>POR QUÉ FUNCIONA</span>
                </div>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">Un método simple, bien hecho.</h3>

                <div className="mt-6 space-y-4">
                  <FeatureRow
                    title="Lecciones cortas"
                    desc="Aprendes lo esencial, sin ruido."
                    icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                  />
                  <FeatureRow
                    title="Práctica inteligente"
                    desc="Refuerza lo que realmente se te olvida."
                    icon={<Zap className="h-5 w-5 text-sky-600" />}
                  />
                  <FeatureRow
                    title="Progreso visible"
                    desc="Rachas y métricas que motivan."
                    icon={<BarChart3 className="h-5 w-5 text-emerald-600" />}
                  />
                </div>

                <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-700">
                    Empieza hoy y mantén tu racha. Tu yo del futuro te lo agradecerá.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Link
                      to="/auth/login"
                      className="flex-1 rounded-xl bg-gradient-to-r from-emerald-600 to-sky-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
                    >
                      Entrar
                    </Link>
                    <Link
                      to="/auth/register"
                      className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-700"
                    >
                      Registrarme
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features grid - simplificado */}
        <section className="mt-16 grid gap-4 md:grid-cols-3">
          <SimpleCard
            icon={<BookOpen className="h-5 w-5" />}
            title="Vocabulario útil"
            desc="Palabras que realmente usarás."
          />
          <SimpleCard
            icon={<Volume2 className="h-5 w-5" />}
            title="Pronunciación"
            desc="Habla con confianza."
          />
          <SimpleCard
            icon={<Clock className="h-5 w-5" />}
            title="10-15 min/día"
            desc="Ritmo sostenible."
          />
        </section>

        {/* Final CTA - simplificado */}
        <section className="mt-16">
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
            <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">¿Listo para empezar?</h3>
                <p className="text-slate-600">Crea tu cuenta gratis y empieza hoy.</p>
              </div>
              <div className="flex gap-3">
                <Link
                  to="/auth/login"
                  className="rounded-xl bg-gradient-to-r from-emerald-600 to-sky-600 px-6 py-3 font-semibold text-white shadow-lg"
                >
                  Entrar
                </Link>
                <Link
                  to="/auth/register"
                  className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 shadow-lg"
                >
                  Crear cuenta
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer simplificado */}
        <footer className="mt-16 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} English Learning Platform</p>
        </footer>
      </main>
    </div>
  );
}

/* ---------- Componentes simplificados ---------- */

function SimpleCard({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-md backdrop-blur-sm">
      <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500/10 to-sky-500/10">
        <div className="text-emerald-600">{icon}</div>
      </div>
      <h4 className="font-semibold text-slate-900">{title}</h4>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </div>
  );
}

function FeatureRow({ title, desc, icon }) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-emerald-500/10 to-sky-500/10">
        {icon}
      </div>
      <div>
        <p className="font-medium text-slate-800">{title}</p>
        <p className="text-sm text-slate-600">{desc}</p>
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}

/* ---------- Banderas (solo las 4 principales) ---------- */

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

/* Animaciones */
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