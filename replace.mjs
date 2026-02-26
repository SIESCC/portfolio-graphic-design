import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function replaceCol(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const full = path.join(dir, file);
        if (fs.statSync(full).isDirectory()) {
            replaceCol(full);
        } else if (full.endsWith('.jsx')) {
            let content = fs.readFileSync(full, 'utf8');
            content = content.replace(/#0B0B0B/gi, 'var(--color-brand-bg)');
            content = content.replace(/#111111/gi, 'var(--color-brand-section)');
            content = content.replace(/#1A1A1A/gi, 'var(--color-brand-section-light)');
            content = content.replace(/#F8F8F8/gi, 'var(--color-brand-accent)');
            fs.writeFileSync(full, content);
        }
    }
}
replaceCol(path.join(__dirname, 'src'));
console.log('Replaced colors in JSX files');
