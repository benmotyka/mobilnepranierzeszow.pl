// Wszystkie dane firmy, ceny i treści stron w jednym miejscu.
// Zmiana ceny, godzin czy numeru = edycja tego pliku.

export const SITE = {
  name: 'Mobilne Pranie Rzeszów',
  domain: 'mobilnepranierzeszow.pl',
  url: 'https://mobilnepranierzeszow.pl',
  phone: '+48 518 517 712',
  phoneHref: 'tel:+48518517712',
  whatsapp: '48518517712',
  // Godziny pokazywane na stronie i w danych dla Google.
  hours: { days: 'Pn–Sb', open: '08:00', close: '20:00' },
  hoursSchema: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '20:00' },
  ],
  priceRange: '19–399 zł',
  freeRadiusKm: 15,
  travelFee: 30,
  geo: { lat: 50.0412, lng: 21.9991 }, // centrum Rzeszowa, firma dojeżdża do klienta
  payments: 'gotówka, BLIK lub przelew',
  // Dane firmy do stopki.
  company: {
    name: 'Szpalka Autodetailing Mikołaj Szpala',
    address: 'Borek Stary 64, 36-020 Tyczyn',
    nip: '8133950704',
    regon: '544460128',
  } as null | { name: string; address: string; nip: string; regon: string },
  googleReviewsUrl: null as null | string,
  facebookUrl: null as null | string,
  instagramUrl: null as null | string,
};

