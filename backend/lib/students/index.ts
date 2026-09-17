import { isDbConfigured } from "@/lib/db/config";
import type { DataSource } from "@/lib/users/repository";
import { createMockStudentsRepository } from "./mock-repository";
import { createMysqlStudentsRepository } from "./mysql-repository";
import type { StudentsRepository } from "./repository";

export type {
  StudentFilters,
  StudentProfile,
  StudentsRepository,
  StudentsSummary,
} from "./repository";

export function getStudentsDataSource(): DataSource {
  return isDbConfigured() ? "mysql" : "mock";
}

/**
 * Punto único para obtener la fuente de datos de niños.
 * Sin variables `DB_*` en `.env` se usan los datos mock de `src/data/students.ts`.
 */
export function createStudentsRepository(): StudentsRepository {
  return getStudentsDataSource() === "mysql"
    ? createMysqlStudentsRepository()
    : createMockStudentsRepository();
}
