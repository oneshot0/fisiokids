import type { Metadata } from "next";
import Link from "next/link";
import { PanelHeader } from "@/components/schools/PanelHeader";
import { inputClass } from "@/components/schools/Field";
import { SchoolsIcon } from "@/components/schools/SchoolsIcon";
import { DataSourceBadge, DataSourceNotice } from "@/components/schools/admin/DataSourceNotice";
import { adminSections } from "@/data/admin";
import { paymentMethodLabels, paymentStatusLabels, type PaymentStatus } from "@/data/payments";
import { formatMoney, formatPeriod, formatShortDate } from "@/lib/admin/format";
import { buildHref, first, oneOf, queryText, type SearchParams } from "@/lib/admin/query";
import {
  createPaymentsRepository,
  getPaymentsDataSource,
  type PaymentFilters,
} from "@/lib/payments";

const section = adminSections.find((item) => item.href.endsWith("/pagos"))!;

export const metadata: Metadata = {
  title: "Pagos",
};

const STATUSES: PaymentStatus[] = ["vencido", "pendiente", "pagado"];

const statusStyles: Record<PaymentStatus, string> = {
  pagado: "bg-brand-100 text-brand-800",
  pendiente: "bg-butter-100 text-butter-600",
  vencido: "bg-blush-100 text-blush-600",
};

/** Valor especial del select de periodo para ver todos los meses. */
const ALL_PERIODS = "todos";

function toQuery(filters: PaymentFilters, patch: Partial<PaymentFilters>) {
  const next = { ...filters, ...patch };
  return buildHref(section.href, {
    periodo: next.period ?? ALL_PERIODS,
    estado: next.status,
    q: next.query,
  });
}

