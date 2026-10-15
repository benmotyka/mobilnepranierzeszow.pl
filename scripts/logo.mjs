// Generuje logo i grafiki z jednego źródła: src/lib/znak.mjs.
//   npm run logo                 -> public/: favicon.svg, apple-touch-icon.png, logo.png, og.png
//   npm run logo -- ../social    -> dodatkowo zestaw do social mediów w podanym folderze (logo/, grafiki/)
// Napisy renderuje Chrome, żeby użyć tego samego fontu co strona (Bricolage Grotesque).
import sharp from 'sharp';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { markSvg, COLORS } from '../src/lib/znak.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUB = path.join(ROOT, 'public');
const KIT = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : null;
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const { blue, teal, navy, bg } = COLORS;

const font = (f) => pathToFileURL(path.join(ROOT, 'node_modules/@fontsource-variable', f)).href;
const CSS = `
@font-face { font-family: BG; font-weight: 200 800; src: url(${font('bricolage-grotesque/files/bricolage-grotesque-latin-standard-normal.woff2')}); }
@font-face { font-family: BGx; font-weight: 200 800; src: url(${font('bricolage-grotesque/files/bricolage-grotesque-latin-ext-standard-normal.woff2')}); }
@font-face { font-family: FT; font-weight: 300 900; src: url(${font('figtree/files/figtree-latin-wght-normal.woff2')}); }
@font-face { font-family: FTx; font-weight: 300 900; src: url(${font('figtree/files/figtree-latin-ext-wght-normal.woff2')}); }
* { margin: 0; box-sizing: border-box; }
html, body { width: 100%; height: 100%; overflow: hidden; background: transparent; }
body { font-family: FT, FTx, sans-serif; -webkit-font-smoothing: antialiased; }
.d { font-family: BG, BGx, sans-serif; }
.lk { display: inline-flex; align-items: center; }
.lk .wm { display: grid; text-align: left; }
.lk .w { font-family: BG, BGx, sans-serif; font-weight: 800; letter-spacing: -0.025em; line-height: .9; }
.lk .c { font-weight: 800; letter-spacing: .3em; color: ${teal}; }
.lk svg { flex: none; }`;

// Logo z napisem. layout: 'poziome' (znak + 2 linie) lub 'pionowe'. s = wysokość znaku w px.
function lockup({ layout = 'poziome', s = 200, ink = navy, id = 'l' } = {}) {
  const w = (s * 0.42).toFixed(1), c = (s * 0.13).toFixed(1);
  const words = `<div class="w" style="font-size:${w}px;color:${ink}">mobilne<br>pranie</div><div class="c" style="font-size:${c}px;margin-top:${s * 0.07}px">RZESZÓW</div>`;
  if (layout === 'pionowe')
    return `<div class="lk" style="flex-direction:column;gap:${s * 0.16}px;text-align:center">${markSvg({ id, size: s })}<div class="wm" style="justify-items:center">${words}</div></div>`;
  return `<div class="lk" style="gap:${s * 0.16}px">${markSvg({ id, size: s })}<div class="wm">${words}</div></div>`;
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'logo-'));
function shot(body, w, h, out, { scale = 1, trim = false } = {}) {
  const html = path.join(tmp, 'p.html');
  fs.writeFileSync(html, `<!doctype html><meta charset="utf-8"><style>${CSS}</style><body>${body}</body>`);
  const png = path.join(tmp, 'p.png');
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--default-background-color=00000000',
    `--force-device-scale-factor=${scale}`, `--window-size=${w},${h}`, `--screenshot=${png}`, pathToFileURL(html).href,
  ], { stdio: 'ignore' });
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const img = sharp(png);
  return (trim ? img.trim({ threshold: 1 }).extend({ top: 40, bottom: 40, left: 40, right: 40, background: '#0000' }) : img)
    .png().toFile(out);
}
const svgPng = (svg, size, out) => sharp(Buffer.from(svg), { density: 300 }).resize(size, size).png().toFile(out);

// --- Strona ---
fs.writeFileSync(path.join(PUB, 'favicon.svg'), markSvg({ id: 'f' }) + '\n');
// iPhone sam zaokrągla rogi ikony, więc rogi wypełniamy kolorem znaku.
await sharp(Buffer.from(markSvg()), { density: 300 }).resize(180, 180).flatten({ background: blue }).png().toFile(path.join(PUB, 'apple-touch-icon.png'));
await svgPng(markSvg(), 512, path.join(PUB, 'logo.png'));
await shot(`
  <div style="width:1200px;height:630px;background:${bg};position:relative;padding:64px 80px">
    ${lockup({ s: 120 })}
    <h1 class="d" style="margin-top:58px;font-size:70px;line-height:1.05;letter-spacing:-.025em;color:${navy}">Pranie kanap i narożników<br><span style="color:${blue}">u Ciebie w domu</span></h1>
    <p style="margin-top:22px;font-size:31px;color:#4b6575">Rzeszów i okolice · dojazd w cenie · wycena ze zdjęcia</p>
    <div style="position:absolute;left:0;right:0;bottom:0;height:72px;background:${blue};display:flex;align-items:center;justify-content:space-between;padding:0 80px;color:#fff;font-size:30px;font-weight:700">
      <span>WhatsApp / tel. 730 168 626</span><span style="font-weight:500;color:#cfe0f5">mobilnepranierzeszow.pl</span></div>
  </div>`, 1200, 630, path.join(PUB, 'og.png'));
