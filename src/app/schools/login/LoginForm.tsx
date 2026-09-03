"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field, inputClass } from "@/components/schools/Field";
import { findUserByEmail, roleHome } from "@/data/users";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const user = findUserByEmail(email);
    if (!user) {
      setError("No encontramos una cuenta con ese correo.");
      return;
    }

    if (!user.active) {
      setError("Tu cuenta está desactivada, contacta al colegio.");
      return;
    }

    setLoading(true);
    router.push(roleHome[user.role]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Correo electrónico">
        <input
          required
          type="email"
          autoComplete="email"
          placeholder="ana@correo.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Contraseña">
        <input
          required
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={inputClass}
        />
      </Field>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 font-normal text-slate-600">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
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
        className="lift-glow w-full rounded-full bg-brand-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700 disabled:translate-y-0 disabled:opacity-70"
      >
        {loading ? "Ingresando…" : "Ingresar"}
      </button>

      {error && (
        <p role="alert" className="rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700 ring-1 ring-brand-200">
          {error}
        </p>
      )}

      <div className="rounded-xl bg-brand-50 px-4 py-3 text-xs text-brand-700 ring-1 ring-brand-100">
        <p className="font-bold">Correos de demo</p>
        <p className="mt-1">Administrador: admin@fisiokids.pe</p>
        <p>Terapeuta: terapeuta@fisiokids.pe</p>
        <p>Apoderado: ana@correo.com</p>
      </div>
    </form>
  );
}
