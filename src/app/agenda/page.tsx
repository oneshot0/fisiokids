import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { AppointmentForm } from "./AppointmentForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Agenda una cita",
  description:
    "Reserva una evaluación inicial en FisioKids Lima: fisioterapia motora, lenguaje, terapia ocupacional y estimulación temprana.",
};

export default function AgendaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Agenda una cita"
        title="Reserva la evaluación inicial de tu peque"
        subtitle="Déjanos tus datos y coordinamos el horario contigo el mismo día."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 md:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="text-xl font-extrabold text-brand-900">
            Antes de tu primera cita
          </h2>
          <ul className="mt-5 space-y-4 text-brand-700">
            {[
              "Trae el informe médico o la derivación, si la tienes.",
              "Ven con ropa cómoda: la evaluación incluye movimiento y juego.",
              "Llega 10 minutos antes para registrar los datos del peque.",
              "La evaluación dura aproximadamente 45 minutos.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-2 size-2 shrink-0 rounded-full bg-brand-400" />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-3xl bg-brand-50 p-7">
            <p className="font-bold text-brand-900">¿Prefieres llamarnos?</p>
            <a
              className="mt-1 inline-block text-lg font-extrabold text-brand-600 hover:underline"
              href={`tel:${site.phone.replace(/\s/g, "")}`}
            >
              {site.phone}
            </a>
            <p className="mt-2 text-sm text-brand-700">{site.schedule}</p>
          </div>
        </div>

        <AppointmentForm />
      </section>
    </>
  );
}
