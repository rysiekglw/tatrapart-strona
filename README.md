# TatrApart — strona internetowa

Statyczna strona w HTML / CSS / JavaScript. Bez frameworków, bez kompilacji,
bez zależności instalowanych z internetu. Wystarczy wgrać katalog na serwer.

---

## 1. Jak uruchomić lokalnie

**Najprościej:** kliknij dwukrotnie `index.html`. Otworzy się w przeglądarce
i zadziała prawie wszystko.

**Zalecane:** uruchom lokalny serwer. Przy zwykłym otwarciu pliku część
przeglądarek blokuje mapę i niektóre zachowania. Otwórz terminal w tym
katalogu i wpisz jedno z poniższych:

```
python -m http.server 8000
```

albo, jeśli masz Node:

```
npx serve .
```

Następnie wejdź na adres **http://localhost:8000** (lub ten, który pokaże
terminal). Serwer zatrzymasz skrótem Ctrl + C.

### Co warto sprawdzić w pierwszej kolejności

1. Przewiń stronę główną do końca — zobaczysz wszystkie sekcje.
2. Kliknij **PL** w prawym górnym rogu i przełącz na English, Українська,
   Русский. Cała strona zmieni język, a wybór zostanie zapamiętany.
3. Kliknij **Zobacz zdjęcia** w sekcji powitalnej — otworzy się galeria
   z miniaturami. Zamkniesz ją klawiszem Esc.
4. Wejdź w **Apartamenty** — trzy typy, każdy z wariantem Brown i White.
5. Wejdź w **Regulamin** — spis treści po lewej przewija do sekcji.
6. Zwęź okno przeglądarki do szerokości telefonu — układ przestawi się
   na jedną kolumnę, a na dole pojawi się pasek z przyciskiem rezerwacji.
7. Kliknij **Rezerwuj** — w nowej karcie otworzy się panel rezerwacji
   Hotres TatrApartu.

---

## 2. Publikacja: GitHub i Vercel

Strona jest w repozytorium **prywatnym**:
https://github.com/rysiekglw/tatrapart-strona

### Jak to działa

```
zmiana w plikach  ->  wyslij.bat  ->  GitHub  ->  Vercel buduje  ->  strona na zywo
```

Każdy push na gałąź `main` automatycznie aktualizuje stronę. Nic więcej nie
trzeba robić, nie ma osobnego „wgrywania na serwer".

### Wysyłanie zmian — jedno kliknięcie

**Najprościej:** kliknij dwukrotnie plik **`wyslij.bat`** w katalogu projektu.
Otworzy się okienko, pokaże, co się zmieniło, i wyśle to na GitHuba.

**Z terminala**, jeśli chcesz dodać własny opis zmiany:

```
.\wyslij.bat "nowe zdjecia apartamentu na poddaszu"
```

Skrypt sam sprawdzi, co się zmieniło, zapisze to i wyśle. Jeżeli nic się nie
zmieniło, powie o tym i nic nie zrobi. Strona odświeży się po około minucie.

> **Dlaczego `.bat`, a nie `.ps1`?** Windows domyślnie blokuje uruchamianie
> skryptów PowerShella. Plik `wyslij.bat` omija tę blokadę tylko dla tego
> jednego skryptu, bez zmieniania ustawień bezpieczeństwa całego systemu.
> Właściwa logika siedzi w `wyslij.ps1` — `.bat` tylko go uruchamia.

### Vercel CLI nie jest potrzebny

Vercel CLI służy do ręcznego wgrywania (`vercel --prod`), czyli dokładnie
odwrotnie niż chcemy. Automatyczne budowanie po każdym pushu zapewnia
integracja z GitHubem, którą ustawia się raz w panelu Vercela. Dodatkowo CLI
wymaga Node.js, którego na tym komputerze nie ma, a instalowanie go tylko po
to byłoby zbędne.

### Jednorazowe podłączenie Vercela do GitHuba

To jedyny krok, który trzeba wyklikać samodzielnie, bo wymaga zalogowania:

1. Wejdź na **vercel.com** i zaloguj się przez **Continue with GitHub**.
2. Kliknij **Add New… → Project**.
3. Na liście repozytoriów znajdź **tatrapart-strona** i kliknij **Import**.
   Jeśli repozytorium się nie pokazuje, kliknij **Adjust GitHub App
   Permissions** i daj Vercelowi dostęp do niego — jest prywatne, więc trzeba
   to potwierdzić.
