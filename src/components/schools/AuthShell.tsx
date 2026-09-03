"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Turtle } from "../Turtle";

const AUTH_INTRO_KEY = "fisiokids:auth-intro";

const highlights = [
  "Reportes diarios del colegio",
  "Avances por objetivo terapéutico",
  "Blog, tips y juegos para casa",
  "Pagos y comprobantes al día",
];

type IntroPhase = "pending" | "loading" | "assemble" | "ready";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export function AuthShell(props: AuthShellProps) {
  return <AuthIntro {...props} />;
}

export function AuthIntro({
  title,
  subtitle,
  children,
  footer,
}: AuthShellProps) {
  const [phase, setPhase] = useState<IntroPhase>("pending");

  useEffect(() => {
    let readyTimer: number | undefined;

    const assemble = () => {
      setPhase("assemble");
      readyTimer = window.setTimeout(() => setPhase("ready"), 1700);
    };

    let hasIntro = false;
    try {
      hasIntro = window.sessionStorage.getItem(AUTH_INTRO_KEY) === "1";
      if (hasIntro) {
        window.sessionStorage.removeItem(AUTH_INTRO_KEY);
      }
    } catch {
      // Session storage may be unavailable in private browsing.
    }

    if (hasIntro) {
      setPhase("loading");
      const loaderTimer = window.setTimeout(assemble, 900);
      return () => {
        window.clearTimeout(loaderTimer);
        if (readyTimer) window.clearTimeout(readyTimer);
      };
    }

    assemble();
    return () => {
      if (readyTimer) window.clearTimeout(readyTimer);
    };
  }, []);

  const assembling = phase === "assemble";
  const enteringClass = assembling ? "animate-fade-up" : "";
  const rootClass = `auth-intro-root relative grid min-h-screen overflow-hidden lg:grid-cols-2 ${
    phase === "pending" ? "invisible" : ""
  }`;

  return (
    <div className={rootClass} data-phase={phase}>
      {phase === "loading" && (
        <div
          className="visible fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 text-center"
          role="status"
          aria-live="polite"
        >
          <Turtle className="animate-float w-44" />
          <p className="mt-8 text-2xl font-extrabold text-white">
            Preparando tu espacio…
          </p>
          <span className="mt-5 flex items-center gap-2" aria-label="Cargando">
            {[0, 1, 2].map((delay) => (
              <span
                key={delay}
                className="size-2.5 animate-dot-bounce rounded-full bg-brand-400"
                style={{ animationDelay: `${delay * 0.14}s` }}
              />
            ))}
          </span>
        </div>
      )}

      <div
        className={`relative hidden overflow-hidden bg-slate-900 p-12 lg:flex lg:flex-col lg:justify-between ${
          assembling ? "animate-panel-in-left" : ""
        }`}
      >
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
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
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

      <div
        className={`flex items-center justify-center px-4 py-14 ${
          assembling ? "animate-panel-in-right" : ""
        }`}
      >
        <div className="w-full max-w-md">
          <div
            className={`${enteringClass} mb-8`}
            style={{ animationDelay: "0.35s" }}
          >
            <Link
              href="/schools"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-800"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M19 12H6m5 6-6-6 6-6" />
              </svg>
              Volver
            </Link>
          </div>

          <h1
            className={`${enteringClass} text-3xl font-extrabold tracking-tight text-slate-900`}
            style={{ animationDelay: "0.45s" }}
          >
            {title}
          </h1>
          <p
            className={`${enteringClass} mt-2 text-slate-600`}
            style={{ animationDelay: "0.55s" }}
          >
            {subtitle}
          </p>

          <div
            className={`${enteringClass} mt-8`}
            style={{ animationDelay: "0.65s" }}
          >
            {children}
          </div>

          <div
            className={`${enteringClass} mt-6 text-center text-sm text-slate-600`}
            style={{ animationDelay: "0.8s" }}
          >
            {footer}
          </div>
        </div>
      </div>

      {assembling && (
        <span
          aria-hidden="true"
          className="animate-seam-flash pointer-events-none absolute inset-y-0 left-1/2 z-20 hidden w-0.5 bg-brand-400 lg:block"
        />
      )}
    </div>
  );
}
