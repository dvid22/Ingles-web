import { useMemo } from "react";
import {
  BarChart3,
  TrendingUp,
  Flame,
  Target,
  CalendarDays,
  CheckCircle2,
  Clock,
  Award,
} from "lucide-react";

/**
 * /app/progress
 * Premium analytics dashboard
 */
export default function ProgressPage() {
  // Mock data (luego lo conectamos a tu backend)
  const weeklyData = [30, 45, 20, 60, 75, 50, 90]; // minutos por día
  const skills = [
    { name: "Grammar", progress: 72 },
    { name: "Vocabulary", progress: 64 },
    { name: "Listening", progress: 48 },
    { name: "Speaking", progress: 35 },
    { name: "Reading", progress: 81 },
  ];

  const stats = useMemo(() => {
    const totalMinutes = weeklyData.reduce((a, b) => a + b, 0);
    const avg = Math.round(totalMinutes / 7);
    return {
      totalMinutes,
      avg,
      streak: 7,
      completionRate: 78,
    };
  }, [weeklyData]);

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
          <BarChart3 className="h-3.5 w-3.5 text-emerald-600" />
          Analíticas
        </div>
        <h2 className="mt-2 text-2xl font-black text-slate-900">
          Tu Progreso
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Analiza tu rendimiento y mantén la consistencia.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi
          label="Racha actual"
          value={`${stats.streak} días`}
          icon={<Flame className="h-5 w-5" />}
        />
        <Kpi
          label="Minutos esta semana"
          value={stats.totalMinutes}
          icon={<Clock className="h-5 w-5" />}
        />
        <Kpi
          label="Promedio diario"
          value={`${stats.avg} min`}
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <Kpi
          label="Tasa de finalización"
          value={`${stats.completionRate}%`}
          icon={<CheckCircle2 className="h-5 w-5" />}
        />
      </div>

      {/* Main Grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Weekly Chart */}
        <section className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900">
              Actividad semanal
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              Últimos 7 días
            </span>
          </div>

          <div className="mt-6 flex items-end justify-between gap-3 h-52">
            {weeklyData.map((value, i) => (
              <div key={i} className="flex flex-col items-center gap-2 w-full">
                <div className="relative w-8 sm:w-10">
                  <div
                    className="absolute bottom-0 w-full rounded-2xl bg-gradient-to-t from-emerald-500 to-sky-500 transition-all"
                    style={{ height: `${value}%` }}
                  />
                  <div className="h-40 w-full rounded-2xl bg-slate-100" />
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {["L", "M", "X", "J", "V", "S", "D"][i]}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Goal Panel */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  Objetivo mensual
                </p>
                <h4 className="mt-1 text-base font-black text-slate-900">
                  1200 minutos
                </h4>
              </div>
              <Target className="h-6 w-6 text-emerald-600" />
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>Progreso</span>
                <span>65%</span>
              </div>
              <div className="mt-2 h-3 w-full rounded-full bg-slate-100">
                <div className="h-3 w-[65%] rounded-full bg-gradient-to-r from-emerald-500 to-sky-500" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
            <h4 className="text-base font-black text-slate-900">
              Habilidades
            </h4>

            <div className="mt-4 space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span>{skill.name}</span>
                    <span>{skill.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500"
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900">
            Actividad reciente
          </h3>
          <CalendarDays className="h-5 w-5 text-slate-600" />
        </div>

        <div className="mt-4 space-y-3">
          <ActivityItem
            title="Completaste Presente Simple"
            time="Hace 2 horas"
          />
          <ActivityItem
            title="Ganaste 50 XP en Listening"
            time="Ayer"
          />
          <ActivityItem
            title="Racha extendida a 7 días"
            time="Hace 2 días"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- UI Components ---------- */

function Kpi({ label, value, icon }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-500">{label}</p>
        <span className="text-emerald-600">{icon}</span>
      </div>
      <p className="mt-2 text-xl font-black text-slate-900">{value}</p>
    </div>
  );
}

function ActivityItem({ title, time }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
      <div>
        <p className="text-sm font-bold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{time}</p>
      </div>
      <Award className="h-5 w-5 text-emerald-600" />
    </div>
  );
}