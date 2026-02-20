import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../app/AuthProvider";
import { authController } from "../controllers/authController";

export default function AppLayout() {
  const { user } = useAuth();

  const name = user?.displayName?.trim() || user?.email?.split("@")?.[0] || "Learner";
  const email = user?.email || "";

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      {/* background suave */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-indigo-500/12 blur-3xl" />
        <div className="absolute -bottom-56 right-[-180px] h-[700px] w-[700px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:44px_44px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl">
        {/* Sidebar */}
        <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-white/5 p-4 backdrop-blur-xl md:block">
          {/* Brand */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500/25 to-cyan-400/10">
              <LogoIcon />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-5">English Learning</p>
              <p className="truncate text-xs text-slate-400">Premium Dashboard</p>
            </div>
          </div>

          {/* User card */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
                <UserIcon />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{name}</p>
                <p className="truncate text-xs text-slate-400">{email}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <MiniStat label="Racha" value="—" />
              <MiniStat label="Nivel" value="—" />
              <MiniStat label="Meta" value="—" />
            </div>
          </div>

          {/* Nav */}
          <nav className="mt-4 space-y-2">
            <NavItem to="/app" label="Home" icon={<HomeIcon />} end />
          </nav>

          {/* Footer actions */}
          <div className="mt-6">
            <button
              onClick={() => authController.logout()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
            >
              <LogoutIcon />
              Cerrar sesión
            </button>

            <p className="mt-3 text-center text-xs text-slate-500">
              Tu progreso se sincroniza con tu cuenta.
            </p>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Topbar (mobile + header) */}
          <header className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl md:px-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 md:hidden">
                <LogoIcon />
              </div>
              <div>
                <p className="text-sm text-slate-400">Dashboard</p>
                <h1 className="text-lg font-bold leading-6">Home</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden text-sm text-slate-300 sm:block">
                {user?.displayName || user?.email}
              </span>
              <button
                onClick={() => authController.logout()}
                className="rounded-2xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 md:hidden"
              >
                Salir
              </button>
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
          "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition",
          isActive
            ? "bg-white/10 text-white"
            : "text-slate-300 hover:bg-white/5 hover:text-white",
        ].join(" ")
      }
    >
      <span className="grid h-9 w-9 place-items-center rounded-2xl border border-white/10 bg-white/5 transition group-hover:bg-white/10">
        {icon}
      </span>
      <span>{label}</span>
    </NavLink>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-2">
      <p className="text-[11px] text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-slate-100">{value}</p>
    </div>
  );
}

/* Icons */
function LogoIcon() {
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
function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-slate-200">
      <path
        d="M3 10.5 12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5h-4.5V15a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v6.5H4.5A1.5 1.5 0 0 1 3 20v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-slate-200">
      <path d="M10 7V6a2 2 0 0 1 2-2h7v16h-7a2 2 0 0 1-2-2v-1" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m6 9  -3 3 3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-slate-200">
      <path d="M20 21a8 8 0 0 0-16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}