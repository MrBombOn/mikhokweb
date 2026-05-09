/**
 * Minden docs alatti Markdown → PDF a docs/export/pdf mappába.
 * Magyar fájlnév: scripts/docs/pdf-title-overrides.json
 * Futtatás: npm run docs:pdf (Chromium letöltés első alkalommal előfordulhat).
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..');
const DOCS = join(ROOT, 'docs');
const OUT = join(DOCS, 'export', 'pdf');
const OVERRIDES_PATH = join(__dirname, 'pdf-title-overrides.json');
/** Csak az első N fájl (gyors teszt); 0 = mind */
const MAX_FILES = Number(process.env.DOCS_PDF_MAX || 0);

/** @type {Record<string, string>} */
let overrides = {};
if (existsSync(OVERRIDES_PATH)) {
  overrides = JSON.parse(readFileSync(OVERRIDES_PATH, 'utf8'));
}

/**
 * @param {string} dir
 * @returns {string[]}
 */
function walkMarkdown(dir) {
  const out = [];
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) {
      if (name.name === 'export' && dir === DOCS) continue;
      out.push(...walkMarkdown(p));
    } else if (name.isFile() && name.name.endsWith('.md')) {
      out.push(p);
    }
  }
  return out;
}

function pdfBaseName(relFromDocs) {
  const key = relFromDocs.replace(/\\/g, '/');
  if (overrides[key]) return `${overrides[key]}.pdf`;
  const stem = basename(key, '.md').replace(/\s+/g, '-');
  const prefix = dirname(key) === '.' ? '' : dirname(key).replace(/\//g, '_') + '_';
  return `${prefix}${stem}.pdf`;
}

async function main() {
  const { mdToPdf } = await import('md-to-pdf');
  mkdirSync(OUT, { recursive: true });
  let files = walkMarkdown(DOCS);
  if (MAX_FILES > 0) {
    files = files.slice(0, MAX_FILES);
    console.log('DOCS_PDF_MAX=', MAX_FILES, '(csak első fájlok)\n');
  }
  const indexRows = ['# PDF export index (auto)', '', '| Markdown | PDF fájl |', '|------------|----------|'];
  const stylesheet = join(__dirname, 'pdf-print.css');
  let ok = 0;
  let fail = 0;
  for (const abs of files.sort()) {
    const rel = relative(DOCS, abs).replace(/\\/g, '/');
    if (rel.startsWith('export/')) continue;
    const name = pdfBaseName(rel);
    const dest = join(OUT, name);
    try {
      await mdToPdf({
        path: abs,
        dest,
        basedir: DOCS,
        stylesheet,
        pdf_options: {
          format: 'A4',
          printBackground: true,
          margin: { top: '18mm', bottom: '22mm', left: '16mm', right: '16mm' },
        },
      });
      indexRows.push(`| \`${rel}\` | \`${name}\` |`);
      ok += 1;
      console.log('OK', rel, '→', name);
    } catch (e) {
      fail += 1;
      console.error('FAIL', rel, e?.message || e);
    }
  }
  indexRows.push('', `Összesen: ${ok} ok, ${fail} hiba.`);
  writeFileSync(join(OUT, '_INDEX.md'), indexRows.join('\n'), 'utf8');
  console.log('\nKész:', ok, 'PDF →', OUT);
  if (fail) process.exitCode = 1;
}

main();
