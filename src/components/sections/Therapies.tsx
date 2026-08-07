import Link from "next/link";
import { therapies } from "@/data/therapies";
import { TherapyIcon } from "../TherapyIcon";

export function Therapies() {
  return (
    <section id="terapias" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
          Nuestras terapias
        </h2>
        <p className="mt-4 text-lg text-brand-700">
          Cada plan empieza con una evaluación inicial y se ajusta a los objetivos de
          tu peque y de su familia.
        </p>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {therapies.map((t) => (
          <li
            key={t.slug}
            className="group flex flex-col rounded-3xl border border-brand-100 bg-white p-7 transition-shadow hover:shadow-lg"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-500 group-hover:text-white">
              <TherapyIcon icon={t.icon} />
            </span>

            <h3 className="mt-5 text-xl font-bold text-brand-900">{t.name}</h3>
            <p className="mt-2 text-brand-700">{t.summary}</p>

            <ul className="mt-4 space-y-1.5 text-sm text-brand-700">
              {t.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-400" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-2 border-t border-brand-100 pt-4 text-xs font-semibold uppercase tracking-wide text-brand-600">
              <span>{t.durationMin} min</span>
              <span aria-hidden="true">·</span>
              <span>{t.ageRange}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-12 text-center">
        <Link
          href="/agenda"
          className="rounded-full bg-brand-600 px-7 py-3.5 font-bold text-white transition-colors hover:bg-brand-700"
        >
          Reservar evaluación inicial
        </Link>
      </div>
    </section>
  );
}
