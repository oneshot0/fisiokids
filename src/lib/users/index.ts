import { isDbConfigured } from "@/lib/db/config";
import { createMockUsersRepository } from "./mock-repository";
import { createMysqlUsersRepository } from "./mysql-repository";
import type { DataSource, UsersRepository } from "./repository";

export type { DataSource, UserFilters, UsersRepository, UsersSummary } from "./repository";

export function getUsersDataSource(): DataSource {
  return isDbConfigured() ? "mysql" : "mock";
}

/**
 * Punto único para obtener la fuente de datos de usuarios.
 * Sin variables `DB_*` en `.env` se usan los datos mock de `src/data/users.ts`.
 */
export function createUsersRepository(): UsersRepository {
  return getUsersDataSource() === "mysql"
    ? createMysqlUsersRepository()
    : createMockUsersRepository();
}
