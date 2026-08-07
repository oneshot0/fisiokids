"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field, inputClass } from "@/components/schools/Field";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    router.push("/schools/panel");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Correo electrónico">
        <input
          required
          type="email"
          autoComplete="email"
          placeholder="ana@correo.com"
          className={inputClass}
        />
      </Field>

      <Field label="Contraseña">
        <input
          required
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          className={inputClass}
        />
      </Field>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 font-normal text-slate-600">
          <input
            type="checkbox"
            className="size-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          Recordarme
        </label>
        <button type="button" className="font-semibold text-brand-600 hover:underline">
          Olvidé mi contraseña
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-brand-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700 disabled:translate-y-0 disabled:opacity-70"
      >
        {loading ? "Ingresando…" : "Ingresar"}
      </button>

      <p className="text-center text-xs text-slate-500">
        Demo sin backend: cualquier dato te lleva al panel. La autenticación real llega
        en la Fase 4.
      </p>
    </form>
  );
}
