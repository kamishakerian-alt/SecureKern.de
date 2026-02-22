import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const partnersDir = path.join(root, 'site', 'assets', 'images', 'partners');
const visualDir = path.join(root, 'site', 'assets', 'images', 'visual-assets');

await fs.mkdir(partnersDir, { recursive: true });
await fs.mkdir(visualDir, { recursive: true });

const partners = [
  'bosch',
  'siemens',
  'schneider',
  'claroty',
  'nozomi',
  'dragos',
  'fortinet',
  'palo-alto',
  'cisco',
  'hirschmann',
];

const partnerSvg = (name) => `
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100">
  <rect x="1" y="1" width="198" height="98" rx="12" fill="#FFFFFF" stroke="#D6E0E8" stroke-width="2"/>
  <rect x="1" y="76" width="198" height="23" rx="0" fill="#00886B"/>
  <text x="100" y="51" text-anchor="middle" font-family="Montserrat, Arial, sans-serif" font-size="22" font-weight="700" fill="#003D5B">${name.toUpperCase().replace('-', ' ')}</text>
  <text x="100" y="91" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="11" font-weight="600" fill="#EAF9F5">PLACEHOLDER</text>
</svg>
`;

for (const name of partners) {
  const pngPath = path.join(partnersDir, `${name}-logo.png`);
  await sharp(Buffer.from(partnerSvg(name)))
    .png({ compressionLevel: 9 })
    .toFile(pngPath);
}

const heroSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#071A2E"/>
      <stop offset="100%" stop-color="#003D5B"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00886B" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#00886B" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1920" height="1080" fill="url(#bg)"/>

  <g opacity="0.18" stroke="#00886B" stroke-width="1">
    ${Array.from({ length: 16 }, (_, i) => `<line x1="${120 * (i + 1)}" y1="0" x2="${120 * (i + 1)}" y2="1080"/>`).join('')}
    ${Array.from({ length: 11 }, (_, i) => `<line x1="0" y1="${90 * (i + 1)}" x2="1920" y2="${90 * (i + 1)}"/>`).join('')}
  </g>

  <g fill="#0B2C45" fill-opacity="0.72" stroke="#00886B" stroke-opacity="0.65" stroke-width="3">
    <rect x="150" y="120" width="620" height="320" rx="18"/>
    <rect x="830" y="150" width="940" height="350" rx="18"/>
    <rect x="220" y="520" width="760" height="390" rx="18"/>
    <rect x="1040" y="560" width="720" height="390" rx="18"/>
  </g>

  <g stroke="#19B394" stroke-opacity="0.55" stroke-width="3" fill="none">
    <path d="M80 280 C280 210, 460 350, 660 290 S1060 230, 1320 300 S1700 350, 1860 290"/>
    <path d="M80 360 C270 300, 460 440, 650 360 S1050 300, 1320 390 S1680 430, 1860 360"/>
    <path d="M80 700 C280 620, 500 790, 740 700 S1160 620, 1400 720 S1710 780, 1860 700"/>
    <path d="M80 780 C280 700, 500 860, 740 780 S1160 700, 1400 800 S1710 850, 1860 780"/>
  </g>

  <g fill="url(#glow)">
    <circle cx="430" cy="250" r="170"/>
    <circle cx="1320" cy="310" r="220"/>
    <circle cx="620" cy="760" r="200"/>
    <circle cx="1460" cy="760" r="190"/>
  </g>
</svg>
`;

await sharp(Buffer.from(heroSvg))
  .webp({ quality: 88 })
  .toFile(path.join(visualDir, 'hero-scada.webp'));

console.log('Generated partner PNG placeholders and hero-scada.webp');
