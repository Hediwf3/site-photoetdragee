const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const files = fs.readdirSync('./portfolio').filter(f => f.endsWith('.jpg'));
let count = 0;

console.log("Searching for portraits...");
for (const f of files.slice(0, 100)) {
    try {
        const p = path.join('./portfolio', f);
        const powershellCmd = `powershell -c "$img = [System.Drawing.Image]::FromFile('${p}'); Write-Output ($img.Height -gt $img.Width); $img.Dispose()"`
        const isPortrait = execSync(powershellCmd).toString().trim();

        if (isPortrait === 'True') {
            console.log(`Portait found: ${f}`);
            count++;
            if (count >= 5) break;
        }
    } catch (e) {
        // ignore
    }
}
