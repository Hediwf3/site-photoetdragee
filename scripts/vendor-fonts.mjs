// Reproducible local copies of the site's existing Google Fonts (no new family).
// Run intentionally when updating fonts; builds do not depend on Google being up.
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const directory = new URL('../public/fonts/', import.meta.url);
const groups = {
  main: 'family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Inter:wght@300..700',
  editorial: 'family=Bodoni+Moda:opsz,wght@6..96,400&family=Bodoni+Moda+SC:opsz,wght@6..96,400',
};
const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' };
await mkdir(directory, { recursive: true });
const preloads = [];
for (const [group, families] of Object.entries(groups)) {
  const response = await fetch(`https://fonts.googleapis.com/css2?${families}&display=swap`, { headers });
  if (!response.ok) throw new Error(`Google Fonts returned ${response.status}`);
  const css = await response.text();
  const blocks = [...css.matchAll(/\/\* (latin(?:-ext)?) \*\/\s*(@font-face\s*\{[^}]+\})/g)];
  if (!blocks.length) throw new Error(`Missing Latin font definitions for ${group}`);
  const output = [];
  for (const [, subset, block] of blocks) {
    const remote = block.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/)?.[1];
    if (!remote || !block.includes("format('woff2')")) throw new Error('Expected a Google Fonts WOFF2 file');
    const family = block.match(/font-family: '([^']+)'/)?.[1].toLowerCase().replaceAll(' ', '-');
    const style = block.match(/font-style: (\w+)/)?.[1];
    const fontResponse = await fetch(remote);
    if (!fontResponse.ok) throw new Error(`Font download failed: ${fontResponse.status}`);
    const bytes = Buffer.from(await fontResponse.arrayBuffer());
    const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 10);
    const file = `${family}-${style}-${subset}-${hash}.woff2`;
    await writeFile(new URL(file, directory), bytes);
    if (group === 'main' && style === 'normal' && subset === 'latin') preloads.push(`/fonts/${file}`);
    output.push(`/* ${subset} */\n${block.replace(remote, `/fonts/${file}`)}`);
    console.log(`${file}: ${bytes.length} bytes`);
  }
  await writeFile(new URL(`${group}.css`, directory), `${output.join('\n')}\n`);
}
console.log(`Fonts written to ${fileURLToPath(directory)}`);
await writeFile(new URL('../src/data/font-preloads.json', import.meta.url), `${JSON.stringify(preloads, null, 2)}\n`);
for (const family of ['cormorantgaramond', 'inter', 'bodonimoda', 'bodonimodasc']) {
  const response = await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${family}/OFL.txt`);
  if (!response.ok) throw new Error(`Missing license for ${family}`);
  const license = await response.text();
  if (!license.includes('SIL OPEN FONT LICENSE')) throw new Error(`Unexpected license for ${family}`);
  await writeFile(new URL(`${family}-OFL.txt`, directory), license);
}
