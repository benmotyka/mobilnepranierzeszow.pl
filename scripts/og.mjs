// Generuje public/og.png (podgląd linku na Facebooku/WhatsApp) i public/apple-touch-icon.png.
import sharp from 'sharp';
import path from 'node:path';
const PUB = path.resolve(import.meta.dirname, '../public');
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#f4f9fb"/>
  <rect x="0" y="560" width="1200" height="70" fill="#1550a8"/>
  <g transform="translate(80 92)"><rect width="84" height="84" rx="20" fill="#1550a8"/><path d="M42 16s20 21 20 37a20 20 0 0 1-40 0c0-16 20-37 20-37z" fill="#27b8c0"/></g>
  <text x="186" y="150" font-family="Helvetica, Arial, sans-serif" font-size="40" font-weight="800" fill="#0d2b3e">mobilne pranie<tspan fill="#27b8c0">.</tspan>rzeszów</text>
  <text x="80" y="300" font-family="Helvetica, Arial, sans-serif" font-size="76" font-weight="800" fill="#0d2b3e">Pranie kanap i narożników</text>
  <text x="80" y="390" font-family="Helvetica, Arial, sans-serif" font-size="76" font-weight="800" fill="#1550a8">u Ciebie w domu</text>
  <text x="80" y="470" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="#4b6575">Rzeszów i okolice · dojazd w cenie · wycena ze zdjęcia</text>
  <text x="80" y="606" font-family="Helvetica, Arial, sans-serif" font-size="32" font-weight="700" fill="#ffffff">WhatsApp / tel. 730 168 626</text>
  <text x="1120" y="606" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#cfe0f5">mobilnepranierzeszow.pl</text>
</svg>`;
await sharp(Buffer.from(og)).png().toFile(path.join(PUB, 'og.png'));
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 64 64"><rect width="64" height="64" fill="#1550a8"/><path d="M32 12s14 15 14 26a14 14 0 0 1-28 0c0-11 14-26 14-26z" fill="#27b8c0"/><path d="M26 40a6 6 0 0 0 6 6" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>`;
await sharp(Buffer.from(icon)).png().toFile(path.join(PUB, 'apple-touch-icon.png'));
console.log('OK: public/og.png, public/apple-touch-icon.png');
