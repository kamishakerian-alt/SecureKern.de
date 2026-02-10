const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SCREEN_DIR = path.join(__dirname, 'screens');

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html; charset=utf-8';
    case '.css': return 'text/css; charset=utf-8';
    case '.js': return 'application/javascript; charset=utf-8';
    case '.svg': return 'image/svg+xml; charset=utf-8';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.webp': return 'image/webp';
    case '.xml': return 'application/xml; charset=utf-8';
    case '.txt': return 'text/plain; charset=utf-8';
    case '.json': return 'application/json; charset=utf-8';
    case '.ico': return 'image/x-icon';
    default: return 'application/octet-stream';
  }
}

function safeJoin(root, urlPath) {
  const decoded = decodeURIComponent(urlPath);
  const stripped = decoded.replace(/^\/+/, '');
  const joined = path.normalize(path.join(root, stripped));
  if (!joined.startsWith(path.normalize(root + path.sep))) return null;
  return joined;
}

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, 'http://127.0.0.1');
    let pathname = url.pathname;
    if (pathname.endsWith('/')) pathname += 'index.html';

    const filePath = safeJoin(ROOT, pathname);
    if (!filePath) {
      res.writeHead(400);
      res.end('Bad request');
      return;
    }

    fs.stat(filePath, (err, stat) => {
      if (err || !stat.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not found');
        return;
      }

      res.writeHead(200, { 'Content-Type': contentType(filePath) });
      fs.createReadStream(filePath).pipe(res);
    });
  });
}

async function run() {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const base = `http://127.0.0.1:${port}`;

  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // Auto-discover all HTML pages under the generated site (prefer ./dist if present)
  const PREFERRED_DIST = path.join(__dirname, '..', 'dist');
  const SITE_ROOT = fs.existsSync(PREFERRED_DIST) ? PREFERRED_DIST : path.join(__dirname, '..');

  function collectHtmlFiles(dir, out = []) {
    for (const name of fs.readdirSync(dir)) {
      const p = path.join(dir, name);
      const stat = fs.statSync(p);
      if (stat.isDirectory()) {
        collectHtmlFiles(p, out);
      } else if (stat.isFile() && path.extname(p).toLowerCase() === '.html') {
        // ignore 404 or hidden files if any
        const rel = '/' + path.relative(SITE_ROOT, p).replace(/\\/g, '/');
        out.push(rel);
      }
    }
    return out;
  }

  // Ensure the screenshot dir exists and is empty (remove old screenshots)
  if (fs.existsSync(SCREEN_DIR)) {
    for (const f of fs.readdirSync(SCREEN_DIR)) {
      const p = path.join(SCREEN_DIR, f);
      try { fs.unlinkSync(p); } catch (e) { /* ignore */ }
    }
  } else {
    fs.mkdirSync(SCREEN_DIR, { recursive: true });
  }

  const targets = collectHtmlFiles(SITE_ROOT).sort();

  const results = [];

  for (const p of targets) {
    const url = base + p;
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Wait for images and network to settle to avoid blank hero captures
    try {
      await page.waitForSelector('img.hero__background', { timeout: 2000 });
    } catch (e) {
      // ignore if no hero image on the page
    }
    try {
      await page.waitForLoadState('networkidle', { timeout: 2000 });
    } catch (e) {
      // best-effort only
    }

    // CTA alignment check (best-effort)
    const cta = await page.$('.nav__actions .btn.btn--primary, .nav__actions .btn--primary, .nav__actions .btn');
    let ctaRight = null;
    if (cta) {
      const box = await cta.boundingBox();
      if (box) {
        ctaRight = Math.round(box.x + box.width);
      }
    }

    const shotName = p.replace(/^\//, '').replace(/[\\\/]/g, '_');
    const outPath = path.join(SCREEN_DIR, `${shotName}.png`);
    await page.screenshot({ path: outPath, fullPage: true });

    results.push({ path: p, ctaRight });
  }

  await browser.close();
  await new Promise((resolve) => server.close(resolve));

  console.log('Screenshots saved to', SCREEN_DIR);
  for (const r of results) {
    console.log(`${r.path} CTA_right_px=${r.ctaRight === null ? 'n/a' : r.ctaRight}`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
