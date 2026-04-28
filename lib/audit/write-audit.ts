import type { CurrentUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';

type AuditEntry = {
  actor: CurrentUser;
  action: string;
  entityType: string;
  entityId: string;
  details?: string;
};

/**
 * Writes an audit row without breaking the main request flow.
 */
export async function writeAudit(entry: AuditEntry): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        actorId: entry.actor.id,
        actorName: entry.actor.username,
        actorRole: entry.actor.role,
        action: entry.action,
        entityType: entry.entityType,
        entityId: entry.entityId,
        details: (entry.details ?? '').slice(0, 500),
      },
    });
  } catch {
    // Non-blocking audit: business operation should still complete.
  }
}
