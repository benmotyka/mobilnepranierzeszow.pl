# mobilnepranierzeszow.pl

Strona mobilnego prania tapicerki w Rzeszowie. Astro 6, statyczny HTML, hosting na Vercelu.

## Uruchomienie

```bash
npm install
npm run dev      # podgląd na http://localhost:4321
npm run build    # wersja produkcyjna do dist/
```

## Co gdzie zmieniać

| Co | Gdzie |
| --- | --- |
| Telefon, godziny, dojazd, dane firmy, linki do social mediów | `src/data/site.ts` → `SITE` |
| Ceny i opisy usług | `src/data/site.ts` → `SERVICES`, `EXTRAS` |
| Miejscowości (podstrony „pranie tapicerki Tyczyn” itd.) | `src/data/site.ts` → `TOWNS` |
| FAQ | `src/data/site.ts` → `FAQ_GENERAL` i `faq` w usługach |
| Artykuły w poradniku | `src/content/poradnik/*.md` (nowy plik = nowy artykuł) |
| Kolory i fonty | `src/styles/global.css` |

## Dodawanie zdjęć do galerii

1. Wrzuć zdjęcia z telefonu do `zdjecia-do-dodania/<kategoria>/<osiedle lub miejscowość>/`.
   Zdjęcia „przed” mają w nazwie `przed`, „po” mają `po` (albo leżą w podfolderach `przed/` i `po/`).
   Szczegóły: `zdjecia-do-dodania/README.md`.
2. `npm run zdjecia`. Skrypt zmniejsza zdjęcia, obraca je i **usuwa GPS i inne metadane**.
3. Przejrzyj zdjęcia w `src/assets/galeria/`: bez twarzy, adresów i numerów rejestracyjnych.
4. `git add src/assets/galeria && git commit -m "Galeria: nowe zdjęcia" && git push`. Vercel sam przebuduje stronę.

Strona sama robi miniatury WebP, galerię z podziałem na kategorie, powiększanie zdjęć i pary przed/po na górze strony.
Dopóki galeria jest pusta, podstrony galerii mają `noindex`, a w miejscu zdjęcia na górze jest przykładowa rozmowa na WhatsApp.

## Wdrożenie na Vercel

1. Vercel → Add New → Project → importuj to repozytorium. Framework: Astro (wykryje się sam).
2. Settings → Domains → dodaj `mobilnepranierzeszow.pl` i `www.mobilnepranierzeszow.pl` (przekierowanie www → bez www).
3. U rejestratora domeny ustaw rekordy DNS, które pokaże Vercel.

## SEO: co jest zrobione

- Osobne podstrony pod frazy: 6 usług (`/pranie-naroznikow-rzeszow` itd.) i 7 miejscowości (`/pranie-tapicerki-tyczyn` itd.).
- Dane strukturalne: `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`, `Article`.
- Mapa strony (`/sitemap-index.xml`), `robots.txt`, adresy kanoniczne, Open Graph i logo (`public/og.png`, `favicon.svg`, `logo.png`, `apple-touch-icon.png`; generuje `npm run logo`, źródło znaku: `src/lib/znak.mjs`).
- Statyczny HTML, prawie zero JavaScriptu, fonty z własnego serwera, zdjęcia WebP w kilku rozmiarach.

## SEO: do zrobienia poza stroną (najważniejsze)

1. **Profil firmy w Google (Google Business Profile)**: firma usługowa bez adresu, obszar: Rzeszów + okolice. To daje wyniki na mapie, ważniejsze niż sama strona.
2. **Google Search Console**: dodaj domenę i wyślij `https://mobilnepranierzeszow.pl/sitemap-index.xml`.
3. **Opinie w Google** po każdym praniu. Link do opinii wpisz w `SITE.googleReviewsUrl`.
4. Ten sam numer telefonu i nazwa wszędzie: Facebook, OLX, Oferteo, Panorama Firm.
5. Nowy artykuł w poradniku raz na 2–4 tygodnie.
