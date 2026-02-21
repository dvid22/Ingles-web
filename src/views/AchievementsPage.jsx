import {
  Award,
  Flame,
  Star,
  Lock,
  Trophy,
  Target,
  TrendingUp,
  Crown,
  CheckCircle2,
} from "lucide-react";

export default function AchievementsPage() {
  const achievements = [
    {
      title: "Racha de 7 días",
      description: "Estudia durante 7 días consecutivos",
      icon: <Flame className="h-6 w-6" />,
      unlocked: true,
    },
    {
      title: "Primer Nivel Completado",
      description: "Completa tu primer módulo",
      icon: <Trophy className="h-6 w-6" />,
      unlocked: true,
    },
    {
      title: "100 Palabras",
      description: "Aprende 100 palabras nuevas",
      icon: <Star className="h-6 w-6" />,
      unlocked: true,
    },
    {
      title: "Listening Pro",
      description: "Completa 20 lecciones de listening",
      icon: <TrendingUp className="h-6 w-6" />,
      unlocked: false,
    },
    {
      title: "Maestro del Vocabulario",
      description: "Aprende 500 palabras",
      icon: <Crown className="h-6 w-6" />,
      unlocked: false,
    },
    {
      title: "Meta Mensual",
      description: "Cumple tu objetivo mensual",
      icon: <Target className="h-6 w-6" />,
      unlocked: false,
    },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
          <Award className="h-3.5 w-3.5 text-emerald-600" />
          Gamificación
        </div>

        <h2 className="mt-2 text-2xl font-black text-slate-900">
          Tus Logros
        </h2>

        <p className="mt-1 text-sm text-slate-600">
          Has desbloqueado {unlockedCount} de {achievements.length} logros.
        </p>
      </div>

      {/* Nivel */}
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">
              Nivel actual
            </p>
            <h3 className="mt-1 text-lg font-black text-slate-900">
              Nivel 12
            </h3>
          </div>
          <Crown className="h-6 w-6 text-emerald-600" />
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>Progreso al siguiente nivel</span>
            <span>80%</span>
          </div>
          <div className="mt-2 h-3 w-full rounded-full bg-slate-100">
            <div className="h-3 w-[80%] rounded-full bg-gradient-to-r from-emerald-500 to-sky-500" />
          </div>
        </div>
      </div>

      {/* Grid de logros */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement, index) => (
          <AchievementCard key={index} {...achievement} />
        ))}
      </div>
    </div>
  );
}

/* ---------- Card Component ---------- */

function AchievementCard({ title, description, icon, unlocked }) {
  return (
    <div
      className={[
        "relative rounded-3xl border p-6 shadow-sm transition-all duration-300",
        unlocked
          ? "border-emerald-200 bg-gradient-to-br from-white to-emerald-50 hover:shadow-lg"
          : "border-slate-200 bg-white opacity-80",
      ].join(" ")}
    >
      {!unlocked && (
        <div className="absolute top-4 right-4 text-slate-400">
          <Lock className="h-4 w-4" />
        </div>
      )}

      <div
        className={[
          "flex h-12 w-12 items-center justify-center rounded-2xl",
          unlocked
            ? "bg-gradient-to-br from-emerald-500 to-sky-500 text-white"
            : "bg-slate-100 text-slate-400",
        ].join(" ")}
      >
        {unlocked ? icon : <Lock className="h-6 w-6" />}
      </div>

      <h3 className="mt-4 text-base font-black text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-sm text-slate-600">
        {description}
      </p>

      {unlocked && (
        <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Desbloqueado
        </div>
      )}
    </div>
  );
}