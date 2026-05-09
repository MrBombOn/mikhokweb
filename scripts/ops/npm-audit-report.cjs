/**
 * npm audit JSON → .ops/npm-audit-report.json (Fázis 16 supply chain).
 * Kilépési kód: 0 ha nincs sebezhetőség, 1 ha van (npm alapértelmezés) — CI-ben artifact + opcionális gate.
 */
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..', '..');
const outDir = path.join(root, '.ops');
const outFile = path.join(outDir, 'npm-audit-report.json');

function run() {
  let raw = '';
  try {
    raw = execSync('npm audit --json', {
      cwd: root,
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
  } catch (e) {
    raw = (e.stdout && String(e.stdout)) || (e.stderr && String(e.stderr)) || '';
    if (!raw.trim()) throw e;
  }

  const data = JSON.parse(raw);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(data, null, 2), 'utf8');

  const meta = data.metadata?.vulnerabilities || {};
  // eslint-disable-next-line no-console -- CLI
  console.log('[npm-audit-report] wrote', path.relative(root, outFile));
  // eslint-disable-next-line no-console -- CLI
  console.log('[npm-audit-report] summary', JSON.stringify(meta));

  const total =
    (meta.info || 0) + (meta.low || 0) + (meta.moderate || 0) + (meta.high || 0) + (meta.critical || 0);
  process.exitCode = total > 0 ? 1 : 0;
}

try {
  run();
} catch (e) {
  // eslint-disable-next-line no-console -- CLI
  console.error('[npm-audit-report] failed', e.message || e);
  process.exit(2);
}
