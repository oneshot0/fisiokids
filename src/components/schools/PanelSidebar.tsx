"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Turtle } from "../Turtle";
import { SchoolsIcon } from "./SchoolsIcon";
import { panelSections } from "@/data/schools";

export function PanelSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = panelSections.map((s) => {
    const active =
      s.href === "/schools/panel" ? pathname === s.href : pathname.startsWith(s.href);
    return (
      <li key={s.href}>
        <Link
          href={s.href}
          onClick={() => setOpen(false)}
          aria-current={active ? "page" : undefined}
          className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
            active
              ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <SchoolsIcon icon={s.icon} className="size-5 shrink-0" />
          <span className="transition-transform group-hover:translate-x-0.5">
            {s.label}
          </span>
        </Link>
      </li>
    );
  });

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="panel-nav"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-slate-900 text-white shadow-2xl lg:hidden"
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      <aside
        id="panel-nav"
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-slate-900 p-5 transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link href="/schools" className="flex items-center gap-2">
          <span className="grid size-10 place-items-center rounded-2xl bg-brand-500">
            <Turtle className="size-7" title="FisioKids Schools" />
          </span>
          <span className="text-base font-extrabold leading-tight text-white">
            FisioKids
            <span className="block text-xs font-bold text-brand-400">Schools</span>
          </span>
        </Link>

        <nav aria-label="Secciones del panel" className="mt-8 flex-1">
          <ul className="space-y-1.5">{links}</ul>
        </nav>

        <div className="rounded-2xl bg-slate-800 p-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-500 font-bold text-white">
              AP
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold text-white">Ana Pérez</span>
              <span className="block truncate text-xs text-slate-400">Apoderada</span>
            </span>
          </div>
          <Link
            href="/schools"
            className="mt-3 block rounded-lg px-3 py-2 text-center text-xs font-semibold text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
          >
            Cerrar sesión
          </Link>
        </div>
      </aside>

      {open && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
        />
      )}
    </>
  );
}
