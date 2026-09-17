import { isDbConfigured } from "@/lib/db/config";
import type { DataSource } from "@/lib/users/repository";
import { createMockSchoolsRepository } from "./mock-repository";
import { createMysqlSchoolsRepository } from "./mysql-repository";
import type { SchoolsRepository } from "./repository";

export type { SchoolFilters, SchoolProfile, SchoolsRepository, SchoolsSummary } from "./repository";

export function getSchoolsDataSource(): DataSource {
  return isDbConfigured() ? "mysql" : "mock";
}

/**
 * Punto único para obtener la fuente de datos de colegios.
 * Sin variables `DB_*` en `.env` se usan los datos mock de `src/data/school-directory.ts`.
 */
export function createSchoolsRepository(): SchoolsRepository {
  return getSchoolsDataSource() === "mysql"
    ? createMysqlSchoolsRepository()
    : createMockSchoolsRepository();
}
