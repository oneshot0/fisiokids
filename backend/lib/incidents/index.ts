import { isDbConfigured } from "@/lib/db/config";
import type { DataSource } from "@/lib/users/repository";
import { createMockIncidentsRepository } from "./mock-repository";
import { createMysqlIncidentsRepository } from "./mysql-repository";
import type { IncidentsRepository } from "./repository";

export type { IncidentFilters, IncidentsRepository, IncidentsSummary } from "./repository";

export function getIncidentsDataSource(): DataSource {
  return isDbConfigured() ? "mysql" : "mock";
}

/**
 * Punto único para obtener la fuente de datos de incidentes.
 * Sin variables `DB_*` en `.env` se usan los datos mock de `src/data/incidents.ts`.
 */
export function createIncidentsRepository(): IncidentsRepository {
  return getIncidentsDataSource() === "mysql"
    ? createMysqlIncidentsRepository()
    : createMockIncidentsRepository();
}
