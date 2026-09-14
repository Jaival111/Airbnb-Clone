import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const cssJson = JSON.parse(
  readFileSync(
    'C:/Users/JAIVAL CHAUHAN/.cursor/browser-logs/cdp-response-Runtime.evaluate-2026-09-14T13-04-08-379Z.json',
    'utf8'
  )
);
const htmlJson = JSON.parse(
  readFileSync(
    'C:/Users/JAIVAL CHAUHAN/.cursor/browser-logs/cdp-response-Runtime.evaluate-2026-09-14T13-04-39-475Z.json',
    'utf8'
  )
);

const css = cssJson.result.value;
let html = htmlJson.result.value.replace(/ data-cursor-ref="e\d+"/g, '');

const clientSrc = join(root, 'client', 'src');
writeFileSync(join(clientSrc, 'airbnb.css'), css);
writeFileSync(join(clientSrc, 'listing.html'), html);
console.log('wrote css', css.length, 'html', html.length);
