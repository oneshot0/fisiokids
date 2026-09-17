"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { nav, schoolsNavItem } from "@/lib/site";

function SchoolsLink({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={schoolsNavItem.href}
      onClick={onClick}
      className={`group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-700 to-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-600/30 ring-1 ring-brand-700/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-600/40 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
        <path d="M12 3 1 8l11 5 9-4.09V17h2V8L12 3ZM5 13.18V17c0 1.66 3.13 3 7 3s7-1.34 7-3v-3.82l-7 3.18-7-3.18Z" />
      </svg>
      {schoolsNavItem.label}
      <svg
        viewBox="0 0 24 24"
        className="size-4 transition-transform group-hover:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h13m-5-6 6 6-6 6" />
      </svg>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/90 backdrop-blur">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3"
      >
        <Link href="/" aria-label="Ir al inicio" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-brand-100 text-brand-800"
                      : "text-brand-700 hover:bg-brand-50"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="ml-2">
            <SchoolsLink />
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="grid size-10 place-items-center rounded-full border border-brand-200 text-brand-700 md:hidden"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="menu-movil" className="border-t border-brand-100 bg-white md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2.5 font-semibold text-brand-700 hover:bg-brand-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-1">
              <SchoolsLink className="w-full justify-center" onClick={() => setOpen(false)} />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
