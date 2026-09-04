import type { Incident, IncidentKind, IncidentStatus } from "@/data/incidents";

export type IncidentFilters = {
  kind?: IncidentKind;
  status?: IncidentStatus;
  priority?: Incident["priority"];
  source?: Incident["source"];
  /** Busca por título, detalle, autor o nombre del niño (sin distinguir mayúsculas). */
  query?: string;
};

export type IncidentsSummary = {
  total: number;
  byKind: Record<IncidentKind, number>;
  byStatus: Record<IncidentStatus, number>;
  highPriorityOpen: number;
};

/**
 * Contrato de acceso a datos del módulo de incidentes y quejas.
 * La UI solo depende de esta interfaz; la implementación (mock hoy, MySQL
 * después) se elige en `src/lib/incidents/index.ts`.
 */
export interface IncidentsRepository {
  list(filters?: IncidentFilters): Promise<Incident[]>;
  getById(id: string): Promise<Incident | null>;
  summary(filters?: IncidentFilters): Promise<IncidentsSummary>;
}
