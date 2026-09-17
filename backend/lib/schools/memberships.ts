import { prisma } from "@/lib/db/client";

export function upsertSchoolMembership(input: { userId: string; schoolId: string; active?: boolean }) {
  return prisma.schoolMembership.upsert({
    where: { userId_schoolId: { userId: input.userId, schoolId: input.schoolId } },
    create: { userId: input.userId, schoolId: input.schoolId, active: input.active ?? true },
    update: { active: input.active ?? true },
  });
}

export function linkChildToSchool(input: { childId: string; schoolId: string; active?: boolean }) {
  return prisma.childSchool.upsert({
    where: { childId_schoolId: { childId: input.childId, schoolId: input.schoolId } },
    create: { childId: input.childId, schoolId: input.schoolId, active: input.active ?? true },
    update: { active: input.active ?? true },
  });
}
