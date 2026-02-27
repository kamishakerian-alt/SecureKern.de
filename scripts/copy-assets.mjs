#!/usr/bin/env node
/**
 * Copy site/assets into Website/assets (e.g. after updating assets when Website is locked).
 * Run after stopping any server that uses the Website folder.
 */
import { cpSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
const src = join(root, 'site', 'assets');
const dest = join(root, '_build', 'assets');

if (!existsSync(src)) {
  console.error('Source not found: site/assets');
  process.exit(1);
}

try {
  if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
  cpSync(src, dest, { recursive: true });
  console.log('Copied site/assets → _build/assets');
} catch (err) {
  console.error('Copy failed (stop any server using _build/ and close open files):', err.message);
  process.exit(1);
}
