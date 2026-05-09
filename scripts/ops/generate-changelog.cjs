'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '../..');
const progressLogPath = path.join(root, 'docs', 'progress-log.md');
const outputPath = path.join(root, 'docs', 'auto-changelog.md');

function run(command, args) {
  const proc = spawnSync(command, args, {
    cwd: root,
    shell: process.platform === 'win32',
    encoding: 'utf8',
  });
  return String(proc.stdout || '').trim();
}

function extractProgressHighlights(content) {
  const lines = content.split(/\r?\n/);
  const highlights = [];
  let currentHeader = '';
  for (const line of lines) {
    if (line.startsWith('## ')) {
      currentHeader = line.replace(/^##\s+/, '').trim();
      continue;
    }
    if (!line.startsWith('- **Mit:**')) continue;
    highlights.push({ section: currentHeader || 'N/A', change: line.replace(/^- \*\*Mit:\*\*\s*/, '').trim() });
  }
  return highlights.slice(-15);
}

const progressRaw = fs.existsSync(progressLogPath) ? fs.readFileSync(progressLogPath, 'utf8') : '';
const highlights = extractProgressHighlights(progressRaw);
const commitsRaw = run('git', ['log', '--no-merges', '--pretty=format:%h|%ad|%s', '--date=short', '-n', '25']);
const commits = commitsRaw
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => {
    const [sha, date, subject] = line.split('|');
    return { sha, date, subject };
  });

const now = new Date().toISOString();
const md = [
  '# Auto changelog',
  '',
  `Generated: ${now}`,
  '',
  '## Progress-log highlights',
  ...highlights.map((h) => `- **${h.section}:** ${h.change}`),
  '',
  '## Recent commits',
  ...commits.map((c) => `- \`${c.sha}\` (${c.date}) ${c.subject}`),
  '',
];

fs.writeFileSync(outputPath, md.join('\n'), 'utf8');
console.log(`[changelog] updated: ${path.relative(root, outputPath)}`);
