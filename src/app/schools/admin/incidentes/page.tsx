import type { Metadata } from "next";
import Link from "next/link";
import { PanelHeader } from "@/components/schools/PanelHeader";
import { inputClass } from "@/components/schools/Field";
import { SchoolsIcon } from "@/components/schools/SchoolsIcon";
import { DataSourceBadge, DataSourceNotice } from "@/components/schools/admin/DataSourceNotice";
import { formatShortDate } from "@/lib/admin/format";
import { first, type SearchParams } from "@/lib/admin/query";
import { adminSections } from "@/data/admin";
import {
  incidentKindLabels,
  incidentKindPluralLabels,
  incidentStatusLabels,
  priorityLabels,
  type Incident,
  type IncidentKind,
  type IncidentStatus,
} from "@/data/incidents";
import { students } from "@/data/students";
import {
  createIncidentsRepository,
  getIncidentsDataSource,
  type IncidentFilters,
} from "@/lib/incidents";

const section = adminSections.find((item) => item.href.endsWith("/incidentes"))!;

export const metadata: Metadata = {
  title: "Incidentes y quejas",
};

const KINDS: IncidentKind[] = ["incidente", "queja", "recomendacion"];
const STATUSES: IncidentStatus[] = ["nueva", "en_revision", "resuelta"];
const PRIORITIES: Incident["priority"][] = ["alta", "media", "baja"];
const SOURCES: Incident["source"][] = ["padre", "terapeuta", "colegio"];

const sourceLabels: Record<Incident["source"], string> = {
  padre: "Apoderado",
  terapeuta: "Terapeuta",
  colegio: "Colegio",
};

const kindStyles: Record<IncidentKind, string> = {
  incidente: "bg-peach-100 text-peach-700",
  queja: "bg-sky-100 text-sky-700",
  recomendacion: "bg-butter-100 text-butter-600",
};

const statusStyles: Record<IncidentStatus, string> = {
  nueva: "bg-blush-100 text-blush-600",
  en_revision: "bg-butter-100 text-butter-600",
  resuelta: "bg-brand-100 text-brand-800",
};

const priorityDot: Record<Incident["priority"], string> = {
  alta: "bg-blush-600",
  media: "bg-butter-600",
  baja: "bg-brand-400",
};



function pick<T extends string>(options: readonly T[], value: string | undefined): T | undefined {
  return options.includes(value as T) ? (value as T) : undefined;
}

function parseFilters(params: SearchParams): IncidentFilters {
  return {
    kind: pick(KINDS, first(params.tipo)),
    status: pick(STATUSES, first(params.estado)),
    priority: pick(PRIORITIES, first(params.prioridad)),
    source: pick(SOURCES, first(params.origen)),
    query: first(params.q)?.trim() || undefined,
  };
}

function buildHref(filters: IncidentFilters, patch: Partial<IncidentFilters>): string {
  const next = { ...filters, ...patch };
  const params = new URLSearchParams();
  if (next.kind) params.set("tipo", next.kind);
  if (next.status) params.set("estado", next.status);
  if (next.priority) params.set("prioridad", next.priority);
  if (next.source) params.set("origen", next.source);
  if (next.query) params.set("q", next.query);
  const qs = params.toString();
  return qs ? `${section.href}?${qs}` : section.href;
}


