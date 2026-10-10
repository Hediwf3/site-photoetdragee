import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const page = path => readFileSync(join('dist', path, 'index.html'), 'utf8');

test('home keeps the full photo selection and both original review locations', () => {
  const html = page('');
  assert.equal((html.match(/class="mobile-grid-item /g) || []).length, 45);
  assert.equal((html.match(/aria-roledescription="carrousel"/g) || []).length, 2);
  assert.equal((html.match(/class="js-review-slide /g) || []).length, 8);
  assert.ok(html.includes('Vérifier ma date'));
  assert.ok(!html.includes('id="loading-overlay"'));
  assert.ok(!html.includes('fonts.googleapis.com'));
  assert.ok(html.includes('srcset="data:image/svg+xml,%3Csvg%20'));
});

test('form preserves its recipient and spam protection with a first-party thank-you URL', () => {
  const html = page('contact');
  assert.ok(html.includes('action="https://formsubmit.co/photoetdragee@gmail.com"'));
  assert.ok(html.includes('name="_honey"'));
  assert.ok(!html.includes('name="_captcha" value="false"'));
  assert.ok(html.includes('name="_next" value="https://www.photoetdragee.fr/merci/"'));
  assert.ok(html.includes('name="_autoresponse"'));
  assert.ok(html.includes('pattern="\\d{2}/\\d{2}/\\d{4}"'));
  assert.ok(html.includes('href="tel:+33652253578"'));
  assert.ok(!html.includes('id="loading-overlay"'));
});

test('confirmation page is excluded from indexing and sitemap', () => {
  assert.ok(page('merci').includes('content="noindex, nofollow"'));
  assert.ok(!readFileSync('dist/sitemap-0.xml', 'utf8').includes('/merci/'));
});

test('local font styles, licenses and preload URLs are present', () => {
  for (const group of ['main', 'editorial']) {
    const css = readFileSync(`public/fonts/${group}.css`, 'utf8');
    for (const [, url] of css.matchAll(/url\(([^)]+)\)/g)) assert.ok(existsSync(`public${url}`), url);
  }
  const preloads = JSON.parse(readFileSync('src/data/font-preloads.json', 'utf8'));
  for (const url of preloads) assert.ok(existsSync(`dist${url}`));
  for (const name of ['cormorantgaramond', 'inter', 'bodonimoda', 'bodonimodasc']) {
    assert.ok(readFileSync(`public/fonts/${name}-OFL.txt`, 'utf8').includes('SIL OPEN FONT LICENSE'));
  }
  assert.ok(page('a-propos').includes('/fonts/editorial.css'));
  assert.ok(!page('').includes('/fonts/editorial.css'));
});

test('all six reportage headers link directly to the contact page', () => {
  for (const slug of ['assia-jeremy', 'fanny-ben', 'marion-boris', 'morgane-franck', 'simeone-loris', 'lucy-romain']) {
    const header = page(`projets/${slug}`).match(/<header[\s\S]*?<\/header>/)?.[0];
    assert.ok(header?.includes('href="/contact/"'), slug);
    assert.ok(header?.includes('VÉRIFIER MA DATE'), slug);
  }
});

test('titles carry the brand once and reportages are titled by venue', () => {
  for (const path of ['', 'projets', 'a-propos', 'contact', 'projets/morgane-franck']) {
    const title = page(path).match(/<title>([^<]*)<\/title>/)[1];
    assert.equal((title.match(/Photo (&amp;|et) Drag[ée]e/gi) || []).length, 1, title);
  }
  const title = page('projets/morgane-franck').match(/<title>([^<]*)<\/title>/)[1];
  assert.ok(title.startsWith('Photographe mariage Château de Chapeau Cornu'), title);
});

test('each reportage describes its venue with structured data and real alt texts', () => {
  for (const slug of ['assia-jeremy', 'fanny-ben', 'marion-boris', 'morgane-franck', 'simeone-loris', 'lucy-romain']) {
    const html = page(`projets/${slug}`);
    assert.ok(html.includes('id="story-title"'), slug);
    assert.ok(!/alt="[^"]*photo \d+"/.test(html), slug);
    const graphs = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m => JSON.parse(m[1]));
    const gallery = graphs.flatMap(g => g['@graph'] || []).find(g => g['@type'] === 'ImageGallery');
    assert.ok(gallery?.contentLocation?.address?.addressLocality, slug);
  }
});

test('sitemap lists gallery images and the footer links every venue', () => {
  assert.ok(readFileSync('dist/sitemap-0.xml', 'utf8').includes('<image:caption>'));
  const home = page('');
  for (const slug of ['assia-jeremy', 'fanny-ben', 'marion-boris', 'morgane-franck', 'simeone-loris', 'lucy-romain']) {
    assert.ok(home.includes(`href="/projets/${slug}/"`), slug);
  }
});
