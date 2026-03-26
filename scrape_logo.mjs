import fs from 'fs';
import https from 'https';

https.get('https://estudiomanzanero.com/', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        const startIndex = data.indexOf('<div class="b-logo__wrapper-logo">');
        if (startIndex !== -1) {
            const snippet = data.substring(startIndex, startIndex + 1500);
            fs.writeFileSync('logo_snippet.html', snippet);
            console.log('Snippet saved to logo_snippet.html');
        } else {
            console.log('Could not find the target div.');
        }
    });
}).on('error', (err) => {
    console.error(err);
});
