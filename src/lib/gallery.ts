import type { ImageMetadata } from 'astro';
import opisy from '../assets/galeria/opisy.json';

export const CATEGORIES = [
  { slug: 'narozniki', label: 'Narożniki', one: 'Narożnik', service: 'pranie-naroznikow-rzeszow' },
  { slug: 'kanapy', label: 'Kanapy i sofy', one: 'Kanapa', service: 'pranie-kanap-rzeszow' },
  { slug: 'fotele-i-krzesla', label: 'Fotele i krzesła', one: 'Fotel / krzesła', service: 'pranie-foteli-i-krzesel-rzeszow' },
  { slug: 'materace', label: 'Materace', one: 'Materac', service: 'pranie-materacy-rzeszow' },
  { slug: 'dywany', label: 'Dywany', one: 'Dywan', service: 'pranie-dywanow-rzeszow' },
  { slug: 'auta', label: 'Tapicerka samochodowa', one: 'Tapicerka auta', service: 'pranie-tapicerki-samochodowej-rzeszow' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export type Photo = {
  src: ImageMetadata;
  category: CategorySlug;
  categoryLabel: string;
  job: string; // identyfikator realizacji (łączy zdjęcia przed i po)
  place: string | null; // np. „Słocina” z opisy.json
  kind: 'przed' | 'po' | null;
  date: string | null;
  alt: string;
  caption: string;
};

const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/galeria/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);
const places = opisy as Record<string, string>;

// Nazwa z `npm run zdjecia`: 2026-11-03-slocina-a1b2c3-przed.jpg
const NAME = /^(\d{4}-\d{2}-\d{2})-(.+)-([0-9a-f]{6})(?:-(przed|po))?$/;

function parse(path: string, src: ImageMetadata): Photo | null {
  const [, , , , category, file] = path.split('/');
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) return null;
  const base = file.replace(/\.[^.]+$/, '');
  const m = base.match(NAME);
  const job = m ? `${m[1]}-${m[2]}` : base.replace(/-(przed|po)$/, '');
  const kind = (m?.[4] ?? base.match(/-(przed|po)$/)?.[1] ?? null) as Photo['kind'];
  const place = places[job] ?? null;
  const where = place ? ` – ${place}` : '';
  const when = kind === 'przed' ? ', przed praniem' : kind === 'po' ? ', po praniu' : '';
  return {
    src, category: cat.slug, categoryLabel: cat.label, job, place, kind, date: m?.[1] ?? null,
    alt: `${cat.one}${where}${when}. Mobilne pranie tapicerki Rzeszów`,
    caption: `${cat.one}${where}`,
  };
}

export const PHOTOS: Photo[] = Object.entries(files)
  .map(([p, mod]) => parse(p, mod.default))
  .filter((p): p is Photo => p !== null)
  // najnowsze realizacje na górze, w realizacji najpierw „przed”
  .sort((a, b) => (b.job > a.job ? 1 : b.job < a.job ? -1 : (a.kind === 'przed' ? -1 : 1)));

export const photosIn = (c: string) => PHOTOS.filter((p) => p.category === c);

/** Pierwsza realizacja, która ma zdjęcie przed i po. */
export function firstPair(category?: string): { before: Photo; after: Photo } | null {
  const list = category ? photosIn(category) : PHOTOS;
  for (const p of list) {
    if (p.kind !== 'przed') continue;
    const after = list.find((q) => q.job === p.job && q.kind === 'po');
    if (after) return { before: p, after };
  }
  return null;
}
