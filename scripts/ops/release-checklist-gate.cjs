/**
 * Release checklist pipeline gate (Fázis 6).
 * Egységesen futtatja a kötelező minőségkapukat, majd opcionálisan LHCI-t.
 */
'use strict';

const { spawnSync } = require('child_process');
const { loadProjectEnv } = require('../lib/load-env.cjs');

loadProjectEnv();

function run(label, command, args) {
  console.log(`[release-checklist] ${label}`);
  const r = spawnSync(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: process.env,
  });
  if (r.status !== 0) process.exit(r.status || 1);
}

run('lint', 'npm', ['run', 'lint']);
run('typecheck', 'npm', ['run', 'typecheck']);
run('test', 'npm', ['run', 'test']);
run('build', 'npm', ['run', 'build']);
run('backup drill', 'npm', ['run', 'ops:backup-drill']);
run('post-deploy smoke gate', 'npm', ['run', 'ops:smoke-gate']);

const lhciGateOn = String(process.env.FF_LIGHTHOUSE_CI_GATE || '1').trim().toLowerCase();
if (['1', 'true', 'yes', 'on'].includes(lhciGateOn)) {
  run('lighthouse gate', 'npm', ['run', 'lhci']);
} else {
  console.log('[release-checklist] LHCI gate kikapcsolva (FF_LIGHTHOUSE_CI_GATE=0).');
}

run('dependency risk report', 'npm', ['run', 'ops:dependency-risk']);
run('auto changelog (git + progress-log)', 'npm', ['run', 'ops:generate-changelog']);

console.log('[release-checklist] OK — minden release checklist lépés zöld.');
