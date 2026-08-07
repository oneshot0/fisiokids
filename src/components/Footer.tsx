import Link from "next/link";
import { Logo } from "./Logo";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-brand-100 bg-brand-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-brand-700">
            Terapias pediátricas con enfoque lúdico en Lima. Acompañamos cada avance,
            por pequeño que parezca.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-800">
            Navegación
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-brand-700">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brand-900 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-800">
            Contacto
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-brand-700">
            <li>{site.address}</li>
            <li>
              <a className="hover:underline" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                {site.phone}
              </a>
            </li>
            <li>
              <a className="hover:underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-800">
            Horarios
          </h2>
          <p className="mt-4 text-sm text-brand-700">{site.schedule}</p>
        </div>
      </div>

      <div className="border-t border-brand-100 py-6 text-center text-xs text-brand-700">
        © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