4. Vercel sam rozpozna stronę statyczną. **Nie zmieniaj żadnych ustawień** —
   Framework Preset zostaw na „Other", pola Build Command i Output Directory
   zostaw puste. Kliknij **Deploy**.

Po minucie dostaniesz adres w rodzaju `tatrapart-strona.vercel.app`.
Od tego momentu każdy push aktualizuje stronę automatycznie.

### Własna domena

W panelu projektu: **Settings → Domains → Add**. Wpisz `tatrapart.pl`.
Vercel pokaże, jakie rekordy DNS ustawić u operatora domeny. Uwaga: obecna
strona tatrapart.pl działa gdzie indziej, więc przepinaj domenę dopiero
wtedy, gdy nowa wersja będzie gotowa do zastąpienia starej.

### Jeśli wolisz repozytorium publiczne

```
gh repo edit rysiekglw/tatrapart-strona --visibility public --accept-visibility-change-consequences
```

---

## 3. Struktura plików

```
index.html            strona główna
apartamenty.html      trzy typy apartamentów, warianty Brown i White
galeria.html          galeria zdjęć z powiększaniem
oferty.html           strona celowo pusta
kontakt.html          dane kontaktowe, formularz, mapa
regulamin.html        regulamin rezerwacji i regulamin obiektu

assets/css/style.css       cała warstwa wizualna
assets/js/site-config.js   DANE FIRMY, APARTAMENTY, HOTRES  <-- tu edytujesz
assets/js/i18n.js          teksty w czterech językach        <-- tu edytujesz
assets/js/main.js          logika: menu, karuzele, galeria, formularze
assets/images/             zdjęcia

.build/                    szablony i skrypt składający podstrony
PROJECT-CHECKLIST.md       lista kontrolna postępu prac
```

### Nagłówek i stopka

Są wspólne dla wszystkich stron, ale fizycznie powtarzają się w każdym pliku
HTML. Jeżeli je zmieniasz, zrób to **w `index.html`**, a potem uruchom:

```
bash .build/build.sh
```

Skrypt przepisze nagłówek i stopkę do wszystkich podstron. Treść podstron
znajduje się w plikach `.build/main-*.html`.

---

## 4. Zdjęcia

### Wnętrza — gotowe

Wgrane i podpięte: **logo + 17 zdjęć wnętrz** (`gallery-01.jpg` … `gallery-17.jpg`).
Zdjęcia 01–11 mają przypisane stałe role (hero, tło, paralaksa) — 12–17 to
dodatkowe ujęcia (zima z drona, bilard, sauna, jacuzzi), które trafiają tylko
do siatki na stronie Galeria.

| Plik | Ujęcie | Gdzie |
|---|---|---|
| `gallery-01.jpg` | jadalnia, widok na Giewont, lato | galeria |
| `gallery-02.jpg` | taras, panorama Tatr | duże zdjęcie z paralaksą |
| `gallery-03.jpg` | sypialnia, drzwi z niedźwiedziem | hero podstrony Apartamenty |
| `gallery-04.jpg` | kamienny kominek i stół | hero Regulaminu |
| `gallery-05.jpg` | salon ze skórzaną kanapą | **hero strony głównej**, `og:image` |
| `gallery-06.jpg` | sypialnia z pikowanym zagłówkiem | hero podstrony Galeria |
| `gallery-07.jpg` | poddasze z aneksem kuchennym | galeria |
| `gallery-08.jpg` | salon z choinką | galeria |
| `gallery-09.jpg` | antresola z szezlongiem | galeria |
| `gallery-10.jpg` | taras zimą | tło bloku Oferty, hero Oferty |
| `gallery-11.jpg` | widok z balkonu, Giewont | hero podstrony Kontakt |
| `gallery-12.jpg` … `gallery-17.jpg` | domki zimą z drona, bilard, sauna, jacuzzi | galeria |

Dodajesz kolejne? Nazwij `gallery-18.jpg` i zmień `galleryCount: 17` na `18`
w `site-config.js`.

### Apartamenty — gotowe

Zdjęcia w `assets/images/apartamenty/`, skompresowane do 1920 px / jakość 85
(oryginały z aparatu ważyły łącznie 400 MB — po kompresji 39 MB). Każdy
wariant ma własny zestaw, a nazwy plików mówią, gdzie zdjęcie trafia:

