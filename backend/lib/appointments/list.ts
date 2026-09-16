import { prisma } from "@/lib/db/client";
export async function listAppointments(userId: string, role: string) {
  const where = role === "administrador" ? {} : role === "tutor" ? { tutor: { userId } } : role === "terapeuta" ? { therapist: { userId } } : { id: "__none__" };
  return prisma.appointment.findMany({ where, orderBy: { startsAt: "asc" }, include: { child: true, therapist: true } });
}
