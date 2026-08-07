import type { Metadata } from "next";
import { PanelHeader } from "@/components/schools/PanelHeader";
import { blogPosts } from "@/data/schools";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PanelHeader
        title="Blog"
        subtitle="Artículos del equipo terapéutico para acompañar a tu peque."
      />

      <article className="animate-fade-up overflow-hidden rounded-3xl bg-slate-900 p-8 text-white sm:p-10">
        <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-bold uppercase tracking-wide">
          {featured.category}
        </span>
        <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight">
          {featured.title}
        </h2>
        <p className="mt-3 max-w-2xl text-slate-300">{featured.excerpt}</p>
        <p className="mt-6 text-sm text-slate-400">
          {new Date(featured.date).toLocaleDateString("es-PE", {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "UTC",
          })}{" "}
          · {featured.readMin} min de lectura
        </p>
      </article>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {rest.map((p, i) => (
          <li
            key={p.slug}
            className="animate-fade-up group flex flex-col rounded-3xl bg-white p-7 ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-xl hover:ring-brand-200"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-600 transition-colors group-hover:bg-brand-100 group-hover:text-brand-800">
              {p.category}
            </span>
            <h2 className="mt-4 text-xl font-bold text-slate-900">{p.title}</h2>
            <p className="mt-2 grow text-slate-600">{p.excerpt}</p>
            <p className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-500">
              {new Date(p.date).toLocaleDateString("es-PE", {
                day: "numeric",
                month: "long",
                timeZone: "UTC",
              })}{" "}
              · {p.readMin} min de lectura
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
