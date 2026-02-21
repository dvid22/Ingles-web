import { useMemo, useState } from "react";
import {
  BookOpen,
  Search,
  Filter,
  Sparkles,
  Clock,
  Flame,
  CheckCircle2,
  PlayCircle,
  Lock,
  ChevronRight,
  Target,
  BarChart3,
  CalendarDays,
  GraduationCap,
} from "lucide-react";

/**
 * /app/lessons
 * Premium lessons dashboard screen
 */
export default function LessonsPage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all"); // all | inprogress | completed
  const [level, setLevel] = useState("all"); // all | A1 | A2 | B1 | B2
  const [sort, setSort] = useState("recommended"); // recommended | newest | duration

  // Mock data (luego lo reemplazas por tu API)
  const lessons = useMemo(
    () => [
      {
        id: "ps-01",
        title: "Presente Simple",
        subtitle: "Rutinas, hábitos y frecuencia",
        level: "A1",
        status: "inprogress", // locked | inprogress | completed
        durationMin: 10,
        xp: 50,
        progress: 62,
        tags: ["Rutinas", "Frecuencia"],
        lastActivity: "Hace 2 días",
      },
      {
        id: "ps-02",
        title: "Presente Continuo",
        subtitle: "Acciones en progreso ahora",
        level: "A1",
        status: "locked",
        durationMin: 12,
        xp: 55,
        progress: 0,
        tags: ["Ahora", "Acciones"],
        lastActivity: null,
      },
      {
        id: "past-01",
        title: "Pasado Simple",
        subtitle: "Eventos terminados y verbos regulares",
        level: "A2",
        status: "all", // lo usamos solo para demo, lo normal sería inprogress/locked/completed
        durationMin: 14,
        xp: 60,
        progress: 0,
        tags: ["Pasado", "Regulares"],
        lastActivity: null,
      },
      {
        id: "vocab-01",
        title: "Vocabulario: Travel",
        subtitle: "Aeropuerto, hotel y direcciones",
        level: "A2",
        status: "completed",
        durationMin: 9,
        xp: 45,
        progress: 100,
        tags: ["Travel", "Direcciones"],
        lastActivity: "Ayer",
      },
      {
        id: "listen-01",
        title: "Listening: Daily Conversations",
        subtitle: "Entiende conversaciones cortas",
        level: "B1",
        status: "inprogress",
        durationMin: 11,
        xp: 70,
        progress: 35,
        tags: ["Listening", "Conversación"],
        lastActivity: "Hoy",
      },
      {
        id: "grammar-01",
        title: "Modales: can / could",
        subtitle: "Pedir permiso y hacer solicitudes",
        level: "B1",
        status: "locked",
        durationMin: 13,
        xp: 75,
        progress: 0,
        tags: ["Modales", "Solicitudes"],
        lastActivity: null,
      },
    ].map((l) => ({
      ...l,
      status: l.status === "all" ? "locked" : l.status, // normalizamos el demo
    })),
    []
  );

  const stats = useMemo(() => {
    const total = lessons.length;
    const completed = lessons.filter((l) => l.status === "completed").length;
    const inprogress = lessons.filter((l) => l.status === "inprogress").length;
    const minutes = lessons.reduce((acc, l) => acc + (l.durationMin || 0), 0);
    return { total, completed, inprogress, minutes };
  }, [lessons]);

  const filtered = useMemo(() => {
    let arr = [...lessons];

    // tab filter
    if (tab === "inprogress") arr = arr.filter((l) => l.status === "inprogress");
    if (tab === "completed") arr = arr.filter((l) => l.status === "completed");

    // level filter
    if (level !== "all") arr = arr.filter((l) => l.level === level);

    // query filter
    const q = query.trim().toLowerCase();
    if (q) {
      arr = arr.filter((l) => {
        const hay = `${l.title} ${l.subtitle} ${l.level} ${(l.tags || []).join(" ")}`.toLowerCase();
        return hay.includes(q);
      });
    }

    // sort
    if (sort === "duration") arr.sort((a, b) => (a.durationMin || 0) - (b.durationMin || 0));
    if (sort === "newest") arr.sort((a, b) => (a.id > b.id ? -1 : 1)); // demo
    // recommended: mantenemos orden base

    return arr;
  }, [lessons, tab, level, query, sort]);

  const nextLesson = useMemo(() => {
    // “Siguiente lección”: la primera inprogress, si no, primera locked
    return lessons.find((l) => l.status === "inprogress") || lessons.find((l) => l.status === "locked");
  }, [lessons]);

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            Biblioteca de lecciones
          </div>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">Lecciones</h2>
          <p className="mt-1 text-sm text-slate-600">
            Sigue tu ruta, filtra por nivel y retoma donde lo dejaste.
          </p>
        </div>

        {/* quick stats */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Kpi label="Total" value={stats.total} icon={<BookOpen className="h-4 w-4" />} />
          <Kpi label="En curso" value={stats.inprogress} icon={<PlayCircle className="h-4 w-4" />} />
          <Kpi label="Completadas" value={stats.completed} icon={<CheckCircle2 className="h-4 w-4" />} />
          <Kpi label="Minutos" value={stats.minutes} icon={<Clock className="h-4 w-4" />} />
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 grid gap-3 lg:grid-cols-12">
        {/* search */}
        <div className="lg:col-span-7">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar lecciones, temas, tags..."
              className="w-full rounded-2xl border border-slate-200 bg-white/80 py-3 pl-10 pr-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
            />
          </div>
        </div>

        {/* filters */}
        <div className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Select
              icon={<GraduationCap className="h-4 w-4" />}
              value={level}
              onChange={setLevel}
              label="Nivel"
              options={[
                { value: "all", label: "Todos" },
                { value: "A1", label: "A1" },
                { value: "A2", label: "A2" },
                { value: "B1", label: "B1" },
                { value: "B2", label: "B2" },
              ]}
            />
            <Select
              icon={<Filter className="h-4 w-4" />}
              value={sort}
              onChange={setSort}
              label="Orden"
              options={[
                { value: "recommended", label: "Recomendado" },
                { value: "newest", label: "Más nuevo" },
                { value: "duration", label: "Más corto" },
              ]}
            />
            <div className="hidden sm:block">
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-500">Racha</p>
                  <Flame className="h-4 w-4 text-emerald-600" />
                </div>
                <p className="mt-1 text-sm font-black text-slate-900">7 días</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Left: lessons */}
        <section className="lg:col-span-8">
          {/* Tabs */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 p-1 shadow-sm">
              <TabButton active={tab === "all"} onClick={() => setTab("all")}>
                Todo
              </TabButton>
              <TabButton active={tab === "inprogress"} onClick={() => setTab("inprogress")}>
                En curso
              </TabButton>
              <TabButton active={tab === "completed"} onClick={() => setTab("completed")}>
                Completadas
              </TabButton>
            </div>

            <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm sm:flex">
              <BarChart3 className="h-4 w-4 text-emerald-700" />
              {filtered.length} resultados
            </div>
          </div>

          {/* Lesson list */}
          <div className="mt-4 space-y-3">
            {filtered.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} onStart={() => {}} />
            ))}

            {filtered.length === 0 && (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 p-10 text-center">
                <p className="text-sm font-semibold text-slate-800">No encontramos resultados</p>
                <p className="mt-1 text-sm text-slate-600">
                  Prueba con otro término o cambia los filtros.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Right: premium side panel */}
        <aside className="lg:col-span-4">
          {/* Next lesson */}
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-emerald-700">SIGUIENTE LECCIÓN</p>
                <h3 className="mt-1 text-lg font-black text-slate-900">
                  {nextLesson?.title || "—"}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{nextLesson?.subtitle || ""}</p>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500/15 to-sky-500/15">
                <BookOpen className="h-5 w-5 text-emerald-700" />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Pill>{nextLesson?.level || "—"}</Pill>
              <Pill icon={<Clock className="h-3.5 w-3.5" />}>{nextLesson?.durationMin || 0} min</Pill>
              <Pill icon={<Target className="h-3.5 w-3.5" />}>+{nextLesson?.xp || 0} XP</Pill>
            </div>

            <button
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-sky-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-emerald-200"
              onClick={() => {}}
            >
              Continuar
              <ChevronRight className="h-4 w-4" />
            </button>

            {nextLesson?.status === "inprogress" && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>Progreso</span>
                  <span>{nextLesson.progress}%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500"
                    style={{ width: `${nextLesson.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Weekly plan */}
          <div className="mt-4 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">Esta semana</p>
                <h4 className="mt-1 text-base font-black text-slate-900">Plan de estudio</h4>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-50">
                <CalendarDays className="h-5 w-5 text-slate-700" />
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <PlanRow day="Lun" label="Grammar" done />
              <PlanRow day="Mar" label="Vocabulary" done />
              <PlanRow day="Mié" label="Listening" />
              <PlanRow day="Jue" label="Speaking" />
              <PlanRow day="Vie" label="Review" />
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-sky-50 p-4">
              <p className="text-sm font-semibold text-slate-800">Tip premium</p>
              <p className="mt-1 text-sm text-slate-600">
                Haz 1 lección corta + 5 minutos de repaso diario. Consistencia &gt; intensidad.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ---------- UI bits ---------- */

function Kpi({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-500">{label}</p>
        <span className="text-emerald-700">{icon}</span>
      </div>
      <p className="mt-1 text-lg font-black text-slate-900">{value}</p>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-2xl px-3 py-2 text-sm font-semibold transition",
        active
          ? "bg-white text-emerald-700 shadow-sm"
          : "text-slate-600 hover:bg-white/60 hover:text-slate-900",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Select({ label, value, onChange, options, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-500">{label}</p>
        <span className="text-slate-600">{icon}</span>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Pill({ children, icon }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
      {icon ? <span className="text-emerald-700">{icon}</span> : null}
      {children}
    </span>
  );
}

function LessonCard({ lesson, onStart }) {
  const isLocked = lesson.status === "locked";
  const isDone = lesson.status === "completed";
  const isProgress = lesson.status === "inprogress";

  return (
    <div
      className={[
        "rounded-3xl border bg-white/80 p-4 shadow-sm transition",
        isLocked ? "border-slate-200 opacity-[0.92]" : "border-slate-200 hover:shadow-md",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700">
              {lesson.level}
            </span>

            {isDone && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Completada
              </span>
            )}
            {isProgress && (
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2 py-0.5 text-xs font-bold text-sky-700">
                <PlayCircle className="h-3.5 w-3.5" />
                En curso
              </span>
            )}
            {isLocked && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                <Lock className="h-3.5 w-3.5" />
                Bloqueada
              </span>
            )}
          </div>

          <h3 className="mt-2 truncate text-base font-black text-slate-900">{lesson.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-slate-600">{lesson.subtitle}</p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">
              <Clock className="h-3.5 w-3.5 text-emerald-700" />
              {lesson.durationMin} min
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">
              <Target className="h-3.5 w-3.5 text-emerald-700" />+{lesson.xp} XP
            </span>

            {lesson.lastActivity && (
              <span className="text-xs font-semibold text-slate-500">• {lesson.lastActivity}</span>
            )}
          </div>

          {isProgress && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>Progreso</span>
                <span>{lesson.progress}%</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500"
                  style={{ width: `${lesson.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500/15 to-sky-500/15">
            <BookOpen className="h-5 w-5 text-emerald-700" />
          </div>

          <button
            disabled={isLocked}
            onClick={onStart}
            className={[
              "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold transition",
              isLocked
                ? "cursor-not-allowed border border-slate-200 bg-slate-50 text-slate-400"
                : isDone
                ? "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:brightness-105"
                : "bg-gradient-to-r from-emerald-600 to-sky-600 text-white hover:brightness-110",
            ].join(" ")}
          >
            {isDone ? "Repetir" : isProgress ? "Continuar" : "Empezar"}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function PlanRow({ day, label, done }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-50 text-xs font-black text-slate-700">
          {day}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">{label}</p>
          <p className="text-xs text-slate-500">{done ? "Completado" : "Pendiente"}</p>
        </div>
      </div>
      {done ? (
        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
      ) : (
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          —
        </span>
      )}
    </div>
  );
}