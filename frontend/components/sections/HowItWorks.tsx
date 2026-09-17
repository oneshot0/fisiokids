const steps = [
  {
    title: "Agenda tu cita",
    text: "Eliges la terapia, el horario y nos cuentas un poco sobre tu peque.",
  },
  {
    title: "Evaluación inicial",
    text: "Un especialista evalúa y define objetivos claros y medibles.",
  },
  {
    title: "Plan de terapia",
    text: "Sesiones lúdicas con actividades para reforzar también en casa.",
  },
  {
    title: "Sigue los avances",
    text: "Reportes, hitos alcanzados y pagos en tu portal de padres.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
          ¿Cómo funciona?
        </h2>
        <p className="mt-4 text-lg text-brand-700">
          Cuatro pasos simples, sin trámites complicados.
        </p>
      </div>

      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="relative rounded-3xl bg-brand-50 p-7">
            <span className="grid size-10 place-items-center rounded-full bg-brand-600 font-extrabold text-white">
              {i + 1}
            </span>
            <h3 className="mt-4 text-lg font-bold text-brand-900">{s.title}</h3>
            <p className="mt-2 text-brand-700">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
