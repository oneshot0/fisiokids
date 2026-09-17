import { incidents } from "@/data/incidents";
import { schools as seedSchools, type School } from "@/data/school-directory";
import { sessions } from "@/data/sessions";
import { students } from "@/data/students";
import { users } from "@/data/users";
import type {
  SchoolFilters,
  SchoolProfile,
  SchoolsRepository,
  SchoolsSummary,
} from "./repository";

function toProfile(school: School): SchoolProfile {
  const ownStudents = students.filter((student) => student.school === school.name);
  const studentIds = new Set(ownStudents.map((student) => student.id));
  const therapistIds = new Set(ownStudents.map((student) => student.therapistId));

  return {
    ...school,
    studentsCount: ownStudents.length,
    therapistNames: users
      .filter((user) => therapistIds.has(user.id))
      .map((user) => user.name)
      .sort((a, b) => a.localeCompare(b, "es")),
    sessionsCompleted: sessions.filter(
      (session) => studentIds.has(session.studentId) && session.status === "realizada",
    ).length,
    openIncidents: incidents.filter(
      (incident) =>
        incident.status !== "resuelta" &&
        incident.studentId !== undefined &&
        studentIds.has(incident.studentId),
    ).length,
  };
}

function matches(profile: SchoolProfile, filters: SchoolFilters): boolean {
  if (filters.status && profile.status !== filters.status) return false;
  if (filters.query) {
    const q = filters.query.trim().toLowerCase();
    if (q) {
      const haystack = [profile.name, profile.district, profile.contactName, profile.level]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
  }
  return true;
}

const statusOrder: Record<School["status"], number> = { activo: 0, en_pausa: 1, prospecto: 2 };

function byStatusThenName(a: SchoolProfile, b: SchoolProfile): number {
  return (
    statusOrder[a.status] - statusOrder[b.status] || a.name.localeCompare(b.name, "es")
  );
}

/** Fuente de datos temporal basada en `src/data/school-directory.ts`. */
export function createMockSchoolsRepository(data: School[] = seedSchools): SchoolsRepository {
  const profiles = data.map(toProfile);

  return {
    async list(filters = {}) {
      return profiles.filter((profile) => matches(profile, filters)).sort(byStatusThenName);
    },
    async getById(id) {
      return profiles.find((profile) => profile.id === id) ?? null;
    },
    async summary() {
      const summary: SchoolsSummary = {
        total: profiles.length,
        byStatus: { activo: 0, en_pausa: 0, prospecto: 0 },
        studentsCovered: 0,
      };
      for (const profile of profiles) {
        summary.byStatus[profile.status] += 1;
        summary.studentsCovered += profile.studentsCount;
      }
      return summary;
    },
  };
}
