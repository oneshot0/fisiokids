import { isDbConfigured } from "@/lib/db/config";
import type { DataSource } from "@/lib/users/repository";
import { createMockSessionsRepository } from "./mock-repository";
import { createMysqlSessionsRepository } from "./mysql-repository";
import type { SessionsRepository } from "./repository";

export type { SessionFilters, SessionsRepository, SessionsSummary } from "./repository";

export function getSessionsDataSource(): DataSource {
  return isDbConfigured() ? "mysql" : "mock";
}

/**
 * Punto único para obtener la fuente de datos de sesiones.
 * Sin variables `DB_*` en `.env` se usan los datos mock de `src/data/sessions.ts`.
 */
export function createSessionsRepository(): SessionsRepository {
  return getSessionsDataSource() === "mysql"
    ? createMysqlSessionsRepository()
    : createMockSessionsRepository();
}
