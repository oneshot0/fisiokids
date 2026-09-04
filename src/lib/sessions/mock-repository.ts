import { sessions as seedSessions, type Session, type SessionStatus } from "@/data/sessions";
import { students } from "@/data/students";
import { users } from "@/data/users";
import type { SessionFilters, SessionsRepository, SessionsSummary } from "./repository";

const STATUSES: SessionStatus[] = ["realizada", "en_curso", "programada", "cancelada"];

function searchText(session: Session): string {
  const student = students.find((item) => item.id === session.studentId);
  const therapist = users.find((item) => item.id === session.therapistId);
  return [
    student ? `${student.firstName} ${student.lastName}` : "",
    therapist?.name ?? "",
    session.area,
  ]
    .join(" ")
    .toLowerCase();
}

function matches(session: Session, filters: SessionFilters): boolean {
  if (filters.date && session.date !== filters.date) return false;
  if (filters.status && session.status !== filters.status) return false;
  if (filters.therapistId && session.therapistId !== filters.therapistId) return false;
  if (filters.query) {
    const q = filters.query.trim().toLowerCase();
    if (q && !searchText(session).includes(q)) return false;
  }
  return true;
}

function byDateTime(a: Session, b: Session): number {
  return a.date === b.date ? a.time.localeCompare(b.time) : b.date.localeCompare(a.date);
}

/** Fuente de datos temporal basada en `src/data/sessions.ts`. */
export function createMockSessionsRepository(data: Session[] = seedSessions): SessionsRepository {
  return {
    async list(filters = {}) {
      return data.filter((session) => matches(session, filters)).sort(byDateTime);
    },
    async getById(id) {
      return data.find((session) => session.id === id) ?? null;
    },
    async summary(filters = {}) {
      const byStatus = Object.fromEntries(STATUSES.map((s) => [s, 0])) as Record<
        SessionStatus,
        number
      >;
      const summary: SessionsSummary = { total: 0, byStatus };
      for (const session of data) {
        if (!matches(session, filters)) continue;
        summary.total += 1;
        byStatus[session.status] += 1;
      }
      return summary;
    },
    async availableDates() {
      return [...new Set(data.map((session) => session.date))].sort();
    },
  };
}
