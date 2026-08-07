import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "FisioKids Schools",
  description:
    "Programa de FisioKids para colegios en Lima: tamizajes del desarrollo, talleres para docentes e informes por institución.",
};

const services = [
  {
    title: "Tamizaje del desarrollo",
    text: "Evaluamos motricidad, lenguaje y regulación sensorial de cada aula y detectamos señales de alerta a tiempo.",
  },
  {
    title: "Talleres para docentes",
    text: "Estrategias prácticas de aula para acompañar a alumnos con dificultades motoras, sensoriales o de lenguaje.",
  },
  {
    title: "Escuela de familias",
    text: "Charlas para padres del colegio sobre postura, pantallas, juego y desarrollo infantil.",
  },
  {
    title: "Informes institucionales",
    text: "Reportes agregados por grado con recomendaciones y derivaciones sugeridas.",
  },
];

export default function SchoolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="FisioKids Schools"
        title="Llevamos FisioKids a tu colegio"
        subtitle="Un programa de salud del desarrollo para instituciones educativas de Lima: tamizajes, talleres e informes para el equipo directivo."
      />

      <section className="mx-auto max-w-6xl px-4 pb-6">
        <ul className="grid gap-6 sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.title} className="rounded-3xl border border-brand-100 p-7">
              <h2 className="text-xl font-bold text-brand-900">{s.title}</h2>
              <p className="mt-2 text-brand-700">{s.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-[2.5rem] bg-brand-600 px-8 py-14 text-center text-white">
          <h2 className="text-3xl font-extrabold">Portal para colegios</h2>
          <p className="mx-auto mt-4 max-w-2xl text-brand-50">
            Estamos construyendo un espacio donde cada colegio podrá revisar sus
            tamizajes, el seguimiento de sus alumnos y los informes por grado.
            Escríbenos si quieres ser una de las instituciones piloto.
          </p>
          <Link
            href="/agenda"
            className="mt-8 inline-block rounded-full bg-white px-7 py-3.5 font-bold text-brand-700 transition-colors hover:bg-brand-50"
          >
            Quiero información para mi colegio
          </Link>
        </div>
      </section>
    </>
  );
}
