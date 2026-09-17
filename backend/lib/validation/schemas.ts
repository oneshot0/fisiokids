import { z } from "zod";
export const appointmentCreateSchema = z.object({ childId: z.string().min(1), startsAt: z.coerce.date(), therapistId: z.string().min(1).optional(), roomId: z.string().optional() });
export const rescheduleSchema = z.object({ startsAt: z.coerce.date() });
export const evaluationSchema = z.object({ childId: z.string().min(1), therapistId: z.string().min(1), recordedAt: z.coerce.date(), teaLevel: z.union([z.literal(1), z.literal(2), z.literal(3)]), status: z.enum(["draft", "active", "superseded"]).default("draft"), tutorVisible: z.boolean().optional() });
export const schoolMembershipSchema = z.object({ userId: z.string().min(1), schoolId: z.string().min(1), active: z.boolean().optional() });
export const childSchoolSchema = z.object({ childId: z.string().min(1), schoolId: z.string().min(1), active: z.boolean().optional() });
