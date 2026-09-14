import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const file = process.argv[2];
const destRoot = join(dirname(fileURLToPath(import.meta.url)), '..', 'client', 'public');
const json = JSON.parse(readFileSync(file, 'utf8'));
const items = JSON.parse(json.result.value);
for (const item of items) {
  const dest = join(destRoot, item.p.replace(/^\//, ''));
  mkdirSync(dirname(dest), { recursive: true });
  if (!item.ok) {
    console.error('skip', item.p);
    continue;
  }
  writeFileSync(dest, Buffer.from(item.b64, 'base64'));
  console.log('wrote', item.p, item.n);
}