| Apartament | Brown | White |
|---|---|---|
| `deluxe-parter` — 4–6 osobowy | 14 zdjęć | 17 zdjęć |
| `deluxe-pietro` — 6–8 osobowy | 18 zdjęć | **nie istnieje** |
| `suite-poddasze` — 6 osobowy | 14 zdjęć | 15 zdjęć |

> **Wariant White apartamentu 6–8 osobowego (deluxe-pietro) jeszcze nie
> istnieje** — to jedyny wyjątek, ustalony świadomie z właścicielką. W
> `site-config.js` ten apartament ma `variants: ['brown']` i w ogóle nie ma
> klucza `white` w `photos`. Gdy apartament powstanie i pojawią się zdjęcia:
> dopisz `white: NN` do `photos` i `'white'` do `variants`.

Schemat nazwy: `<apartament>-<wariant>-NN.jpg`, na przykład
`deluxe-parter-white-01.jpg`. Dokładasz zdjęcie? Dograj plik z kolejnym
numerem i podnieś liczbę w `photos` w `site-config.js` — reszta dzieje się
sama. Zdjęcie `-01` każdego wariantu Brown jest zarazem zdjęciem głównym
apartamentu, tym z karuzeli na stronie głównej.

### Ikony wyposażenia

W `assets/images/ikony/` leży 20 ikon przeniesionych z tatrapart.pl oraz dwie
dorysowane (`bidet.svg`, `microwave.svg`), bo takich nie było. Strona maluje je
kolorem dębowym z palety, więc pliki mogą pozostać czarno-białe. Przypisanie
ikony do wyposażenia siedzi w `main.js`, w tablicy `FEATURE_ICON`.

### Logo

Przesłany plik miał białe tło, przez co na ciemnym nagłówku i w stopce
pojawiałby się biały prostokąt. Został przetworzony: białe tło zamienione na
przezroczystość, obraz przycięty do samego znaku (z 605×515 na 475×317).
Oryginał zachowany jako `logo-tatrapart-oryginal.png`.

### Zdjęcia okolicy

Sekcja „Zakopane i okolica" opisuje Krupówki, Kasprowy Wierch, Morskie Oko
i inne miejsca. Nie mamy ich zdjęć, a podpisanie zdjęcia salonu nazwą
„Morskie Oko" wprowadzałoby Gości w błąd. Karty są więc tekstowe.
Po zdobyciu zdjęć: wpisz nazwy plików w `nearby` i ustaw `nearbyImages: true`.

---

## 5. Hotres — podpięty

Każdy przycisk „Rezerwuj" i „Sprawdź dostępność" otwiera w nowej karcie panel
rezerwacji TatrApartu:

```
https://panel.hotres.pl/v4_step1?oid=2746&lang=pl
```

Numer obiektu (`oid: 2746`) i adres pochodzą z formularza rezerwacji, który
działa na tatrapart.pl. Ustawienia siedzą w `booking` w `site-config.js`;
język dokleja się sam — Hotres mówi po polsku, angielsku i rosyjsku, a dla
ukraińskiego pokazuje wersję angielską.

### Panel wyboru dat

Na stronie głównej, w miejscu dawnych dwóch przycisków, stoi jasna płyta
z trzema polami — przyjazd, wyjazd, liczba osób — a obok niej dębowy przycisk
**Sprawdź dostępność**. Wybrane wartości jadą do Hotresa jako `arrival`,
`departure` i `adults` (daty w formacie `RRRR-MM-DD`), czyli dokładnie tak,
jak robił to kalendarzyk na starej stronie:

```
https://panel.hotres.pl/v4_step1?oid=2746&lang=pl&arrival=2026-12-27&departure=2026-12-28&adults=6
```

Gość nie musi niczego wybierać — bez dat adres po prostu ich nie zawiera
i Hotres pyta o nie u siebie. Wybór przyjazdu sam przesuwa wyjazd na kolejną
dobę, a odwrotna kolejność dat jest odrzucana z komunikatem.

Czego jeszcze nie ma:

- **Przycisk otwierający od razu konkretny apartament.** Pod adresem
  `v4_step1` Hotres nie przyjmuje numeru apartamentu. Potrzebne są jego
  numery z panelu Hotres; wtedy wystarczy wpisać `unitParam` i numery
  przy apartamentach w `site-config.js`.

