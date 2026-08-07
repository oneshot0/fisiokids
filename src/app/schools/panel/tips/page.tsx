import type { Metadata } from "next";
import { PanelHeader } from "@/components/schools/PanelHeader";
import { tips } from "@/data/schools";

export const metadata: Metadata = { title: "Tips" };

const areaStyles: Record<string, string> = {
  Motora: "bg-brand-100 text-brand-800",
  Lenguaje: "bg-sky-100 text-sky-800",
  Sensorial: "bg-violet-100 text-violet-800",
  Autonomía: "bg-amber-100 text-amber-800",
};

export default function TipsPage() {
  return (
    <>
      <PanelHeader
        title="Tips para casa"
        subtitle="Actividades cortas que refuerzan lo trabajado en la sesión."
      />

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tips.map((t, i) => (
          <li
            key={t.title}
            className="animate-fade-up flex flex-col rounded-3xl bg-white p-7 ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-xl hover:ring-brand-200"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${areaStyles[t.area]}`}
              >
                {t.area}
              </span>
              <span className="text-xs font-bold text-slate-500">{t.minutes} min</span>
            </div>
            <h2 className="mt-4 text-lg font-bold text-slate-900">{t.title}</h2>
            <p className="mt-2 grow text-slate-600">{t.text}</p>
            <button
              type="button"
              className="mt-5 rounded-full bg-slate-100 px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-brand-600 hover:text-white"
            >
              Marcar como hecho
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
