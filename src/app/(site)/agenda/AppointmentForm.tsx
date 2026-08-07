"use client";

import { useState } from "react";
import { therapies } from "@/data/therapies";
import { site } from "@/lib/site";

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-brand-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

export function AppointmentForm() {
  const [form, setForm] = useState({
    parentName: "",
    phone: "",
    childName: "",
    childAge: "",
    therapy: therapies[0].slug,
    preferredDate: "",
    notes: "",
  });

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const therapyName =
    therapies.find((t) => t.slug === form.therapy)?.name ?? form.therapy;

  const message = [
    "¡Hola FisioKids! Quiero agendar una cita.",
    `Apoderado: ${form.parentName}`,
    `Teléfono: ${form.phone}`,
    `Peque: ${form.childName} (${form.childAge} años)`,
    `Terapia: ${therapyName}`,
    form.preferredDate ? `Fecha preferida: ${form.preferredDate}` : "",
    form.notes ? `Comentarios: ${form.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(
      `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-brand-100 bg-white p-7 shadow-sm"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-brand-800">
          Nombre del apoderado
          <input
            required
            value={form.parentName}
            onChange={update("parentName")}
            className={fieldClass}
            placeholder="Ana Pérez"
          />
        </label>

        <label className="text-sm font-semibold text-brand-800">
          Teléfono
          <input
            required
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            className={fieldClass}
            placeholder="999 999 999"
          />
        </label>

        <label className="text-sm font-semibold text-brand-800">
          Nombre del peque
          <input
            required
            value={form.childName}
            onChange={update("childName")}
            className={fieldClass}
            placeholder="Mateo"
          />
        </label>

        <label className="text-sm font-semibold text-brand-800">
          Edad
          <input
            required
            type="number"
            min={0}
            max={17}
            value={form.childAge}
            onChange={update("childAge")}
            className={fieldClass}
            placeholder="3"
          />
        </label>

        <label className="text-sm font-semibold text-brand-800">
          Terapia
          <select value={form.therapy} onChange={update("therapy")} className={fieldClass}>
            {therapies.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-semibold text-brand-800">
          Fecha preferida
          <input
            type="date"
            value={form.preferredDate}
            onChange={update("preferredDate")}
            className={fieldClass}
          />
        </label>

        <label className="text-sm font-semibold text-brand-800 sm:col-span-2">
          Cuéntanos brevemente
          <textarea
            rows={4}
            value={form.notes}
            onChange={update("notes")}
            className={fieldClass}
            placeholder="Diagnóstico, derivación médica o lo que te preocupa."
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-7 w-full rounded-full bg-brand-600 px-7 py-3.5 font-bold text-white transition-colors hover:bg-brand-700"
      >
        Enviar por WhatsApp
      </button>

      <p className="mt-3 text-center text-xs text-brand-600">
        Por ahora coordinamos por WhatsApp. La reserva en línea con calendario en
        tiempo real llega en la siguiente fase.
      </p>
    </form>
  );
}
