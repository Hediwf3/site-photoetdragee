import fs from 'fs';
import https from 'https';

https.get('https://estudiomanzanero.com/', (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        const startIndex = data.indexOf('<div class="c-hero-gallery | js-c-hero-gallery">');
        if (startIndex !== -1) {
            // Find the closing div... this is a bit rough but we'll grab a chunk
            const snippet = data.substring(startIndex, startIndex + 5000);
            fs.writeFileSync('hero_snippet.html', snippet);
            console.log('Snippet saved to hero_snippet.html');
        } else {
            console.log('Could not find the target div.');
        }
    });
}).on('error', (err) => {
    console.error(err);
});
