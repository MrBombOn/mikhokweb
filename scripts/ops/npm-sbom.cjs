/**
 * CycloneDX SBOM (npm lock + node_modules) → `.ops/sbom.cdx.json` (Fázis 16).
 * Futtatás: `npm run ops:sbom` (npx letölti a @cyclonedx/cyclonedx-npm-et).
 */
'use strict';

const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..', '..');
const outDir = path.join(root, '.ops');
const outFile = path.join(outDir, 'sbom.cdx.json');
const relOut = path.relative(root, outFile);

function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const cmd = [
    'npx',
    '--yes',
    '@cyclonedx/cyclonedx-npm',
    '--output-file',
    relOut.replace(/\\/g, '/'),
    '--output-format',
    'JSON',
    '--spec-version',
    '1.5',
  ].join(' ');

  execSync(cmd, {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env },
    shell: process.platform === 'win32',
  });

  if (!fs.existsSync(outFile)) {
    // eslint-disable-next-line no-console -- CLI
    console.error('[npm-sbom] expected file missing:', relOut);
    process.exit(2);
  }
  const bytes = fs.statSync(outFile).size;
  // eslint-disable-next-line no-console -- CLI
  console.log('[npm-sbom] wrote', relOut, `(${bytes} bytes)`);
}

try {
  main();
} catch (e) {
  // eslint-disable-next-line no-console -- CLI
  console.error('[npm-sbom] failed', e instanceof Error ? e.message : e);
  process.exit(1);
}
