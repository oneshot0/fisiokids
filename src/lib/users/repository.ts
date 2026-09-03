import type { Role, User } from "@/data/users";

export type UserFilters = {
  role?: Role;
  active?: boolean;
  /** Busca por nombre, correo o colegio (sin distinguir mayúsculas). */
  query?: string;
};

export type UsersSummary = {
  total: number;
  active: number;
  inactive: number;
  byRole: Record<Role, number>;
};

/**
 * Contrato de acceso a datos del módulo de usuarios.
 * La UI solo depende de esta interfaz; la implementación (mock hoy, MySQL
 * después) se elige en `src/lib/users/index.ts`.
 */
export interface UsersRepository {
  list(filters?: UserFilters): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  summary(): Promise<UsersSummary>;
}

export type DataSource = "mock" | "mysql";
