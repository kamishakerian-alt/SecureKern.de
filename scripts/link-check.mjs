import fs from 'fs/promises';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const ROOT = process.cwd();
const WEBSITE_DIR = path.join(ROOT, 'Website');
const LANG_SWITCH_PATH = path.join(ROOT, 'site', '_data', 'langSwitch.cjs');

function isExternal(href) {
  return /^(https?:|mailto:|tel:|javascript:)/i.test(href);
}
function stripHashQuery(h) {
  return h.split('#')[0].split('?')[0];
}

async function walk(dir, ext = '.html') {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const res = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...await walk(res, ext));
    else if (e.isFile() && res.endsWith(ext)) files.push(res);
  }
  return files;
}

async function fileExists(p) {
  try {
    const stat = await fs.stat(p);
    return stat.isFile() || stat.isDirectory();
  } catch (err) {
    return false;
  }
}

function extractHrefs(html) {
  const hrefs = new Set();
  const attrRe = /href\s*=\s*"([^"]*)"/ig;
  let m;
  while ((m = attrRe.exec(html))) hrefs.add(m[1]);
  const attrRe2 = /href\s*=\s*'([^']*)'/ig;
  while ((m = attrRe2.exec(html))) hrefs.add(m[1]);
  return Array.from(hrefs);
}

async function main() {
  if (!await fileExists(WEBSITE_DIR)) {
    console.error('Build output not found at', WEBSITE_DIR);
    process.exitCode = 2;
    return;
  }

  const langSwitch = fileExists(LANG_SWITCH_PATH) ? require(LANG_SWITCH_PATH) : { deToEn: {} };
  const deToEn = langSwitch.deToEn || {};

  const htmlFiles = await walk(WEBSITE_DIR);
  const brokenLinks = [];
  const missingEn = [];

  for (const file of htmlFiles) {
    const relFile = '/' + path.relative(WEBSITE_DIR, file).replace(/\\/g, '/');
    const content = await fs.readFile(file, 'utf8');
    const hrefs = extractHrefs(content);

    for (let href of hrefs) {
      if (!href || href.startsWith('#') || isExternal(href) || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
      href = stripHashQuery(href);
      if (!href) continue;

      let candidate;
      if (href.startsWith('/')) {
        candidate = path.join(WEBSITE_DIR, href.replace(/^\//, ''));
      } else {
        candidate = path.join(path.dirname(file), href);
      }

      // allow directory links -> index.html
      if (await fileExists(candidate)) continue;
      if (await fileExists(candidate + '.html')) continue;
      if (await fileExists(path.join(candidate, 'index.html'))) continue;

      brokenLinks.push({ source: relFile, href, resolved: candidate });
    }
  }

  // DE -> EN coverage check
  const allHtml = htmlFiles.map(f => '/' + path.relative(WEBSITE_DIR, f).replace(/\\/g, '/'));
  const dePages = allHtml.filter(p => !p.startsWith('/en/') && p.endsWith('.html'));
  for (const de of dePages) {
    // ignore admin/CMS pages for translation coverage
    if (de.startsWith('/admin/')) continue;

    // skip language-switch-only pages (e.g. /index.html -> /en/index.html is expected)
    const enPathCandidates = [('/en' + de), (deToEn[de] || null)].filter(Boolean);
    const exists = enPathCandidates.some(ep => allHtml.includes(ep));
    if (!exists) missingEn.push({ de, expected: enPathCandidates });
  }

  const report = {
    timestamp: new Date().toISOString(),
    brokenLinks,
    missingEn,
    stats: { htmlFiles: htmlFiles.length, brokenLinks: brokenLinks.length, missingEn: missingEn.length }
  };

  await fs.writeFile(path.join(ROOT, 'LINK_CHECK_REPORT.json'), JSON.stringify(report, null, 2));
  // also create a human readable summary
  const md = [];
  md.push('# Link-check report');
  md.push('Generated: ' + report.timestamp);
  md.push('');
  md.push('## Summary');
  md.push(`- HTML files scanned: ${report.stats.htmlFiles}`);
  md.push(`- Broken links found: ${report.stats.brokenLinks}`);
  md.push(`- DE pages without EN counterpart/mapping: ${report.stats.missingEn}`);
  md.push('');

  if (report.brokenLinks.length) {
    md.push('## Broken links');
    for (const b of report.brokenLinks) md.push(`- ${b.source} → ${b.href}`);
    md.push('');
  }
  if (report.missingEn.length) {
    md.push('## Missing EN translations / mappings');
    for (const m of report.missingEn) md.push(`- ${m.de}  (expected: ${m.expected.join(' | ') || '—'})`);
    md.push('');
  }

  await fs.writeFile(path.join(ROOT, 'LINK_CHECK_REPORT.md'), md.join('\n'));
  console.log('Link check complete — report written to LINK_CHECK_REPORT.{json,md}');
  console.table(report.stats);
}

main().catch(err => { console.error(err); process.exitCode = 1; });
