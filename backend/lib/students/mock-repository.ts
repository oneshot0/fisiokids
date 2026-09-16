import { enrollments } from "@/data/enrollments";
import { incidents } from "@/data/incidents";
import { sessions, today } from "@/data/sessions";
import { students as seedStudents, type Student } from "@/data/students";
import { users } from "@/data/users";
import type {
  StudentFilters,
  StudentProfile,
  StudentsRepository,
  StudentsSummary,
} from "./repository";

function toProfile(student: Student): StudentProfile {
  const parent = users.find((user) => user.id === student.parentId);
  const therapist = users.find((user) => user.id === student.therapistId);
  const enrollment = enrollments.find((item) => item.studentId === student.id);
  const ownSessions = sessions.filter((session) => session.studentId === student.id);

  return {
    ...student,
    parentName: parent?.name ?? null,
    parentEmail: parent?.email ?? null,
    therapistName: therapist?.name ?? null,
    enrolledAt: enrollment?.date ?? null,
    sessionsCompleted: ownSessions.filter((session) => session.status === "realizada").length,
    sessionsCancelled: ownSessions.filter((session) => session.status === "cancelada").length,
    openIncidents: incidents.filter(
      (incident) => incident.studentId === student.id && incident.status !== "resuelta",
    ).length,
  };
}

function matches(profile: StudentProfile, filters: StudentFilters): boolean {
  if (filters.therapistId && profile.therapistId !== filters.therapistId) return false;
  if (filters.area && !profile.areas.includes(filters.area)) return false;
  if (filters.school && profile.school !== filters.school) return false;
  if (filters.query) {
    const q = filters.query.trim().toLowerCase();
    if (q) {
      const haystack = [
        `${profile.firstName} ${profile.lastName}`,
        profile.parentName ?? "",
        profile.therapistName ?? "",
        profile.school,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
  }
  return true;
}

function byName(a: StudentProfile, b: StudentProfile): number {
  return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`, "es");
}

/** Fuente de datos temporal basada en `src/data/students.ts` y sus vínculos. */
export function createMockStudentsRepository(data: Student[] = seedStudents): StudentsRepository {
  const profiles = data.map(toProfile);

  return {
    async list(filters = {}) {
      return profiles.filter((profile) => matches(profile, filters)).sort(byName);
    },
    async getById(id) {
      return profiles.find((profile) => profile.id === id) ?? null;
    },
    async summary() {
      const summary: StudentsSummary = {
        total: profiles.length,
        byArea: {},
        byTherapist: {},
        enrolledThisMonth: 0,
      };
      for (const profile of profiles) {
        for (const area of profile.areas) {
          summary.byArea[area] = (summary.byArea[area] ?? 0) + 1;
        }
        summary.byTherapist[profile.therapistId] =
          (summary.byTherapist[profile.therapistId] ?? 0) + 1;
        if (profile.enrolledAt?.startsWith(today.slice(0, 7))) summary.enrolledThisMonth += 1;
      }
      return summary;
    },
    async areas() {
      return [...new Set(profiles.flatMap((profile) => profile.areas))].sort((a, b) =>
        a.localeCompare(b, "es"),
      );
    },
  };
}
