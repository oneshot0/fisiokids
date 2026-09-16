export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-gradient-to-b from-brand-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-brand-900 sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg text-brand-700">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
