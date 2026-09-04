import { students } from "./students";

export type PaymentStatus = "pagado" | "pendiente" | "vencido";
export type PaymentMethod = "yape" | "plin" | "transferencia" | "efectivo" | "tarjeta";

export type Payment = {
  id: string;
  studentId: string;
  /** Mes facturado (YYYY-MM). */
  period: string;
  concept: string;
  amount: number;
  dueDate: string;
  paidAt?: string;
  method?: PaymentMethod;
  reference?: string;
};

export const paymentStatusLabels: Record<PaymentStatus, string> = {
  pagado: "Pagado",
  pendiente: "Pendiente",
  vencido: "Vencido",
};

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  yape: "Yape",
  plin: "Plin",
  transferencia: "Transferencia",
  efectivo: "Efectivo",
  tarjeta: "Tarjeta",
};

/**
 * El estado no se guarda: se deriva de `paidAt` y `dueDate` respecto a la fecha
 * de referencia, así nunca queda desincronizado con los datos.
 */
export function getPaymentStatus(payment: Payment, today: string): PaymentStatus {
  if (payment.paidAt) return "pagado";
  return payment.dueDate < today ? "vencido" : "pendiente";
}

const MONTHLY_FEE = 380;
const [mateo, valentina, santiago, emilia, lucas] = students;

/** Cuotas mensuales por niño (maqueta). Fecha de referencia: `today` de `src/data/sessions.ts`. */
export const payments: Payment[] = [
  // Agosto 2026
  { id: "pay-2026-08-mateo", studentId: mateo.id, period: "2026-08", concept: "Mensualidad agosto", amount: MONTHLY_FEE, dueDate: "2026-08-10", paidAt: "2026-08-08", method: "yape", reference: "YP-88213" },
  { id: "pay-2026-08-valentina", studentId: valentina.id, period: "2026-08", concept: "Mensualidad agosto", amount: MONTHLY_FEE, dueDate: "2026-08-10", paidAt: "2026-08-10", method: "transferencia", reference: "BCP-551209" },
  { id: "pay-2026-08-santiago", studentId: santiago.id, period: "2026-08", concept: "Mensualidad agosto", amount: MONTHLY_FEE, dueDate: "2026-08-20", paidAt: "2026-08-26", method: "efectivo" },
  { id: "pay-2026-08-emilia", studentId: emilia.id, period: "2026-08", concept: "Mensualidad agosto (prorrateo)", amount: 250, dueDate: "2026-08-20", paidAt: "2026-08-19", method: "plin", reference: "PL-30411" },
  { id: "pay-2026-08-lucas", studentId: lucas.id, period: "2026-08", concept: "Mensualidad agosto", amount: MONTHLY_FEE, dueDate: "2026-08-10" },
  { id: "pay-2026-08-lucas-eval", studentId: lucas.id, period: "2026-08", concept: "Evaluación inicial", amount: 150, dueDate: "2026-08-05", paidAt: "2026-08-04", method: "tarjeta", reference: "VISA-0912" },
  // Septiembre 2026
  { id: "pay-2026-09-mateo", studentId: mateo.id, period: "2026-09", concept: "Mensualidad septiembre", amount: MONTHLY_FEE, dueDate: "2026-09-10", paidAt: "2026-09-02", method: "yape", reference: "YP-90177" },
  { id: "pay-2026-09-valentina", studentId: valentina.id, period: "2026-09", concept: "Mensualidad septiembre", amount: MONTHLY_FEE, dueDate: "2026-09-10" },
  { id: "pay-2026-09-santiago", studentId: santiago.id, period: "2026-09", concept: "Mensualidad septiembre", amount: MONTHLY_FEE, dueDate: "2026-09-10" },
  { id: "pay-2026-09-emilia", studentId: emilia.id, period: "2026-09", concept: "Mensualidad septiembre", amount: MONTHLY_FEE, dueDate: "2026-09-10", paidAt: "2026-09-01", method: "plin", reference: "PL-31002" },
  { id: "pay-2026-09-lucas", studentId: lucas.id, period: "2026-09", concept: "Mensualidad septiembre", amount: MONTHLY_FEE, dueDate: "2026-09-10" },
];
