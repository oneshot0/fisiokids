import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Turtle } from "@/components/Turtle";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce al equipo de FisioKids: especialistas en terapia pediátrica en Lima con enfoque lúdico y familiar.",
};

const values = [
  {
    title: "Juego primero",
    text: "Si el peque se divierte, participa; y si participa, avanza. Todo nuestro método parte de ahí.",
  },
  {
    title: "Familia incluida",
    text: "Papá y mamá son parte del plan: explicamos cada objetivo y dejamos tareas para casa.",
  },
  {
    title: "Objetivos medibles",
    text: "Nada de 'va mejorando'. Definimos metas concretas y las medimos sesión a sesión.",
  },
];

const team = [
  { name: "Lic. Ana Torres", role: "Fisioterapeuta pediátrica · Directora" },
  { name: "Lic. Diego Ramos", role: "Terapeuta de lenguaje" },
  { name: "Lic. Sofía Núñez", role: "Terapeuta ocupacional" },
  { name: "Lic. Camila Ruiz", role: "Estimulación temprana" },
];

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nosotros"
        title="Un equipo que celebra cada pequeño avance"
        subtitle="Somos un centro de terapias pediátricas en Lima. Trabajamos con un enfoque lúdico, cercano y basado en objetivos claros para cada familia."
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-extrabold text-brand-900">Nuestra historia</h2>
          <p className="mt-4 text-brand-700">
            FisioKids nació de una idea simple: que ir a terapia no se sintiera como
            ir al hospital. Empezamos con una sala, muchos juguetes y la convicción
            de que el juego es la mejor herramienta terapéutica que existe.
          </p>
          <p className="mt-4 text-brand-700">
            Hoy acompañamos a cientos de familias limeñas con seis especialidades y
            un equipo que sigue creyendo lo mismo.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold text-brand-900">
            ¿Por qué una tortuga?
          </h2>
          <p className="mt-4 text-brand-700">
            Porque Tuki nos recuerda algo importante: no importa la velocidad, importa
            no detenerse. Cada peque avanza a su propio ritmo, y eso está bien.
          </p>
        </div>

        <div className="rounded-[2.5rem] bg-brand-50 p-10">
          <Turtle className="mx-auto w-64" />
        </div>
      </section>

      <section className="bg-brand-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-extrabold text-brand-900">Nuestros valores</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <li key={v.title} className="rounded-3xl bg-white p-7 ring-1 ring-brand-100">
                <h3 className="text-lg font-bold text-brand-900">{v.title}</h3>
                <p className="mt-2 text-brand-700">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-extrabold text-brand-900">El equipo</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <li key={m.name} className="rounded-3xl border border-brand-100 p-7 text-center">
              <span className="mx-auto grid size-20 place-items-center rounded-full bg-brand-100">
                <Turtle className="size-14" title={m.name} />
              </span>
              <h3 className="mt-4 font-bold text-brand-900">{m.name}</h3>
              <p className="mt-1 text-sm text-brand-600">{m.role}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
