"use client";

import { useCallback, useEffect, useState } from "react";
import { BurgerButton } from "./BurgerButton";
import { PanelSidebar } from "./PanelSidebar";
import { PanelTopbar } from "./PanelTopbar";
import type { PanelSection } from "@/data/schools";

export type PanelConfig = {
  navId: string;
  sections: PanelSection[];
  homeHref: string;
  greeting: {
    title: string;
    subtitle: string;
    href: string;
  };
  user: {
    name: string;
    initials: string;
    roleLabel: string;
  };
  searchPlaceholder: string;
  promo?: {
    emoji: string;
    title: string;
    text: string;
    cta: string;
    href: string;
  };
};

export function PanelShell({
  config,
  children,
}: Readonly<{ config: PanelConfig; children: React.ReactNode }>) {
  const storageKey = `fisiokids:${config.navId}-collapsed`;
  const [collapsed, setCollapsed] = useState(
    () =>
      typeof document !== "undefined" &&
      document.querySelector<HTMLElement>(".panel-shell")?.dataset.collapsed === "true",
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setCollapsed(
      document.querySelector<HTMLElement>(".panel-shell")?.dataset.collapsed === "true",
    );
  }, []);

  const toggle = useCallback(() => {
    const desktop = window.matchMedia("(min-width: 64rem)").matches;

    if (desktop) {
      setCollapsed((value) => {
        window.localStorage.setItem(storageKey, String(!value));
        return !value;
      });
      return;
    }

    setMobileOpen((value) => !value);
  }, [storageKey]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobile();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, closeMobile]);

  return (
    <div
      className="panel-shell min-h-screen bg-cream-100"
      data-collapsed={collapsed}
      data-mobile-open={mobileOpen}
    >
      <script
        dangerouslySetInnerHTML={{
          __html: `try { if (localStorage.getItem("${storageKey}") === "true") document.currentScript?.parentElement?.setAttribute("data-collapsed", "true"); } catch {}`,
        }}
      />
      <PanelSidebar
        collapsed={collapsed}
        onClose={closeMobile}
        navId={config.navId}
        sections={config.sections}
        homeHref={config.homeHref}
        greeting={config.greeting}
        promo={config.promo}
      />

      {mobileOpen && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={closeMobile}
          className="animate-fade-in fixed inset-0 z-30 bg-brand-900/30 backdrop-blur-sm lg:hidden"
        />
      )}

      <div className="panel-main">
        <PanelTopbar
          burger={
            <BurgerButton
              expanded={mobileOpen || !collapsed}
              showClose={mobileOpen}
              onClick={toggle}
              controls={config.navId}
              label={mobileOpen || !collapsed ? "Contraer menú" : "Desplegar menú"}
            />
          }
          user={config.user}
          searchPlaceholder={config.searchPlaceholder}
        />
        <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