Gdyby kiedyś trzeba było odpiąć silnik, wystarczy `enabled: false` — przyciski
wrócą na stronę Kontakt, a panel wyboru dat razem z nimi.

---

## 5a. Oceny obiektu — ramka na stronie głównej

Pod wstępem, w miejscu dawnej ramki z liczbami (6 apartamentów, 40 miejsc…),
stoją trzy kafelki z ocenami: **Booking.com**, **Airbnb** i **Google**. Każdy
pokazuje średnią, skalę i liczbę opinii, i prowadzi do źródła oceny.

Liczby siedzą w `assets/data/ratings.js`. Można je poprawić ręcznie — to zwykły
plik tekstowy z trzema wpisami.

### Odświeżanie

```
python tools/aktualizuj-oceny.py
```

Skrypt czyta trzy strony i nadpisuje `ratings.js`. Jeśli któreś źródło nie
odpowie albo zwróci bzdurę (zero opinii, ocena poza skalą), zostaje ostatnia
znana liczba — ramka nigdy nie pokaże pustki.

To samo robi co poniedziałek GitHub Actions
(`.github/workflows/oceny.yml`). Gdy któraś liczba się zmieni, workflow
wrzuca commit na `main`, a Vercel publikuje nową wersję. Można go też odpalić
ręcznie: **Actions → Oceny obiektu → Run workflow**.

### Skąd biorą się liczby

Booking i Google blokują czytanie wprost, więc skrypt sięga po serwisy,
które publikują te same liczby w formacie JSON-LD:

| Kafelek | Skąd czytamy | Uwaga |
|---|---|---|
| Booking.com | `domki-gawra-tatrzanska.hotels-zakopane.com` | Kopia danych z Booking.com |
| Airbnb | profil gospodarza `airbnb.com/users/show/489507548` | Dane wprost ze źródła |
| Google | `wanderlog.com/place/details/4444482/tatrapart` | Kopia oceny z Map Google |

Airbnb czytamy z profilu gospodarza, a nie z pojedynczego ogłoszenia —
dzięki temu kafelek pokazuje opinie ze wszystkich apartamentów TatrApartu
naraz (4,89 z 114 opinii), a nie z jednego ogłoszenia.

Adresy źródeł siedzą w `SOURCES` na górze skryptu — gdyby któraś strona
przestała działać, wymienia się tam jeden wiersz.

---

## 6. DANE POTWIERDZONE

Wpisane i widoczne w całym serwisie:

- TatrApart Tatiana Głowacka, ul. Topory 1B, 34-500 Zakopane
- NIP 5262638491, REGON 523743437
- telefon +48 510 005 004, e-mail contact@tatrapart.pl
- Instagram: instagram.com/tatrapart
- doba hotelowa: od 16:00 do 11:00
- cisza nocna 23:00–6:00, goście niezameldowani 7:00–22:00
- zadatek 30% w ciągu 48 godzin, kaucja 300 zł lub 70 euro
- całkowity zakaz palenia, darmowy parking
- trzy typy apartamentów z metrażami, pojemnościami, cenami i opisami
  przepisanymi z tatrapart.pl

Facebook nie został podany, więc odnośnik do niego **automatycznie się nie
wyświetla**. Po dodaniu adresu w `social.facebook` pojawi się sam.

---

## 7. Rozbieżności — dwie rozwiązane, jedna do Ciebie

### 6.1. Terminy rezygnacji — ROZWIĄZANE

Ustaliliśmy jeden próg: **30 dni**. Oba dokumenty mówią teraz to samo.

- Polityka odstąpień: bezkosztowe odstąpienie przy rezygnacji na minimum
  30 dni przed przyjazdem.
- Regulamin obiektu, punkt 5: zadatek zwrotny przy rezygnacji na minimum
  30 dni przed przyjazdem, bezzwrotny przy rezygnacji na mniej niż 30 dni.

Wcześniejsza wersja mówiła w jednym miejscu o 30, a w drugim o 45 dniach
i zostawiała nieopisany przedział między 30 a 45 dniem. Teraz nie ma luki:
każdy termin rezygnacji jest jednoznacznie opisany.

Teksty: klucze `terms.withdrawal.p1` i `terms.payment.5` w `assets/js/i18n.js`.

