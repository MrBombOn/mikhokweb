'use strict';

/**
 * RetentionConfig alapú törlés: AuditLog + FeedbackSubmission régi sorai.
 * Request-scope log nincs Prisma táblában — requestLogDays csak jelzés a host log rotációhoz.
 *
 * Száraz futás: RETENTION_PRUNE_DRY_RUN=1
 */
const { PrismaClient } = require('@prisma/client');
const { loadProjectEnv } = require('../lib/load-env.cjs');

loadProjectEnv();

const prisma = new PrismaClient();

async function ensureRetentionConfig() {
  const found = await prisma.retentionConfig.findUnique({ where: { id: 1 } });
  if (found) return found;
  return prisma.retentionConfig.create({ data: { id: 1 } });
}

async function main() {
  const dry = process.env.RETENTION_PRUNE_DRY_RUN === '1';
  const cfg = await ensureRetentionConfig();
  const now = Date.now();
  const auditCut = new Date(now - cfg.auditLogDays * 86400000);
  const feedbackCut = new Date(now - cfg.feedbackDays * 86400000);

  let auditDeleted = 0;
  let feedbackDeleted = 0;

  if (dry) {
    auditDeleted = await prisma.auditLog.count({ where: { createdAt: { lt: auditCut } } });
    feedbackDeleted = await prisma.feedbackSubmission.count({ where: { createdAt: { lt: feedbackCut } } });
  } else {
    const ar = await prisma.auditLog.deleteMany({ where: { createdAt: { lt: auditCut } } });
    auditDeleted = ar.count;
    const fr = await prisma.feedbackSubmission.deleteMany({ where: { createdAt: { lt: feedbackCut } } });
    feedbackDeleted = fr.count;
  }

  const report = {
    dryRun: dry,
    generatedAt: new Date().toISOString(),
    auditLogDays: cfg.auditLogDays,
    feedbackDays: cfg.feedbackDays,
    requestLogDaysNote:
      'ApiRequestLog nincs DB-ben — a hoston rotáld / archiváld a strukturált logokat ennek megfelelően.',
    cutoffs: { auditOlderThan: auditCut.toISOString(), feedbackOlderThan: feedbackCut.toISOString() },
    deleted: { auditLogRows: auditDeleted, feedbackRows: feedbackDeleted },
  };
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(report, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
