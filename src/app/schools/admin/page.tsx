import type { Metadata } from "next";
import { PanelHeader } from "@/components/schools/PanelHeader";
import { SchoolsIcon } from "@/components/schools/SchoolsIcon";
import { students } from "@/data/students";
import { users } from "@/data/users";
import { adminSections } from "@/data/admin";

export const metadata: Metadata = {
  title: "Administración",
};

export default function AdminPage() {
  const therapists = users.filter((user) => user.role === "terapeuta");
  const parents = users.filter((user) => user.role === "padre");
  const schools = [...new Set(students.map((student) => student.school))];
  const studentsBySchool = schools.map((school) => ({
    school,
    count: students.filter((student) => student.school === school).length,
  }));
  const stats = [
    {
      label: "Terapeutas",
      value: therapists.length,
      detail: "profesionales registrados",
      tone: "bg-brand-100 text-brand-700",
      icon: "users" as const,
    },
    {
      label: "Apoderados",
      value: parents.length,
      detail: "familias registradas",
      tone: "bg-peach-100 text-peach-700",
      icon: "home" as const,
    },
    {
      label: "Niños",
      value: students.length,
      detail: "peques acompañados",
      tone: "bg-butter-100 text-butter-600",
      icon: "children" as const,
    },
    {
      label: "Colegios",
      value: schools.length,
      detail: "centros aliados",
      tone: "bg-sky-100 text-sky-700",
      icon: "school" as const,
    },
  ];

  return (
    <>
      <PanelHeader
        title="Administración"
        subtitle={adminSections[0].description}
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <li
            key={stat.label}
            className="animate-fade-up rounded-3xl bg-white p-5 shadow-soft ring-1 ring-cream-200 transition-transform hover:-translate-y-1"
            style={{ animationDelay: `${0.06 * i}s` }}
          >
            <span className={`grid size-11 place-items-center rounded-2xl ${stat.tone}`}>
              <SchoolsIcon icon={stat.icon} className="size-6" />
            </span>
            <p className="mt-4 text-sm font-bold text-brand-900/60">{stat.label}</p>
            <p className="mt-1 text-3xl font-extrabold text-brand-900">{stat.value}</p>
            <p className="mt-1 text-xs font-bold text-brand-600">{stat.detail}</p>
          </li>
        ))}
      </ul>

      <section className="mt-6 grid gap-5 lg:grid-cols-2">
        <article className="animate-fade-up rounded-3xl bg-white p-6 shadow-soft ring-1 ring-cream-200 [animation-delay:0.15s]">
          <h2 className="text-lg font-extrabold text-brand-900">Niños por colegio</h2>
          <ul className="mt-4 space-y-3">
            {studentsBySchool.map(({ school, count }) => (
              <li
                key={school}
                className="flex items-center justify-between gap-4 rounded-2xl bg-cream-50 p-4 ring-1 ring-cream-200"
              >
                <span className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-sky-100 text-sky-700">
                    <SchoolsIcon icon="school" />
                  </span>
                  <span className="font-bold text-brand-900">{school}</span>
                </span>
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-extrabold text-brand-700">
                  {count} {count === 1 ? "niño" : "niños"}
                </span>
              </li>
            ))}
          </ul>
        </article>

        <article className="animate-fade-up rounded-3xl bg-white p-6 shadow-soft ring-1 ring-cream-200 [animation-delay:0.2s]">
          <h2 className="text-lg font-extrabold text-brand-900">Terapeutas</h2>
          <ul className="mt-4 space-y-3">
            {therapists.map((therapist) => {
              const assignedCount = students.filter(
                (student) => student.therapistId === therapist.id,
              ).length;

              return (
                <li
                  key={therapist.id}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-cream-50 p-4 ring-1 ring-cream-200"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-sm font-extrabold text-brand-700">
                      {therapist.initials}
                    </span>
                    <span className="truncate font-bold text-brand-900">{therapist.name}</span>
                  </span>
                  <span className="shrink-0 text-xs font-extrabold text-brand-600">
                    {assignedCount} {assignedCount === 1 ? "niño" : "niños"}
                  </span>
                </li>
              );
            })}
          </ul>
        </article>
      </section>

      <section className="mt-6">
        <article className="animate-fade-up rounded-3xl bg-white p-6 shadow-soft ring-1 ring-cream-200 [animation-delay:0.25s]">
          <h2 className="text-lg font-extrabold text-brand-900">Últimos apoderados</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {parents
              .slice()
              .reverse()
              .map((parent) => (
                <li
                  key={parent.id}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-cream-50 p-4 ring-1 ring-cream-200"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-peach-100 text-sm font-extrabold text-peach-700">
                      {parent.initials}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-bold text-brand-900">
                        {parent.name}
                      </span>
                      <span className="block truncate text-xs font-semibold text-brand-900/50">
                        {parent.email}
                      </span>
                    </span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-extrabold ${
                      parent.active
                        ? "bg-brand-100 text-brand-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {parent.active ? "Activa" : "Inactiva"}
                  </span>
                </li>
              ))}
          </ul>
        </article>
      </section>
    </>
  );
}
