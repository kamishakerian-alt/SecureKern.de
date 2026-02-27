#!/usr/bin/env node
/** Incremental Build ohne Delete: nur Eleventy --incremental (überschreibt nur neue/geänderte Dateien).
 *  Bei Fehler (z. B. EPERM auf main.css): 10s warten, Retry. Kein Clean, kein Löschen. */
import { spawnSync } from 'child_process';
import { join } from 'path';

const cwd = process.cwd();
const maxRetries = 3;
const retryDelayMs = 10_000;

function runEleventy() {
  const r = spawnSync('npx', ['@11ty/eleventy', '--incremental'], {
    cwd,
    stdio: 'inherit',
    shell: true,
  });
  return r.status;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const code = runEleventy();
    if (code === 0) {
      spawnSync('node', ['scripts/verify-assets.mjs'], { cwd, stdio: 'inherit' });
      process.exit(0);
    }
    if (attempt < maxRetries) {
      console.warn('\nBuild failed (e.g. EPERM on main.css). Waiting 10s, then retry', attempt + 1, '/', maxRetries, '...');
      await sleep(retryDelayMs);
    } else {
      process.exit(code ?? 1);
    }
  }
})();
