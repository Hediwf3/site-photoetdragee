import fs from 'fs';
async function run() {
    const res = await fetch('https://estudiomanzanero.com/');
    const text = await res.text();
    fs.writeFileSync('reference.html', text);
    console.log('Saved to reference.html');
}
run();