export function waLink(text = 'Dzień dobry, proszę o wycenę prania. Wysyłam zdjęcia.') {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export type PriceRow = { name: string; price: string; note?: string };

export type Service = {
  slug: string;
  short: string; // nazwa w menu
  h1: string;
  title: string; // <title>
  description: string; // meta description
  galleryCategory: string;
  icon: string;
  waText: string;
  intro: string[];
  prices: PriceRow[];
  points: { title: string; text: string }[];
  timing: string;
  faq: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: 'pranie-naroznikow-rzeszow',
    short: 'Narożniki',
    h1: 'Pranie narożników w Rzeszowie z dojazdem',
    title: 'Pranie narożnika Rzeszów – u Ciebie w domu, od 199 zł',
    description:
      'Pranie narożników w Rzeszowie i okolicach. Przyjeżdżamy z ekstraktorem, pierzemy na miejscu, bez wynoszenia mebla. Wycena ze zdjęcia na WhatsApp w 15 minut.',
    galleryCategory: 'narozniki',
    icon: 'sofa',
    waText: 'Dzień dobry, proszę o wycenę prania narożnika. Wysyłam zdjęcia.',
    intro: [
      'Narożnik to najczęściej używany mebel w domu. Siedzi się na nim, je, śpi i bawi z dziećmi, więc brud wchodzi głęboko w tkaninę i piankę. Odkurzacz zbiera tylko to, co na wierzchu.',
      'Pierzemy narożnik metodą ekstrakcyjną u Ciebie w salonie. Wtryskujemy roztwór pod ciśnieniem i od razu odsysamy go razem z brudem. Nie musisz niczego rozkręcać ani wynosić.',
    ],
    prices: [
      { name: 'Narożnik mały (do 4 miejsc)', price: 'od 199 zł' },
      { name: 'Narożnik duży lub w kształcie U', price: 'od 279 zł' },
      { name: 'Narożnik z funkcją spania, z pojemnikiem', price: 'od 229 zł' },
      { name: 'Dodatkowe poduszki (komplet)', price: 'od 29 zł' },
    ],
    points: [
      { title: 'Siedziska, oparcia i boki', text: 'Pierzemy cały narożnik, łącznie z bokami i poduszkami, nie tylko miejsca, na których się siedzi.' },
      { title: 'Plamy przed praniem', text: 'Przed praniem nakładamy odplamiacz dobrany do plamy: kawa, wino, tłuszcz, mocz zwierząt.' },
      { title: 'Zapach zwierząt', text: 'Przy psie lub kocie polecamy ozonowanie w trakcie prania. Zapach znika razem z bakteriami, które go wytwarzają.' },
    ],
    timing: 'Pranie narożnika trwa zwykle około 2 godzin. Tkanina schnie od 4 do 8 godzin, zależnie od materiału i wietrzenia.',
    faq: [
      { q: 'Czy trzeba zdejmować pokrowce z narożnika?', a: 'Nie. Pierzemy narożnik w całości, na miejscu. Zdejmowane pokrowce też pierzemy na meblu, żeby się nie skurczyły.' },
      { q: 'Czy narożnik będzie mokry?', a: 'Będzie lekko wilgotny, nie mokry. Ekstraktor odsysa większość wody od razu. Po kilku godzinach z otwartym oknem można siadać.' },
      { q: 'Ile kosztuje pranie narożnika w Rzeszowie?', a: 'Od 199 zł za mały narożnik. Dokładną cenę podamy po zdjęciu na WhatsApp. Dojazd w Rzeszowie jest w cenie.' },
    ],
  },
  {
    slug: 'pranie-kanap-rzeszow',
    short: 'Kanapy i sofy',
    h1: 'Pranie kanap i sof w Rzeszowie',
    title: 'Pranie kanapy Rzeszów – z dojazdem, od 149 zł',
    description:
      'Pranie kanap i sof w Rzeszowie i okolicach. Profesjonalny ekstraktor, środki bezpieczne dla dzieci i zwierząt po wyschnięciu. Wycena ze zdjęcia na WhatsApp.',
    galleryCategory: 'kanapy',
    icon: 'sofa',
    waText: 'Dzień dobry, proszę o wycenę prania kanapy. Wysyłam zdjęcia.',
    intro: [
      'Kanapa po kilku latach szarzeje, łapie plamy i zapachy. Zwykle nie trzeba jej wymieniać ani zmieniać obicia. Wystarczy porządne pranie.',
      'Przyjeżdżamy do Ciebie z ekstraktorem i chemią do tapicerki. Kanapę pierzemy tam, gdzie stoi, a po praniu zostaje tylko lekko wilgotna tkanina.',
    ],
    prices: [
      { name: 'Sofa 2-osobowa', price: 'od 129 zł' },
      { name: 'Kanapa 3-osobowa', price: 'od 149 zł' },
      { name: 'Kanapa z funkcją spania', price: 'od 169 zł' },
      { name: 'Kanapa + fotel (zestaw)', price: 'od 199 zł' },
    ],
    points: [
      { title: 'Większość tkanin', text: 'Welur, szenil, plecionka, mikrofibra, bawełna. Przed praniem sprawdzamy metkę i test robimy w niewidocznym miejscu.' },
      { title: 'Bez wynoszenia', text: 'Potrzebujemy tylko gniazdka 230 V i dostępu do wody. Resztę sprzętu przywozimy.' },
      { title: 'Impregnacja po praniu', text: 'Na jasne tkaniny i w domach z dziećmi polecamy impregnat. Rozlany sok łatwiej wtedy zebrać ściereczką.' },
    ],
    timing: 'Pranie kanapy trwa zwykle 1–1,5 godziny. Schnie od 4 do 8 godzin.',
    faq: [
      { q: 'Czy pranie usunie wszystkie plamy z kanapy?', a: 'Większość plam z jedzenia, napojów i codziennego brudu schodzi. Stare plamy z tuszu, farby, rdzy i odbarwienia po wybielaczu mogą zostać. Powiemy to uczciwie przed praniem.' },
      { q: 'Czy po praniu kanapa się nie odkształci?', a: 'Nie. Pianki nie przemaczamy, bo roztwór od razu odsysamy. Przy delikatnych tkaninach używamy mniej wody i niższej temperatury.' },
      { q: 'Ile kosztuje pranie kanapy w Rzeszowie?', a: 'Sofa 2-osobowa od 129 zł, kanapa 3-osobowa od 149 zł. Dokładną cenę podajemy po zdjęciu.' },
    ],
  },
  {
    slug: 'pranie-foteli-i-krzesel-rzeszow',
    short: 'Fotele i krzesła',
    h1: 'Pranie foteli i krzeseł tapicerowanych w Rzeszowie',
    title: 'Pranie krzeseł i foteli Rzeszów – krzesło od 19 zł',
    description:
      'Pranie krzeseł tapicerowanych i foteli w Rzeszowie. Przyjeżdżamy do domu, biura i restauracji. Krzesło od 19 zł, fotel od 59 zł. Wycena na WhatsApp.',
    galleryCategory: 'fotele-i-krzesla',
    icon: 'chair',
    waText: 'Dzień dobry, proszę o wycenę prania krzeseł/foteli. Wysyłam zdjęcia.',
    intro: [
      'Krzesła przy stole zbierają wszystko, co spadnie z talerza. Na jasnym obiciu plamy widać po kilku tygodniach.',
      'Pierzemy krzesła i fotele u Ciebie, w kilka minut na sztukę. Przy większej liczbie krzeseł cena za sztukę spada.',
    ],
    prices: [
      { name: 'Krzesło – samo siedzisko', price: 'od 19 zł' },
      { name: 'Krzesło – siedzisko i oparcie', price: 'od 29 zł' },
      { name: 'Fotel', price: 'od 59 zł' },
      { name: 'Fotel uszak lub wypoczynkowy', price: 'od 79 zł' },
      { name: 'Pufa, taboret tapicerowany', price: 'od 29 zł' },
    ],
    points: [
      { title: 'Komplet przy stole', text: 'Sześć krzeseł pierzemy w około godzinę. Schną szybciej niż kanapa, często w 2–4 godziny.' },
      { title: 'Firmy i lokale', text: 'Pierzemy krzesła w biurach, salach konferencyjnych i restauracjach. Na fakturę VAT, także po godzinach.' },
      { title: 'Przy okazji kanapy', text: 'Jeśli pierzemy u Ciebie kanapę, krzesła i fotele dokładamy w tej samej wizycie, bez kolejnego dojazdu.' },
    ],
    timing: 'Jedno krzesło to kilka minut prania. Schnie zwykle 2–4 godziny.',
    faq: [
      { q: 'Czy pierzecie krzesła w restauracjach i biurach?', a: 'Tak. Wystawiamy fakturę VAT i możemy przyjechać po godzinach otwarcia lokalu.' },
      { q: 'Ile kosztuje pranie krzesła tapicerowanego?', a: 'Od 19 zł za samo siedzisko i od 29 zł za siedzisko z oparciem.' },
      { q: 'Czy pierzecie fotele skórzane?', a: 'Skóry nie pierzemy wodą. Czyścimy ją i zabezpieczamy innymi środkami. Zapytaj przy wycenie.' },
    ],
  },
  {
    slug: 'pranie-materacy-rzeszow',
    short: 'Materace',
    h1: 'Pranie materacy w Rzeszowie',
    title: 'Pranie materaca Rzeszów – dla alergików, od 79 zł',
    description:
      'Pranie i odświeżanie materacy w Rzeszowie i okolicach. Usuwamy kurz, roztocza, plamy i zapachy. Dla alergików i rodziców małych dzieci. Od 79 zł.',
    galleryCategory: 'materace',
    icon: 'bed',
    waText: 'Dzień dobry, proszę o wycenę prania materaca. Wysyłam zdjęcia.',
    intro: [
      'Na materacu spędzamy jedną trzecią życia. Zbiera pot, naskórek i kurz, a w nich żyją roztocza, które uczulają.',
      'Najpierw dokładnie odkurzamy materac odkurzaczem przemysłowym, potem pierzemy go ekstrakcyjnie. Usuwamy plamy, zapach i alergeny z wierzchniej warstwy.',
    ],
    prices: [
      { name: 'Materac 1-osobowy (jedna strona)', price: 'od 79 zł' },
      { name: 'Materac 2-osobowy (jedna strona)', price: 'od 109 zł' },
      { name: 'Druga strona materaca', price: '+50%' },
      { name: 'Materac dziecięcy lub do łóżeczka', price: 'od 59 zł' },
      { name: 'Zabieg antyroztoczowy', price: '+ od 39 zł' },
    ],
    points: [
      { title: 'Dla alergików', text: 'Zabieg antyroztoczowy ogranicza roztocza i ich alergeny. Polecamy go przy alergii na kurz i astmie.' },
      { title: 'Plamy i zapachy', text: 'Mocz, pot, kawa, krew. Do każdej plamy dobieramy środek przed praniem.' },
      { title: 'Łóżeczka i materace dzieci', text: 'Po wyschnięciu materac jest bezpieczny dla dziecka. Na plamy z moczu u dzieci i zwierząt mamy osobny środek enzymatyczny.' },
    ],
    timing: 'Pranie materaca trwa 20–40 minut. Schnie 6–10 godzin, więc najlepiej umówić się rano.',
    faq: [
      { q: 'Jak często prać materac?', a: 'Raz na rok, a przy alergii, małych dzieciach albo zwierzętach w łóżku co 6 miesięcy.' },
      { q: 'Czy materac zdąży wyschnąć do wieczora?', a: 'Przy praniu rano i otwartym oknie zwykle tak. Schnięcie trwa 6–10 godzin.' },
      { q: 'Czy usuniecie plamę z moczu?', a: 'Świeże i średnio stare plamy z moczu usuwamy razem z zapachem. Bardzo stare mogą zostawić jaśniejszy ślad.' },
    ],
  },
  {
    slug: 'pranie-dywanow-rzeszow',
    short: 'Dywany i wykładziny',
    h1: 'Pranie dywanów i wykładzin w Rzeszowie u klienta',
    title: 'Pranie dywanów Rzeszów – na miejscu, od 10 zł/m²',
    description:
      'Pranie dywanów i wykładzin w Rzeszowie na miejscu, bez wywożenia. Domy, mieszkania i biura. Od 10 zł za m². Wycena ze zdjęcia na WhatsApp.',
    galleryCategory: 'dywany',
    icon: 'rug',
    waText: 'Dzień dobry, proszę o wycenę prania dywanu/wykładziny. Wysyłam zdjęcia i wymiary.',
    intro: [
      'Dywanu nie trzeba zwijać, wynosić ani czekać na niego tydzień. Pierzemy go tam, gdzie leży.',
      'Pranie na miejscu sprawdza się przy dywanach syntetycznych i wykładzinach w mieszkaniach i biurach. Dywany wełniane i ręcznie tkane wyceniamy osobno.',
    ],
    prices: [
      { name: 'Dywan syntetyczny', price: 'od 10 zł/m²' },
      { name: 'Wykładzina w mieszkaniu', price: 'od 8 zł/m²' },
      { name: 'Wykładzina w biurze (powyżej 50 m²)', price: 'wycena indywidualna' },
      { name: 'Minimalna kwota zlecenia', price: '99 zł' },
    ],
    points: [
      { title: 'Bez wywożenia', text: 'Odkurzamy, nakładamy środek, pierzemy ekstrakcyjnie. Dywan wraca do użytku tego samego dnia.' },
      { title: 'Biura i wspólnoty', text: 'Pierzemy wykładziny w biurach i na klatkach schodowych, także w weekendy. Wystawiamy fakturę VAT.' },
      { title: 'Przy praniu mebli', text: 'Najtaniej wychodzi dywan dołożony do prania kanapy lub narożnika. Jeden dojazd, jedna wizyta.' },
    ],
    timing: 'Dywan 2 × 3 m pierzemy w około 40 minut. Schnie 4–8 godzin.',
    faq: [
      { q: 'Czy pierzecie dywany wełniane?', a: 'Tak, ale ostrożniej i innymi środkami. Wełna i dywany ręcznie tkane są wyceniane osobno.' },
      { q: 'Ile kosztuje pranie dywanu w Rzeszowie?', a: 'Od 10 zł za m² dywanu syntetycznego. Minimalna kwota zlecenia to 99 zł, chyba że dywan dokładasz do prania mebli.' },
      { q: 'Czy trzeba przesuwać meble?', a: 'Lekkie meble przesuniemy sami. Szafy i ciężkie meble zostają na miejscu, pierzemy wokół nich.' },
    ],
  },
  {
    slug: 'pranie-tapicerki-samochodowej-rzeszow',
    short: 'Tapicerka samochodowa',
    h1: 'Pranie tapicerki samochodowej w Rzeszowie z dojazdem',
    title: 'Pranie tapicerki samochodowej Rzeszów – z dojazdem',
    description:
      'Pranie tapicerki samochodowej w Rzeszowie na Twoim podjeździe. Fotele, kanapa, podsufitka, wykładzina. Robimy to ludzie z doświadczeniem w detailingu.',
    galleryCategory: 'auta',
    icon: 'car',
    waText: 'Dzień dobry, proszę o wycenę prania tapicerki w samochodzie. Marka i model:',
    intro: [
      'Za prania aut odpowiada u nas człowiek, który na co dzień prowadzi studio detailingowe. Fotele, boczki i wykładzinę pierzemy tymi samymi środkami, co w studiu.',
      'Przyjeżdżamy pod dom albo pod pracę. Potrzebujemy tylko miejsca obok auta i dostępu do gniazdka.',
    ],
    prices: [
      { name: 'Przednie fotele (2 szt.)', price: 'od 119 zł' },
      { name: 'Wszystkie fotele i kanapa – auto osobowe', price: 'od 199 zł' },
      { name: 'Komplet: fotele, wykładzina, bagażnik', price: 'od 299 zł' },
      { name: 'SUV, van, 7 miejsc', price: 'od 299 zł' },
      { name: 'Podsufitka', price: 'od 99 zł' },
      { name: 'Fotelik dziecięcy', price: 'od 59 zł' },
    ],
    points: [
      { title: 'Przy praniu kanapy', text: 'Jeśli i tak przyjeżdżamy do Ciebie z praniem mebli, tapicerkę auta zrobimy w tej samej wizycie i taniej.' },
      { title: 'Przed sprzedażą auta', text: 'Czyste wnętrze to wyższa cena na OtoMoto. Pranie tapicerki zwraca się przy sprzedaży.' },
      { title: 'Fotelik dziecka', text: 'Pierzemy też foteliki samochodowe, z pasami i wkładką.' },
    ],
    timing: 'Pranie wnętrza auta osobowego trwa 1,5–3 godziny. Przy otwartych szybach tapicerka schnie kilka godzin.',
    faq: [
      { q: 'Czy musicie mieć dostęp do prądu?', a: 'Tak, potrzebujemy gniazdka 230 V w zasięgu przedłużacza (około 20 m).' },
      { q: 'Czy pierzecie podsufitkę?', a: 'Tak, ale ostrożnie i małą ilością wody, żeby nie odkleić materiału. Wyceniamy ją osobno.' },
      { q: 'Czy robicie pełny detailing?', a: 'Pełny detailing, polerowanie i powłoki robimy w studiu. Mobilnie zajmujemy się praniem tapicerki.' },
    ],
  },
];