export default async function AdminIncidentsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const filters = parseFilters(await searchParams);
  const repository = createIncidentsRepository();
  const [incidents, summary] = await Promise.all([
    repository.list(filters),
    repository.summary({ ...filters, kind: undefined, status: undefined }),
  ]);
  const source = getIncidentsDataSource();

  const chipBase =
    "rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors ring-1 ring-inset";
  const chipOn = "bg-brand-600 text-white ring-brand-600";
  const chipOff = "bg-white text-brand-900/70 ring-cream-200 hover:bg-cream-50";

  const stats = [
    {
      label: "Nuevas",
      value: summary.byStatus.nueva,
      detail: "sin revisar",
      tone: "bg-blush-100 text-blush-600",
      icon: "alert" as const,
      href: buildHref(filters, { status: "nueva" }),
    },
    {
      label: "En revisión",
      value: summary.byStatus.en_revision,
      detail: "en seguimiento",
      tone: "bg-butter-100 text-butter-600",
      icon: "chat" as const,
      href: buildHref(filters, { status: "en_revision" }),
    },
    {
      label: "Resueltas",
      value: summary.byStatus.resuelta,
      detail: "cerradas",
      tone: "bg-brand-100 text-brand-700",
      icon: "check" as const,
      href: buildHref(filters, { status: "resuelta" }),
    },
    {
      label: "Prioridad alta",
      value: summary.highPriorityOpen,
      detail: "abiertas, atender primero",
      tone: "bg-peach-100 text-peach-700",
      icon: "alert" as const,
      href: buildHref(filters, { priority: "alta", status: undefined }),
    },
  ];

  return (
    <>
      <PanelHeader
        title={section.label}
        subtitle={section.description}
        action={<DataSourceBadge source={source} />}
      />

      <DataSourceNotice source={source} />

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <li key={stat.label} className="animate-fade-up" style={{ animationDelay: `${0.06 * index}s` }}>
            <Link
              href={stat.href}
              className="lift-glow block rounded-3xl bg-white p-5 shadow-soft ring-1 ring-cream-200"
            >
              <span className={`grid size-11 place-items-center rounded-2xl ${stat.tone}`}>
                <SchoolsIcon icon={stat.icon} className="size-6" />
              </span>
              <p className="mt-4 text-sm font-bold text-brand-900/60">{stat.label}</p>
              <p className="mt-1 text-3xl font-extrabold text-brand-900">{stat.value}</p>
              <p className="mt-1 text-xs font-bold text-brand-600">{stat.detail}</p>
            </Link>
          </li>
        ))}
      </ul>

      <section className="animate-fade-up mt-6 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-cream-200 [animation-delay:0.3s]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <Link
              href={buildHref(filters, { kind: undefined })}
              className={`${chipBase} ${filters.kind ? chipOff : chipOn}`}
            >
              Todo ({summary.total})
            </Link>
            {KINDS.map((kind) => (
              <Link
                key={kind}
                href={buildHref(filters, { kind })}
                className={`${chipBase} ${filters.kind === kind ? chipOn : chipOff}`}
              >
                {incidentKindPluralLabels[kind]} ({summary.byKind[kind]})
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={buildHref(filters, { status: undefined })}
              className={`${chipBase} ${filters.status ? chipOff : chipOn}`}
            >
              Todos
            </Link>
            {STATUSES.map((status) => (
              <Link
                key={status}
                href={buildHref(filters, { status })}
                className={`${chipBase} ${filters.status === status ? chipOn : chipOff}`}
              >
                {incidentStatusLabels[status]}
              </Link>
            ))}
          </div>
        </div>

        <form
          method="get"
          action={section.href}
          className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_2fr_auto] md:items-end"
        >
          {filters.kind && <input type="hidden" name="tipo" value={filters.kind} />}
          {filters.status && <input type="hidden" name="estado" value={filters.status} />}
          <label className="block text-sm font-semibold text-slate-700">
            Prioridad
            <select name="prioridad" defaultValue={filters.priority ?? ""} className={inputClass}>
              <option value="">Todas</option>
              {PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {priorityLabels[priority]}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            Origen
            <select name="origen" defaultValue={filters.source ?? ""} className={inputClass}>
              <option value="">Todos</option>
              {SOURCES.map((item) => (
                <option key={item} value={item}>
                  {sourceLabels[item]}
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
              placeholder="Título, autor o niño"
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
          {incidents.length === 1 ? "1 registro" : `${incidents.length} registros`} · pendientes
          primero, ordenados por prioridad
        </p>

        {incidents.length === 0 ? (
          <p className="mt-3 rounded-2xl bg-cream-50 p-8 text-center font-semibold text-brand-900/60 ring-1 ring-cream-200">
            No hay registros que coincidan con los filtros.
          </p>
        ) : (
          <ul className="mt-3 grid gap-3 md:grid-cols-2">
            {incidents.map((incident, index) => {
              const student = students.find((item) => item.id === incident.studentId);

              return (
                <li
                  key={incident.id}
                  className="animate-fade-up rounded-2xl bg-cream-50 p-4 ring-1 ring-cream-200"
                  style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-extrabold ${kindStyles[incident.kind]}`}
                      >
                        {incidentKindLabels[incident.kind]}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-extrabold ${statusStyles[incident.status]}`}
                      >
                        {incidentStatusLabels[incident.status]}
                      </span>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-brand-900/55">
                      <span className={`size-2 rounded-full ${priorityDot[incident.priority]}`} />
                      Prioridad {priorityLabels[incident.priority].toLowerCase()}
                    </span>
                  </div>
                  <h3 className="mt-3 font-extrabold text-brand-900">{incident.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-brand-900/60">{incident.detail}</p>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-brand-900/55">
                    <span>
                      {sourceLabels[incident.source]} · {incident.authorName}
                      {student && (
                        <>
                          {" · "}
                          <span className="font-extrabold text-brand-700">
                            {student.firstName} {student.lastName}
                          </span>
                        </>
                      )}
                    </span>
                    <time dateTime={incident.date}>{formatShortDate(incident.date)}</time>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}
