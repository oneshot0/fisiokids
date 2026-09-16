import { requireDbConfig } from "@/lib/db/config";
import type { IncidentsRepository } from "./repository";

/**
 * Implementación futura sobre MySQL. Ver pasos en `src/lib/users/mysql-repository.ts`;
 * `createIncidentsRepository()` la usará automáticamente cuando `.env` tenga las variables `DB_*`.
 */
export function createMysqlIncidentsRepository(): IncidentsRepository {
  const config = requireDbConfig();
  const pending = () =>
    Promise.reject(
      new Error(
        `Repositorio MySQL de incidentes pendiente de implementar (destino: ${config.user}@${config.host}:${config.port}/${config.database}).`,
      ),
    );

  return {
    list: pending,
    getById: pending,
    summary: pending,
  };
}
