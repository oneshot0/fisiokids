import type { Metadata } from "next";
import Link from "next/link";
import { PanelHeader } from "@/components/schools/PanelHeader";
import { inputClass } from "@/components/schools/Field";
import { adminSections } from "@/data/admin";
import { roleLabels, type Role } from "@/data/users";
import { DB_NOT_CONFIGURED_MESSAGE } from "@/lib/db/config";
import { createUsersRepository, getUsersDataSource, type UserFilters } from "@/lib/users";

const section = adminSections.find((item) => item.href.endsWith("/usuarios"))!;

export const metadata: Metadata = {
  title: "Usuarios",
};

const ROLES: Role[] = ["admin", "terapeuta", "padre"];

const roleStyles: Record<Role, string> = {
  admin: "bg-brand-100 text-brand-800",
  terapeuta: "bg-peach-100 text-peach-700",
  padre: "bg-butter-100 text-butter-600",
};

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseFilters(params: SearchParams): UserFilters {
  const role = first(params.rol);
  const estado = first(params.estado);
  return {
    role: ROLES.includes(role as Role) ? (role as Role) : undefined,
    active: estado === "activos" ? true : estado === "inactivos" ? false : undefined,
    query: first(params.q)?.trim() || undefined,
  };
}

function buildHref(filters: UserFilters, patch: Partial<UserFilters>): string {
  const next = { ...filters, ...patch };
  const params = new URLSearchParams();
  if (next.role) params.set("rol", next.role);
  if (next.active !== undefined) params.set("estado", next.active ? "activos" : "inactivos");
  if (next.query) params.set("q", next.query);
  const qs = params.toString();
  return qs ? `${section.href}?${qs}` : section.href;
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const filters = parseFilters(await searchParams);
  const repository = createUsersRepository();
  const [users, summary] = await Promise.all([repository.list(filters), repository.summary()]);
  const source = getUsersDataSource();

  const chipBase =
    "rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors ring-1 ring-inset";
  const chipOn = "bg-brand-600 text-white ring-brand-600";
  const chipOff = "bg-white text-brand-900/70 ring-cream-200 hover:bg-cream-50";

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

      <section className="animate-fade-up mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total" value={summary.total} />
        {ROLES.map((role) => (
          <StatCard key={role} label={roleLabels[role]} value={summary.byRole[role]} />
        ))}
      </section>

      <section className="animate-fade-up rounded-3xl bg-white p-6 shadow-soft ring-1 ring-cream-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <Link
              href={buildHref(filters, { role: undefined })}
              className={`${chipBase} ${filters.role ? chipOff : chipOn}`}
            >
              Todos
            </Link>
            {ROLES.map((role) => (
              <Link
                key={role}
                href={buildHref(filters, { role })}
                className={`${chipBase} ${filters.role === role ? chipOn : chipOff}`}
              >
                {roleLabels[role]}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["Todos", undefined],
                ["Activos", true],
                ["Inactivos", false],
              ] as const
            ).map(([label, active]) => (
              <Link
                key={label}
                href={buildHref(filters, { active })}
                className={`${chipBase} ${filters.active === active ? chipOn : chipOff}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <form method="get" action={section.href} className="mt-4 flex flex-wrap items-end gap-3">
          {filters.role && <input type="hidden" name="rol" value={filters.role} />}
          {filters.active !== undefined && (
            <input type="hidden" name="estado" value={filters.active ? "activos" : "inactivos"} />
          )}
          <label className="block flex-1 text-sm font-semibold text-slate-700">
            Buscar
            <input
              type="search"
              name="q"
              defaultValue={filters.query ?? ""}
              placeholder="Nombre, correo o colegio"
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

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs font-bold uppercase tracking-wide text-brand-900/50">
                <th className="px-3 py-2">Usuario</th>
                <th className="px-3 py-2">Rol</th>
                <th className="px-3 py-2">Colegio / vínculos</th>
                <th className="px-3 py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-3 py-10 text-center font-semibold text-brand-900/60">
                    No hay usuarios que coincidan con los filtros.
                  </td>
                </tr>
              )}
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className="animate-fade-up border-t border-cream-200"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-extrabold text-brand-800">
                        {user.initials}
                      </span>
                      <div>
                        <p className="font-bold text-brand-900">{user.name}</p>
                        <p className="text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${roleStyles[user.role]}`}>
                      {roleLabels[user.role]}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-600">
                    {user.school ??
                      (user.studentIds?.length
                        ? `${user.studentIds.length} ${user.studentIds.length === 1 ? "niño" : "niños"}`
                        : "—")}
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                        user.active ? "text-brand-700" : "text-slate-400"
                      }`}
                    >
                      <span
                        className={`size-2 rounded-full ${user.active ? "bg-brand-500" : "bg-slate-300"}`}
                      />
                      {user.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-cream-200">
      <p className="text-xs font-bold uppercase tracking-wide text-brand-900/50">{label}</p>
      <p className="mt-1 text-3xl font-extrabold text-brand-900">{value}</p>
    </div>
  );
}
