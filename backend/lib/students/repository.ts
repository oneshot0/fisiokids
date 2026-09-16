import type { Student } from "@/data/students";

export type StudentFilters = {
  therapistId?: string;
  area?: string;
  school?: string;
  /** Busca por nombre del niño, apoderado, terapeuta o colegio (sin distinguir mayúsculas). */
  query?: string;
};

/** Niño con sus vínculos resueltos, listo para mostrar en la UI. */
export type StudentProfile = Student & {
  parentName: string | null;
  parentEmail: string | null;
  therapistName: string | null;
  enrolledAt: string | null;
  sessionsCompleted: number;
  sessionsCancelled: number;
  openIncidents: number;
};

export type StudentsSummary = {
  total: number;
  byArea: Record<string, number>;
  byTherapist: Record<string, number>;
  enrolledThisMonth: number;
};

/**
 * Contrato de acceso a datos del módulo de niños.
 * La UI solo depende de esta interfaz; la implementación (mock hoy, MySQL
 * después) se elige en `src/lib/students/index.ts`.
 */
export interface StudentsRepository {
  list(filters?: StudentFilters): Promise<StudentProfile[]>;
  getById(id: string): Promise<StudentProfile | null>;
  summary(): Promise<StudentsSummary>;
  /** Áreas terapéuticas presentes, ordenadas alfabéticamente. */
  areas(): Promise<string[]>;
}
