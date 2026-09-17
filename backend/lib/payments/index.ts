import { isDbConfigured } from "@/lib/db/config";
import type { DataSource } from "@/lib/users/repository";
import { createMockPaymentsRepository } from "./mock-repository";
import { createMysqlPaymentsRepository } from "./mysql-repository";
import type { PaymentsRepository } from "./repository";

export type {
  PaymentFilters,
  PaymentRecord,
  PaymentsRepository,
  PaymentsSummary,
} from "./repository";

export function getPaymentsDataSource(): DataSource {
  return isDbConfigured() ? "mysql" : "mock";
}

/**
 * Punto único para obtener la fuente de datos de pagos.
 * Sin variables `DB_*` en `.env` se usan los datos mock de `src/data/payments.ts`.
 */
export function createPaymentsRepository(): PaymentsRepository {
  return getPaymentsDataSource() === "mysql"
    ? createMysqlPaymentsRepository()
    : createMockPaymentsRepository();
}