export const EXTRAS = [
  { name: 'Impregnacja tkaniny', price: '+ od 49 zł', text: 'Plamy po soku i kawie schodzą ściereczką, zanim wsiąkną.' },
  { name: 'Ozonowanie', price: '+ od 39 zł', text: 'Usuwa zapach psa, kota i dymu papierosowego.' },
  { name: 'Zabieg antyroztoczowy', price: '+ od 39 zł', text: 'Dla alergików. Ogranicza roztocza w materacach i kanapach.' },
  { name: 'Tapicerka auta przy okazji', price: '+ od 199 zł', text: 'Pierzemy fotele w Twoim aucie w tej samej wizycie.' },
];

export const STEPS = [
  { title: 'Wyślij zdjęcie', text: 'Zrób zdjęcie mebla i wyślij na WhatsApp. Cenę dostaniesz zwykle w 15 minut.' },
  { title: 'Umówmy termin', text: 'Pracujemy od poniedziałku do soboty. Przyjeżdżamy z całym sprzętem i chemią.' },
  { title: 'Pierzemy u Ciebie', text: 'Bez wynoszenia mebli. Tapicerka schnie zwykle kilka godzin.' },
];

export type Town = {
  slug: string;
  name: string;
  locative: string; // „w Tyczynie”
  to: string; // „do Tyczyna”
  gmina: string;
  villages: string[];
  travel: 'gratis' | 'doplata';
  note: string;
};

