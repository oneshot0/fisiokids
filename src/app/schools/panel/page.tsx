import Link from "next/link";
import { PanelHeader } from "@/components/schools/PanelHeader";
import { SchoolsIcon } from "@/components/schools/SchoolsIcon";
import { goals, panelSections, reports } from "@/data/schools";

const stats = [
  { label: "Sesiones este mes", value: "8", detail: "de 8 programadas" },
  { label: "Asistencia", value: "100%", detail: "sin faltas" },
  { label: "Objetivos activos", value: "4", detail: "1 por cerrar" },
  { label: "Próxima sesión", value: "Lun 9", detail: "10:00 a. m." },
];

const moodStyles: Record<string, string> = {
  "Muy bien": "bg-brand-100 text-brand-800",
  Bien: "bg-slate-200 text-slate-700",
  Regular: "bg-amber-100 text-amber-800",
};

const shortcuts = panelSections.filter((s) => s.href !== "/schools/panel");

export default function PanelHomePage() {
  return (
    <>
      <PanelHeader
        title="Hola, Ana 👋"
        subtitle="Este es el resumen de Mateo en Colegio San Marcos."
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <li
            key={s.label}
            className="animate-fade-up rounded-2xl bg-white p-5 ring-1 ring-slate-200"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              {s.label}
            </p>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">{s.value}</p>
            <p className="mt-1 text-sm text-slate-500">{s.detail}</p>
          </li>
        ))}
      </ul>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="animate-fade-up rounded-3xl bg-white p-7 ring-1 ring-slate-200 [animation-delay:0.15s]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900">Últimos reportes</h2>
            <Link
              href="/schools/panel/informes"
              className="text-sm font-bold text-brand-600 hover:underline"
            >
              Ver todos
            </Link>
          </div>

          <ul className="mt-5 space-y-4">
            {reports.slice(0, 3).map((r) => (
              <li
                key={r.date}
                className="rounded-2xl border border-slate-200 p-5 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold text-slate-900">{r.session}</p>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${moodStyles[r.mood]}`}
                  >
                    {r.mood}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{r.summary}</p>
                <p className="mt-3 text-xs text-slate-500">
                  {new Date(r.date).toLocaleDateString("es-PE", {
                    day: "numeric",
                    month: "long",
                    timeZone: "UTC",
                  })}{" "}
                  · {r.therapist}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-up rounded-3xl bg-white p-7 ring-1 ring-slate-200 [animation-delay:0.25s]">
          <h2 className="text-lg font-extrabold text-slate-900">Avance por objetivo</h2>
          <ul className="mt-5 space-y-5">
            {goals.map((g, i) => (
              <li key={g.title}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-800">{g.title}</p>
                  <span className="text-sm font-extrabold text-brand-600">
                    {g.progress}%
                  </span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400 transition-[width] duration-1000"
                    style={{
                      width: `${g.progress}%`,
                      animation: `fade-in 0.9s ease-out ${0.3 + i * 0.1}s both`,
                    }}
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500">{g.area}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-extrabold text-slate-900">Accesos rápidos</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shortcuts.map((s, i) => (
            <li key={s.href} className="animate-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
              <Link
                href={s.href}
                className="group flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-xl hover:ring-brand-200"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-slate-900 text-white transition-colors group-hover:bg-brand-600">
                  <SchoolsIcon icon={s.icon} />
                </span>
                <span className="mt-4 font-bold text-slate-900">{s.label}</span>
                <span className="mt-1 text-sm text-slate-600">{s.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
