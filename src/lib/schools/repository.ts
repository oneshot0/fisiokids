import type { School, SchoolStatus } from "@/data/school-directory";

export type SchoolFilters = {
  status?: SchoolStatus;
  /** Busca por nombre, distrito o contacto (sin distinguir mayúsculas). */
  query?: string;
};

/** Colegio con métricas derivadas de niños, sesiones e incidentes. */
export type SchoolProfile = School & {
  studentsCount: number;
  therapistNames: string[];
  sessionsCompleted: number;
  openIncidents: number;
};

export type SchoolsSummary = {
  total: number;
  byStatus: Record<SchoolStatus, number>;
  studentsCovered: number;
};

/**
 * Contrato de acceso a datos del módulo de colegios.
 * La UI solo depende de esta interfaz; la implementación (mock hoy, MySQL
 * después) se elige en `src/lib/schools/index.ts`.
 */
export interface SchoolsRepository {
  list(filters?: SchoolFilters): Promise<SchoolProfile[]>;
  getById(id: string): Promise<SchoolProfile | null>;
  summary(): Promise<SchoolsSummary>;
}
