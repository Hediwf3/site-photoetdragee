import fs from 'fs';
async function run() {
    const res = await fetch('https://estudiomanzanero.com/wp-content/themes/manzanero/dist/app.css');
    const text = await res.text();
    fs.writeFileSync('app.css', text);
    console.log('Saved to app.css');
}
run();
