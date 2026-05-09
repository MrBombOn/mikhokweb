import { prisma } from '@/lib/db';
import { dispatchStaffNotification } from '@/lib/notifications/staff-dispatch';

const ALERT_WINDOW_HOURS = 24;
const ALERT_EXPORT_COUNT = 3;
const ALERT_ROW_THRESHOLD = 2000;

export async function evaluateAuditExportAlerts(input: { actorId: string; actorName: string; rows: number }) {
  const since = new Date(Date.now() - ALERT_WINDOW_HOURS * 60 * 60 * 1000);
  const recentExportsByActor = await prisma.auditLog.count({
    where: {
      action: 'export_audit_csv',
      actorId: input.actorId,
      createdAt: { gte: since },
    },
  });

  if (recentExportsByActor >= ALERT_EXPORT_COUNT) {
    dispatchStaffNotification({
      eventKey: 'audit_export_rule_threshold',
      severity: 'critical',
      titleHu: 'Audit export riasztás',
      titleEn: 'Audit export alert',
      bodyHu: `${input.actorName} ${recentExportsByActor} audit exportot indított az elmúlt ${ALERT_WINDOW_HOURS} órában.`,
      bodyEn: `${input.actorName} triggered ${recentExportsByActor} audit exports in the last ${ALERT_WINDOW_HOURS} hours.`,
      meta: {
        actorId: input.actorId,
        rule: 'exports_per_actor_window',
        threshold: ALERT_EXPORT_COUNT,
        windowHours: ALERT_WINDOW_HOURS,
        observed: recentExportsByActor,
      },
    });
  }

  if (input.rows >= ALERT_ROW_THRESHOLD) {
    dispatchStaffNotification({
      eventKey: 'audit_export_rule_rows',
      severity: 'critical',
      titleHu: 'Audit export mennyiségi riasztás',
      titleEn: 'Audit export volume alert',
      bodyHu: `${input.actorName} egyszerre ${input.rows} sort exportált (küszöb: ${ALERT_ROW_THRESHOLD}).`,
      bodyEn: `${input.actorName} exported ${input.rows} rows in one action (threshold: ${ALERT_ROW_THRESHOLD}).`,
      meta: {
        actorId: input.actorId,
        rule: 'single_export_rows',
        threshold: ALERT_ROW_THRESHOLD,
        observed: input.rows,
      },
    });
  }
}
