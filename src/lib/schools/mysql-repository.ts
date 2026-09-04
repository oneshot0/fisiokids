import { requireDbConfig } from "@/lib/db/config";
import type { SchoolsRepository } from "./repository";

/**
 * Implementación futura sobre MySQL. Ver pasos en `src/lib/users/mysql-repository.ts`;
 * `createSchoolsRepository()` la usará automáticamente cuando `.env` tenga las variables `DB_*`.
 */
export function createMysqlSchoolsRepository(): SchoolsRepository {
  const config = requireDbConfig();
  const pending = () =>
    Promise.reject(
      new Error(
        `Repositorio MySQL de colegios pendiente de implementar (destino: ${config.user}@${config.host}:${config.port}/${config.database}).`,
      ),
    );

  return {
    list: pending,
    getById: pending,
    summary: pending,
  };
}
