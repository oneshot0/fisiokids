export type SessionStatus = "realizada" | "en_curso" | "programada" | "cancelada";

export type Session = {
  id: string;
  date: string;
  time: string;
  studentId: string;
  therapistId: string;
  area: string;
  status: SessionStatus;
  cancelReason?: string;
  cancelledBy?: "padre" | "terapeuta" | "colegio";
};

export const sessionStatusLabels: Record<SessionStatus, string> = {
  realizada: "Realizada",
  en_curso: "En curso",
  programada: "Programada",
  cancelada: "Cancelada",
};

export const today = "2026-09-03";

const studentIds = [
  "student-mateo",
  "student-valentina",
  "student-santiago",
  "student-emilia",
  "student-lucas",
];

const therapistIds = ["therapist-diego", "therapist-ana", "therapist-carla"];

const todaySessions: Session[] = [
  {
    id: "session-today-1",
    date: today,
    time: "09:00",
    studentId: "student-mateo",
    therapistId: "therapist-diego",
    area: "Lenguaje",
    status: "realizada",
  },
  {
    id: "session-today-2",
    date: today,
    time: "10:00",
    studentId: "student-valentina",
    therapistId: "therapist-diego",
    area: "Sensorial",
    status: "realizada",
  },
  {
    id: "session-today-3",
    date: today,
    time: "11:00",
    studentId: "student-santiago",
    therapistId: "therapist-ana",
    area: "Motora",
    status: "en_curso",
  },
  {
    id: "session-today-4",
    date: today,
    time: "12:00",
    studentId: "student-emilia",
    therapistId: "therapist-ana",
    area: "Lenguaje",
    status: "programada",
  },
  {
    id: "session-today-5",
    date: today,
    time: "13:00",
    studentId: "student-lucas",
    therapistId: "therapist-carla",
    area: "Autonomía",
    status: "programada",
  },
  {
    id: "session-today-6",
    date: today,
    time: "14:00",
    studentId: "student-mateo",
    therapistId: "therapist-diego",
    area: "Motora",
    status: "realizada",
  },
  {
    id: "session-today-7",
    date: today,
    time: "15:00",
    studentId: "student-valentina",
    therapistId: "therapist-diego",
    area: "Autonomía",
    status: "cancelada",
    cancelReason: "El colegio tuvo actividad institucional.",
    cancelledBy: "colegio",
  },
  {
    id: "session-today-8",
    date: today,
    time: "16:00",
    studentId: "student-santiago",
    therapistId: "therapist-ana",
    area: "Motora",
    status: "cancelada",
    cancelReason: "La familia solicitó reprogramar la sesión.",
    cancelledBy: "padre",
  },
];

const historyCounts = [6, 8, 5, 7, 9, 6, 8, 5, 7, 8, 6, 9, 5, 7];
const historyCancelled = [1, 0, 2, 1, 0, 1, 0, 2, 1, 0, 1, 0, 2, 1];

function dateOffset(offset: number): string {
  const date = new Date(`${today}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + offset);
  return date.toISOString().slice(0, 10);
}

const historySessions: Session[] = historyCounts.flatMap((count, dayIndex) => {
  const date = dateOffset(dayIndex - historyCounts.length);
  const cancelledCount = historyCancelled[dayIndex];

  return Array.from({ length: count }, (_, sessionIndex): Session => {
    const cancelled = sessionIndex < cancelledCount;

    return {
      id: `session-history-${dayIndex + 1}-${sessionIndex + 1}`,
      date,
      time: `${String(8 + sessionIndex).padStart(2, "0")}:00`,
      studentId: studentIds[(dayIndex + sessionIndex) % studentIds.length],
      therapistId: therapistIds[(dayIndex + sessionIndex) % therapistIds.length],
      area: ["Lenguaje", "Motora", "Sensorial", "Autonomía"][
        (dayIndex + sessionIndex) % 4
      ],
      status: cancelled ? "cancelada" : "realizada",
      ...(cancelled
        ? {
            cancelReason:
              sessionIndex % 2 === 0
                ? "La familia solicitó cambiar el horario."
                : "El terapeuta no pudo asistir.",
            cancelledBy: sessionIndex % 2 === 0 ? "padre" : "terapeuta",
          }
        : {}),
    };
  });
});

export const sessions: Session[] = [...historySessions, ...todaySessions];

export type DayStats = {
  date: string;
  label: string;
  realizadas: number;
  canceladas: number;
};

const weekdayLabels = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export function sessionsByDay(days = 14): DayStats[] {
  return Array.from({ length: days }, (_, index) => {
    const date = dateOffset(index - days + 1);
    const dateObject = new Date(`${date}T00:00:00Z`);
    const daySessions = sessions.filter((session) => session.date === date);

    return {
      date,
      label: `${weekdayLabels[dateObject.getUTCDay()]} ${dateObject.getUTCDate()}`,
      realizadas: daySessions.filter((session) => session.status === "realizada").length,
      canceladas: daySessions.filter((session) => session.status === "cancelada").length,
    };
  });
}