export const TOWNS: Town[] = [
  {
    slug: 'pranie-tapicerki-tyczyn',
    name: 'Tyczyn',
    locative: 'w Tyczynie',
    to: 'do Tyczyna',
    gmina: 'gmina Tyczyn',
    villages: ['Hermanowa', 'Matysówka', 'Borek Stary', 'Borek Nowy', 'Kielnarowa', 'Błędowa Tyczyńska'],
    travel: 'gratis',
    note: 'Tyczyn jest kilkanaście minut jazdy od Rzeszowa, więc dojazd jest w cenie.',
  },
  {
    slug: 'pranie-tapicerki-boguchwala',
    name: 'Boguchwała',
    locative: 'w Boguchwale',
    to: 'do Boguchwały',
    gmina: 'gmina Boguchwała',
    villages: ['Lutoryż', 'Mogielnica', 'Zgłobień', 'Racławówka', 'Niechobrz', 'Wola Zgłobieńska'],
    travel: 'gratis',
    note: 'Do Boguchwały i okolicznych wsi dojeżdżamy w kwadrans od centrum Rzeszowa.',
  },
  {
    slug: 'pranie-tapicerki-krasne',
    name: 'Krasne',
    locative: 'w Krasnem',
    to: 'do Krasnego',
    gmina: 'gmina Krasne',
    villages: ['Malawa', 'Palikówka', 'Strażów', 'Krasne'],
    travel: 'gratis',
    note: 'Krasne i Malawa to praktycznie przedmieścia Rzeszowa, dojazd jest zawsze w cenie.',
  },
  {
    slug: 'pranie-tapicerki-glogow-malopolski',
    name: 'Głogów Małopolski',
    locative: 'w Głogowie Małopolskim',
    to: 'do Głogowa Małopolskiego',
    gmina: 'gmina Głogów Małopolski',
    villages: ['Rudna Mała', 'Rogoźnica', 'Przewrotne', 'Wysoka Głogowska', 'Budy Głogowskie'],
    travel: 'gratis',
    note: 'Do Głogowa Małopolskiego dojeżdżamy z Rzeszowa w około 20 minut.',
  },
  {
    slug: 'pranie-tapicerki-trzebownisko',
    name: 'Trzebownisko',
    locative: 'w Trzebownisku',
    to: 'do Trzebowniska',
    gmina: 'gmina Trzebownisko',
    villages: ['Jasionka', 'Łąka', 'Nowa Wieś', 'Terliczka', 'Zaczernie', 'Stobierna'],
    travel: 'gratis',
    note: 'Dojeżdżamy do domów w całej gminie i do firm w strefie przy lotnisku w Jasionce.',
  },
  {
    slug: 'pranie-tapicerki-swilcza',
    name: 'Świlcza',
    locative: 'w Świlczy',
    to: 'do Świlczy',
    gmina: 'gmina Świlcza',
    villages: ['Bratkowice', 'Trzciana', 'Mrowla', 'Dąbrowa', 'Woliczka', 'Rudna Wielka'],
    travel: 'gratis',
    note: 'Dojeżdżamy do wszystkich miejscowości w gminie Świlcza.',
  },
  {
    slug: 'pranie-tapicerki-lubenia',
    name: 'Lubenia',
    locative: 'w Lubeni',
    to: 'do Lubeni',
    gmina: 'gmina Lubenia',
    villages: ['Siedliska', 'Sołonka', 'Straszydle', 'Lubenia'],
    travel: 'doplata',
    note: 'Do Lubeni i okolicznych wsi dojeżdżamy z dopłatą za dojazd.',
  },
];

