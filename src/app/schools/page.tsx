import Link from "next/link";
import { SchoolsHeader } from "@/components/schools/SchoolsHeader";
import { SchoolsIcon } from "@/components/schools/SchoolsIcon";
import { AppMockup } from "@/components/schools/AppMockup";
import { panelSections } from "@/data/schools";

const features = panelSections.filter((s) => s.href !== "/schools/panel");

const audiences = [
  {
    title: "Para las familias",
    text: "Sigue el día a día de tu peque en el colegio: informes, avances y recursos para reforzar en casa.",
  },
  {
    title: "Para los peques",
    text: "Juegos y actividades diseñadas por terapeutas, pensadas para que practicar no se sienta como tarea.",
  },
  {
    title: "Para el colegio",
    text: "Tamizajes, seguimiento por aula e informes agregados para el equipo directivo.",
  },
];

export default function SchoolsLandingPage() {
  return (
    <>
      <SchoolsHeader />

      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -right-32 -top-32 size-96 rounded-full bg-brand-100 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -left-40 top-64 size-96 rounded-full bg-slate-200 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200">
              <span className="size-2 animate-pulse rounded-full bg-brand-500" />
              Plataforma para familias y colegios
            </span>

            <h1 className="animate-fade-up mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 [animation-delay:0.1s] sm:text-6xl">
              El colegio y la terapia,{" "}
              <span className="text-brand-600">en la misma pantalla</span>
            </h1>

            <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg text-slate-600 [animation-delay:0.2s]">
              Ingresa con tu cuenta y revisa los reportes diarios de tu peque dentro de
              la institución, sus avances, y accede a blog, tips, juegos y pagos.
            </p>

            <div className="animate-fade-up mt-9 flex flex-wrap justify-center gap-3 [animation-delay:0.3s]">
              <Link
                href="/schools/registro"
                className="rounded-full bg-brand-600 px-8 py-3.5 font-bold text-white shadow-xl shadow-brand-600/30 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
              >
                Crear mi cuenta
              </Link>
              <Link
                href="/schools/login"
                className="rounded-full border-2 border-slate-300 bg-white px-8 py-3.5 font-bold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-400"
              >
                Ya tengo cuenta
              </Link>
            </div>
          </div>

          <div className="mt-16">
            <AppMockup />
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Todo lo que encuentras dentro
          </h2>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <li
                key={f.href}
                className="animate-fade-up group rounded-3xl border border-slate-200 bg-slate-50 p-7 transition-all hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-xl"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-slate-900 text-white transition-colors group-hover:bg-brand-600">
                  <SchoolsIcon icon={f.icon} className="size-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-slate-900">{f.label}</h3>
                <p className="mt-2 text-slate-600">{f.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <ul className="grid gap-6 md:grid-cols-3">
            {audiences.map((a, i) => (
              <li
                key={a.title}
                className="animate-fade-up rounded-3xl bg-white p-8 ring-1 ring-slate-200"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <h2 className="text-xl font-bold text-slate-900">{a.title}</h2>
                <p className="mt-3 text-slate-600">{a.text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-16 overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-16 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Empieza hoy mismo
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-300">
              Crea tu cuenta con el código que te entregó el colegio y vincula el perfil
              de tu peque en menos de dos minutos.
            </p>
            <Link
              href="/schools/registro"
              className="mt-8 inline-block rounded-full bg-brand-500 px-8 py-3.5 font-bold text-white shadow-xl shadow-brand-500/30 transition-all hover:-translate-y-0.5 hover:bg-brand-400"
            >
              Crear mi cuenta
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
