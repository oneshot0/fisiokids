const testimonials = [
  {
    quote:
      "Mateo llegó sin gatear y a los tres meses ya daba sus primeros pasos. El equipo nos explicó todo con muchísima paciencia.",
    author: "Carla R.",
    detail: "Mamá de Mateo, 1 año",
  },
  {
    quote:
      "La terapia de lenguaje cambió la seguridad de mi hija en el colegio. Ahora participa y pide la palabra.",
    author: "Luis A.",
    detail: "Papá de Valentina, 5 años",
  },
  {
    quote:
      "Me encanta que las sesiones parecen juego. Mi hijo pregunta cuándo volvemos a ver a Tuki.",
    author: "Ana P.",
    detail: "Mamá de Thiago, 3 años",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
        Lo que dicen las familias
      </h2>

      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <li
            key={t.author}
            className="flex flex-col rounded-3xl border border-brand-100 bg-white p-7"
          >
            <svg viewBox="0 0 24 24" className="size-8 text-brand-300" fill="currentColor" aria-hidden="true">
              <path d="M7 7h4v4a4 4 0 0 1-4 4V7Zm6 0h4v4a4 4 0 0 1-4 4V7Z" />
            </svg>
            <blockquote className="mt-4 grow text-brand-800">{t.quote}</blockquote>
            <footer className="mt-6 border-t border-brand-100 pt-4">
              <p className="font-bold text-brand-900">{t.author}</p>
              <p className="text-sm text-brand-600">{t.detail}</p>
            </footer>
          </li>
        ))}
      </ul>
    </section>
  );
}
