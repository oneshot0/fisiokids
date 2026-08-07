import Link from "next/link";
import { Turtle } from "../Turtle";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
      <div
        aria-hidden="true"
        className="absolute -left-24 -top-24 size-72 rounded-full bg-brand-100 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-20 top-32 size-80 rounded-full bg-brand-100 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
            <span className="size-2 rounded-full bg-brand-500" />
            Terapias pediátricas en Lima
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-brand-900 sm:text-5xl">
            Cada peque avanza a{" "}
            <span className="text-brand-500">su propio ritmo</span>
          </h1>

          <p className="mt-5 max-w-lg text-lg text-brand-700">
            En FisioKids acompañamos el desarrollo de tu hijo con terapias lúdicas,
            un equipo especializado y un plan que puedes seguir de cerca, sesión a
            sesión.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/agenda"
              className="rounded-full bg-brand-600 px-7 py-3.5 font-bold text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Agenda una cita
            </Link>
            <Link
              href="#terapias"
              className="rounded-full border-2 border-brand-200 px-7 py-3.5 font-bold text-brand-700 transition-colors hover:bg-brand-50"
            >
              Ver terapias
            </Link>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {[
              { k: "+500", v: "peques atendidos" },
              { k: "6", v: "especialidades" },
              { k: "10 años", v: "de experiencia" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="text-2xl font-extrabold text-brand-600">{s.k}</dt>
                <dd className="text-sm text-brand-700">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="rounded-[2.5rem] bg-white p-8 shadow-xl ring-1 ring-brand-100">
            <Turtle className="w-full" />
            <p className="mt-4 text-center text-sm font-semibold text-brand-700">
              Hola, soy <span className="text-brand-500">Tuki</span> 🐢 · te acompaño
              en cada sesión
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
