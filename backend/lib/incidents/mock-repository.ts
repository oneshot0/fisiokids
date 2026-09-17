import {
  incidents as seedIncidents,
  type Incident,
  type IncidentKind,
  type IncidentStatus,
} from "@/data/incidents";
import { students } from "@/data/students";
import type { IncidentFilters, IncidentsRepository, IncidentsSummary } from "./repository";

const KINDS: IncidentKind[] = ["incidente", "queja", "recomendacion"];
const STATUSES: IncidentStatus[] = ["nueva", "en_revision", "resuelta"];
const priorityOrder: Record<Incident["priority"], number> = { alta: 0, media: 1, baja: 2 };

function searchText(incident: Incident): string {
  const student = students.find((item) => item.id === incident.studentId);
  return [
    incident.title,
    incident.detail,
    incident.authorName,
    student ? `${student.firstName} ${student.lastName}` : "",
  ]
    .join(" ")
    .toLowerCase();
}

function matches(incident: Incident, filters: IncidentFilters): boolean {
  if (filters.kind && incident.kind !== filters.kind) return false;
  if (filters.status && incident.status !== filters.status) return false;
  if (filters.priority && incident.priority !== filters.priority) return false;
  if (filters.source && incident.source !== filters.source) return false;
  if (filters.query) {
    const q = filters.query.trim().toLowerCase();
    if (q && !searchText(incident).includes(q)) return false;
  }
  return true;
}

/** Pendientes primero, luego por prioridad y fecha más reciente. */
function byUrgency(a: Incident, b: Incident): number {
  const aResolved = a.status === "resuelta" ? 1 : 0;
  const bResolved = b.status === "resuelta" ? 1 : 0;
  if (aResolved !== bResolved) return aResolved - bResolved;
  if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  }
  return b.date.localeCompare(a.date);
}

/** Fuente de datos temporal basada en `src/data/incidents.ts`. */
export function createMockIncidentsRepository(
  data: Incident[] = seedIncidents,
): IncidentsRepository {
  return {
    async list(filters = {}) {
      return data.filter((incident) => matches(incident, filters)).sort(byUrgency);
    },
    async getById(id) {
      return data.find((incident) => incident.id === id) ?? null;
    },
    async summary(filters = {}) {
      const byKind = Object.fromEntries(KINDS.map((k) => [k, 0])) as Record<IncidentKind, number>;
      const byStatus = Object.fromEntries(STATUSES.map((s) => [s, 0])) as Record<
        IncidentStatus,
        number
      >;
      const summary: IncidentsSummary = { total: 0, byKind, byStatus, highPriorityOpen: 0 };
      for (const incident of data) {
        if (!matches(incident, filters)) continue;
        summary.total += 1;
        byKind[incident.kind] += 1;
        byStatus[incident.status] += 1;
        if (incident.priority === "alta" && incident.status !== "resuelta") {
          summary.highPriorityOpen += 1;
        }
      }
      return summary;
    },
  };
}
