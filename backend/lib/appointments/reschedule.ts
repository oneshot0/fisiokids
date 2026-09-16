import { prisma } from "@/lib/db/client";
import { isUniqueConflict } from "@/lib/db/errors";

export async function rescheduleAppointment(id: string, startsAt: Date) {
  const endsAt = new Date(startsAt.getTime() + 60 * 60 * 1000);
  if (startsAt.getMinutes() !== 0 || startsAt.getHours() < 12 || startsAt.getHours() > 21 || endsAt.getHours() > 22) {
    throw new Error("INVALID_SLOT");
  }

  const appointment = await prisma.appointment.findUnique({ where: { id } });
  if (!appointment || appointment.status !== "scheduled" || appointment.startsAt <= new Date()) throw new Error("INVALID_STATE");

  const clash = await prisma.appointment.findFirst({
    where: {
      id: { not: id },
      status: { not: "cancelled" },
      OR: [
        { therapistId: appointment.therapistId },
        ...(appointment.roomId ? [{ roomId: appointment.roomId }] : []),
      ],
      startsAt: { lt: endsAt },
      endsAt: { gt: startsAt },
    },
  });
  if (clash) throw new Error("CONFLICT");

  try {
    return await prisma.appointment.update({ where: { id }, data: { startsAt, endsAt } });
  } catch (error) {
    if (isUniqueConflict(error)) throw new Error("CONFLICT");
    throw error;
  }
}