export default async function AdminPaymentsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const repository = createPaymentsRepository();
  const [params, periods] = await Promise.all([searchParams, repository.periods()]);

  // Sin `?periodo=` se muestra el mes más reciente; `?periodo=todos` quita el filtro.
  const periodParam = first(params.periodo);
  const period =
    periodParam === ALL_PERIODS ? undefined : oneOf(periodParam, periods) ?? periods[0];

  const filters: PaymentFilters = {
    period,
    status: oneOf(first(params.estado), STATUSES),
    query: queryText(params.q),
  };

  const [summary, payments] = await Promise.all([
    repository.summary(period),
    repository.list(filters),
  ]);
  const source = getPaymentsDataSource();

  const chipBase =
    "rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors ring-1 ring-inset";
  const chipOn = "bg-brand-600 text-white ring-brand-600";
  const chipOff = "bg-white text-brand-900/70 ring-cream-200 hover:bg-cream-50";

  const stats = [
    {
      label: "Cobrado",
      value: formatMoney(summary.amountByStatus.pagado),
      detail: `${summary.byStatus.pagado} pagos · ${summary.collectionRate}% del facturado`,
      tone: "bg-brand-100 text-brand-700",
      icon: "check" as const,
    },
    {
      label: "Pendiente",
      value: formatMoney(summary.amountByStatus.pendiente),
      detail: `${summary.byStatus.pendiente} cuotas por vencer`,
      tone: "bg-butter-100 text-butter-600",
      icon: "calendar" as const,
    },
    {
      label: "Vencido",
      value: formatMoney(summary.amountByStatus.vencido),
      detail: `${summary.byStatus.vencido} cuotas atrasadas`,
      tone: "bg-blush-100 text-blush-600",
      icon: "alert" as const,
    },
    {
      label: "Facturado",
      value: formatMoney(
        summary.amountByStatus.pagado +
          summary.amountByStatus.pendiente +
          summary.amountByStatus.vencido,
      ),
      detail: period ? formatPeriod(period) : "todos los periodos",
      tone: "bg-sky-100 text-sky-700",
      icon: "payments" as const,
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
          <li
            key={stat.label}
            className="lift-glow animate-fade-up rounded-3xl bg-white p-5 shadow-soft ring-1 ring-cream-200"
            style={{ animationDelay: `${0.06 * index}s` }}
          >
            <span className={`grid size-11 place-items-center rounded-2xl ${stat.tone}`}>
              <SchoolsIcon icon={stat.icon} className="size-6" />
            </span>
            <p className="mt-4 text-sm font-bold text-brand-900/60">{stat.label}</p>
            <p className="mt-1 text-2xl font-extrabold text-brand-900">{stat.value}</p>
            <p className="mt-1 text-xs font-bold text-brand-600">{stat.detail}</p>
          </li>
        ))}
      </ul>

      <section className="animate-fade-up mt-6 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-cream-200 [animation-delay:0.3s]">
        <div className="flex flex-wrap gap-2">
          <Link
            href={toQuery(filters, { status: undefined })}
            className={`${chipBase} ${filters.status ? chipOff : chipOn}`}
          >
            Todos ({summary.total})
          </Link>
          {STATUSES.map((status) => (
            <Link
              key={status}
              href={toQuery(filters, { status })}
              className={`${chipBase} ${filters.status === status ? chipOn : chipOff}`}
            >
              {paymentStatusLabels[status]} ({summary.byStatus[status]})
            </Link>
          ))}
        </div>

        <form
          method="get"
          action={section.href}
          className="mt-4 grid gap-3 md:grid-cols-[1fr_2fr_auto] md:items-end"
        >
          {filters.status && <input type="hidden" name="estado" value={filters.status} />}
          <label className="block text-sm font-semibold text-slate-700">
            Periodo
            <select name="periodo" defaultValue={period ?? ALL_PERIODS} className={inputClass}>
              {periods.map((item) => (
                <option key={item} value={item}>
                  {formatPeriod(item)}
                </option>
              ))}
              <option value={ALL_PERIODS}>Todos los periodos</option>
            </select>
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            Buscar
            <input
              type="search"
              name="q"
              defaultValue={filters.query ?? ""}
              placeholder="Niño, apoderado, concepto o referencia"
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
          {payments.length === 1 ? "1 pago" : `${payments.length} pagos`}
        </p>

        {payments.length === 0 ? (
          <p className="mt-3 rounded-2xl bg-cream-50 p-8 text-center font-semibold text-brand-900/60 ring-1 ring-cream-200">
            No hay pagos que coincidan con los filtros.
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto rounded-2xl ring-1 ring-cream-200">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-cream-50 text-xs font-extrabold uppercase tracking-wide text-brand-900/50">
                <tr>
                  <th className="px-4 py-3">Niño</th>
                  <th className="px-4 py-3">Concepto</th>
                  <th className="px-4 py-3 text-right">Monto</th>
                  <th className="px-4 py-3">Vence</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Pago</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {payments.map((payment) => (
                  <tr key={payment.id} className="bg-white transition-colors hover:bg-cream-50/60">
                    <td className="px-4 py-3">
                      <Link
                        href={`/schools/admin/ninos?q=${encodeURIComponent(payment.studentName)}`}
                        className="font-extrabold text-brand-900 hover:text-brand-600"
                      >
                        {payment.studentName}
                      </Link>
                      <p className="text-xs font-semibold text-brand-900/55">
                        {payment.parentName ?? "Sin apoderado"}
                      </p>
                    </td>
                    <td className="px-4 py-3 font-semibold text-brand-900/80">
                      {payment.concept}
                      <p className="text-xs font-semibold text-brand-900/50">
                        {formatPeriod(payment.period)}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-right font-extrabold text-brand-900">
                      {formatMoney(payment.amount)}
                    </td>
                    <td className="px-4 py-3 font-semibold text-brand-900/80">
                      {formatShortDate(payment.dueDate)}
                      {payment.daysOverdue > 0 && (
                        <p className="text-xs font-bold text-blush-600">
                          {payment.daysOverdue} {payment.daysOverdue === 1 ? "día" : "días"} de atraso
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-extrabold ${statusStyles[payment.status]}`}
                      >
                        {paymentStatusLabels[payment.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-brand-900/80">
                      {payment.paidAt ? (
                        <>
                          {formatShortDate(payment.paidAt)}
                          <p className="text-xs font-semibold text-brand-900/50">
                            {payment.method ? paymentMethodLabels[payment.method] : "—"}
                            {payment.reference && ` · ${payment.reference}`}
                          </p>
                        </>
                      ) : (
                        <span className="text-brand-900/40">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
