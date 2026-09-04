import { requireDbConfig } from "@/lib/db/config";
import type { UsersRepository } from "./repository";

/**
 * Implementación futura sobre MySQL.
 *
 * Pasos cuando exista la base de datos:
 * 1. Completar `.env` con las variables de `.env.example`.
 * 2. Instalar un driver (por ejemplo `mysql2`) y crear el pool con `requireDbConfig()`.
 * 3. Implementar los métodos de `UsersRepository` con consultas SQL.
 * 4. `createUsersRepository()` en `src/lib/users/index.ts` usará esta
 *    implementación automáticamente cuando las variables estén definidas.
 */
export function createMysqlUsersRepository(): UsersRepository {
  const config = requireDbConfig();
  const pending = () =>
    Promise.reject(
      new Error(
        `Repositorio MySQL de usuarios pendiente de implementar (destino: ${config.user}@${config.host}:${config.port}/${config.database}).`,
      ),
    );

  return {
    list: pending,
    getById: pending,
    getByEmail: pending,
    summary: pending,
  };
}
