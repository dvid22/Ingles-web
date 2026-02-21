import { useMemo, useState } from "react";
import {
  Settings,
  User,
  Mail,
  Crown,
  Shield,
  Bell,
  Languages,
  Target,
  Moon,
  Sun,
  LogOut,
  KeyRound,
  Laptop,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../app/AuthProvider";
import { authController } from "../controllers/authController";

/**
 * /app/settings
 * Premium settings screen
 */
export default function SettingsPage() {
  const { user } = useAuth();

  const initialName =
    user?.displayName?.trim() ||
    user?.email?.split("@")?.[0] ||
    "Learner";

  const email = user?.email || "—";

  const [name, setName] = useState(initialName);
  const [language, setLanguage] = useState("es");
  const [dailyGoal, setDailyGoal] = useState("10"); // minutos
  const [reminders, setReminders] = useState(true);
  const [theme, setTheme] = useState("light"); // light | dark (visual demo)
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const initials = useMemo(() => {
    const s = (name || "L").trim();
    return s[0]?.toUpperCase() || "L";
  }, [name]);

  async function handleSave() {
    setSaving(true);
    setSaved(false);

    // Aquí puedes conectar a tu backend / firestore
    await new Promise((r) => setTimeout(r, 650));

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
            <Settings className="h-3.5 w-3.5 text-emerald-600" />
            Configuración
          </div>
          <h2 className="mt-2 text-2xl font-black text-slate-900">
            Ajustes
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Personaliza tu experiencia y tu plan de estudio.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {saved ? (
            <span className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              Guardado
            </span>
          ) : (
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-sky-600 px-5 py-2.5 text-sm font-black text-white shadow-sm transition hover:brightness-110 disabled:opacity-60"
            >
              {saving ? "Guardando..." : "Guardar cambios"}
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Left column */}
        <section className="lg:col-span-7 space-y-6">
          {/* Profile card */}
          <Card>
            <CardHeader
              title="Perfil"
              subtitle="Tu información básica de cuenta."
              icon={<User className="h-5 w-5 text-emerald-700" />}
            />
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 text-lg font-black text-white">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-slate-900">
                    {name}
                  </p>
                  <p className="truncate text-xs text-slate-500">{email}</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-gradient-to-r from-emerald-50 to-sky-50 px-3 py-1 text-xs font-bold text-emerald-700">
                <Crown className="h-4 w-4" />
                Premium
              </span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field
                label="Nombre"
                icon={<User className="h-4 w-4" />}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
              />
              <Field
                label="Email"
                icon={<Mail className="h-4 w-4" />}
                value={email}
                readOnly
              />
            </div>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader
              title="Preferencias"
              subtitle="Idioma, metas y recordatorios."
              icon={<Bell className="h-5 w-5 text-emerald-700" />}
            />

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <SelectField
                label="Idioma"
                icon={<Languages className="h-4 w-4" />}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                options={[
                  { value: "es", label: "Español" },
                  { value: "en", label: "English" },
                  { value: "pt", label: "Português" },
                ]}
              />
              <SelectField
                label="Meta diaria"
                icon={<Target className="h-4 w-4" />}
                value={dailyGoal}
                onChange={(e) => setDailyGoal(e.target.value)}
                options={[
                  { value: "5", label: "5 minutos" },
                  { value: "10", label: "10 minutos" },
                  { value: "15", label: "15 minutos" },
                  { value: "20", label: "20 minutos" },
                  { value: "30", label: "30 minutos" },
                ]}
              />

              <ToggleRow
                title="Recordatorios"
                subtitle="Recibe recordatorios para mantener tu racha."
                checked={reminders}
                onChange={() => setReminders((v) => !v)}
              />

              <ToggleRow
                title="Tema"
                subtitle="Solo visual (si luego quieres, lo conectamos a dark mode real)."
                checked={theme === "dark"}
                onChange={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                leftIcon={<Sun className="h-4 w-4" />}
                rightIcon={<Moon className="h-4 w-4" />}
              />
            </div>
          </Card>
        </section>

        {/* Right column */}
        <aside className="lg:col-span-5 space-y-6">
          {/* Subscription */}
          <Card>
            <CardHeader
              title="Plan"
              subtitle="Detalles de tu suscripción."
              icon={<Crown className="h-5 w-5 text-emerald-700" />}
            />

            <div className="mt-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-sky-50 p-4">
              <p className="text-sm font-black text-slate-900">Premium activo</p>
              <p className="mt-1 text-sm text-slate-600">
                Acceso completo, analíticas avanzadas y logros.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>Sin anuncios</Pill>
                <Pill>Progreso avanzado</Pill>
                <Pill>Lecciones premium</Pill>
              </div>

              <button
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm font-black text-emerald-700 shadow-sm transition hover:brightness-105"
                onClick={() => {}}
              >
                Administrar plan
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader
              title="Seguridad"
              subtitle="Protege tu cuenta."
              icon={<Shield className="h-5 w-5 text-emerald-700" />}
            />

            <div className="mt-4 space-y-3">
              <ActionRow
                icon={<KeyRound className="h-5 w-5 text-slate-700" />}
                title="Cambiar contraseña"
                subtitle="Actualiza tus credenciales."
                onClick={() => {}}
              />
              <ActionRow
                icon={<Laptop className="h-5 w-5 text-slate-700" />}
                title="Sesiones activas"
                subtitle="Revisa dispositivos conectados."
                onClick={() => {}}
              />
              <button
                onClick={() => authController.logout()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

/* ---------- UI Components ---------- */

function Card({ children }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
      {children}
    </div>
  );
}

function CardHeader({ title, subtitle, icon }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <h3 className="text-lg font-black text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
      </div>
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500/15 to-sky-500/15">
        {icon}
      </div>
    </div>
  );
}

function Field({ label, icon, value, onChange, placeholder, readOnly }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-500">{label}</span>
      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm focus-within:border-emerald-300 focus-within:ring-4 focus-within:ring-emerald-100">
        <span className="text-slate-500">{icon}</span>
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className={[
            "w-full bg-transparent text-sm font-semibold text-slate-800 outline-none",
            readOnly ? "cursor-not-allowed text-slate-500" : "",
          ].join(" ")}
        />
      </div>
    </label>
  );
}

function SelectField({ label, icon, value, onChange, options }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-500">{label}</span>
      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm focus-within:border-emerald-300 focus-within:ring-4 focus-within:ring-emerald-100">
        <span className="text-slate-500">{icon}</span>
        <select
          value={value}
          onChange={onChange}
          className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}

function ToggleRow({ title, subtitle, checked, onChange, leftIcon, rightIcon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:col-span-2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black text-slate-900">{title}</p>
          <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        </div>

        <button
          type="button"
          onClick={onChange}
          className={[
            "relative h-10 w-[72px] rounded-full border transition",
            checked
              ? "border-emerald-200 bg-emerald-50"
              : "border-slate-200 bg-slate-50",
          ].join(" ")}
        >
          <span
            className={[
              "absolute top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full shadow-sm transition",
              checked
                ? "left-[36px] bg-white text-emerald-700"
                : "left-1 bg-white text-slate-600",
            ].join(" ")}
          >
            {checked ? (rightIcon || <Moon className="h-4 w-4" />) : (leftIcon || <Sun className="h-4 w-4" />)}
          </span>
        </button>
      </div>
    </div>
  );
}

function ActionRow({ icon, title, subtitle, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-emerald-300 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-50">
          {icon}
        </div>
        <div>
          <p className="text-sm font-black text-slate-900">{title}</p>
          <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-slate-400" />
    </button>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-700">
      {children}
    </span>
  );
}