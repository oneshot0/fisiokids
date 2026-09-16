import { prisma } from "@/lib/db/client";
import { canTransition, validateTeaLevel, type EvaluationStatus } from "./rules";
export async function createEvaluation(input: { childId: string; therapistId: string; recordedAt: Date; teaLevel: number; status: EvaluationStatus; tutorVisible?: boolean }, actor: { userId: string; role: string }) {
  validateTeaLevel(input.teaLevel);
  if (actor.role === "terapeuta") {
    const therapist = await prisma.therapistProfile.findUnique({ where: { userId: actor.userId } });
    const assigned = therapist && await prisma.childTherapist.findUnique({
      where: { childId_therapistId: { childId: input.childId, therapistId: therapist.id } },
    });
    if (!therapist || !assigned?.active || input.therapistId !== therapist.id) throw new Error("FORBIDDEN");
  }
  return prisma.professionalEvaluation.create({ data: input });
}
export async function listEvaluations(userId: string, role: string) {
  if (role === "administrador") return prisma.professionalEvaluation.findMany({ orderBy: { recordedAt: "desc" } });
  if (role === "terapeuta") return prisma.professionalEvaluation.findMany({ where: { therapist: { userId } }, orderBy: { recordedAt: "desc" } });
  if (role === "tutor") return prisma.professionalEvaluation.findMany({ where: { tutorVisible: true, child: { tutorLinks: { some: { tutor: { userId } } } } }, orderBy: { recordedAt: "desc" } });
  return [];
}
export async function updateEvaluation(id: string, data: Partial<{ status: EvaluationStatus; teaLevel: number; tutorVisible: boolean }>) {
  const current = await prisma.professionalEvaluation.findUnique({ where: { id } }); if (!current) throw new Error("NOT_FOUND");
  if (data.teaLevel !== undefined) validateTeaLevel(data.teaLevel);
  if (data.status && !canTransition(current.status as EvaluationStatus, data.status)) throw new Error("INVALID_TRANSITION");
  return prisma.professionalEvaluation.update({ where: { id }, data });
}
