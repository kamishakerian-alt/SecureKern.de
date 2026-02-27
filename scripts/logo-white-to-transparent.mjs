#!/usr/bin/env node
/**
 * Nutzt nur deine Files: sekurekern-main, Main symbol, Transparent logo, Inverted (sekurekern-inverted).
 * Kein Neues erfinden. Transparenz: Weiß→transparent wo nötig; Symbol wird verkleinert (Original ~6 MB).
 */
import sharp from 'sharp';
import { join } from 'path';
import { mkdirSync, existsSync } from 'fs';

const root = join(process.cwd(), 'site', 'assets', 'images', 'brand');
const outDir = join(root, 'processed');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const WHITE_THRESHOLD = 250;
const SYMBOL_MAX_HEIGHT = 96;

async function whiteToTransparent(inputPath, outputPath, options = {}) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const channels = info.channels || 4;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD) {
      data[i + 3] = 0;
    }
  }
  let pipeline = sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });
  if (options.maxHeight) pipeline = pipeline.resize({ height: options.maxHeight, fit: 'inside' });
  await pipeline.png().toFile(outputPath);
  console.log('Written:', outputPath);
}

// Nav: Transparent logo.png wenn vorhanden (bereits Alpha), sonst sekurekern-main.png + Weiß→transparent
const transparentPaths = ['Transparent logo.png', 'SekureKern.de Transparent logo.png'];
let navDone = false;
for (const name of transparentPaths) {
  const p = join(root, name);
  if (existsSync(p)) {
    await sharp(p).resize({ width: 500, fit: 'inside' }).png().toFile(join(outDir, 'logo-nav.png'));
    console.log('Written (from Transparent logo):', join(outDir, 'logo-nav.png'));
    navDone = true;
    break;
  }
}
if (!navDone) {
  await whiteToTransparent(join(root, 'sekurekern-main.png'), join(outDir, 'logo-nav.png'));
}

// Hero & Footer: Inverted logo (sekurekern-inverted.png)
await whiteToTransparent(join(root, 'sekurekern-inverted.png'), join(outDir, 'logo-hero.png'));
await whiteToTransparent(join(root, 'sekurekern-inverted.png'), join(outDir, 'logo-footer.png'));

// Symbol: Main symbol.png oder Transparent symbol.png → verkleinern (Original ~6 MB)
const symbolPaths = ['Main symbol.png', 'SekureKern.de Main symbol.png', 'Transparent symbol.png', 'SekureKern.de Transparent symbol.png'];
for (const name of symbolPaths) {
  const p = join(root, name);
  if (existsSync(p)) {
    await whiteToTransparent(p, join(outDir, 'logo-symbol.png'), { maxHeight: SYMBOL_MAX_HEIGHT });
    break;
  }
}

console.log('Done. Nur deine Files → processed/. Symbol auf', SYMBOL_MAX_HEIGHT + 'px Höhe verkleinert.');
