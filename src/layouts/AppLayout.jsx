import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../app/AuthProvider";
import { authController } from "../controllers/authController";
import { 
  Home, 
  BookOpen, 
  BarChart3, 
  Award, 
  Settings, 
  LogOut,
  User,
  Calendar,
  Target,
  TrendingUp,
  Sparkles,
  Flame
} from "lucide-react";

export default function AppLayout() {
  const { user } = useAuth();

  const name = user?.displayName?.trim() || user?.email?.split("@")?.[0] || "Learner";
  const email = user?.email || "";
  const initials = name[0]?.toUpperCase() || "L";

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Background: Floating flags sutiles como en HomePage */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Mismas 4 banderas con opacidad muy baja */}
        <div className="absolute left-[2%] top-[5%] h-64 w-64 animate-float-slow opacity-[0.06]">
          <FlagUnitedKingdom className="h-full w-full drop-shadow-2xl" />
        </div>
        <div className="absolute right-[2%] top-[10%] h-64 w-64 animate-float opacity-[0.06]">
          <FlagUnitedStates className="h-full w-full drop-shadow-2xl" />
        </div>
        <div className="absolute bottom-[5%] left-[5%] h-56 w-56 animate-float-slower opacity-[0.06]">
          <FlagCanada className="h-full w-full drop-shadow-2xl" />
        </div>
        <div className="absolute bottom-[10%] right-[5%] h-56 w-56 animate-float-medium opacity-[0.06]">
          <FlagAustralia className="h-full w-full drop-shadow-2xl" />
        </div>
        
        {/* Glow effects muy sutiles */}
        <div className="absolute -top-40 left-1/2 h-[820px] w-[820px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute -bottom-56 right-[-180px] h-[880px] w-[880px] rounded-full bg-sky-400/5 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl">
        {/* Sidebar */}
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white/80 p-4 backdrop-blur-xl md:block">
          {/* Brand */}
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-sky-500/20">
              <BookOpen className="h-5 w-5 text-emerald-700" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-5 text-slate-900">English Learning</p>
              <p className="truncate text-xs text-slate-500">Premium Dashboard</p>
            </div>
          </div>

          {/* User card */}
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 text-lg font-bold text-white">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">{name}</p>
                <p className="truncate text-xs text-slate-500">{email}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <MiniStat label="Racha" value="7" icon={<Flame className="h-3 w-3" />} />
              <MiniStat label="Nivel" value="12" icon={<TrendingUp className="h-3 w-3" />} />
              <MiniStat label="Meta" value="80%" icon={<Target className="h-3 w-3" />} />
            </div>
          </div>

          {/* Nav */}
          <nav className="mt-4 space-y-1">
            <NavItem to="/app" label="Inicio" icon={<Home className="h-5 w-5" />} end />
            <NavItem to="/app/lessons" label="Lecciones" icon={<BookOpen className="h-5 w-5" />} />
            <NavItem to="/app/progress" label="Progreso" icon={<BarChart3 className="h-5 w-5" />} />
            <NavItem to="/app/achievements" label="Logros" icon={<Award className="h-5 w-5" />} />
            <NavItem to="/app/settings" label="Ajustes" icon={<Settings className="h-5 w-5" />} />
          </nav>

          {/* Footer actions */}
          <div className="mt-6">
            <button
              onClick={() => authController.logout()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>

            <p className="mt-3 text-center text-xs text-slate-400">
              Tu progreso se sincroniza automáticamente
            </p>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Topbar (mobile + header) */}
          <header className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur-xl md:px-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-sky-500/20 md:hidden">
                <BookOpen className="h-5 w-5 text-emerald-700" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Bienvenido de vuelta</p>
                <h1 className="text-lg font-bold leading-6 text-slate-900">
                  ¡Hola, {name.split(' ')[0]}! 👋
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 sm:flex">
                <Flame className="h-4 w-4 fill-emerald-600 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">7 días</span>
              </div>
              
              <button
                onClick={() => authController.logout()}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-emerald-300 md:hidden"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Salir</span>
              </button>

              {/* Avatar desktop */}
              <div className="hidden h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 text-sm font-bold text-white md:flex">
                {initials}
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 px-4 py-6 md:px-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

function NavItem({ to, label, icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
          isActive
            ? "bg-gradient-to-r from-emerald-50 to-sky-50 text-emerald-700 shadow-sm"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        ].join(" ")
      }
    >
      <span className={({ isActive }) =>
        [
          "grid h-9 w-9 place-items-center rounded-xl transition-all",
          isActive
            ? "bg-gradient-to-br from-emerald-500/20 to-sky-500/20"
            : "bg-slate-100 group-hover:bg-white",
        ].join(" ")
      }>
        <span className={({ isActive }) =>
          isActive ? "text-emerald-700" : "text-slate-500"
        }>{icon}</span>
      </span>
      <span>{label}</span>
    </NavLink>
  );
}

function MiniStat({ label, value, icon }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium text-slate-500">{label}</p>
        <span className="text-emerald-600">{icon}</span>
      </div>
      <p className="mt-0.5 text-sm font-bold text-slate-900">{value}</p>
    </div>
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