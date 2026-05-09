/**
 * @file Audit lista szűrők – közös a `GET /api/audit` és `GET /api/audit/export` számára.
 */
import type { Prisma } from '@prisma/client';

export type AuditListParams = {
  action?: string;
  actor?: string;
  actorRole?: string;
  entityType?: string;
  entityId?: string;
  q?: string;
  from?: string;
  to?: string;
  sort: 'asc' | 'desc';
  limit: number;
  page: number;
  skip: number;
};

export function parseAuditListParams(searchParams: URLSearchParams): AuditListParams {
  const action = searchParams.get('action')?.trim() || undefined;
  const actor = searchParams.get('actor')?.trim() || undefined;
  const actorRole = searchParams.get('actorRole')?.trim() || undefined;
  const entityType = searchParams.get('entityType')?.trim() || undefined;
  const entityId = searchParams.get('entityId')?.trim() || undefined;
  const q = searchParams.get('q')?.trim() || undefined;
  const from = searchParams.get('from')?.trim() || undefined;
  const to = searchParams.get('to')?.trim() || undefined;
  const sort = searchParams.get('sort') === 'asc' ? 'asc' : 'desc';
  const rawLimit = Math.min(100, Math.max(10, Number(searchParams.get('limit') ?? '50')));
  const rawPage = Math.max(1, Number(searchParams.get('page') ?? '1'));
  const limit = Number.isFinite(rawLimit) ? rawLimit : 50;
  const page = Number.isFinite(rawPage) ? rawPage : 1;
  const skip = (page - 1) * limit;

  return {
    action,
    actor,
    actorRole,
    entityType,
    entityId,
    q,
    from,
    to,
    sort,
    limit,
    page,
    skip,
  };
}

export function auditDateRange(from?: string, to?: string): { gte?: Date; lte?: Date } | undefined {
  if (!from && !to) return undefined;
  const out: { gte?: Date; lte?: Date } = {};
  if (from) {
    const d = new Date(from);
    if (!Number.isNaN(d.valueOf())) out.gte = d;
  }
  if (to) {
    const d = new Date(to);
    if (!Number.isNaN(d.valueOf())) out.lte = d;
  }
  return out.gte || out.lte ? out : undefined;
}

export function buildAuditWhere(p: AuditListParams): Prisma.AuditLogWhereInput {
  const dateRange = auditDateRange(p.from, p.to);

  return {
    ...(p.action ? { action: { contains: p.action } } : {}),
    ...(p.actor ? { actorName: { contains: p.actor } } : {}),
    ...(p.actorRole ? { actorRole: { equals: p.actorRole } } : {}),
    ...(p.entityType ? { entityType: { contains: p.entityType } } : {}),
    ...(p.entityId ? { entityId: { equals: p.entityId } } : {}),
    ...(dateRange ? { createdAt: dateRange } : {}),
    ...(p.q
      ? {
          OR: [
            { details: { contains: p.q } },
            { entityId: { contains: p.q } },
            { action: { contains: p.q } },
            { actorName: { contains: p.q } },
          ],
        }
      : {}),
  };
}

/** Export: ugyanaz a szűrő mint a lista, de sorok száma külön (`exportLimit`, nem a lapozó `limit`). */
export function parseAuditExportParams(searchParams: URLSearchParams): AuditListParams & { exportLimit: number } {
  const clone = new URLSearchParams(searchParams);
  clone.delete('page');
  clone.set('limit', '50');
  const base = parseAuditListParams(clone);
  const raw = Math.min(5000, Math.max(1, Number(searchParams.get('exportLimit') ?? '2000')));
  const exportLimit = Number.isFinite(raw) ? raw : 2000;
  return {
    ...base,
    exportLimit,
    skip: 0,
    page: 1,
  };
}
