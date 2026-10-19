// Import zdjęć do galerii.
// 1. Wrzuć zdjęcia do zdjecia-do-dodania/<kategoria>/<realizacja>/, np.
//    zdjecia-do-dodania/narozniki/Słocina/IMG_1234.jpg
//    Zdjęcia „przed” mają w nazwie słowo „przed” (IMG_1234-przed.jpg) albo leżą w podfolderze „przed”.
//    Gotowy kolaż z oboma ujęciami: „przed-po” w nazwie (IMG_1234-przed-po.jpg) albo podfolder „przed-po”.
// 2. npm run zdjecia
// Skrypt zmniejsza zdjęcia do 2000 px, obraca je wg EXIF, usuwa metadane (GPS!)
// i zapisuje do src/assets/galeria/<kategoria>/. Oryginały przenosi do zdjecia-do-dodania/_przetworzone/.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const IN = path.join(ROOT, 'zdjecia-do-dodania');
const DONE = path.join(IN, '_przetworzone');
const OUT = path.join(ROOT, 'src/assets/galeria');
const OPISY = path.join(OUT, 'opisy.json');
const CATS = ['narozniki', 'kanapy', 'fotele-i-krzesla', 'materace', 'dywany', 'auta'];
const EXT = /\.(jpe?g|png|webp|heic|heif)$/i;

const slug = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l').replace(/Ł/g, 'L')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'realizacja';

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.name.startsWith('.') || e.name.startsWith('_')) return [];
    return e.isDirectory() ? walk(p) : EXT.test(e.name) ? [p] : [];
  });
}

// Data zrobienia zdjęcia (macOS: metadane Spotlight), a gdy jej nie ma: data modyfikacji pliku.
function shotDate(file) {
  try {
    const out = execFileSync('mdls', ['-raw', '-name', 'kMDItemContentCreationDate', file], { encoding: 'utf8' });
    const d = new Date(out.trim().replace(' +0000', 'Z').replace(' ', 'T'));
    if (!Number.isNaN(d.getTime())) return d;
  } catch {}
  return fs.statSync(file).mtime;
}

const opisy = fs.existsSync(OPISY) ? JSON.parse(fs.readFileSync(OPISY, 'utf8')) : {};
let added = 0, skipped = 0;

for (const cat of fs.existsSync(IN) ? fs.readdirSync(IN) : []) {
  const catDir = path.join(IN, cat);
  if (!fs.statSync(catDir).isDirectory() || cat.startsWith('_')) continue;
  if (!CATS.includes(cat)) { console.warn(`! Pomijam folder „${cat}”. Dozwolone: ${CATS.join(', ')}`); continue; }

  for (const file of walk(catDir)) {
    const rel = path.relative(catDir, file).split(path.sep);
    const jobName = rel.length > 1 && !['przed', 'po', 'przed-po'].includes(rel[0].toLowerCase()) ? rel[0] : '';
    const lowerPath = rel.join('/').toLowerCase();
    const kind = /przed[-_ ]?(i[-_ ])?po([^a-z]|$)/.test(lowerPath) ? 'przed-po'
      : /(^|[^a-z])przed([^a-z]|$)|before/.test(lowerPath) ? 'przed'
      : /(^|[^a-z])po([^a-z]|$)|after/.test(lowerPath) ? 'po' : null;

    let src = file;
    if (/\.hei[cf]$/i.test(file)) {
      const tmp = path.join(IN, `.tmp-${crypto.randomUUID()}.jpg`);
      try { execFileSync('sips', ['-s', 'format', 'jpeg', file, '--out', tmp], { stdio: 'ignore' }); src = tmp; }
      catch { console.warn(`! Nie umiem przekonwertować HEIC: ${file}. Wyeksportuj jako JPG.`); skipped++; continue; }
    }

    const buf = fs.readFileSync(src);
    const hash = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 6);
    const m = shotDate(file);
    const date = `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}-${String(m.getDate()).padStart(2, '0')}`;
    const jobSlug = slug(jobName || 'realizacja');
    const job = `${date}-${jobSlug}`;
    const name = `${job}-${hash}${kind ? `-${kind}` : ''}.jpg`;
    const outDir = path.join(OUT, cat);
    fs.mkdirSync(outDir, { recursive: true });

    if (fs.readdirSync(outDir).some((f) => f.includes(`-${hash}`))) {
      skipped++;
    } else {
      await sharp(buf).rotate()
        .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(path.join(outDir, name));
      if (jobName) opisy[job] = jobName;
      added++;
      console.log(`+ ${cat}/${name}`);
    }
    if (src !== file) fs.rmSync(src);
    const dest = path.join(DONE, cat, ...rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.renameSync(file, dest);
  }
}

fs.writeFileSync(OPISY, JSON.stringify(opisy, null, 2) + '\n');
console.log(`\nDodano: ${added}, pominięto (duplikaty/błędy): ${skipped}.`);
if (added) console.log('Sprawdź, czy na zdjęciach nie widać twarzy, adresów ani numerów rejestracyjnych, potem: git add src/assets/galeria && git commit');
