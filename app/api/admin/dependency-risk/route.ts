import { forbidden, ok } from '@/lib/api/response';
import { getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { promises as fs } from 'fs';
import path from 'path';

type DependencyRiskReport = {
  generatedAt: string;
  riskLevel: 'low' | 'medium' | 'high';
  summary: {
    vulnerabilityTotal: number;
    critical: number;
    high: number;
    moderate: number;
    low: number;
    outdatedTotal: number;
  };
  outdatedTop: Array<{ name: string; current: string; wanted: string; latest: string; location?: string }>;
};

const EMPTY: DependencyRiskReport = {
  generatedAt: new Date(0).toISOString(),
  riskLevel: 'low',
  summary: { vulnerabilityTotal: 0, critical: 0, high: 0, moderate: 0, low: 0, outdatedTotal: 0 },
  outdatedTop: [],
};

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !isAdmin(user.role)) return forbidden();
  const filePath = path.join(process.cwd(), '.ops', 'dependency-risk-report.json');
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw) as Partial<DependencyRiskReport>;
    return ok({
      report: {
        ...EMPTY,
        ...parsed,
        summary: { ...EMPTY.summary, ...(parsed.summary ?? {}) },
        outdatedTop: Array.isArray(parsed.outdatedTop) ? parsed.outdatedTop : [],
      } satisfies DependencyRiskReport,
    });
  } catch {
    return ok({ report: EMPTY, missing: true });
  }
}
