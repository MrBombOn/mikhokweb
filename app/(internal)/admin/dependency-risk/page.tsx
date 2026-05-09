'use client';

import { useCallback, useEffect, useState } from 'react';
import { SectionHeader, Card } from '@/components/ui/Core';
import { useApp } from '@/components/layout/AppProvider';
import { t } from '@/lib/content';

type Report = {
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
  outdatedTop: Array<{ name: string; current: string; wanted: string; latest: string }>;
};

export default function DependencyRiskPage() {
  const { lang } = useApp();
  const m = t(lang).internal;
  const [report, setReport] = useState<Report | null>(null);
  const [missing, setMissing] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/dependency-risk', { credentials: 'include' });
    const data = (await res.json().catch(() => ({}))) as { report?: Report; missing?: boolean };
    setReport(data.report ?? null);
    setMissing(Boolean(data.missing));
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="app-shell section">
      <SectionHeader eyebrow={m.dependencyRiskEyebrow} title={m.dependencyRiskTitle} text={m.dependencyRiskLead} />
      <Card strong>
        <p>
          {m.dependencyRiskLevel}: <strong>{report?.riskLevel ?? 'n/a'}</strong>
        </p>
        <p className="muted-text">
          {m.dependencyRiskGeneratedAt}: {report ? new Date(report.generatedAt).toLocaleString(lang === 'hu' ? 'hu-HU' : 'en-US') : 'n/a'}
        </p>
        {missing ? <p className="muted-text">{m.dependencyRiskMissing}</p> : null}
      </Card>
      {report ? (
        <Card>
          <p>
            {m.dependencyRiskVulnerabilities}: {report.summary.vulnerabilityTotal} (critical: {report.summary.critical}, high:{' '}
            {report.summary.high}, moderate: {report.summary.moderate}, low: {report.summary.low})
          </p>
          <p>
            {m.dependencyRiskOutdated}: {report.summary.outdatedTotal}
          </p>
          <ul>
            {report.outdatedTop.map((item) => (
              <li key={item.name}>
                {item.name}: {item.current} → {item.latest} ({m.dependencyRiskWanted}: {item.wanted})
              </li>
            ))}
          </ul>
        </Card>
      ) : null}
    </div>
  );
}
