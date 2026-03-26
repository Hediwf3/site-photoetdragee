const fs = require('fs');
const css = fs.readFileSync('extracted-css.txt', 'utf8');

const boxes = [];
const texts = [];

const lines = css.split('\n');
let currentId = 0;
for (const line of lines) {
    if (!line.includes('.is-')) continue;

    const isText = line.includes('box-text');
    const match = line.match(/\.is-(\d+)/);
    if (!match) continue;
    const id = parseInt(match[1]);

    const targetArray = isText ? texts : boxes;
    let obj = targetArray.find(o => o.id === id);
    if (!obj) {
        obj = { id };
        targetArray.push(obj);
    }

    const yMatch = line.match(/--y:\s*(\d+)/);
    const xMatch = line.match(/--x:\s*(\d+)/);
    const wpMatch = line.match(/--w-phone:\s*(\d+)/);
    const hpMatch = line.match(/--h-phone:\s*(\d+)/);
    const wdMatch = line.match(/--w-desktop:\s*(\d+)/);
    const hdMatch = line.match(/--h-desktop:\s*(\d+)/);
    const wMatch = line.match(/--w:\s*(\d+)/);
    const alignMatch = line.match(/text-align:\s*([^;]+)/);

    // We assume first line encountered for an ID is phone, second is desktop
    if (!obj.phoneLoaded) {
        if (yMatch) obj.yPhone = parseInt(yMatch[1]);
        if (xMatch) obj.xPhone = parseInt(xMatch[1]);
        if (wpMatch) obj.wPhone = parseInt(wpMatch[1]);
        if (hpMatch) obj.hPhone = parseInt(hpMatch[1]);
        if (wMatch) obj.wPhone = parseInt(wMatch[1]); // text
        if (alignMatch) obj.alignPhone = alignMatch[1];
        obj.phoneLoaded = true;
    } else {
        if (yMatch) obj.yDesktop = parseInt(yMatch[1]);
        if (xMatch) obj.xDesktop = parseInt(xMatch[1]);
        if (wdMatch) obj.wDesktop = parseInt(wdMatch[1]);
        if (hdMatch) obj.hDesktop = parseInt(hdMatch[1]);
        if (wMatch) obj.wDesktop = parseInt(wMatch[1]); // text
        if (alignMatch) obj.alignDesktop = alignMatch[1];
    }
}

const formatClass = (obj, isText) => {
    // mobile base = 4.3, desktop base = 15.12
    const toVW = (val, base) => (val / base).toFixed(2) + 'vw';

    let cls = 'absolute ';
    if (isText) {
        cls += `left-[${toVW(obj.xPhone, 4.3)}] top-[${toVW(obj.yPhone, 4.3)}] w-[${toVW(obj.wPhone, 4.3)}] `;
        cls += `md:left-[${toVW(obj.xDesktop, 15.12)}] md:top-[${toVW(obj.yDesktop, 15.12)}] md:w-[${toVW(obj.wDesktop, 15.12)}] `;
        if (obj.alignPhone) cls += `text-${obj.alignPhone} `;
        if (obj.alignDesktop && obj.alignDesktop !== obj.alignPhone) cls += `md:text-${obj.alignDesktop} `;
    } else {
        cls += `bg-[#111] overflow-hidden `;
        cls += `left-[${toVW(obj.xPhone, 4.3)}] top-[${toVW(obj.yPhone, 4.3)}] w-[${toVW(obj.wPhone, 4.3)}] h-[${toVW(obj.hPhone, 4.3)}] `;
        cls += `md:left-[${toVW(obj.xDesktop, 15.12)}] md:top-[${toVW(obj.yDesktop, 15.12)}] md:w-[${toVW(obj.wDesktop, 15.12)}] md:h-[${toVW(obj.hDesktop, 15.12)}] `;
    }
    return cls.trim();
};

const textsContent = [
    '<p class="text-xs tracking-widest uppercase">EDITORIAL WEDDING PHOTOGRAPHY STUDIO BASED IN MALLORCA AND MADRID</p>',
    '<p class="text-sm">Ofrecemos fotografía de bodas premium para parejas exigentes y sofisticadas, creando un testimonio artístico de su día con el fin de recordar cómo se sintieron en cada momento. Una conexión genuina y atención meticulosa es el detalle, elevando lo íntimo a lo icónico.</p>',
    '<p class="text-sm">Enfocado en las parejas que no quieren comprometer su estilo en su boda, nuestro trabajo fusiona la precisión y la elegancia del mundo de la moda con la autenticidad y la emoción del fotoperiodismo dando como resultad una fotografía atemporal y con textura.</p>',
    '<p class="text-sm">A ESTÚDIO MANZANERO EXPERIENCIE</p>',
    '<p class="text-sm">Nos gusta la tranquilidad del lujo silencioso, y es por eso que apostamos por un estilo fotográfico sofisticado que busca su valor en la propia historia y su emoción, creando un legado visual impecable más allá de las tendencias temporales.</p>'
];

let html = `\n  {/* === GRID SECTION === */}\n`;
html += `  <section class="relative w-full overflow-hidden bg-surface mt-12 h-[920vw] md:h-[405vw]">\n`;

for (const box of Object.values(boxes)) {
    html += `    {/* Photo Box ${box.id} */}\n`;
    html += `    <div class="${formatClass(box, false)}">\n`;
    html += `      {/* Image will go here */}\n`;
    html += `    </div>\n`;
}

for (let i = 0; i < texts.length; i++) {
    const txt = texts[i];
    html += `    {/* Text Box ${txt.id} */}\n`;
    html += `    <div class="${formatClass(txt, true)} text-accent leading-relaxed flex flex-col justify-center">\n`;
    html += `      ${textsContent[i]}\n`;
    html += `    </div>\n`;
}

html += `  </section>\n`;

fs.writeFileSync('generated-grid.html', html);
console.log('Generated grid HTML into generated-grid.html');
