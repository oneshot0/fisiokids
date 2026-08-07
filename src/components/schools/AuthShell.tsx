import Link from "next/link";
import { Turtle } from "../Turtle";

const highlights = [
  "Reportes diarios del colegio",
  "Avances por objetivo terapéutico",
  "Blog, tips y juegos para casa",
  "Pagos y comprobantes al día",
];

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-slate-900 p-12 lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden="true"
          className="absolute -left-20 -top-20 size-80 rounded-full bg-brand-600/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -right-16 size-80 rounded-full bg-brand-500/20 blur-3xl"
        />

        <Link href="/schools" className="relative inline-flex items-center gap-2">
          <span className="grid size-10 place-items-center rounded-2xl bg-brand-500">
            <Turtle className="size-7" title="FisioKids Schools" />
          </span>
          <span className="text-lg font-extrabold text-white">
            FisioKids <span className="text-brand-400">Schools</span>
          </span>
        </Link>

        <div className="relative">
          <Turtle className="animate-float w-44" />
          <p className="animate-fade-up mt-8 max-w-sm text-3xl font-extrabold leading-tight text-white">
            El día a día de tu peque, siempre a la mano.
          </p>
          <ul className="mt-8 space-y-3">
            {highlights.map((h, i) => (
              <li
                key={h}
                className="animate-fade-up flex items-center gap-3 text-slate-300"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-500/20 text-brand-400">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 13 4 4L19 7" />
                  </svg>
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-slate-500">
          © {new Date().getFullYear()} FisioKids · Lima, Perú
        </p>
      </div>

      <div className="flex items-center justify-center px-4 py-14">
        <div className="animate-fade-up w-full max-w-md">
          <Link
            href="/schools"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-800"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H6m5 6-6-6 6-6" />
            </svg>
            Volver
          </Link>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {title}
          </h1>
          <p className="mt-2 text-slate-600">{subtitle}</p>

          <div className="mt-8">{children}</div>

          <div className="mt-6 text-center text-sm text-slate-600">{footer}</div>
        </div>
      </div>
    </div>
  );
}
