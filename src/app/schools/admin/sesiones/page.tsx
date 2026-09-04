import type { Metadata } from "next";
import Link from "next/link";
import { PanelHeader } from "@/components/schools/PanelHeader";
import { inputClass } from "@/components/schools/Field";
import { DataSourceBadge, DataSourceNotice } from "@/components/schools/admin/DataSourceNotice";
import { first, type SearchParams } from "@/lib/admin/query";
import { adminSections } from "@/data/admin";
import { sessionStatusLabels, today, type SessionStatus } from "@/data/sessions";
import { students } from "@/data/students";
import { users } from "@/data/users";
import {
  createSessionsRepository,
  getSessionsDataSource,
  type SessionFilters,
} from "@/lib/sessions";

const section = adminSections.find((item) => item.href.endsWith("/sesiones"))!;

export const metadata: Metadata = {
  title: "Sesiones",
};

const STATUSES: SessionStatus[] = ["realizada", "en_curso", "programada", "cancelada"];
const ALL_DATES = "todas";

const statusStyles: Record<SessionStatus, string> = {
  realizada: "bg-brand-100 text-brand-800",
  en_curso: "bg-sky-100 text-sky-700",
  programada: "bg-butter-100 text-butter-600",
  cancelada: "bg-blush-100 text-blush-600",
};

const cancelledByLabels = {
  padre: "Apoderado",
  terapeuta: "Terapeuta",
  colegio: "Colegio",
};

const monthNames = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];
const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

function formatDate(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  const label = `${dayNames[d.getUTCDay()]} ${d.getUTCDate()} de ${monthNames[d.getUTCMonth()]}`;
  return date === today ? `Hoy · ${label}` : label;
}



const therapists = users.filter((user) => user.role === "terapeuta");

function parseFilters(params: SearchParams): SessionFilters {
  const fecha = first(params.fecha);
  const estado = first(params.estado);
  const terapeuta = first(params.terapeuta);
  return {
    date: fecha === ALL_DATES ? undefined : fecha || today,
    status: STATUSES.includes(estado as SessionStatus) ? (estado as SessionStatus) : undefined,
    therapistId: therapists.some((t) => t.id === terapeuta) ? terapeuta : undefined,
    query: first(params.q)?.trim() || undefined,
  };
}

function toParams(filters: SessionFilters): URLSearchParams {
  const params = new URLSearchParams();
  params.set("fecha", filters.date ?? ALL_DATES);
  if (filters.status) params.set("estado", filters.status);
  if (filters.therapistId) params.set("terapeuta", filters.therapistId);
  if (filters.query) params.set("q", filters.query);
  return params;
}

function buildHref(filters: SessionFilters, patch: Partial<SessionFilters>): string {
  return `${section.href}?${toParams({ ...filters, ...patch })}`;
}

