#!/usr/bin/env node
/** Nach dem Build: Prüft, ob main.css und wichtige Assets da sind (Network-Check-Simulation). */
import { existsSync } from 'fs';
import { join } from 'path';

const root = join(process.cwd());
const outputDir = process.env.ELEVENTY_OUTPUT || 'Website';
const base = join(root, outputDir);

const required = [
  'assets/css/main.css',
  'assets/js/main.js',
  'index.html',
];

let failed = 0;
for (const rel of required) {
  const p = join(base, rel);
  if (existsSync(p)) {
    console.log('OK', rel);
  } else {
    console.error('MISSING', rel);
    failed++;
  }
}

if (failed > 0) {
  console.error('Asset check failed:', failed, 'missing. Build may be incomplete (e.g. EPERM on assets).');
  process.exit(1);
}
console.log('Assets OK.');
