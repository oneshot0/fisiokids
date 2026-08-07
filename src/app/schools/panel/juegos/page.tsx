import type { Metadata } from "next";
import { PanelHeader } from "@/components/schools/PanelHeader";
import { games } from "@/data/schools";

export const metadata: Metadata = { title: "Juegos" };

export default function JuegosPage() {
  return (
    <>
      <PanelHeader
        title="Juegos"
        subtitle="Actividades interactivas diseñadas por el equipo terapéutico."
      />

      <ul className="grid gap-6 sm:grid-cols-2">
        {games.map((g, i) => (
          <li
            key={g.title}
            className="animate-fade-up group relative overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-2xl hover:ring-brand-200"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <span
              aria-hidden="true"
              className="absolute -right-4 -top-4 text-7xl opacity-15 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-25"
            >
              {g.emoji}
            </span>

            <span className="relative text-4xl">{g.emoji}</span>
            <h2 className="relative mt-4 text-xl font-bold text-slate-900">{g.title}</h2>
            <p className="relative mt-2 text-slate-600">{g.text}</p>

            <div className="relative mt-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                {g.ages}
              </span>
              <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-800">
                {g.skill}
              </span>
            </div>

            <button
              type="button"
              className="relative mt-6 w-full rounded-full bg-brand-600 px-6 py-3 font-bold text-white shadow-lg shadow-brand-600/20 transition-all hover:bg-brand-700"
            >
              Jugar
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-8 rounded-2xl bg-white p-6 text-center text-sm text-slate-500 ring-1 ring-slate-200">
        Los juegos son maquetas por ahora. La versión jugable llega junto con el portal
        real en la Fase 8.
      </p>
    </>
  );
}
