// Znak firmy (propozycja 2: ssawka ekstraktora i czysty pas tkaniny), przerysowany jako wektor.
// Jedno źródło dla strony (Logo.astro) i skryptów generujących grafiki (scripts/logo.mjs).
export const COLORS = { blue: '#1550a8', teal: '#27b8c0', navy: '#0d2b3e', bg: '#f4f9fb' };

const shapes = (blue, teal) => `
  <g clip-path="url(#ID)" stroke="${blue}" stroke-linejoin="round" paint-order="stroke">
    <path d="M50 11 C58 22 64 30 66 40 L62 60 C56 75 50 85 43 89 C34 82 22 70 17 59 C26 42 38 25 50 11Z" fill="${teal}" stroke="none"/>
    <path d="M12 62 C24 48 36 38 50 33" fill="none" stroke-width="3.5"/>
    <path d="M56 46 L72 52.5 C83 59 86 73 76 82 C69 87 59 89 50 90 C51 76 52 59 56 46Z" fill="#fff" stroke-width="5"/>
    <path d="M74.5 24.5 L101 -2" stroke="#fff" stroke-width="6" fill="none"/>
    <path d="M56.17 31.51 L72.3 22.3 L76.7 26.7 L67.49 42.83Z" fill="${teal}" stroke-width="3"/>
    <path d="M52.64 27.98 L71.02 46.36 L65.36 52.02 L46.98 33.64Z" fill="#fff" stroke-width="4"/>
  </g>`;

// Sam znak: niebieski zaokrąglony kwadrat.
// pad: znak pomniejszony na tle `padBg`, np. awatar przycinany do koła (pad 0.17 mieści cały znak w kole).
export function markSvg({ id = 'znak', size, title, pad = 0, padBg = '#ffffff' } = {}) {
  const { blue, teal } = COLORS;
  const mark = `<clipPath id="${id}"><rect width="100" height="100" rx="17"/></clipPath>
  <rect width="100" height="100" rx="17" fill="${blue}"/>${shapes(blue, teal).replace('#ID', `#${id}`)}`;
  const body = pad
    ? `<rect width="100" height="100" fill="${padBg}"/><g transform="translate(${pad * 100} ${pad * 100}) scale(${1 - 2 * pad})">${mark}</g>`
    : mark;
  const dim = size ? ` width="${size}" height="${size}"` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"${dim}${title ? ` role="img" aria-label="${title}"` : ' aria-hidden="true"'}>
  ${body}
</svg>`;
}
