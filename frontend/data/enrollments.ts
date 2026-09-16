import { students } from "./students";

export type Enrollment = {
  studentId: string;
  date: string;
  school: string;
};

export const enrollments: Enrollment[] = [
  { studentId: students[0].id, date: "2026-09-01", school: students[0].school },
  { studentId: students[1].id, date: "2026-09-02", school: students[1].school },
  { studentId: students[2].id, date: "2026-08-18", school: students[2].school },
  { studentId: students[3].id, date: "2026-08-11", school: students[3].school },
  { studentId: students[4].id, date: "2026-07-28", school: students[4].school },
];
