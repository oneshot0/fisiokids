import type { Metadata } from "next";
import Link from "next/link";
import { PanelHeader } from "@/components/schools/PanelHeader";
import { inputClass } from "@/components/schools/Field";
import { SchoolsIcon } from "@/components/schools/SchoolsIcon";
import { adminSections } from "@/data/admin";
import { schoolStatusLabels, type SchoolStatus } from "@/data/school-directory";
import { DB_NOT_CONFIGURED_MESSAGE } from "@/lib/db/config";
import {
  createSchoolsRepository,
  getSchoolsDataSource,
  type SchoolFilters,
} from "@/lib/schools";

const section = adminSections.find((item) => item.href.endsWith("/colegios"))!;

export const metadata: Metadata = {
  title: "Colegios",
};

const STATUSES: SchoolStatus[] = ["activo", "en_pausa", "prospecto"];

const statusStyles: Record<SchoolStatus, string> = {
  activo: "bg-brand-100 text-brand-800",
  en_pausa: "bg-butter-100 text-butter-600",
  prospecto: "bg-sky-100 text-sky-700",
};

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function isStatus(value: string | undefined): value is SchoolStatus {
  return STATUSES.includes(value as SchoolStatus);
}

function parseFilters(params: SearchParams): SchoolFilters {
  const estado = first(params.estado);
  return {
    status: isStatus(estado) ? estado : undefined,
    query: first(params.q)?.trim() || undefined,
  };
}

function buildHref(filters: SchoolFilters, patch: Partial<SchoolFilters>): string {
  const next = { ...filters, ...patch };
  const params = new URLSearchParams();
  if (next.status) params.set("estado", next.status);
  if (next.query) params.set("q", next.query);
  const qs = params.toString();
  return qs ? `${section.href}?${qs}` : section.href;
}

function formatDate(date: string): string {
  return `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)}`;
}