console.log('OK: public/favicon.svg, apple-touch-icon.png, logo.png, og.png');

if (!KIT) process.exit(0);

// --- Zestaw do social mediów ---
const L = (f) => path.join(KIT, 'logo', f);
const G = (f) => path.join(KIT, 'grafiki', f);
fs.mkdirSync(path.join(KIT, 'logo'), { recursive: true });
fs.writeFileSync(L('znak.svg'), markSvg() + '\n');
await svgPng(markSvg(), 1024, L('znak-1024.png'));
// Awatar: cały znak na białym tle, mieści się w kole, do którego przycinają FB, IG i WhatsApp.
await svgPng(markSvg({ pad: 0.17 }), 1080, G('avatar.png'));
const W = 1400, H = 700;
await shot(`<div style="padding:40px">${lockup({ s: 220 })}</div>`, W, H, L('logo-poziome.png'), { scale: 2, trim: true });
await shot(`<div style="padding:40px">${lockup({ s: 220, ink: '#fff' })}</div>`, W, H, L('logo-poziome-biale.png'), { scale: 2, trim: true });
await shot(`<div style="padding:40px">${lockup({ layout: 'pionowe', s: 220 })}</div>`, 800, 800, L('logo-pionowe.png'), { scale: 2, trim: true });
await shot(`<div style="padding:40px">${lockup({ layout: 'pionowe', s: 220, ink: '#fff' })}</div>`, 800, 800, L('logo-pionowe-biale.png'), { scale: 2, trim: true });

// Tło okładek: ciemny granat przechodzący w kobalt, z dużym, przygaszonym fragmentem znaku po prawej.
const coverBg = (w, h) => `
  <div style="position:absolute;inset:0;background:linear-gradient(115deg, ${navy} 0%, #11386e 55%, ${blue} 100%)"></div>
  <svg viewBox="0 0 100 100" style="position:absolute;right:${-h * 0.15}px;top:${-h * 0.2}px;height:${h * 1.45}px;opacity:.16">
    <path d="M50 11 C53 16 56 21 58.5 25.5 L66 40 L62 60 C56 75 50 85 43 89 C34 82 22 70 17 59 C26 42 38 25 50 11Z" fill="${teal}"/>
    <path d="M56 46 L72 52.5 C83 59 86 73 76 82 C69 87 59 89 50 90 C51 76 52 59 56 46Z" fill="#fff"/>
    <path d="M74.5 24.5 L110 -11" stroke="#fff" stroke-width="6"/></svg>`;
const pill = (t, size) => `<span style="display:inline-block;background:${teal};color:${navy};font-weight:800;font-size:${size}px;padding:.45em 1em;border-radius:999px">${t}</span>`;

// Facebook: 1640x624. Telefon przycina boki, więc treść trzymamy w środkowych ~1100 px.
await shot(`
  <div style="width:1640px;height:624px;position:relative;overflow:hidden;color:#fff">
    ${coverBg(1640, 624)}
    <div style="position:absolute;left:270px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:34px">
      ${lockup({ s: 150, ink: '#fff', id: 'c' })}
      <p class="d" style="font-size:44px;font-weight:700;line-height:1.15;letter-spacing:-.015em">Pranie kanap, narożników, materacy i dywanów<br><span style="color:${teal}">u Ciebie w domu</span></p>
      <div style="display:flex;gap:22px;align-items:center;font-size:28px">${pill('WhatsApp 730 168 626', 30)}<span style="opacity:.85">Rzeszów i okolice · dojazd w cenie</span></div>
    </div>
  </div>`, 1640, 624, G('okladka-facebook.png'));

// Wizytówka Google / YouTube / LinkedIn: 16:9.
await shot(`
  <div style="width:1920px;height:1080px;position:relative;overflow:hidden;color:#fff">
    ${coverBg(1920, 1080)}
    <div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:56px">
      ${lockup({ s: 220, ink: '#fff', id: 'g' })}
      <p class="d" style="font-size:66px;font-weight:700;line-height:1.12;letter-spacing:-.015em">Pranie tapicerki u Ciebie w domu<br><span style="color:${teal}">Rzeszów i okolice</span></p>
      ${pill('WhatsApp 730 168 626', 44)}
    </div>
  </div>`, 1920, 1080, G('okladka-16x9.png'));

// Tło do relacji / TikToka: 1080x1920 z logo u góry i pustym środkiem na tekst.
await shot(`
  <div style="width:1080px;height:1920px;position:relative;overflow:hidden;color:#fff">
    ${coverBg(1080, 1920)}
    <div style="position:absolute;top:150px;left:0;right:0;display:flex;justify-content:center">${lockup({ s: 150, ink: '#fff', id: 's' })}</div>
    <div style="position:absolute;bottom:170px;left:0;right:0;text-align:center">${pill('WhatsApp 730 168 626', 40)}</div>
  </div>`, 1080, 1920, G('tlo-relacja.png'));

// Oryginał propozycji 2 wycięty z planszy, jeśli plansza leży w folderze projektu.
const board = path.resolve(ROOT, '../Unknown.jpg');
if (fs.existsSync(board)) await sharp(board).extract({ left: 579, top: 93, width: 219, height: 219 }).png().toFile(L('oryginal-propozycja-2.png'));
console.log(`OK: zestaw w ${KIT}`);
