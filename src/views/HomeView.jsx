import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../app/AuthProvider";
import { 
  BookOpen, 
  TrendingUp, 
  Sparkles, 
  Award, 
  Calendar,
  CheckCircle2,
  BarChart3,
  Languages,
  Target,
  Clock,
  Flame,
  ChevronRight
} from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();
  const firstName = useMemo(() => {
    return user?.name?.split(' ')[0] || 'Estudiante';
  }, [user]);

  // Datos de ejemplo para el dashboard
  const stats = {
    streak: 7,
    lessonsCompleted: 18,
    wordsLearned: 120,
    weeklyProgress: 12
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Background: Floating flags - mismas que en auth pages */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Mismas 4 banderas principales con opacidad más baja para no distraer */}
        <div className="absolute left-[2%] top-[5%] h-64 w-64 animate-float-slow opacity-[0.08]">
          <FlagUnitedKingdom className="h-full w-full drop-shadow-2xl" />
        </div>
        <div className="absolute right-[2%] top-[10%] h-64 w-64 animate-float opacity-[0.08]">
          <FlagUnitedStates className="h-full w-full drop-shadow-2xl" />
        </div>
        <div className="absolute bottom-[5%] left-[5%] h-56 w-56 animate-float-slower opacity-[0.08]">
          <FlagCanada className="h-full w-full drop-shadow-2xl" />
        </div>
        <div className="absolute bottom-[10%] right-[5%] h-56 w-56 animate-float-medium opacity-[0.08]">
          <FlagAustralia className="h-full w-full drop-shadow-2xl" />
        </div>
        
        {/* Glow effects muy sutiles */}
        <div className="absolute -top-40 left-1/2 h-[820px] w-[820px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute -bottom-56 right-[-180px] h-[880px] w-[880px] rounded-full bg-sky-400/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-8">
        {/* Header con bienvenida */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-emerald-700">
              <Sparkles className="h-4 w-4" />
              <span>Bienvenido de vuelta</span>
            </div>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              ¡Hola, {firstName}! 👋
            </h1>
          </div>
          
          {/* Mini perfil */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-700">Tu racha</p>
              <div className="flex items-center gap-1 text-emerald-700">
                <Flame className="h-5 w-5 fill-emerald-600 text-emerald-600" />
                <span className="text-2xl font-bold">{stats.streak}</span>
                <span className="text-sm text-slate-500">días</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white text-2xl font-bold text-emerald-700">
                {firstName[0].toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Calendar className="h-5 w-5" />}
            label="Racha actual"
            value={`${stats.streak} días`}
            trend="+2"
            color="emerald"
          />
          <StatCard
            icon={<BookOpen className="h-5 w-5" />}
            label="Lecciones"
            value={`${stats.lessonsCompleted}`}
            trend="+3"
            color="sky"
          />
          <StatCard
            icon={<Languages className="h-5 w-5" />}
            label="Palabras"
            value={`${stats.wordsLearned}`}
            trend="+12"
            color="teal"
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5" />}
            label="Progreso"
            value={`+${stats.weeklyProgress}%`}
            trend="Esta semana"
            color="emerald"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Progreso y próxima lección */}
          <div className="lg:col-span-2 space-y-6">
            {/* Próxima lección */}
            <div className="group relative rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur-sm transition-all hover:border-emerald-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium tracking-wider text-emerald-700">
                    SIGUIENTE LECCIÓN
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">
                    Presente Simple
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Aprende a hablar sobre rutinas y hábitos
                  </p>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500/10 to-sky-500/10">
                  <BookOpen className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="h-4 w-4" />
                  <span>10 min</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Award className="h-4 w-4" />
                  <span>+50 XP</span>
                </div>
              </div>

              <Link
                to="/app/lessons"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:shadow-emerald-500/30"
              >
                Continuar aprendiendo
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Progreso semanal */}
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">Progreso semanal</h3>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  ↑ +12% vs semana pasada
                </span>
              </div>
              
              <div className="mt-4">
                <div className="flex h-3 gap-1">
                  {[65, 70, 80, 75, 85, 90, 82].map((height, i) => (
                    <div
                      key={i}
                      className="h-full w-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-400"
                      style={{ width: `${height}%` }}
                    />
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-xs text-slate-500">
                  <span>Lun</span>
                  <span>Mar</span>
                  <span>Mié</span>
                  <span>Jue</span>
                  <span>Vie</span>
                  <span>Sáb</span>
                  <span>Dom</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Logros y actividad */}
          <div className="space-y-6">
            {/* Logros recientes */}
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
              <h3 className="font-semibold text-slate-900">Logros recientes</h3>
              <div className="mt-4 space-y-3">
                <AchievementBadge
                  icon={<Flame className="h-5 w-5" />}
                  title="Racha de 7 días"
                  description="Sigue así!"
                  color="emerald"
                />
                <AchievementBadge
                  icon={<BookOpen className="h-5 w-5" />}
                  title="Lección 18 completada"
                  description="Estás avanzando"
                  color="sky"
                />
                <AchievementBadge
                  icon={<Languages className="h-5 w-5" />}
                  title="120 palabras"
                  description="Vocabulario creciendo"
                  color="teal"
                />
              </div>
              
              <Link
                to="/app/progress"
                className="mt-4 inline-flex w-full items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-300"
              >
                Ver todos los logros
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Práctica rápida */}
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-emerald-500/5 to-sky-500/5 p-6 shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-emerald-600" />
                <div>
                  <h3 className="font-semibold text-slate-900">Práctica rápida</h3>
                  <p className="text-sm text-slate-600">5 minutos para repasar</p>
                </div>
              </div>
              
              <Link
                to="/app/practice"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:shadow-emerald-500/30"
              >
                Empezar práctica
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Módulos rápidos */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickModule
            icon={<BookOpen className="h-5 w-5" />}
            title="Lecciones"
            description="Contenido nuevo cada día"
            link="/app/lessons"
            color="emerald"
          />
          <QuickModule
            icon={<Sparkles className="h-5 w-5" />}
            title="Práctica"
            description="Refuerza lo aprendido"
            link="/app/practice"
            color="sky"
          />
          <QuickModule
            icon={<BarChart3 className="h-5 w-5" />}
            title="Progreso"
            description="Mide tu avance"
            link="/app/progress"
            color="teal"
          />
          <QuickModule
            icon={<Award className="h-5 w-5" />}
            title="Logros"
            description="Celebra tus metas"
            link="/app/achievements"
            color="emerald"
          />
        </div>

        {/* Footer sutil */}
        <footer className="mt-12 text-center text-xs text-slate-400">
          <p>Sigue aprendiendo cada día • Tu progreso se guarda automáticamente</p>
        </footer>
      </div>
    </div>
  );
}

