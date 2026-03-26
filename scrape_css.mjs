import fs from 'fs';
import https from 'https';

https.get('https://estudiomanzanero.com/', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {

        // Look for <style> tags
        const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
        let match;
        const styles = [];
        while ((match = styleRegex.exec(data)) !== null) {
            styles.push(match[1]);
        }

        const allCSS = styles.join('\n');
        console.log(`Extracted internal CSS. Length: ${allCSS.length}`);

        // Look for .c-hero-gallery rules, capturing up to the next brace
        const rulesRegex = /(\.c-hero-gallery[^{]*{[^}]*})/g;
        let ruleMatch;
        const rules = [];
        while ((ruleMatch = rulesRegex.exec(allCSS)) !== null) {
            rules.push(ruleMatch[1]);
        }

        fs.writeFileSync('hero_rules.css', rules.join('\n\n'));
        console.log(`Saved ${rules.length} CSS rules to hero_rules.css`);
    });
});
