import type { Metadata } from "next";
import Link from "next/link";
import { PanelHeader } from "@/components/schools/PanelHeader";
import { SchoolsIcon } from "@/components/schools/SchoolsIcon";
import { SessionsChart } from "@/components/schools/SessionsChart";
import { TodaySessions } from "@/components/schools/TodaySessions";
import { enrollments } from "@/data/enrollments";
import { incidentKindLabels, incidents, priorityLabels } from "@/data/incidents";
import { sessions, sessionsByDay, today } from "@/data/sessions";
import { students } from "@/data/students";

export const metadata: Metadata = {
  title: "Control del día",
};

const priorityOrder = { alta: 0, media: 1, baja: 2 };
const sourceLabels = {
  padre: "Apoderado",
  terapeuta: "Terapeuta",
  colegio: "Colegio",
};

function formatToday(date: string): string {
  const dayNames = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const dateObject = new Date(`${date}T00:00:00Z`);
  return `${dayNames[dateObject.getUTCDay()]} ${dateObject.getUTCDate()} de septiembre`;
}

export default function AdminPage() {
  const todaySessions = sessions.filter((session) => session.date === today);
  const completedToday = todaySessions.filter(
    (session) => session.status === "realizada",
  ).length;
  const cancelledToday = todaySessions.filter(
    (session) => session.status === "cancelada",
  ).length;
  const newEnrollments = enrollments.filter((enrollment) =>
    enrollment.date.startsWith(today.slice(0, 7)),
  ).length;
  const openIncidents = incidents.filter(
    (incident) => incident.kind === "incidente" && incident.status !== "resuelta",
  );
  const unansweredComplaints = incidents.filter(
    (incident) => incident.kind === "queja" && incident.status === "nueva",
  );
  const pendingIncidents = incidents
    .filter((incident) => incident.status !== "resuelta")
    .sort((first, second) => priorityOrder[first.priority] - priorityOrder[second.priority]);
  const recommendations = incidents.filter(
    (incident) => incident.kind === "recomendacion",
  );
  const recentEnrollments = enrollments
    .slice()
    .sort((first, second) => second.date.localeCompare(first.date))
    .slice(0, 3);

  const stats = [
    {
      label: "Niños matriculados",
      value: students.length,
      detail: `${newEnrollments} nuevos este mes`,
      tone: "bg-brand-100 text-brand-700",
      icon: "calendar" as const,
    },
    {
      label: "Terapias de hoy",
      value: `${completedToday} / ${todaySessions.length}`,
      detail: "realizadas / total",
      tone: "bg-peach-100 text-peach-700",
      icon: "check" as const,
    },
    {
      label: "Canceladas hoy",
      value: cancelledToday,
      detail: "requieren seguimiento",
      tone: "bg-blush-100 text-blush-600",
      icon: "alert" as const,
    },
    {
      label: "Incidentes abiertos",
      value: openIncidents.length,
      detail: "sin resolver",
      tone: "bg-butter-100 text-butter-600",
      icon: "alert" as const,
    },
    {
      label: "Quejas sin responder",
      value: unansweredComplaints.length,
      detail: "nuevas por revisar",
      tone: "bg-sky-100 text-sky-700",
      icon: "chat" as const,
    },
  ];

  return (
    <>
      <PanelHeader title="Control del día" subtitle={formatToday(today)} />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat, index) => (
          <li
            key={stat.label}
            className="lift-glow animate-fade-up rounded-3xl bg-white p-5 shadow-soft ring-1 ring-cream-200"
            style={{ animationDelay: `${0.06 * index}s` }}
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

      <section className="mt-6 grid min-w-0 gap-5 lg:grid-cols-2">
        <article className="animate-fade-up min-w-0 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-cream-200 [animation-delay:0.35s]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-extrabold text-brand-900">Actividad de sesiones</h2>
              <p className="mt-1 text-sm font-semibold text-brand-900/55">
                Realizadas y canceladas en los últimos 14 días
              </p>
            </div>
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
              <SchoolsIcon icon="calendar" />
            </span>
          </div>
          <SessionsChart data={sessionsByDay()} />
        </article>

        <article className="animate-fade-up min-w-0 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-cream-200 [animation-delay:0.4s]">
          <TodaySessions sessions={todaySessions} />
        </article>
      </section>

      <section className="mt-6">
        <article className="animate-fade-up rounded-3xl bg-white p-6 shadow-soft ring-1 ring-cream-200 [animation-delay:0.45s]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-extrabold text-brand-900">Atención pendiente</h2>
              <p className="mt-1 text-sm font-semibold text-brand-900/55">
                Incidentes y solicitudes que necesitan seguimiento
              </p>
            </div>
            <Link
              href="/schools/admin/incidentes"
              className="lift-glow inline-block shrink-0 rounded-lg px-1 text-sm font-extrabold text-brand-600 hover:text-brand-800"
            >
              Ver todo
            </Link>
          </div>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {pendingIncidents.map((incident) => (
              <li
                key={incident.id}
                className="rounded-2xl bg-cream-50 p-4 ring-1 ring-cream-200"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-peach-100 px-2.5 py-1 text-xs font-extrabold text-peach-700">
                    {incidentKindLabels[incident.kind]}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-brand-900/55">
                    <span
                      className={`size-2 rounded-full ${
                        incident.priority === "alta"
                          ? "bg-blush-600"
                          : incident.priority === "media"
                            ? "bg-butter-600"
                            : "bg-brand-400"
                      }`}
                    />
                    {priorityLabels[incident.priority]}
                  </span>
                </div>
                <h3 className="mt-3 font-extrabold text-brand-900">{incident.title}</h3>
                <div className="mt-2 flex items-center justify-between gap-3 text-xs font-semibold text-brand-900/55">
                  <span>
                    {sourceLabels[incident.source]} · {incident.authorName}
                  </span>
                  <Link
                    href="/schools/admin/incidentes"
                    className="lift-glow inline-block rounded-lg px-1 font-extrabold text-brand-600 hover:text-brand-800"
                  >
                    Ver
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-2">
        <article className="animate-fade-up rounded-3xl bg-white p-6 shadow-soft ring-1 ring-cream-200 [animation-delay:0.5s]">
          <h2 className="text-lg font-extrabold text-brand-900">Recomendaciones</h2>
          <ul className="mt-4 space-y-3">
            {recommendations.map((recommendation) => (
              <li
                key={recommendation.id}
                className="rounded-2xl bg-cream-50 p-4 ring-1 ring-cream-200"
              >
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-butter-100 text-butter-600">
                    <SchoolsIcon icon="check" className="size-5" />
                  </span>
                  <span>
                    <span className="block font-extrabold text-brand-900">
                      {recommendation.title}
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-brand-900/55">
                      {recommendation.detail}
                    </span>
                    <span className="mt-2 block text-xs font-bold text-brand-600">
                      {recommendation.authorName}
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <article className="animate-fade-up rounded-3xl bg-white p-6 shadow-soft ring-1 ring-cream-200 [animation-delay:0.55s]">
          <h2 className="text-lg font-extrabold text-brand-900">Matrículas recientes</h2>
          <ul className="mt-4 space-y-3">
            {recentEnrollments.map((enrollment) => {
              const student = students.find((item) => item.id === enrollment.studentId);

              return (
                <li
                  key={enrollment.studentId}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-cream-50 p-4 ring-1 ring-cream-200"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-sky-100 text-sky-700">
                      <SchoolsIcon icon="school" className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-extrabold text-brand-900">
                        {student
                          ? `${student.firstName} ${student.lastName}`
                          : "Niño sin registro"}
                      </span>
                      <span className="block truncate text-xs font-semibold text-brand-900/55">
                        {enrollment.school}
                      </span>
                    </span>
                  </span>
                  <time
                    dateTime={enrollment.date}
                    className="shrink-0 text-xs font-bold text-brand-600"
                  >
                    {enrollment.date.slice(8, 10)}/{enrollment.date.slice(5, 7)}
                  </time>
                </li>
              );
            })}
          </ul>
        </article>
      </section>
    </>
  );
}
