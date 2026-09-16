import { prisma } from "@/lib/db/client";
export async function schoolStudents(userId: string) {
  const membership = await prisma.schoolMembership.findFirst({ where: { userId, active: true, school: { active: true } } });
  if (!membership) throw new Error("FORBIDDEN");
  const children = await prisma.child.findMany({ where: { schoolLinks: { some: { schoolId: membership.schoolId, active: true } } }, include: { tutorLinks: { where: { isPrimary: true }, include: { tutor: true } }, therapistLinks: { where: { active: true }, include: { therapist: true } } } });
  return children.map((c) => ({ name: `${c.firstName} ${c.lastName}`, guardianName: c.tutorLinks[0]?.tutor.displayName ?? "Tutor responsable", therapistName: c.therapistLinks[0]?.therapist.displayName, operationalStatus: c.operationalStatus }));
}
