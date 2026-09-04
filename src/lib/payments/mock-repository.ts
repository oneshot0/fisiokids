import {
  getPaymentStatus,
  payments as seedPayments,
  type Payment,
  type PaymentStatus,
} from "@/data/payments";
import { today } from "@/data/sessions";
import { students } from "@/data/students";
import { users } from "@/data/users";
import type {
  PaymentFilters,
  PaymentRecord,
  PaymentsRepository,
  PaymentsSummary,
} from "./repository";

const DAY_MS = 86_400_000;

function daysBetween(from: string, to: string): number {
  return Math.max(0, Math.round((Date.parse(to) - Date.parse(from)) / DAY_MS));
}

function toRecord(payment: Payment, referenceDate: string): PaymentRecord {
  const student = students.find((item) => item.id === payment.studentId);
  const parent = student ? users.find((user) => user.id === student.parentId) : undefined;
  const status = getPaymentStatus(payment, referenceDate);

  return {
    ...payment,
    status,
    studentName: student ? `${student.firstName} ${student.lastName}` : "Niño sin registro",
    parentName: parent?.name ?? null,
    daysOverdue: status === "vencido" ? daysBetween(payment.dueDate, referenceDate) : 0,
  };
}

function matches(record: PaymentRecord, filters: PaymentFilters): boolean {
  if (filters.status && record.status !== filters.status) return false;
  if (filters.period && record.period !== filters.period) return false;
  if (filters.query) {
    const q = filters.query.trim().toLowerCase();
    if (q) {
      const haystack = [
        record.studentName,
        record.parentName ?? "",
        record.concept,
        record.reference ?? "",
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
  }
  return true;
}

/** Vencidos primero (los más atrasados arriba), luego pendientes y pagados por fecha. */
const statusOrder: Record<PaymentStatus, number> = { vencido: 0, pendiente: 1, pagado: 2 };

function byUrgency(a: PaymentRecord, b: PaymentRecord): number {
  return (
    statusOrder[a.status] - statusOrder[b.status] ||
    b.daysOverdue - a.daysOverdue ||
    b.dueDate.localeCompare(a.dueDate) ||
    a.studentName.localeCompare(b.studentName, "es")
  );
}

function emptyByStatus(): Record<PaymentStatus, number> {
  return { pagado: 0, pendiente: 0, vencido: 0 };
}

/**
 * Fuente de datos temporal basada en `src/data/payments.ts`.
 * `referenceDate` permite fijar el "hoy" en pruebas; por defecto usa la fecha mock global.
 */
export function createMockPaymentsRepository(
  data: Payment[] = seedPayments,
  referenceDate: string = today,
): PaymentsRepository {
  const records = data.map((payment) => toRecord(payment, referenceDate));

  return {
    async list(filters = {}) {
      return records.filter((record) => matches(record, filters)).sort(byUrgency);
    },
    async getById(id) {
      return records.find((record) => record.id === id) ?? null;
    },
    async summary(period) {
      const scope = period ? records.filter((record) => record.period === period) : records;
      const summary: PaymentsSummary = {
        total: scope.length,
        byStatus: emptyByStatus(),
        amountByStatus: emptyByStatus(),
        collectionRate: 0,
      };
      let billed = 0;
      for (const record of scope) {
        summary.byStatus[record.status] += 1;
        summary.amountByStatus[record.status] += record.amount;
        billed += record.amount;
      }
      summary.collectionRate =
        billed > 0 ? Math.round((summary.amountByStatus.pagado / billed) * 100) : 0;
      return summary;
    },
    async periods() {
      return [...new Set(records.map((record) => record.period))].sort((a, b) =>
        b.localeCompare(a),
      );
    },
  };
}
