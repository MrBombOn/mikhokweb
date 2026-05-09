'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { loadProjectEnv } = require('../lib/load-env.cjs');

loadProjectEnv();

const root = path.resolve(__dirname, '../..');
const outDir = path.join(root, '.ops');
const outFile = path.join(outDir, 'dependency-risk-report.json');

function runJson(command, args) {
  const proc = spawnSync(command, args, {
    cwd: root,
    shell: process.platform === 'win32',
    encoding: 'utf8',
    env: process.env,
  });
  const stdout = String(proc.stdout || '').trim();
  const stderr = String(proc.stderr || '').trim();
  return { status: proc.status || 0, stdout, stderr };
}

function safeParseJson(raw, fallback) {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

const auditRes = runJson('npm', ['audit', '--json']);
const outdatedRes = runJson('npm', ['outdated', '--json']);

const audit = safeParseJson(auditRes.stdout, {});
const outdated = safeParseJson(outdatedRes.stdout, {});
const vulnerabilityTotal = Object.values(audit?.metadata?.vulnerabilities || {}).reduce((acc, value) => {
  return typeof value === 'number' ? acc + value : acc;
}, 0);
const outdatedItems = Object.entries(outdated || {}).map(([name, item]) => ({
  name,
  current: item.current || 'unknown',
  wanted: item.wanted || 'unknown',
  latest: item.latest || 'unknown',
  location: item.location || '',
}));

const criticalOrHigh = ['critical', 'high'].reduce((acc, key) => {
  const count = Number(audit?.metadata?.vulnerabilities?.[key] || 0);
  return acc + (Number.isFinite(count) ? count : 0);
}, 0);

const riskLevel = criticalOrHigh > 0 ? 'high' : vulnerabilityTotal > 0 || outdatedItems.length > 15 ? 'medium' : 'low';

const payload = {
  generatedAt: new Date().toISOString(),
  riskLevel,
  summary: {
    vulnerabilityTotal,
    critical: Number(audit?.metadata?.vulnerabilities?.critical || 0),
    high: Number(audit?.metadata?.vulnerabilities?.high || 0),
    moderate: Number(audit?.metadata?.vulnerabilities?.moderate || 0),
    low: Number(audit?.metadata?.vulnerabilities?.low || 0),
    outdatedTotal: outdatedItems.length,
  },
  outdatedTop: outdatedItems.slice(0, 20),
  commands: {
    auditStatusCode: auditRes.status,
    outdatedStatusCode: outdatedRes.status,
  },
};

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(payload, null, 2) + '\n', 'utf8');
console.log(`[dependency-risk] report written: ${path.relative(root, outFile)}`);
