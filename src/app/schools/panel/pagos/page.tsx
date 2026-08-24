import type { Metadata } from "next";
import { PanelHeader } from "@/components/schools/PanelHeader";
import { invoices } from "@/data/schools";

export const metadata: Metadata = { title: "Pagos" };

const statusStyles: Record<string, string> = {
  Pagado: "bg-brand-100 text-brand-800",
  Pendiente: "bg-amber-100 text-amber-800",
  Vencido: "bg-rose-100 text-rose-800",
};

const currency = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
});

export default function PagosPage() {
  const pending = invoices
    .filter((i) => i.status !== "Pagado")
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <>
      <PanelHeader
        title="Pagos"
        subtitle="Estado de cuenta, comprobantes y pago en línea."
      />

      <section className="animate-fade-up flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-brand-800 p-8 text-white">
        <div>
          <p className="text-sm font-semibold text-white/70">Saldo pendiente</p>
          <p className="mt-1 text-4xl font-extrabold">{currency.format(pending)}</p>
          <p className="mt-1 text-sm text-white/70">Vence el 5 de febrero</p>
        </div>
        <button
          type="button"
          className="rounded-full bg-brand-500 px-8 py-3.5 font-bold text-white shadow-xl shadow-brand-500/25 transition-all hover:-translate-y-0.5 hover:bg-brand-400"
        >
          Pagar ahora
        </button>
      </section>

      <section className="animate-fade-up mt-8 overflow-hidden rounded-3xl bg-white ring-1 ring-cream-200 [animation-delay:0.1s]">
        <h2 className="border-b border-cream-200 px-7 py-5 text-lg font-extrabold text-brand-900">
          Historial
        </h2>
        <table className="w-full text-left text-sm">
          <thead className="bg-cream-50 text-xs uppercase tracking-wide text-brand-900/50">
            <tr>
              <th scope="col" className="px-7 py-3 font-bold">Comprobante</th>
              <th scope="col" className="px-4 py-3 font-bold">Concepto</th>
              <th scope="col" className="px-4 py-3 font-bold">Monto</th>
              <th scope="col" className="px-7 py-3 font-bold">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-200">
            {invoices.map((inv) => (
              <tr key={inv.id} className="transition-colors hover:bg-cream-50">
                <td className="px-7 py-4 font-bold text-brand-900">{inv.id}</td>
                <td className="px-4 py-4 text-brand-900/60">{inv.concept}</td>
                <td className="whitespace-nowrap px-4 py-4 font-semibold text-brand-900">
                  {currency.format(inv.amount)}
                </td>
                <td className="px-7 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[inv.status]}`}
                  >
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <p className="mt-8 rounded-2xl bg-white p-6 text-center text-sm text-brand-900/50 ring-1 ring-cream-200">
        El pago en línea se integrará con Culqi o Izipay en la Fase 5.
      </p>
    </>
  );
}