### 6.2. Pojemność apartamentu na parterze — ROZWIĄZANE

Apartament White na parterze przyjmuje **od czterech do sześciu osób**,
zgodnie z nazwą typu. Informacja jest teraz spójna we wszystkich czterech
językach.

### 6.3. Teksty zastępcze na obecnej stronie — do poprawy po Waszej stronie

Na tatrapart.pl, na podstronie apartamentów na poddaszu, są niedokończone
fragmenty: nagłówek „WYMYŚLI JAKIŚ TEKST, WYMYŚL JAKIS TEKST", blok „TO JEST
ELEMENT TEKSTOWY. KLIKNIJ TEN ELEMENT", a tytuł strony w przeglądarce brzmi
„Skyline Apartments - apartamenty 6 osobowe!". Nie przepisałem ich na nową
stronę. Warto je poprawić również na obecnej, bo widzą je Goście i indeksuje
Google.

## 8. Regulamin — uwaga o językach

Treść regulaminu jest podana **wyłącznie po polsku**, we wszystkich czterech
wersjach językowych serwisu. Powód: tłumaczenie tekstu prawnego bez akceptacji
prawnika to ryzyko. W wersji angielskiej, ukraińskiej i rosyjskiej nad
regulaminem wyświetla się przetłumaczona informacja, że wiążąca jest wersja
polska i że chętnie omówimy zapisy w języku Gościa.

Po zatwierdzeniu tłumaczeń przez prawnika: uzupełnij klucze `terms.*`
w pozostałych językach w `i18n.js`. Mechanizm podmieni je automatycznie.

---

## 9. Co jeszcze zostało

- zdjęcia miejsc w okolicy
- potwierdzenie listy usług „W cenie pobytu"
- prawdziwe opinie Gości — sekcja jest ukryta, `showReviews: false`
- treść strony „Oferty"
- podpięcie formularzy do usługi wysyłkowej (Formspree, Getform lub własny
  skrypt) — miejsce przygotowane w `main.js`, funkcja `initForms`
- weryfikacja tłumaczeń EN / UA / RU przez native speakera
- polityka prywatności — odnośnik w stopce **nie wyświetla się**, dopóki
  nie wpiszesz adresu dokumentu w `legal.privacyUrl` w `site-config.js`
- minimalna długość pobytu i zasady dotyczące zwierząt — nie ma ich
  w regulaminie, pola w `site-config.js` są ustawione na `null`
- odległości w sekcji „Lokalizacja" są orientacyjne i liczone od dawnego,
  błędnego punktu na mapie — po korekcie pinezki (ul. Topory 1B leży
  w Olczy, nie w centrum) warto je przeliczyć w `site-config.js`, tablica
  `distances`

---

## 10. Zmiana tekstów

Wszystkie teksty są w `assets/js/i18n.js`, pogrupowane po języku: `pl`, `en`,
`uk`, `ru`. Zmieniasz tekst po prawej stronie klucza:

```js
'hero.tagline': 'Dwa domki góralskie, pięć apartamentów, widok na Tatry.',
```

Jeżeli zmieniasz tekst po polsku, zmień go też w pozostałych trzech językach.
Jeśli klucza brakuje w jakimś języku, serwis automatycznie pokaże wersję
polską — z tego mechanizmu korzysta regulamin.

---

## 11. Co strona już potrafi

- Sześć stron, cztery języki, zapamiętywanie wyboru i obsługa `?lang=en`
- Menu pełnoekranowe z animacją i pułapką fokusu
- Nagłówek przezroczysty nad zdjęciem, chowający się przy przewijaniu
- Karuzele obsługiwane myszą, palcem, klawiaturą i przyciskami
- Galeria z powiększaniem, miniaturami i gestem swipe
- Regulamin z przyklejonym spisem treści i odnośnikami do sekcji
- Lista usług „W cenie pobytu", animacje wejścia, delikatna paralaksa
- Przyklejony pasek rezerwacji na telefonie
- Pełna responsywność od 320 px wzwyż
- Obsługa ustawienia „ogranicz animacje" w systemie
- Dane strukturalne dla Google (`LodgingBusiness`) generowane automatycznie
- Znaczniki `hreflang` dla czterech wersji językowych
- Odnośniki bez adresu w konfiguracji chowają się same, zamiast prowadzić
  donikąd