/* --- Componentes internos --- */

function StatCard({ icon, label, value, trend, color }) {
  const colorClasses = {
    emerald: "from-emerald-500 to-emerald-600 text-emerald-700",
    sky: "from-sky-500 to-sky-600 text-sky-700",
    teal: "from-teal-500 to-teal-600 text-teal-700"
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-md backdrop-blur-sm transition-all hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="rounded-xl bg-gradient-to-br from-slate-100 to-white p-2">
          <div className={`text-${color}-600`}>{icon}</div>
        </div>
        {trend && (
          <span className={`rounded-full bg-${color}-100 px-2 py-1 text-xs font-medium text-${color}-700`}>
            {trend}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function AchievementBadge({ icon, title, description, color }) {
  const colorClasses = {
    emerald: "bg-emerald-50 text-emerald-700",
    sky: "bg-sky-50 text-sky-700",
    teal: "bg-teal-50 text-teal-700"
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3">
      <div className={`rounded-lg ${colorClasses[color]} p-2`}>
        {icon}
      </div>
      <div>
        <p className="font-medium text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function QuickModule({ icon, title, description, link, color }) {
  const colorClasses = {
    emerald: "from-emerald-600 to-emerald-700",
    sky: "from-sky-600 to-sky-700",
    teal: "from-teal-600 to-teal-700"
  };

  return (
    <Link
      to={link}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-md backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg"
    >
      <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-emerald-500/5 to-sky-500/5 opacity-0 transition group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-3 inline-block rounded-xl bg-gradient-to-br from-slate-100 to-white p-2.5">
          <div className={`text-${color}-600`}>{icon}</div>
        </div>
        <h4 className="font-semibold text-slate-900">{title}</h4>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>
    </Link>
  );
}

/* ---------- Banderas (mismas que en auth) ---------- */

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

/* Animaciones - mismas que en auth */
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