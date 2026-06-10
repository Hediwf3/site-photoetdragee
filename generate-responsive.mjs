/**
 * Responsive Image Variant Generator for Photo & Dragée
 *
 * For every .webp in public/portfolio-webp, generates downsized variants
 * (480w / 960w / 1600w, quality 82 — visually lossless at display size)
 * next to the original, and writes a manifest of intrinsic dimensions to
 * src/data/image-manifest.json so templates can emit srcset + width/height.
 *
 * Idempotent: existing variants are skipped. Originals are never modified.
 * Run with: node generate-responsive.mjs
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORTFOLIO_DIR = path.join(__dirname, 'public', 'portfolio-webp');
const MANIFEST_PATH = path.join(__dirname, 'src', 'data', 'image-manifest.json');

const WIDTHS = [480, 960, 1600];
const QUALITY = 82;

// A variant is only worth generating if it's meaningfully smaller than the source
const MIN_RATIO = 0.92;

const isVariant = (f) => /-\d+w\.webp$/i.test(f);

async function run() {
  const files = fs.readdirSync(PORTFOLIO_DIR)
    .filter(f => f.toLowerCase().endsWith('.webp') && !isVariant(f));

  const manifest = {};
  let generated = 0, skipped = 0, errors = 0;

  for (const file of files) {
    const filePath = path.join(PORTFOLIO_DIR, file);
    try {
      const meta = await sharp(filePath).metadata();
      const base = file.replace(/\.webp$/i, '');
      const variants = [];

      for (const w of WIDTHS) {
        if (w > meta.width * MIN_RATIO) continue;
        variants.push(w);
        const outPath = path.join(PORTFOLIO_DIR, `${base}-${w}w.webp`);
        if (fs.existsSync(outPath)) { skipped++; continue; }
        const buf = await sharp(filePath)
          .resize(w, null, { withoutEnlargement: true, fit: 'inside' })
          .webp({ quality: QUALITY, effort: 5, smartSubsample: true })
          .toBuffer();
        fs.writeFileSync(outPath, buf);
        generated++;
      }

      manifest[file] = { w: meta.width, h: meta.height, v: variants };
    } catch (err) {
      console.error(`ERROR ${file}: ${err.message}`);
      errors++;
    }
  }

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 1));

  console.log(`Done. ${files.length} sources | ${generated} variants generated | ${skipped} already existed | ${errors} errors`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
}

run().catch(e => { console.error(e); process.exit(1); });
