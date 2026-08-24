import Link from "next/link";
import { PanelHeader } from "@/components/schools/PanelHeader";
import { SchoolsIcon } from "@/components/schools/SchoolsIcon";
import { Turtle } from "@/components/Turtle";
import { AreaDonut } from "@/components/schools/AreaDonut";
import { WeekBars } from "@/components/schools/WeekBars";
import { child, games, panelSections, reports, tips } from "@/data/schools";

const stats = [
  {
    label: "Sesiones del mes",
    value: "8",
    detail: "de 8 programadas",
    tone: "bg-brand-100 text-brand-700",
    icon: "reports" as const,
  },
  {
    label: "Asistencia",
    value: "100%",
    detail: "sin faltas 🎉",
    tone: "bg-peach-100 text-peach-700",
    icon: "home" as const,
  },
  {
    label: "Minutos en casa",
    value: "215",
    detail: "+35 esta semana",
    tone: "bg-butter-100 text-butter-600",
    icon: "tips" as const,
  },
  {
    label: "Racha de juegos",
    value: "7",
    detail: "días seguidos",
    tone: "bg-sky-100 text-sky-700",
    icon: "games" as const,
  },
];

const moodStyles: Record<string, string> = {
  "Muy bien": "bg-brand-100 text-brand-700",
  Bien: "bg-sky-100 text-sky-700",
  Regular: "bg-butter-100 text-butter-600",
};

const shortcuts = panelSections.filter((s) => s.href !== "/schools/panel");

