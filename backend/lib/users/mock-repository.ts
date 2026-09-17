import { users as seedUsers, type Role, type User } from "@/data/users";
import type { UserFilters, UsersRepository, UsersSummary } from "./repository";

const ROLES: Role[] = ["admin", "terapeuta", "padre"];

function matches(user: User, filters: UserFilters): boolean {
  if (filters.role && user.role !== filters.role) return false;
  if (filters.active !== undefined && user.active !== filters.active) return false;
  if (filters.query) {
    const q = filters.query.trim().toLowerCase();
    if (q) {
      const haystack = [user.name, user.email, user.school ?? ""].join(" ").toLowerCase();
      if (!haystack.includes(q)) return false;
    }
  }
  return true;
}

/** Fuente de datos temporal basada en `src/data/users.ts`. */
export function createMockUsersRepository(data: User[] = seedUsers): UsersRepository {
  return {
    async list(filters = {}) {
      return data.filter((user) => matches(user, filters));
    },
    async getById(id) {
      return data.find((user) => user.id === id) ?? null;
    },
    async getByEmail(email) {
      const normalized = email.trim().toLowerCase();
      return data.find((user) => user.email.toLowerCase() === normalized) ?? null;
    },
    async summary() {
      const byRole = Object.fromEntries(ROLES.map((role) => [role, 0])) as Record<Role, number>;
      const summary: UsersSummary = { total: data.length, active: 0, inactive: 0, byRole };
      for (const user of data) {
        byRole[user.role] += 1;
        if (user.active) summary.active += 1;
        else summary.inactive += 1;
      }
      return summary;
    },
  };
}
