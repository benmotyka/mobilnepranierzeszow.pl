// Znak firmy (propozycja 2: ssawka ekstraktora i czysty pas tkaniny), przerysowany jako wektor.
// Jedno źródło dla strony (Logo.astro) i skryptów generujących grafiki (scripts/logo.mjs).
export const COLORS = { blue: '#1550a8', teal: '#27b8c0', navy: '#0d2b3e', bg: '#f4f9fb' };

// rx: zaokrąglenie kwadratu (0 = pełne tło, np. awatar przycinany do koła).
// bleed: grafika pomniejszona, a trzonek sięga do krawędzi; do awatarów.
export function markSvg({ id = 'znak', rx = 17, bleed = false, size, title } = {}) {
  const { blue, teal } = COLORS;
  const handleEnd = bleed ? 'L140 -41' : 'L101 -2';
  const inner = `
    <path d="M50 11 C53 16 56 21 58.5 25.5 L66 40 L62 60 C56 75 50 85 43 89 C34 82 22 70 17 59 C26 42 38 25 50 11Z" fill="${teal}" stroke="none"/>
    <path d="M12 62 C24 48 36 38 50 33" fill="none" stroke-width="3.5"/>
    <path d="M56 46 L72 52.5 C83 59 86 73 76 82 C69 87 59 89 50 90 C51 76 52 59 56 46Z" fill="#fff" stroke-width="5"/>
    <path d="M74.5 24.5 ${handleEnd}" stroke="#fff" stroke-width="6" fill="none"/>
    <path d="M57.59 32.93 L72.3 22.3 L76.7 26.7 L66.07 41.41Z" fill="${teal}" stroke-width="3"/>
    <path d="M52.64 27.98 L71.02 46.36 L65.36 52.02 L46.98 33.64Z" fill="#fff" stroke-width="4"/>`;
  const content = bleed ? `<g transform="translate(50 50) scale(.8) translate(-50 -50)">${inner}</g>` : inner;
  const dim = size ? ` width="${size}" height="${size}"` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"${dim}${title ? ` role="img" aria-label="${title}"` : ' aria-hidden="true"'}>
  <clipPath id="${id}"><rect width="100" height="100" rx="${rx}"/></clipPath>
  <rect width="100" height="100" rx="${rx}" fill="${blue}"/>
  <g clip-path="url(#${id})" stroke="${blue}" stroke-linejoin="round" paint-order="stroke">${content}
  </g>
</svg>`;
}