export default async function AdminSchoolsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const repository = createSchoolsRepository();
  const [params, summary] = await Promise.all([searchParams, repository.summary()]);
  const filters = parseFilters(params);
  const schools = await repository.list(filters);
  const source = getSchoolsDataSource();

  const chipBase =
    "rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors ring-1 ring-inset";
  const chipOn = "bg-brand-600 text-white ring-brand-600";
  const chipOff = "bg-white text-brand-900/70 ring-cream-200 hover:bg-cream-50";

  const stats = [
    {
      label: "Colegios en directorio",
      value: summary.total,
      detail: `${summary.byStatus.activo} con convenio activo`,
      tone: "bg-brand-100 text-brand-700",
      icon: "school" as const,
    },
    {
      label: "Niños atendidos",
      value: summary.studentsCovered,
      detail: "en colegios aliados",
      tone: "bg-peach-100 text-peach-700",
      icon: "children" as const,
    },
    {
      label: "En pausa",
      value: summary.byStatus.en_pausa,
      detail: "convenios detenidos",
      tone: "bg-butter-100 text-butter-600",
      icon: "alert" as const,
    },
    {
      label: "Prospectos",
      value: summary.byStatus.prospecto,
      detail: "en conversación",
      tone: "bg-sky-100 text-sky-700",
      icon: "chat" as const,
    },
  ];

  return (
    <>
      <PanelHeader
        title={section.label}
        subtitle={section.description}
        action={
          <span className="rounded-full bg-cream-100 px-3.5 py-1.5 text-xs font-bold text-brand-900/70 ring-1 ring-cream-200">
            {source === "mock" ? "Datos de ejemplo (sin MySQL)" : "Conectado a MySQL"}
          </span>
        }
      />

      {source === "mock" && (
        <p className="animate-fade-up mb-6 rounded-2xl bg-butter-100 px-5 py-3 text-sm font-semibold text-butter-600 ring-1 ring-butter-200">
          {DB_NOT_CONFIGURED_MESSAGE}
        </p>
      )}

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

      <section className="animate-fade-up mt-6 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-cream-200 [animation-delay:0.3s]">
        <form
          method="get"
          action={section.href}
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex flex-wrap gap-2">
            <Link
              href={buildHref(filters, { status: undefined })}
              className={`${chipBase} ${filters.status ? chipOff : chipOn}`}
            >
              Todos ({summary.total})
            </Link>
            {STATUSES.map((status) => (
              <Link
                key={status}
                href={buildHref(filters, { status })}
                className={`${chipBase} ${filters.status === status ? chipOn : chipOff}`}
              >
                {schoolStatusLabels[status]} ({summary.byStatus[status]})
              </Link>
            ))}
          </div>
          {filters.status && <input type="hidden" name="estado" value={filters.status} />}
          <div className="flex gap-2 md:w-96">
            <label className="block flex-1 text-sm font-semibold text-slate-700">
              <span className="sr-only">Buscar</span>
              <input
                type="search"
                name="q"
                defaultValue={filters.query ?? ""}
                placeholder="Colegio, distrito o contacto"
                className={inputClass}
              />
            </label>
            <button
              type="submit"
              className="rounded-xl bg-brand-600 px-5 py-2.5 font-bold text-white transition-colors hover:bg-brand-700"
            >
              Buscar
            </button>
          </div>
        </form>

        <p className="mt-5 text-sm font-semibold text-brand-900/60">
          {schools.length === 1 ? "1 colegio" : `${schools.length} colegios`}
        </p>

        {schools.length === 0 ? (
          <p className="mt-3 rounded-2xl bg-cream-50 p-8 text-center font-semibold text-brand-900/60 ring-1 ring-cream-200">
            No hay colegios que coincidan con los filtros.
          </p>
        ) : (
          <ul className="mt-3 grid gap-4 md:grid-cols-2">
            {schools.map((school, index) => (
              <li
                key={school.id}
                className="animate-fade-up flex flex-col rounded-2xl bg-cream-50 p-5 ring-1 ring-cream-200"
                style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-100 text-brand-700">
                    <SchoolsIcon icon="school" className="size-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-extrabold text-brand-900">{school.name}</h3>
                    <p className="text-xs font-semibold text-brand-900/55">
                      {school.district} · {school.address} · {school.level}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-extrabold ${statusStyles[school.status]}`}
                  >
                    {schoolStatusLabels[school.status]}
                  </span>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs sm:grid-cols-3">
                  <div className="col-span-2 sm:col-span-3">
                    <dt className="font-bold text-brand-900/50">Contacto</dt>
                    <dd className="font-semibold text-brand-900">
                      {school.contactName}{" "}
                      <span className="font-semibold text-brand-900/55">· {school.contactRole}</span>
                      <br />
                      <a
                        href={`mailto:${school.contactEmail}`}
                        className="text-brand-600 hover:text-brand-800"
                      >
                        {school.contactEmail}
                      </a>{" "}
                      <span className="text-brand-900/55">· {school.contactPhone}</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-brand-900/50">Convenio desde</dt>
                    <dd className="font-semibold text-brand-900">
                      {school.agreementSince ? formatDate(school.agreementSince) : "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-brand-900/50">Niños</dt>
                    <dd className="font-semibold text-brand-900">{school.studentsCount}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-brand-900/50">Sesiones realizadas</dt>
                    <dd className="font-semibold text-brand-900">
                      {school.sessionsCompleted}
                      {school.openIncidents > 0 && (
                        <span className="text-blush-600"> · {school.openIncidents} incid.</span>
                      )}
                    </dd>
                  </div>
                  {school.therapistNames.length > 0 && (
                    <div className="col-span-2 sm:col-span-3">
                      <dt className="font-bold text-brand-900/50">Terapeutas</dt>
                      <dd className="font-semibold text-brand-900">
                        {school.therapistNames.join(", ")}
                      </dd>
                    </div>
                  )}
                </dl>

                {school.notes && (
                  <p className="mt-3 rounded-xl bg-white/70 px-3 py-2 text-xs font-semibold text-brand-900/70 ring-1 ring-cream-200">
                    {school.notes}
                  </p>
                )}

                {school.studentsCount > 0 && (
                  <Link
                    href={`/schools/admin/ninos?q=${encodeURIComponent(school.name)}`}
                    className="lift-glow mt-4 inline-block self-start rounded-lg px-1 text-sm font-extrabold text-brand-600 hover:text-brand-800"
                  >
                    Ver niños
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
