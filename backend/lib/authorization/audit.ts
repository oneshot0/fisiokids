import { prisma } from "@/lib/db/client";
export function audit(actorUserId: string, action: string, entity: string, entityId: string, metadataRedacted?: object) {
  return prisma.auditLog.create({ data: { actorUserId, action, entity, entityId, metadataRedacted } });
}
