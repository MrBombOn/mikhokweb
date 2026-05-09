'use strict';

const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { loadProjectEnv } = require('../lib/load-env.cjs');

loadProjectEnv();

const prisma = new PrismaClient();

const WINDOW_HOURS = Number(process.env.AUDIT_EXPORT_ALERT_WINDOW_HOURS || 24);
const THRESHOLD_PER_ACTOR = Number(process.env.AUDIT_EXPORT_ALERT_COUNT || 3);

async function main() {
  const since = new Date(Date.now() - WINDOW_HOURS * 60 * 60 * 1000);
  const rows = await prisma.auditLog.groupBy({
    by: ['actorId', 'actorName'],
    where: {
      action: 'export_audit_csv',
      createdAt: { gte: since },
    },
    _count: { _all: true },
  });

  const alerts = rows
    .filter((r) => Number(r._count._all || 0) >= THRESHOLD_PER_ACTOR)
    .map((r) => ({
      actorId: r.actorId,
      actorName: r.actorName,
      exportCount: Number(r._count._all || 0),
      threshold: THRESHOLD_PER_ACTOR,
      windowHours: WINDOW_HOURS,
    }));

  const outPath = path.resolve(process.cwd(), '.ops', 'audit-export-alerts.json');
  require('fs').mkdirSync(path.dirname(outPath), { recursive: true });
  require('fs').writeFileSync(
    outPath,
    JSON.stringify({ generatedAt: new Date().toISOString(), alerts }, null, 2) + '\n',
    'utf8',
  );

  console.log(`[audit-export-alerts] ${alerts.length} alert candidate(s). Output: .ops/audit-export-alerts.json`);
}

main()
  .catch((error) => {
    console.error('[audit-export-alerts] failed', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
