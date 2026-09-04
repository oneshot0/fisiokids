import type { Metadata } from "next";
import Link from "next/link";
import { PanelHeader } from "@/components/schools/PanelHeader";
import { inputClass } from "@/components/schools/Field";
import { SchoolsIcon } from "@/components/schools/SchoolsIcon";
import { DataSourceBadge, DataSourceNotice } from "@/components/schools/admin/DataSourceNotice";
import { formatShortDate } from "@/lib/admin/format";
import { first, type SearchParams } from "@/lib/admin/query";
import { adminSections } from "@/data/admin";
import { users } from "@/data/users";
import {
  createStudentsRepository,
  getStudentsDataSource,
  type StudentFilters,
} from "@/lib/students";

const section = adminSections.find((item) => item.href.endsWith("/ninos"))!;

export const metadata: Metadata = {
  title: "Niños",
};

const areaStyles: Record<string, string> = {
  Lenguaje: "bg-sky-100 text-sky-700",
  Motora: "bg-peach-100 text-peach-700",
  Sensorial: "bg-butter-100 text-butter-600",
  Autonomía: "bg-brand-100 text-brand-800",
};
const defaultAreaStyle = "bg-cream-100 text-brand-700";

const avatarTones = [
  "bg-brand-100 text-brand-800",
  "bg-peach-100 text-peach-700",
  "bg-sky-100 text-sky-700",
  "bg-butter-100 text-butter-600",
];

const therapists = users.filter((user) => user.role === "terapeuta");



function parseFilters(params: SearchParams, areas: string[]): StudentFilters {
  const terapeuta = first(params.terapeuta);
  const area = first(params.area);
  return {
    therapistId: therapists.some((t) => t.id === terapeuta) ? terapeuta : undefined,
    area: areas.includes(area ?? "") ? area : undefined,
    query: first(params.q)?.trim() || undefined,
  };
}

function buildHref(filters: StudentFilters, patch: Partial<StudentFilters>): string {
  const next = { ...filters, ...patch };
  const params = new URLSearchParams();
  if (next.therapistId) params.set("terapeuta", next.therapistId);
  if (next.area) params.set("area", next.area);
  if (next.query) params.set("q", next.query);
  const qs = params.toString();
  return qs ? `${section.href}?${qs}` : section.href;
}


export default async function AdminChildrenPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const repository = createStudentsRepository();
  const [params, areas, summary] = await Promise.all([
    searchParams,
    repository.areas(),
    repository.summary(),
  ]);
  const filters = parseFilters(params, areas);
  const students = await repository.list(filters);
  const source = getStudentsDataSource();

  const chipBase =
    "rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors ring-1 ring-inset";
  const chipOn = "bg-brand-600 text-white ring-brand-600";
  const chipOff = "bg-white text-brand-900/70 ring-cream-200 hover:bg-cream-50";

  const stats = [
    {
      label: "Niños matriculados",
      value: summary.total,
      detail: `${summary.enrolledThisMonth} nuevos este mes`,
      tone: "bg-brand-100 text-brand-700",
      icon: "children" as const,
    },
    ...therapists.map((therapist) => ({
      label: therapist.name,
      value: summary.byTherapist[therapist.id] ?? 0,
      detail: "niños a cargo",
      tone: "bg-peach-100 text-peach-700",
      icon: "users" as const,
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
        <div className="flex flex-wrap gap-2">
          <Link
            href={buildHref(filters, { area: undefined })}
            className={`${chipBase} ${filters.area ? chipOff : chipOn}`}
          >
            Todas las áreas
          </Link>
          {areas.map((area) => (
            <Link
              key={area}
              href={buildHref(filters, { area })}
              className={`${chipBase} ${filters.area === area ? chipOn : chipOff}`}
            >
              {area} ({summary.byArea[area] ?? 0})
            </Link>
          ))}
        </div>

        <form
          method="get"
          action={section.href}
          className="mt-4 grid gap-3 md:grid-cols-[1fr_2fr_auto] md:items-end"
        >
          {filters.area && <input type="hidden" name="area" value={filters.area} />}
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
              placeholder="Niño, apoderado, terapeuta o colegio"
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
          {students.length === 1 ? "1 niño" : `${students.length} niños`}
        </p>

        {students.length === 0 ? (
          <p className="mt-3 rounded-2xl bg-cream-50 p-8 text-center font-semibold text-brand-900/60 ring-1 ring-cream-200">
            No hay niños que coincidan con los filtros.
          </p>
        ) : (
          <ul className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {students.map((student, index) => (
              <li
                key={student.id}
                className="animate-fade-up flex flex-col rounded-2xl bg-cream-50 p-5 ring-1 ring-cream-200"
                style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`grid size-12 shrink-0 place-items-center rounded-2xl text-base font-extrabold ${
                      avatarTones[index % avatarTones.length]
                    }`}
                  >
                    {student.firstName[0]}
                    {student.lastName[0]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-extrabold text-brand-900">
                      {student.firstName} {student.lastName}
                    </h3>
                    <p className="text-xs font-semibold text-brand-900/55">
                      {student.age} años · {student.school}
                    </p>
                  </div>
                  {student.openIncidents > 0 && (
                    <Link
                      href={`/schools/admin/incidentes?q=${encodeURIComponent(student.firstName)}`}
                      className="flex shrink-0 items-center gap-1 rounded-full bg-blush-100 px-2.5 py-1 text-xs font-extrabold text-blush-600"
                      title="Incidentes abiertos"
                    >
                      <SchoolsIcon icon="alert" className="size-3.5" />
                      {student.openIncidents}
                    </Link>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {student.areas.map((area) => (
                    <span
                      key={area}
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${areaStyles[area] ?? defaultAreaStyle}`}
                    >
                      {area}
                    </span>
                  ))}
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                  <div>
                    <dt className="font-bold text-brand-900/50">Apoderado</dt>
                    <dd className="font-semibold text-brand-900">
                      {student.parentName ?? "Sin registro"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-brand-900/50">Terapeuta</dt>
                    <dd className="font-semibold text-brand-900">
                      {student.therapistName ?? "Sin asignar"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-brand-900/50">Matrícula</dt>
                    <dd className="font-semibold text-brand-900">
                      {student.enrolledAt ? formatShortDate(student.enrolledAt) : "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-brand-900/50">Sesiones</dt>
                    <dd className="font-semibold text-brand-900">
                      {student.sessionsCompleted} realizadas
                      {student.sessionsCancelled > 0 && (
                        <span className="text-blush-600"> · {student.sessionsCancelled} canc.</span>
                      )}
                    </dd>
                  </div>
                </dl>

                <Link
                  href={`/schools/admin/sesiones?fecha=todas&q=${encodeURIComponent(student.firstName)}`}
                  className="lift-glow mt-4 inline-block self-start rounded-lg px-1 text-sm font-extrabold text-brand-600 hover:text-brand-800"
                >
                  Ver sesiones
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
