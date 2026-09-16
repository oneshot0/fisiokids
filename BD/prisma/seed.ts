import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
  const passwordHash = await bcrypt.hash("Demo-FisioKids-2026!", 12);
  const tutorUser = await prisma.user.upsert({ where: { email: "tutor.demo@fisiokids.test" }, update: {}, create: { email: "tutor.demo@fisiokids.test", passwordHash, role: "tutor", tutorProfile: { create: { displayName: "Tutor Demo" } } }, include: { tutorProfile: true } });
  const therapistUser = await prisma.user.upsert({ where: { email: "terapeuta.demo@fisiokids.test" }, update: {}, create: { email: "terapeuta.demo@fisiokids.test", passwordHash, role: "terapeuta", therapistProfile: { create: { displayName: "Terapeuta Demo" } } }, include: { therapistProfile: true } });
  await prisma.user.upsert({ where: { email: "admin.demo@fisiokids.test" }, update: {}, create: { email: "admin.demo@fisiokids.test", passwordHash, role: "administrador" } });
  const child = await prisma.child.upsert({ where: { id: "child-demo" }, update: {}, create: { id: "child-demo", firstName: "Alex", lastName: "Demo", birthDate: new Date("2019-04-12") } });
  if (tutorUser.tutorProfile && therapistUser.therapistProfile) {
    await prisma.childTutor.upsert({ where: { childId_tutorId: { childId: child.id, tutorId: tutorUser.tutorProfile.id } }, update: {}, create: { childId: child.id, tutorId: tutorUser.tutorProfile.id, isPrimary: true } });
    await prisma.childTherapist.upsert({ where: { childId_therapistId: { childId: child.id, therapistId: therapistUser.therapistProfile.id } }, update: {}, create: { childId: child.id, therapistId: therapistUser.therapistProfile.id } });
    for (let weekday = 1; weekday <= 5; weekday++) await prisma.availability.create({ data: { therapistId: therapistUser.therapistProfile.id, weekday, startMinute: 720, endMinute: 1320 } }).catch(() => undefined);
  }
}
main().finally(() => prisma.$disconnect());
