/**
 * Phase 2b: Balanced Image Compression for Photo & Dragée
 * Target: ~150MB total — preserves quality while still being web-optimized
 * 
 * Gallery: max 2560px, quality 88
 * Grid: max 1600px, quality 88
 * Hero rect: max 1000px, quality 88
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORTFOLIO_DIR = path.join(__dirname, 'public', 'portfolio-webp');

function getConfig(filename) {
  if (/^rect\d+\.webp$/i.test(filename)) {
    return { maxWidth: 1000, quality: 88, label: 'hero-rect' };
  }
  if (/^grid_rect\d+\.webp/i.test(filename)) {
    return { maxWidth: 1600, quality: 88, label: 'grid' };
  }
  if (/hero\.webp$/i.test(filename)) {
    return { maxWidth: 2000, quality: 88, label: 'hero' };
  }
  return { maxWidth: 2560, quality: 88, label: 'gallery' };
}

async function processFile(filePath, file, config) {
  const originalSize = fs.statSync(filePath).size;
  
  if (originalSize < 50 * 1024) {
    return { status: 'skip', file, reason: 'small', originalSize, newSize: originalSize };
  }

  const inputBuffer = fs.readFileSync(filePath);
  const metadata = await sharp(inputBuffer).metadata();
  const needsResize = metadata.width && metadata.width > config.maxWidth;
  
  let pipeline = sharp(inputBuffer);
  if (needsResize) {
    pipeline = pipeline.resize(config.maxWidth, null, {
      withoutEnlargement: true,
      fit: 'inside'
    });
  }
  
  const buffer = await pipeline
    .webp({ quality: config.quality, effort: 4 })
    .toBuffer();
  
  // Write result (even if slightly larger we want consistent sizing)
  const tempPath = filePath + '.tmp';
  fs.writeFileSync(tempPath, buffer);
  try {
    fs.renameSync(tempPath, filePath);
  } catch (e) {
    fs.writeFileSync(filePath, buffer);
    try { fs.unlinkSync(tempPath); } catch {}
  }
  
  return { 
    status: 'ok', file, originalSize: inputBuffer.length, newSize: buffer.length, 
    resized: needsResize, maxWidth: config.maxWidth,
    origWidth: metadata.width, origHeight: metadata.height
  };
}

async function compressImages() {
  const files = fs.readdirSync(PORTFOLIO_DIR).filter(f => f.endsWith('.webp'));
  
  console.log(`\n🖼️  Re-compression: ${files.length} images (quality 88, max 2560px)\n`);
  
  let totalNew = 0;
  let processed = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const file of files) {
    const filePath = path.join(PORTFOLIO_DIR, file);
    const config = getConfig(file);
    
    try {
      const result = await processFile(filePath, file, config);
      
      if (result.status === 'ok') {
        totalNew += result.newSize;
        const newKB = (result.newSize / 1024).toFixed(0);
        console.log(`✅ [${config.label}] ${file} → ${newKB}KB${result.resized ? ` [${result.origWidth}→${config.maxWidth}px]` : ` [${result.origWidth}px kept]`}`);
        processed++;
      } else {
        totalNew += result.originalSize;
        skipped++;
      }
    } catch (err) {
      console.error(`❌ ${file}: ${err.message}`);
      errors++;
      try { totalNew += fs.statSync(filePath).size; } catch {}
    }
  }
  
  const totalMB = (totalNew / (1024 * 1024)).toFixed(1);
  
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`📊 RESULTS:`);
  console.log(`   Processed: ${processed} | Skipped: ${skipped} | Errors: ${errors}`);
  console.log(`   Total:     ${totalMB} MB`);
  console.log(`${'═'.repeat(60)}\n`);
}

compressImages().catch(console.error);
