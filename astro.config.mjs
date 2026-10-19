import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';

// Puste kategorie galerii mają noindex, więc nie trafiają też do mapy strony.
const GAL = new URL('./src/assets/galeria/', import.meta.url);
const hasPhotos = (cat) => {
  const dir = new URL(`${cat}/`, GAL);
  return fs.existsSync(dir) && fs.readdirSync(dir).some((f) => /\.(jpe?g|png|webp)$/i.test(f));
};
const emptyGallery = ['narozniki', 'kanapy', 'fotele-i-krzesla', 'materace', 'dywany', 'auta']
  .filter((c) => !hasPhotos(c))
  .map((c) => `/galeria/${c}`);

export default defineConfig({
  site: 'https://mobilnepranierzeszow.pl',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !emptyGallery.some((g) => page.endsWith(g)),
      i18n: { defaultLocale: 'pl', locales: { pl: 'pl-PL' } },
    }),
  ],
});
