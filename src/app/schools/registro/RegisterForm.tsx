"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field, inputClass } from "@/components/schools/Field";

const steps = ["Tu cuenta", "Tu peque", "Listo"];

export function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const next = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    router.push("/schools/panel");
  };

  return (
    <form onSubmit={next} className="space-y-6">
      <ol className="flex items-center gap-2" aria-label="Progreso del registro">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 flex-col gap-2">
            <span
              className={`h-1.5 rounded-full transition-colors duration-500 ${
                i <= step ? "bg-brand-500" : "bg-slate-200"
              }`}
            />
            <span
              className={`text-xs font-semibold transition-colors ${
                i <= step ? "text-brand-700" : "text-slate-400"
              }`}
            >
              {s}
            </span>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div key="cuenta" className="animate-fade-up space-y-5">
          <Field label="Nombre completo">
            <input required placeholder="Ana Pérez" className={inputClass} />
          </Field>
          <Field label="Correo electrónico">
            <input required type="email" placeholder="ana@correo.com" className={inputClass} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Teléfono">
              <input required type="tel" placeholder="999 999 999" className={inputClass} />
            </Field>
            <Field label="Contraseña">
              <input
                required
                type="password"
                minLength={8}
                placeholder="••••••••"
                className={inputClass}
              />
            </Field>
          </div>
        </div>
      )}

      {step === 1 && (
        <div key="peque" className="animate-fade-up space-y-5">
          <Field label="Nombre del peque">
            <input required placeholder="Mateo Pérez" className={inputClass} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Fecha de nacimiento">
              <input required type="date" className={inputClass} />
            </Field>
            <Field label="Grado o aula">
              <input required placeholder="Inicial 4 años - B" className={inputClass} />
            </Field>
          </div>
          <Field
            label="Código del colegio"
            hint="Lo encuentras en la circular que envió la institución."
          >
            <input
              required
              placeholder="FK-COLEGIO-2026"
              className={`${inputClass} uppercase tracking-wider`}
            />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div key="listo" className="animate-pop-in rounded-3xl bg-brand-50 p-8 text-center ring-1 ring-brand-100">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-brand-500 text-white">
            <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 13 4 4L19 7" />
            </svg>
          </span>
          <h2 className="mt-5 text-xl font-extrabold text-slate-900">
            ¡Todo listo!
          </h2>
          <p className="mt-2 text-slate-600">
            Tu cuenta quedó vinculada al colegio. Ya puedes ver los reportes de tu peque.
          </p>
        </div>
      )}

      <div className="flex gap-3">
        {step > 0 && step < steps.length - 1 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="rounded-full border-2 border-slate-300 px-6 py-3.5 font-bold text-slate-700 transition-colors hover:border-slate-400"
          >
            Atrás
          </button>
        )}
        <button
          type="submit"
          className="flex-1 rounded-full bg-brand-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700"
        >
          {step === steps.length - 1 ? "Entrar al panel" : "Continuar"}
        </button>
      </div>

      <p className="text-center text-xs text-slate-500">
        Demo sin backend: los datos no se guardan todavía. El registro real llega en la
        Fase 4.
      </p>
    </form>
  );
}
