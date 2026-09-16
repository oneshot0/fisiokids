import { requireDbConfig } from "@/lib/db/config";
import type { StudentsRepository } from "./repository";

/**
 * Implementación futura sobre MySQL. Ver pasos en `src/lib/users/mysql-repository.ts`;
 * `createStudentsRepository()` la usará automáticamente cuando `.env` tenga las variables `DB_*`.
 */
export function createMysqlStudentsRepository(): StudentsRepository {
  const config = requireDbConfig();
  const pending = () =>
    Promise.reject(
      new Error(
        `Repositorio MySQL de niños pendiente de implementar (destino: ${config.user}@${config.host}:${config.port}/${config.database}).`,
      ),
    );

  return {
    list: pending,
    getById: pending,
    summary: pending,
    areas: pending,
  };
}
