import { prisma } from "@/lib/db/client";
export async function cancelAppointment(id: string, userId: string, role: string) {
  const appointment = await prisma.appointment.findUnique({ where: { id }, include: { tutor: true } });
  if (!appointment) throw new Error("NOT_FOUND");
  if (role !== "administrador" && (role !== "tutor" || appointment.tutor.userId !== userId)) throw new Error("FORBIDDEN");
  if (appointment.status !== "scheduled" || appointment.startsAt <= new Date()) throw new Error("INVALID_STATE");
  if (role === "tutor" && appointment.startsAt.getTime() - Date.now() < 24 * 60 * 60 * 1000) throw new Error("TOO_LATE");
  return prisma.appointment.update({ where: { id }, data: { status: "cancelled", cancelledAt: new Date() } });
}
