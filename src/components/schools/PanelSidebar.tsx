"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Turtle } from "../Turtle";
import { SchoolsIcon } from "./SchoolsIcon";
import type { PanelSection } from "@/data/schools";

export function PanelSidebar({
  collapsed,
  onClose,
  navId,
  sections,
  homeHref,
  greeting,
  promo,
}: {
  collapsed: boolean;
  onClose: () => void;
  navId: string;
  sections: PanelSection[];
  homeHref: string;
  greeting: {
    title: string;
    subtitle: string;
    href: string;
  };
  promo?: {
    emoji: string;
    title: string;
    text: string;
    cta: string;
    href: string;
  };
}) {
  const pathname = usePathname();

  return (
    <aside
      id={navId}
      className="panel-sidebar fixed inset-y-0 left-0 z-40 flex flex-col gap-6 overflow-y-auto bg-brand-50 px-3 py-5 ring-1 ring-brand-100 lg:overflow-visible"
      aria-label="Menú del panel"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar menú"
        className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white text-brand-700 shadow-soft ring-1 ring-brand-100 lg:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <Link
        href={greeting.href}
        className="flex flex-col items-center gap-2 rounded-3xl bg-white p-3 text-center shadow-soft ring-1 ring-brand-100 transition-transform hover:-translate-y-0.5"
      >
        <span className="grid size-14 shrink-0 place-items-center rounded-full bg-brand-100 ring-4 ring-white">
          <Turtle className="size-10" title="Tuki, la tortuga de FisioKids" />
        </span>
        <span className="panel-hide-collapsed text-sm font-extrabold text-brand-800">
          {greeting.title}
          <span className="block text-xs font-bold text-brand-500">{greeting.subtitle}</span>
        </span>
      </Link>

      <nav className="flex-1">
        <ul className="flex flex-col gap-1.5">
          {sections.map((section, i) => {
            const active =
              section.href === homeHref
                ? pathname === section.href
                : pathname.startsWith(section.href);

            return (
              <li key={section.href} className="relative">
                <Link
                  href={section.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  title={collapsed ? section.label : undefined}
                  suppressHydrationWarning
                  className={`panel-nav-item nav-grow animate-slide-in-left group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold transition-colors ${
                    active
                      ? "bg-white text-brand-700 shadow-soft ring-1 ring-brand-200"
                      : "text-brand-700/70 hover:bg-white/70 hover:text-brand-700"
                  }`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-xl transition-colors ${
                      active
                        ? "bg-brand-500 text-white"
                        : "bg-white/70 text-brand-600 group-hover:bg-brand-100"
                    }`}
                  >
                    <SchoolsIcon icon={section.icon} className="size-5" />
                  </span>
                  <span className="panel-label">{section.label}</span>

                  <span
                    role="tooltip"
                    className="panel-tooltip pointer-events-none absolute left-[calc(100%+0.5rem)] top-1/2 z-50 hidden whitespace-nowrap rounded-xl bg-brand-800 px-3 py-1.5 text-xs font-bold text-white lg:block"
                  >
                    {section.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {promo && (
        <div className="rounded-3xl bg-peach-100 p-4 text-center ring-1 ring-peach-200">
          <span aria-hidden="true" className="block text-2xl">
            {promo.emoji}
          </span>
          <div className="panel-hide-collapsed">
            <p className="mt-1 text-sm font-extrabold text-peach-700">{promo.title}</p>
            <p className="mt-1 text-xs font-semibold text-peach-700/80">{promo.text}</p>
            <Link
              href={promo.href}
              onClick={onClose}
              className="mt-3 inline-block rounded-full bg-peach-500 px-4 py-2 text-xs font-extrabold text-white transition-transform hover:-translate-y-0.5"
            >
              {promo.cta}
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