export const RZESZOW_DISTRICTS = [
  'Baranówka', 'Biała', 'Budziwój', 'Drabinianka', 'Krakowska-Południe', 'Kmity', 'Nowe Miasto',
  'Pobitno', 'Przybyszówka', 'Słocina', 'Staromieście', 'Staroniwa', 'Śródmieście', 'Wilkowyja',
  'Załęże', 'Zalesie', 'Zwięczyca',
];

export const FAQ_GENERAL = [
  { q: 'Ile schnie kanapa po praniu?', a: 'Zwykle 4–8 godzin. Zależy od tkaniny, temperatury w mieszkaniu i wietrzenia. Otwarte okno albo wentylator skracają schnięcie.' },
  { q: 'Czego potrzebujecie na miejscu?', a: 'Gniazdka 230 V i dostępu do wody, na przykład w łazience. Sprzęt, chemię i folie ochronne przywozimy.' },
  { q: 'Czy środki są bezpieczne dla dzieci i zwierząt?', a: 'Tak, po wyschnięciu. Używamy profesjonalnych środków do tapicerki, a ich resztki wypłukujemy ekstraktorem. Na czas prania i schnięcia zwierzęta najlepiej trzymać w innym pokoju.' },
  { q: 'Jak wygląda wycena?', a: 'Wysyłasz zdjęcie mebla na WhatsApp. Odpisujemy z ceną i wolnymi terminami, zwykle w ciągu 15 minut w godzinach pracy.' },
  { q: 'Gdzie dojeżdżacie?', a: `Dojazd po Rzeszowie i do ${SITE.freeRadiusKm} km od miasta jest w cenie. Dalej doliczamy ${SITE.travelFee} zł.` },
  { q: 'Czy wystawiacie faktury?', a: 'Tak. Wystawiamy paragon albo fakturę VAT, także dla firm, wspólnot i właścicieli mieszkań na wynajem.' },
  { q: 'Jak można zapłacić?', a: `Na miejscu po praniu: ${SITE.payments}.` },
  { q: 'Czy trzeba coś przygotować przed praniem?', a: 'Wystarczy zdjąć z mebla rzeczy osobiste i zrobić do niego dostęp. Odkurzanie robimy sami przed praniem.' },
];
