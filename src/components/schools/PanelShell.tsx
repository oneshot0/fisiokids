"use client";

import { useCallback, useEffect, useState } from "react";
import { BurgerButton } from "./BurgerButton";
import { PanelSidebar } from "./PanelSidebar";
import { PanelTopbar } from "./PanelTopbar";

const STORAGE_KEY = "fisiokids:panel-sidebar-collapsed";

export function PanelShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const [collapsed, setCollapsed] = useState(
    () =>
      typeof document !== "undefined" &&
      document.querySelector<HTMLElement>(".panel-shell")?.dataset.collapsed === "true",
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = useCallback(() => {
    const desktop = window.matchMedia("(min-width: 64rem)").matches;

    if (desktop) {
      setCollapsed((value) => {
        window.localStorage.setItem(STORAGE_KEY, String(!value));
        return !value;
      });
      return;
    }

    setMobileOpen((value) => !value);
  }, []);

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
          __html: `if (localStorage.getItem("${STORAGE_KEY}") === "true") document.currentScript?.parentElement?.setAttribute("data-collapsed", "true");`,
        }}
      />
      <PanelSidebar collapsed={collapsed} onClose={closeMobile} />

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
              controls="panel-nav"
              label={mobileOpen || !collapsed ? "Contraer menú" : "Desplegar menú"}
            />
          }
        />
        <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
