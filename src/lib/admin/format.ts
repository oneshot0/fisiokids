/** `YYYY-MM-DD` → `DD/MM/YYYY` sin depender de la zona horaria del servidor. */
export function formatShortDate(date: string): string {
  return `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)}`;
}

const MONTHS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/** `YYYY-MM` → `septiembre 2026`. */
export function formatPeriod(period: string): string {
  const month = Number(period.slice(5, 7)) - 1;
  return `${MONTHS[month] ?? period} ${period.slice(0, 4)}`;
}

const penFormatter = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
  minimumFractionDigits: 2,
});

/** Montos en soles peruanos (`S/ 1,250.00`). */
export function formatMoney(amount: number): string {
  return penFormatter.format(amount);
}
