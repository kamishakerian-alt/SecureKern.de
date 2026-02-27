#!/usr/bin/env node
/** Sanftes Clean wie VS Code: Bei EPERM 5s warten, 3× retry. Bricht Build nicht ab (exit 0).
 *  Keine aggressiven Deletes – wenn Lock bleibt, läuft Eleventy trotzdem (überschreibt was geht). */
import { existsSync, rmSync } from 'fs';
import { join } from 'path';

const root = join(process.cwd());
const outputDir = process.env.ELEVENTY_OUTPUT || 'Website';
const dirs = [outputDir];
const maxRetries = 3;
const retryDelayMs = 5000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  for (const dir of dirs) {
    const path = join(root, dir);
    if (!existsSync(path)) {
      console.log('Nothing to remove:', path);
      continue;
    }

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        rmSync(path, { recursive: true, force: true });
        console.log('Removed:', path);
        break;
      } catch (err) {
        if (attempt < maxRetries) {
          console.warn('Could not remove', path, `(attempt ${attempt}/${maxRetries}):`, err.code || err.message, '- waiting 5s...');
          await sleep(retryDelayMs);
        } else {
          console.warn('Could not remove', path, '(in use?). Continuing build without clean – Eleventy will overwrite where possible.');
          console.warn('Tip: Close anything using', outputDir + '/ or use npm run build:preview for a full build.');
          // Exit 0 so that "clean-retry && eleventy" still runs – no abort
        }
      }
    }
  }
})();
