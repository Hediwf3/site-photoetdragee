const fs = require('fs');
const css = fs.readFileSync('app.css', 'utf8');

const regexVars = /\.c-gallery-section[\s\S]*?\{([\s\S]*?)\}/;
let out = '--- GALLERY VARIABLES ---\n';
const matchVars = css.match(regexVars);
if (matchVars) out += matchVars[1].trim() + '\n';

out += '\n--- BOX CLASSES ---\n';
const results = [...css.matchAll(/(\.c-gallery-section__(?:box|box-text)\.is-\d+)[\s\S]*?\{([\s\S]*?)\}/g)];
if (results.length) {
    results.forEach(m => out += m[1] + ' ' + m[2].trim().split('\n').map(l => l.trim()).join(' ') + '\n');
} else {
    const results2 = [...css.matchAll(/(\.is-\d+)[\s\S]*?\{([\s\S]*?)\}/g)];
    results2.forEach(m => out += m[1] + ' ' + m[2].trim().split('\n').map(l => l.trim()).join(' ') + '\n');
}

fs.writeFileSync('extracted-css.txt', out);
console.log('Done');
