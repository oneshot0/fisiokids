import type { Metadata } from "next";
import { PanelHeader } from "@/components/schools/PanelHeader";
import { goals, reports } from "@/data/schools";

export const metadata: Metadata = { title: "Informes" };

const moodStyles: Record<string, string> = {
  "Muy bien": "bg-brand-100 text-brand-800",
  Bien: "bg-cream-200 text-brand-900/70",
  Regular: "bg-amber-100 text-amber-800",
};

export default function InformesPage() {
  return (
    <>
      <PanelHeader
        title="Informes"
        subtitle="Reportes diarios del colegio y avances por objetivo terapéutico."
        action={
          <button
            type="button"
            className="rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-700"
          >
            Descargar PDF del mes
          </button>
        }
      />

      <section className="animate-fade-up rounded-3xl bg-white p-7 ring-1 ring-cream-200">
        <h2 className="text-lg font-extrabold text-brand-900">Objetivos en curso</h2>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2">
          {goals.map((g) => (
            <li key={g.title} className="rounded-2xl bg-cream-50 p-5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-semibold text-brand-900/80">{g.title}</p>
                <span className="font-extrabold text-brand-600">{g.progress}%</span>
              </div>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-cream-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400"
                  style={{ width: `${g.progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-brand-900/50">
                {g.area}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-extrabold text-brand-900">Bitácora diaria</h2>
        <ol className="mt-5 space-y-4 border-l-2 border-cream-200 pl-6">
          {reports.map((r, i) => (
            <li
              key={r.date}
              className="animate-fade-up relative rounded-2xl bg-white p-6 ring-1 ring-cream-200 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="absolute -left-[1.9rem] top-7 size-3.5 rounded-full bg-brand-500 ring-4 ring-cream-100" />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-bold text-brand-900">{r.session}</p>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${moodStyles[r.mood]}`}>
                  {r.mood}
                </span>
              </div>
              <p className="mt-2 text-brand-900/60">{r.summary}</p>
              <p className="mt-3 text-xs text-brand-900/50">
                {new Date(r.date).toLocaleDateString("es-PE", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  timeZone: "UTC",
                })}{" "}
                · {r.therapist}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
