#!/usr/bin/env node
/** Clean build output before a fresh build. Single source of truth: output is Website.
 *  Uses retries on Windows to reduce ENOTEMPTY/EPERM when folder is briefly locked. */
import { existsSync, rmSync } from 'fs';
import { join } from 'path';

const root = join(process.cwd());
const outputDir = process.env.ELEVENTY_OUTPUT || 'Website';
const dirs = [outputDir];
const maxRetries = 3;
const retryDelayMs = 500;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  for (const dir of dirs) {
    const path = join(root, dir);
    if (!existsSync(path)) continue;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        rmSync(path, { recursive: true, force: true });
        console.log('Removed:', path);
        break;
      } catch (err) {
        if (attempt < maxRetries) {
          console.warn('Could not remove', path, `(attempt ${attempt}/${maxRetries}):`, err.code || err.message, '- retrying...');
          await sleep(retryDelayMs);
        } else {
          console.warn('Could not remove', path, '(in use?):', err.code || err.message);
          console.warn('Tip: Stop any process using Website/ (e.g. npm run serve), or use npm run build:no-clean');
        }
      }
    }
  }
})();
