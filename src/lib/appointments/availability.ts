import { prisma } from "@/lib/db/client";
import { generateSlots } from "./slots";
export async function getAvailability(date: Date) {
  const slots = generateSlots(date);
  if (slots.length === 0) return [];
  const appointments = await prisma.appointment.findMany({ where: { startsAt: { gte: slots[0]?.startsAt }, endsAt: { lte: slots.at(-1)?.endsAt }, status: { not: "cancelled" } }, select: { startsAt: true, endsAt: true } });
  return slots.map((slot) => ({ ...slot, state: appointments.some((a) => a.startsAt < slot.endsAt && a.endsAt > slot.startsAt) ? "reserved" : "available" }));
}
