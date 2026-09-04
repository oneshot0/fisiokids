import type { Session, SessionStatus } from "@/data/sessions";

export type SessionFilters = {
  /** Fecha exacta `YYYY-MM-DD`. */
  date?: string;
  status?: SessionStatus;
  therapistId?: string;
  /** Busca por nombre del niño, terapeuta o área (sin distinguir mayúsculas). */
  query?: string;
};

export type SessionsSummary = {
  total: number;
  byStatus: Record<SessionStatus, number>;
};

export type DateRange = { from: string; to: string };

/**
 * Contrato de acceso a datos del módulo de sesiones.
 * La UI solo depende de esta interfaz; la implementación (mock hoy, MySQL
 * después) se elige en `src/lib/sessions/index.ts`.
 */
export interface SessionsRepository {
  list(filters?: SessionFilters): Promise<Session[]>;
  getById(id: string): Promise<Session | null>;
  summary(filters?: SessionFilters): Promise<SessionsSummary>;
  /** Fechas con sesiones registradas, ordenadas ascendente. */
  availableDates(): Promise<string[]>;
}
