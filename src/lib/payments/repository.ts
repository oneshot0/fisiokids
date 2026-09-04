import type { Payment, PaymentStatus } from "@/data/payments";

export type PaymentFilters = {
  status?: PaymentStatus;
  /** Mes facturado (YYYY-MM). */
  period?: string;
  /** Busca por niño, apoderado, concepto o referencia (sin distinguir mayúsculas). */
  query?: string;
};

/** Pago con estado derivado y vínculos resueltos, listo para la UI. */
export type PaymentRecord = Payment & {
  status: PaymentStatus;
  studentName: string;
  parentName: string | null;
  /** Días de atraso respecto a la fecha de referencia; 0 si no está vencido. */
  daysOverdue: number;
};

export type PaymentsSummary = {
  total: number;
  byStatus: Record<PaymentStatus, number>;
  /** Montos en soles agrupados por estado. */
  amountByStatus: Record<PaymentStatus, number>;
  /** Porcentaje cobrado del total facturado (0–100). */
  collectionRate: number;
};

/**
 * Contrato de acceso a datos del módulo de pagos.
 * La UI solo depende de esta interfaz; la implementación (mock hoy, MySQL
 * después) se elige en `src/lib/payments/index.ts`.
 */
export interface PaymentsRepository {
  list(filters?: PaymentFilters): Promise<PaymentRecord[]>;
  getById(id: string): Promise<PaymentRecord | null>;
  /** Resumen del periodo indicado, o de todos los pagos si se omite. */
  summary(period?: string): Promise<PaymentsSummary>;
  /** Periodos facturados (YYYY-MM), del más reciente al más antiguo. */
  periods(): Promise<string[]>;
}
