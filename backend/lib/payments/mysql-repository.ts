import { requireDbConfig } from "@/lib/db/config";
import type { PaymentsRepository } from "./repository";

/**
 * Implementación futura sobre MySQL. Ver pasos en `src/lib/users/mysql-repository.ts`;
 * `createPaymentsRepository()` la usará automáticamente cuando `.env` tenga las variables `DB_*`.
 * Sugerencia de esquema: tabla `payments` con FK a `students`, y el estado calculado en SQL
 * (`CASE WHEN paid_at IS NOT NULL ... WHEN due_date < CURDATE() ...`).
 */
export function createMysqlPaymentsRepository(): PaymentsRepository {
  const config = requireDbConfig();
  const pending = () =>
    Promise.reject(
      new Error(
        `Repositorio MySQL de pagos pendiente de implementar (destino: ${config.user}@${config.host}:${config.port}/${config.database}).`,
      ),
    );

  return {
    list: pending,
    getById: pending,
    summary: pending,
    periods: pending,
  };
}
