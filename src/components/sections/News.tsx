import { news } from "@/data/news";

const tagStyles: Record<string, string> = {
  Nuevo: "bg-brand-500 text-white",
  "Próximamente": "bg-brand-100 text-brand-800",
  Taller: "bg-brand-700 text-white",
};

export function News() {
  return (
    <section id="novedades" className="scroll-mt-24 bg-brand-50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
            Lo nuevo que se viene
          </h2>
          <p className="mt-4 text-lg text-brand-700">
            Novedades del centro, talleres para familias y lo que estamos preparando
            para este año.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {news.map((n) => (
            <li
              key={n.slug}
              className="rounded-3xl border border-brand-100 bg-white p-7 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center justify-between gap-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${tagStyles[n.tag]}`}
                >
                  {n.tag}
                </span>
                <time dateTime={n.date} className="text-sm text-brand-600">
                  {new Date(n.date).toLocaleDateString("es-PE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </time>
              </div>
              <h3 className="mt-4 text-xl font-bold text-brand-900">{n.title}</h3>
              <p className="mt-2 text-brand-700">{n.excerpt}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