export default async function AdminSessionsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const filters = parseFilters(await searchParams);
  const repository = createSessionsRepository();
  const [sessions, summary, dates] = await Promise.all([
    repository.list(filters),
    repository.summary({ ...filters, status: undefined }),
    repository.availableDates(),
  ]);
  const source = getSessionsDataSource();

  const chipBase =
    "rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors ring-1 ring-inset";
  const chipOn = "bg-brand-600 text-white ring-brand-600";
  const chipOff = "bg-white text-brand-900/70 ring-cream-200 hover:bg-cream-50";

  const stats: { label: string; value: number; status?: SessionStatus }[] = [
    { label: "Total", value: summary.total },
    ...STATUSES.map((status) => ({
      label: sessionStatusLabels[status],
      value: summary.byStatus[status],
      status,
    })),
  ];

  return (
    <>
      <PanelHeader
        title={section.label}
        subtitle={section.description}
        action={<DataSourceBadge source={source} />}
      />

      <DataSourceNotice source={source} />

      <section className="animate-fade-up mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={buildHref(filters, { status: stat.status })}
            aria-current={filters.status === stat.status ? "true" : undefined}
            className={`lift-glow rounded-3xl bg-white p-5 shadow-soft ring-1 ${
              filters.status === stat.status ? "ring-2 ring-brand-500" : "ring-cream-200"
            }`}
          >
            <p className="text-xs font-bold uppercase tracking-wide text-brand-900/50">
              {stat.label}
            </p>
            <p className="mt-1 text-3xl font-extrabold text-brand-900">{stat.value}</p>
          </Link>
        ))}
      </section>

      <section className="animate-fade-up rounded-3xl bg-white p-6 shadow-soft ring-1 ring-cream-200">
        <div className="flex flex-wrap gap-2">
          <Link
            href={buildHref(filters, { status: undefined })}
            className={`${chipBase} ${filters.status ? chipOff : chipOn}`}
          >
            Todas
          </Link>
          {STATUSES.map((status) => (
            <Link
              key={status}
              href={buildHref(filters, { status })}
              className={`${chipBase} ${filters.status === status ? chipOn : chipOff}`}
            >
              {sessionStatusLabels[status]}
            </Link>
          ))}
        </div>

        <form method="get" action={section.href} className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_2fr_auto] md:items-end">
          {filters.status && <input type="hidden" name="estado" value={filters.status} />}
          <label className="block text-sm font-semibold text-slate-700">
            Fecha
            <select name="fecha" defaultValue={filters.date ?? ALL_DATES} className={inputClass}>
              <option value={ALL_DATES}>Todas las fechas</option>
              {dates
                .slice()
                .reverse()
                .map((date) => (
                  <option key={date} value={date}>
                    {formatDate(date)}
                  </option>
                ))}
            </select>
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            Terapeuta
            <select name="terapeuta" defaultValue={filters.therapistId ?? ""} className={inputClass}>
              <option value="">Todos</option>
              {therapists.map((therapist) => (
                <option key={therapist.id} value={therapist.id}>
                  {therapist.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            Buscar
            <input
              type="search"
              name="q"
              defaultValue={filters.query ?? ""}
              placeholder="Niño, terapeuta o área"
              className={inputClass}
            />
          </label>
          <button
            type="submit"
            className="rounded-xl bg-brand-600 px-5 py-2.5 font-bold text-white transition-colors hover:bg-brand-700"
          >
            Filtrar
          </button>
        </form>

        <p className="mt-5 text-sm font-semibold text-brand-900/60">
          {filters.date ? formatDate(filters.date) : "Todas las fechas"} ·{" "}
          {sessions.length === 1 ? "1 sesión" : `${sessions.length} sesiones`}
        </p>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs font-bold uppercase tracking-wide text-brand-900/50">
                {!filters.date && <th className="px-3 py-2">Fecha</th>}
                <th className="px-3 py-2">Hora</th>
                <th className="px-3 py-2">Niño</th>
                <th className="px-3 py-2">Terapeuta</th>
                <th className="px-3 py-2">Área</th>
                <th className="px-3 py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {sessions.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-10 text-center font-semibold text-brand-900/60">
                    No hay sesiones que coincidan con los filtros.
                  </td>
                </tr>
              )}
              {sessions.map((session, index) => {
                const student = students.find((item) => item.id === session.studentId);
                const therapist = users.find((item) => item.id === session.therapistId);

                return (
                  <tr
                    key={session.id}
                    className="animate-fade-up border-t border-cream-200"
                    style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
                  >
                    {!filters.date && (
                      <td className="px-3 py-3 whitespace-nowrap font-semibold text-slate-600">
                        {session.date.slice(8, 10)}/{session.date.slice(5, 7)}
                      </td>
                    )}
                    <td className="px-3 py-3 font-extrabold text-brand-700">{session.time}</td>
                    <td className="px-3 py-3">
                      <p className="font-bold text-brand-900">
                        {student ? `${student.firstName} ${student.lastName}` : "Niño sin registro"}
                      </p>
                      {student && <p className="text-xs text-slate-500">{student.school}</p>}
                    </td>
                    <td className="px-3 py-3 text-slate-600">
                      {therapist?.name ?? "Terapeuta sin registro"}
                    </td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-cream-100 px-2.5 py-1 text-xs font-bold text-brand-700 ring-1 ring-cream-200">
                        {session.area}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusStyles[session.status]}`}
                      >
                        {sessionStatusLabels[session.status]}
                      </span>
                      {session.status === "cancelada" && session.cancelReason && (
                        <p className="mt-1.5 max-w-xs text-xs text-slate-500">
                          {session.cancelledBy && (
                            <span className="font-bold">
                              {cancelledByLabels[session.cancelledBy]}:{" "}
                            </span>
                          )}
                          {session.cancelReason}
                        </p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
