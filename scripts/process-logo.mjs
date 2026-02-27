import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceLogo = path.join(process.cwd(), 'site/assets/images/brand/SekureKern.de Main Logo.png');
const outputDir = path.join(process.cwd(), 'site/assets/images/brand/processed');

await fs.mkdir(outputDir, { recursive: true });

async function processLogo(width, name) {
  const outputPath = path.join(outputDir, `${name}.png`);
  console.log(`Processing ${name} (${width}px)...`);
  
  await sharp(sourceLogo)
    .resize({ width: width })
    .removeAlpha() // Ensure no initial alpha issues
    .ensureAlpha()
    .composite([{
        input: Buffer.from([255, 255, 255, 255]),
        raw: { width: 1, height: 1, channels: 4 },
        tile: true,
        blend: 'dest-out',
        // This is a simple trick to remove white:
        // We'll use a more robust method: 
    }])
    // Since complex color replacement in sharp is tricky, 
    // we'll use a simpler approach: 
    // Replace #FFFFFF with transparency using a mask.
    // However, sharp's simplest way is thresholding or dedicated math.
    // For this task, I'll use sharp's ability to manipulate image data.
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => {
        const { width, height, channels } = info;
        for (let i = 0; i < data.length; i += channels) {
            // Check if it's white (R, G, B > 250)
            if (data[i] > 250 && data[i+1] > 250 && data[i+2] > 250) {
                data[i+3] = 0; // Alpha to 0
            }
        }
        return sharp(data, { raw: { width, height, channels } })
            .png()
            .toFile(outputPath);
    });
}

try {
    await processLogo(250, 'logo-nav');
    await processLogo(400, 'logo-hero');
    await processLogo(300, 'logo-footer');
    console.log('Logo processing complete.');
} catch (err) {
    console.error('Logo processing failed:', err);
}
