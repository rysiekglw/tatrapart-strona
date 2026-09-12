/* ============================================================================
   TATRAPART - KONFIGURACJA STRONY
   ----------------------------------------------------------------------------
   To jest JEDYNY plik, ktory trzeba edytowac, aby podmienic dane firmowe,
   dane apartamentow oraz podpiac silnik rezerwacji Hotres.
   Pozycje oznaczone // >>> DO POTWIERDZENIA <<< wymagaja weryfikacji.
   ========================================================================== */

window.TATRAPART_CONFIG = {

  /* --------------------------------------------------------------------
     1. SILNIK REZERWACJI (HOTRES)
     --------------------------------------------------------------------
     Podpiecie Hotres to kolejny krok prac. Do tego czasu kazdy przycisk
     "Rezerwuj" kieruje na strone kontaktowa, zeby zadne klikniecie
     nie zostalo zmarnowane.
     Po otrzymaniu adresu: wpisz bookingUrl, objectId i ustaw enabled: true.
     -------------------------------------------------------------------- */
  booking: {
    enabled: false,
    bookingUrl: '#rezerwacja',
    objectId: '',
    openInNewTab: true,
    langParam: 'lang',
    langMap: { pl: 'pl', en: 'en', uk: 'en', ru: 'en' },
    unitParam: 'unit'
  },

  /* --------------------------------------------------------------------
     2. DANE FIRMOWE I KONTAKTOWE  — POTWIERDZONE
     -------------------------------------------------------------------- */
  company: {
    name: 'TatrApart',
    legalName: 'TatrApart Tatiana Glowacka',
    legalNameDisplay: 'TatrApart Tatiana Głowacka',
    street: 'ul. Topory 1B',
    postalCode: '34-500',
    city: 'Zakopane',
    region: 'Malopolskie',
    country: 'Polska',
    countryCode: 'PL',
    nip: '5262638491',
    regon: '523743437',
    phone: '+48 510 005 004',
    phoneHref: '+48510005004',
    email: 'contact@tatrapart.pl',
    reservationsEmail: 'contact@tatrapart.pl',
    // Wspolrzedne budynku przy ul. Topory 1B odczytane z bazy OpenStreetMap
    // (wyszukiwarka Nominatim, wrzesien 2026). Pinezka na mapie i odnosnik do
    // Map Google korzystaja z tych samych liczb.
    latitude: 49.311585,
    longitude: 19.996076,
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=49.311585,19.996076'
  },

  social: {
    instagram: 'https://www.instagram.com/tatrapart/',
    facebook: '',                                    // brak profilu — odnosnik sie nie pokaze
    bookingcom: ''
  },

  /* Dokumenty prawne. Pusty adres = odnosnik nie pojawia sie w stopce,
     zamiast prowadzic donikad. Po przygotowaniu polityki prywatnosci
     wpisz tu jej adres, np. 'polityka-prywatnosci.html'. */
  legal: {
    privacyUrl: ''                                   // >>> DO UZUPELNIENIA <<<
  },

  /* --------------------------------------------------------------------
     3. ZASADY POBYTU — z Regulaminu obiektu
     -------------------------------------------------------------------- */
  stay: {
    checkInFrom:   '16:00',
    checkOutUntil: '11:00',
    quietFrom:     '23:00',
    quietUntil:    '06:00',
    visitorsFrom:  '07:00',
    visitorsUntil: '22:00',
    depositPln:    300,
    depositEur:    70,
    prepaymentPercent: 30,
    prepaymentHours:   48,
    minNights: null,                                 // >>> DO POTWIERDZENIA <<< brak w regulaminie
    maxNights: 14,
    petsAllowed: null,                               // >>> DO POTWIERDZENIA <<< brak w regulaminie
    smoking: false,
    parking: true,
    parkingFree: true
  },

  /* --------------------------------------------------------------------
     4. APARTAMENTY — dane przepisane z tatrapart.pl
     --------------------------------------------------------------------
     Obiekt to dwa trzypietrowe domki goralskie: Domek Forest i Domek Snow.
     Kazdy z nich ma 3 apartamenty, czyli razem 6 apartamentow.
     Ponizej 3 TYPY apartamentow; kazdy wystepuje w wersji Brown (Forest)
     i White (Snow).

     photos podaje liczbe zdjec kazdego wariantu. Pliki leza w
     assets/images/apartamenty/ i nazywaja sie wedlug schematu
     <id>-brown-01.jpg, <id>-brown-02.jpg, <id>-white-01.jpg itd.
     Dokladasz zdjecia? Dograj plik z kolejnym numerem i podnies liczbe.
     Kolejnosc apartamentow na stronie jest taka jak ponizej.
     -------------------------------------------------------------------- */
  apartments: [
    {
      id: 'deluxe-parter',
      i18nKey: 'apt.deluxeParter',
      // Zdjecia przeniesione z tatrapart.pl, osobny zestaw dla kazdego wariantu.
      // Pliki: assets/images/apartamenty/<id>-<wariant>-01.jpg ... -NN.jpg
      photos: { path: 'apartamenty/', brown: 14, white: 26 },
      priceFrom: 445,
      guests: 6,
      bedrooms: 2,
      bathrooms: 1,
      area: 85,
      floorKey: 'floor.ground',
      typeKey: 'type.deluxe',
      variants: ['brown', 'white'],
      features: ['terrace', 'mountainView', 'sauna', 'jacuzzi', 'balcony', 'fireplace',
                 'bath', 'shower', 'kitchen', 'fridge', 'dishwasher', 'kettle',
                 'tv', 'wifi', 'heating', 'parking', 'towels', 'hairdryer',
                 'gardenView', 'tableware']
    },
    {
      id: 'deluxe-pietro',
      i18nKey: 'apt.deluxePietro',
      photos: { path: 'apartamenty/', brown: 8, white: 28 },
      priceFrom: 495,
      guests: 8,
      bedrooms: 3,
      bathrooms: 2,
      area: 90,
      floorKey: 'floor.first',
      typeKey: 'type.deluxe',
      variants: ['brown', 'white'],
      features: ['terrace', 'mountainView', 'sauna', 'jacuzzi', 'balcony4', 'fireplace',
                 'bath', 'shower', 'kitchen', 'fridge', 'dishwasher', 'kettle',
                 'tv', 'wifi', 'heating', 'parking', 'towels', 'hairdryer',
                 'gardenView', 'tableware']
    },
    {
      id: 'suite-poddasze',
      i18nKey: 'apt.suitePoddasze',
      photos: { path: 'apartamenty/', brown: 10, white: 23 },
      priceFrom: 297,
      guests: 6,
      bedrooms: 3,
      bathrooms: 1,
      area: 60,
      floorKey: 'floor.attic',
      typeKey: 'type.suite',
      variants: ['brown', 'white'],
      // Na poddaszu nie ma kominka — jest tylko na parterze i I pietrze.
      features: ['terrace', 'mountainView', 'sauna', 'jacuzzi', 'balcony',
                 'bath', 'shower', 'bidet', 'kitchen', 'fridge', 'dishwasher',
                 'kettle', 'microwave', 'tv', 'wifi', 'heating', 'parking',
                 'towels', 'hairdryer', 'gardenView', 'tableware']
    }
  ],
  currency: 'zł',
  showPrices: true,

  /* --------------------------------------------------------------------
     5. ODLEGLOSCI — orientacyjne, liczone od ul. Topory 1B
     -------------------------------------------------------------------- */
  distances: [
    { i18nKey: 'dist.krupowki',  value: '2,5 km', time: '8 min' },   // >>> DO POTWIERDZENIA <<<
    { i18nKey: 'dist.gubalowka', value: '3,0 km', time: '10 min' },  // >>> DO POTWIERDZENIA <<<
    { i18nKey: 'dist.kasprowy',  value: '5,0 km', time: '14 min' },  // >>> DO POTWIERDZENIA <<<
    { i18nKey: 'dist.nosal',     value: '4,0 km', time: '12 min' },  // >>> DO POTWIERDZENIA <<<
    { i18nKey: 'dist.termy',     value: '22 km',  time: '30 min' },  // >>> DO POTWIERDZENIA <<<
    { i18nKey: 'dist.krakow',    value: '105 km', time: '2 h' }      // >>> DO POTWIERDZENIA <<<
  ],

  /* --------------------------------------------------------------------
     6. GALERIA
     Pliki: assets/images/gallery-01.jpg ... gallery-11.jpg
     Dodajesz kolejne? Nazwij gallery-12.jpg i podnies liczbe o jeden.
     -------------------------------------------------------------------- */
  galleryCount: 11,
  galleryPath: 'assets/images/',
  galleryPrefix: 'gallery-',
  galleryExt: '.jpg',
  logo: 'assets/images/logo-tatrapart.png',

  /* --------------------------------------------------------------------
     7. OKOLICA
     Karty sa tekstowe, bo nie mamy zdjec tych miejsc. Po zdobyciu zdjec:
     wpisz nazwy plikow w pole img i ustaw nearbyImages na true.
     -------------------------------------------------------------------- */
  nearbyImages: false,
  nearby: [
    { id: 'krupowki',    i18nKey: 'near.krupowki',    img: '' },
    { id: 'kasprowy',    i18nKey: 'near.kasprowy',    img: '' },
    { id: 'morskieoko',  i18nKey: 'near.morskieoko',  img: '' },
    { id: 'termy',       i18nKey: 'near.termy',       img: '' },
    { id: 'koscieliska', i18nKey: 'near.koscieliska', img: '' },
    { id: 'krokiew',     i18nKey: 'near.krokiew',     img: '' }
  ],

  /* --------------------------------------------------------------------
     8. OPINIE GOSCI — sekcja ukryta do czasu wpisania prawdziwych opinii
     -------------------------------------------------------------------- */
  reviews: [
    { id: 'r1', i18nKey: 'rev.r1', author: '', source: '' },
    { id: 'r2', i18nKey: 'rev.r2', author: '', source: '' },
    { id: 'r3', i18nKey: 'rev.r3', author: '', source: '' }
  ],
  showReviews: false,

  /* --------------------------------------------------------------------
     9. REGULAMIN
     --------------------------------------------------------------------
     Tresc regulaminu jest podana wylacznie po polsku, we wszystkich
     wersjach jezykowych serwisu. Powod: tlumaczenie tekstu prawnego
     bez akceptacji prawnika byloby ryzykowne. Przy regulaminie wyswietla
     sie przetlumaczona informacja, ze wiazaca jest wersja polska.
     Aby wlaczyc tlumaczenia po ich zatwierdzeniu: translateTerms: true
     oraz uzupelnij klucze terms.* w pozostalych jezykach w i18n.js.
     -------------------------------------------------------------------- */
  translateTerms: false,

  /* --------------------------------------------------------------------
     10. JEZYKI
     -------------------------------------------------------------------- */
  languages: [
    { code: 'pl', label: 'Polski',     short: 'PL' },
    { code: 'en', label: 'English',    short: 'EN' },
    { code: 'uk', label: 'Ukrainska',  short: 'UA' },
    { code: 'ru', label: 'Russkiy',    short: 'RU' }
  ],
  defaultLanguage: 'pl'
};
