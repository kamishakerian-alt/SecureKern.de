#!/usr/bin/env node
/** Creates placeholder PNG logos if missing: sekurekern-main.png, sekurekern-inverted.png */
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const brandDir = join(root, 'site', 'assets', 'images', 'brand');

if (!existsSync(brandDir)) mkdirSync(brandDir, { recursive: true });

const mainPath = join(brandDir, 'sekurekern-main.png');
const invertedPath = join(brandDir, 'sekurekern-inverted.png');

async function createPng(path, r, g, b) {
  const buf = await sharp({
    create: { width: 180, height: 180, channels: 4, background: { r, g, b, alpha: 1 } },
  })
    .png()
    .toBuffer();
  const { writeFileSync } = await import('fs');
  writeFileSync(path, buf);
  console.log('Created:', path);
}

(async () => {
  if (!existsSync(mainPath)) await createPng(mainPath, 0, 61, 91);   // dark teal
  if (!existsSync(invertedPath)) await createPng(invertedPath, 255, 255, 255); // white
})();
