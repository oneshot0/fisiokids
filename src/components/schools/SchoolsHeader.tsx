import Link from "next/link";
import { Turtle } from "../Turtle";

export function SchoolsHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur">
      <nav
        aria-label="FisioKids Schools"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3"
      >
        <Link href="/schools" className="inline-flex items-center gap-2">
          <span className="grid size-10 place-items-center rounded-2xl bg-slate-900">
            <Turtle className="size-7" title="FisioKids Schools" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            FisioKids <span className="text-brand-600">Schools</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 sm:block"
          >
            Volver al centro
          </Link>
          <Link
            href="/schools/login"
            className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100"
          >
            Ingresar
          </Link>
          <Link
            href="/schools/registro"
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
          >
            Crear cuenta
          </Link>
        </div>
      </nav>
    </header>
  );
}