export default function PanelHomePage() {
  const game = games[0];
  const tip = tips[0];

  return (
    <>
      <PanelHeader
        title="Mi panel"
        subtitle={`Todo lo de ${child.firstName} en ${child.school}, en un solo lugar.`}
      />

      <section className="animate-fade-up relative overflow-hidden rounded-[2rem] bg-peach-100 p-6 ring-1 ring-peach-200 sm:p-9">
        <div className="relative z-10 flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
          <span className="animate-float grid size-28 shrink-0 place-items-center rounded-full bg-white/70 ring-8 ring-white/50">
            <Turtle className="size-24" title="Tuki te saluda" />
          </span>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-extrabold text-peach-700 sm:text-3xl">
              ¡Buen día, {child.parentFirstName}! ☀️
            </h2>
            <p className="mt-2 max-w-md font-semibold text-peach-700/80">
              Hoy {child.firstName} tiene terapia de lenguaje a las 10:00 a. m. y un
              juego nuevo esperándolo.
            </p>
            <Link
              href="/schools/panel/informes"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-peach-500 px-6 py-3 text-sm font-extrabold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-peach-700"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-4"
                fill="currentColor"
              >
                <path d="M8 5.5v13l11-6.5-11-6.5Z" />
              </svg>
              Ver informe de hoy
            </Link>
          </div>
        </div>
        <span
          aria-hidden="true"
          className="absolute -bottom-10 -right-6 size-44 rounded-full bg-white/40"
        />
      </section>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <li
            key={stat.label}
            className="animate-fade-up rounded-3xl bg-white p-5 shadow-soft ring-1 ring-cream-200 transition-transform hover:-translate-y-1"
            style={{ animationDelay: `${0.06 * i}s` }}
          >
            <span className={`grid size-11 place-items-center rounded-2xl ${stat.tone}`}>
              <SchoolsIcon icon={stat.icon} className="size-6" />
            </span>
            <p className="mt-4 text-sm font-bold text-brand-900/60">{stat.label}</p>
            <p className="mt-1 text-3xl font-extrabold text-brand-900">{stat.value}</p>
            <p className="mt-1 text-xs font-bold text-brand-600">{stat.detail}</p>
          </li>
        ))}
      </ul>

      <section className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <article className="animate-fade-up rounded-3xl bg-white p-6 shadow-soft ring-1 ring-cream-200 [animation-delay:0.15s]">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-extrabold text-brand-900">Actividad de la semana</h2>
            <span className="rounded-full bg-cream-100 px-3 py-1.5 text-xs font-extrabold text-brand-700">
              Esta semana
            </span>
          </header>
          <WeekBars />
        </article>

        <article className="animate-fade-up rounded-3xl bg-white p-6 shadow-soft ring-1 ring-cream-200 [animation-delay:0.2s]">
          <h2 className="text-lg font-extrabold text-brand-900">Áreas trabajadas</h2>
          <AreaDonut />
        </article>
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-2">
        <article className="animate-fade-up rounded-3xl bg-white p-6 shadow-soft ring-1 ring-cream-200 [animation-delay:0.25s]">
          <header className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-extrabold text-brand-900">Últimos informes</h2>
            <Link
              href="/schools/panel/informes"
              className="rounded-full px-3 py-1.5 text-xs font-extrabold text-brand-600 transition-colors hover:bg-brand-50"
            >
              Ver todos
            </Link>
          </header>

          <ul className="mt-4 space-y-3">
            {reports.slice(0, 3).map((report) => (
              <li key={report.date}>
                <Link
                  href="/schools/panel/informes"
                  className="flex items-center gap-3 rounded-2xl bg-cream-50 p-3 ring-1 ring-cream-200 transition-all hover:-translate-y-0.5 hover:ring-brand-200"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
                    <SchoolsIcon icon="reports" className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-bold text-brand-900">
                      {report.session}
                    </span>
                    <span className="block truncate text-xs font-semibold text-brand-900/50">
                      {new Date(report.date).toLocaleDateString("es-PE", {
                        day: "numeric",
                        month: "long",
                        timeZone: "UTC",
                      })}{" "}
                      · {report.therapist}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-extrabold ${moodStyles[report.mood]}`}
                  >
                    {report.mood}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </article>

        <article className="animate-fade-up flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-cream-200 [animation-delay:0.3s]">
          <header className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-extrabold text-brand-900">Para hacer hoy</h2>
            <Link
              href="/schools/panel/juegos"
              className="rounded-full px-3 py-1.5 text-xs font-extrabold text-brand-600 transition-colors hover:bg-brand-50"
            >
              Ver todo
            </Link>
          </header>

          <Link
            href="/schools/panel/juegos"
            className="group flex flex-1 flex-col justify-end rounded-2xl bg-brand-100 p-5 ring-1 ring-brand-200 transition-all hover:-translate-y-0.5"
          >
            <span aria-hidden="true" className="text-4xl">
              {game.emoji}
            </span>
            <span className="mt-3 text-xs font-extrabold uppercase tracking-wide text-brand-600">
              Juego del día · {game.ages}
            </span>
            <span className="text-lg font-extrabold text-brand-900">{game.title}</span>
            <span className="mt-1 text-sm font-semibold text-brand-900/60">
              {game.text}
            </span>
          </Link>

          <Link
            href="/schools/panel/tips"
            className="rounded-2xl bg-butter-100 p-5 ring-1 ring-butter-200 transition-all hover:-translate-y-0.5"
          >
            <span className="text-xs font-extrabold uppercase tracking-wide text-butter-600">
              Tip en casa · {tip.minutes} min
            </span>
            <span className="mt-1 block font-extrabold text-brand-900">{tip.title}</span>
            <span className="mt-1 block text-sm font-semibold text-brand-900/60">
              {tip.text}
            </span>
          </Link>
        </article>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-extrabold text-brand-900">Accesos rápidos</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shortcuts.map((section, i) => (
            <li
              key={section.href}
              className="animate-fade-up"
              style={{ animationDelay: `${0.05 * i}s` }}
            >
              <Link
                href={section.href}
                className="group flex h-full flex-col rounded-3xl bg-white p-5 shadow-soft ring-1 ring-cream-200 transition-all hover:-translate-y-1 hover:ring-brand-200"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <SchoolsIcon icon={section.icon} />
                </span>
                <span className="mt-3 font-extrabold text-brand-900">{section.label}</span>
                <span className="mt-1 text-sm font-semibold text-brand-900/60">
                  {section.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <aside className="animate-fade-up mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-brand-100 p-6 ring-1 ring-brand-200">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="text-3xl">
            ⭐
          </span>
          <p className="font-extrabold text-brand-800">
            Nuevos tips y juegos cada semana
            <span className="block text-sm font-semibold text-brand-700/80">
              elegidos para {child.firstName}
            </span>
          </p>
        </div>
        <Link
          href="/schools/panel/tips"
          className="rounded-full bg-brand-600 px-6 py-3 text-sm font-extrabold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-brand-700"
        >
          Explorar ahora
        </Link>
      </aside>
    </>
  );
}
