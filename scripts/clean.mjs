#!/usr/bin/env node
/** Clean build output before a fresh build. Single source of truth: output is Website. */
import { existsSync, rmSync } from 'fs';
import { join } from 'path';

const root = join(process.cwd());
const dirs = ['Website'];

for (const dir of dirs) {
  const path = join(root, dir);
  if (existsSync(path)) {
    rmSync(path, { recursive: true, force: true });
    console.log('Removed:', path);
  }
}
