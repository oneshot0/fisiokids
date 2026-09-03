"use client";

import { useState } from "react";
import { students } from "@/data/students";
import {
  sessionStatusLabels,
  type Session,
  type SessionStatus,
} from "@/data/sessions";
import { users } from "@/data/users";

const statusTones: Record<SessionStatus, string> = {
  realizada: "bg-brand-100 text-brand-700",
  en_curso: "bg-butter-100 text-butter-600",
  programada: "bg-sky-100 text-sky-700",
  cancelada: "bg-blush-100 text-blush-600",
};

const filters: Array<{ value: SessionStatus | "todas"; label: string }> = [
  { value: "todas", label: "Todas" },
  { value: "realizada", label: "Realizadas" },
  { value: "en_curso", label: "En curso" },
  { value: "programada", label: "Programadas" },
  { value: "cancelada", label: "Canceladas" },
];

export function TodaySessions({ sessions }: { sessions: Session[] }) {
  const [filter, setFilter] = useState<SessionStatus | "todas">("todas");
  const visibleSessions = sessions
    .filter((session) => filter === "todas" || session.status === filter)
    .slice()
    .sort((first, second) => first.time.localeCompare(second.time));

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-extrabold text-brand-900">Sesiones de hoy</h2>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrar sesiones">
          {filters.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={filter === option.value}
              onClick={() => setFilter(option.value)}
              className={`rounded-full px-3 py-1.5 text-xs font-extrabold transition-colors ${
                filter === option.value
                  ? "bg-brand-500 text-white"
                  : "bg-cream-100 text-brand-700 hover:bg-brand-100"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-4 space-y-2.5">
        {visibleSessions.map((session) => {
          const student = students.find((item) => item.id === session.studentId);
          const therapist = users.find((item) => item.id === session.therapistId);

          return (
            <li
              key={session.id}
              className="rounded-2xl bg-cream-50 p-3.5 ring-1 ring-cream-200"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <time className="w-12 shrink-0 text-sm font-extrabold text-brand-700">
                  {session.time}
                </time>
                <span className="min-w-32 flex-1 font-extrabold text-brand-900">
                  {student ? `${student.firstName} ${student.lastName}` : "Niño sin registro"}
                </span>
                <span className="text-sm font-semibold text-brand-900/60">
                  {therapist?.name ?? "Terapeuta sin registro"}
                </span>
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-brand-700 ring-1 ring-cream-200">
                  {session.area}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-extrabold ${statusTones[session.status]}`}
                >
                  {sessionStatusLabels[session.status]}
                </span>
              </div>
              {session.status === "cancelada" && session.cancelReason && (
                <p className="mt-2 pl-16 text-xs font-semibold text-brand-900/55">
                  {session.cancelReason}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      {visibleSessions.length === 0 && (
        <p className="mt-4 rounded-2xl bg-cream-50 p-6 text-center text-sm font-semibold text-brand-900/55 ring-1 ring-cream-200">
          No hay sesiones con este filtro.
        </p>
      )}
    </section>
  );
}
