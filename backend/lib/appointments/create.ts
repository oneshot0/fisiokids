import { prisma } from "@/lib/db/client";
import { isUniqueConflict } from "@/lib/db/errors";
export async function createAppointment(input: { childId: string; therapistId?: string; tutorUserId: string; startsAt: Date; roomId?: string }) {
  const endsAt = new Date(input.startsAt.getTime() + 60 * 60 * 1000);
  if (input.startsAt.getMinutes() !== 0 || input.startsAt.getHours() < 12 || input.startsAt.getHours() > 21) throw new Error("INVALID_SLOT");
  if (endsAt.getHours() > 22) throw new Error("INVALID_SLOT");
  const tutor = await prisma.tutorProfile.findUnique({ where: { userId: input.tutorUserId } });
  if (!tutor) throw new Error("FORBIDDEN");
  const relation = await prisma.childTutor.findUnique({ where: { childId_tutorId: { childId: input.childId, tutorId: tutor.id } } });
  if (!relation) throw new Error("FORBIDDEN");
  const assigned = input.therapistId
    ? await prisma.childTherapist.findUnique({ where: { childId_therapistId: { childId: input.childId, therapistId: input.therapistId } } })
    : await prisma.childTherapist.findFirst({ where: { childId: input.childId, active: true }, orderBy: { therapistId: "asc" } });
  if (!assigned?.active) throw new Error("FORBIDDEN");
  const therapistId = assigned.therapistId;
  const clash = await prisma.appointment.findFirst({ where: { status: { not: "cancelled" }, OR: [{ therapistId }, ...(input.roomId ? [{ roomId: input.roomId }] : [])], startsAt: { lt: endsAt }, endsAt: { gt: input.startsAt } } });
  if (clash) throw new Error("CONFLICT");
  try { return await prisma.appointment.create({ data: { childId: input.childId, tutorId: tutor.id, therapistId, roomId: input.roomId, startsAt: input.startsAt, endsAt, directMinutes: 45, operationalMinutes: 15, status: "scheduled" } }); } catch (e) { if (isUniqueConflict(e)) throw new Error("CONFLICT"); throw e; }
}
