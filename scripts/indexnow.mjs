// Tells Bing (and other IndexNow engines) which pages changed, so updates reach
// Bing — and ChatGPT search, which relies on it — in minutes instead of weeks.
// Run after a deployment is live: `npm run indexnow` (all sitemap URLs)
// or `npm run indexnow -- /projets/lucy-romain/` for specific paths.
const site = 'https://www.photoetdragee.fr';
const key = 'fdc7c41db6e431ca5458b700809ffafd'; // also served at /<key>.txt (public/)

const paths = process.argv.slice(2);
let urlList = paths.map((path) => new URL(path, site).toString());
if (!urlList.length) {
  const sitemap = await fetch(`${site}/sitemap-0.xml`).then((response) => response.text());
  urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${key}.txt`, urlList }),
});
// 200 = accepted, 202 = accepted while the key is being validated.
console.log(`IndexNow: ${response.status} for ${urlList.length} URL(s)`);
if (!response.ok) process.exitCode = 1;
