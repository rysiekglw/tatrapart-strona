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
7. Kliknij **Rezerwuj** — na razie prowadzi na stronę Kontakt, bo Hotres
   nie jest jeszcze podpięty.

---

## 2. Struktura plików

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

## 3. Zdjęcia

### Wnętrza — gotowe

Wgrane i podpięte: **logo + 11 zdjęć wnętrz** (`gallery-01.jpg` … `gallery-11.jpg`).

| Plik | Ujęcie | Gdzie |
|---|---|---|
| `gallery-01.jpg` | jadalnia, widok na Giewont, lato | hero strony głównej |
| `gallery-02.jpg` | balkon latem, panorama Tatr | duże zdjęcie z paralaksą |
| `gallery-03.jpg` | sypialnia, drzwi z niedźwiedziem | hero podstrony Apartamenty |
| `gallery-04.jpg` | kamienny kominek i stół | sekcja Wnętrza, hero Regulaminu |
| `gallery-05.jpg` | salon ze skórzaną kanapą | sekcja Wnętrza |
| `gallery-06.jpg` | sypialnia z pikowanym zagłówkiem | hero podstrony Galeria |
| `gallery-07.jpg` | poddasze z aneksem kuchennym | galeria |
| `gallery-08.jpg` | salon z choinką | galeria |
| `gallery-09.jpg` | antresola z szezlongiem | galeria |
| `gallery-10.jpg` | taras zimą | tło bloku Oferty, hero Oferty |
| `gallery-11.jpg` | widok z balkonu, Giewont | hero podstrony Kontakt |

Dodajesz kolejne? Nazwij `gallery-12.jpg` i zmień `galleryCount: 11` na `12`
w `site-config.js`.

`gallery-10.jpg` waży 745 KB — warto skompresować. W katalogu został też
nieużywany duplikat `gallery (7).webp`, można go skasować.

### Apartamenty — puste ramki, zgodnie z ustaleniem

Przy każdym z trzech apartamentów jest w tej chwili **pusta ramka** w kolorach
Milk & Oak z napisem „Zdjęcie wkrótce". Aby wstawić zdjęcie:

1. wgraj plik do `assets/images/`, np. `apt-deluxe-pietro.jpg`,
2. w `site-config.js` w danym apartamencie wpisz `img: 'apt-deluxe-pietro.jpg'`.

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

## 4. Podpięcie Hotres — następny krok

W `assets/js/site-config.js`:

```js
booking: {
  enabled: true,                                   // <- zmień na true
  bookingUrl: 'https://panel.hotres.pl/...',       // <- adres z Hotres
  objectId: '12345',                               // <- ID obiektu
  ...
}
```

Każdy przycisk „Rezerwuj" i „Sprawdź dostępność" zacznie kierować do Hotres.
Do adresu doklei się język strony oraz identyfikator apartamentu, jeśli Gość
kliknął przycisk przy konkretnym apartamencie (`deluxe-pietro`,
`deluxe-parter`, `suite-poddasze`).

Dopóki `enabled` jest `false`, przyciski kierują na `kontakt.html`, żeby żadne
kliknięcie nie zostało zmarnowane.

---

## 5. DANE POTWIERDZONE

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

## 6. Rozbieżności — dwie rozwiązane, jedna do Ciebie

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

## 7. Regulamin — uwaga o językach

Treść regulaminu jest podana **wyłącznie po polsku**, we wszystkich czterech
wersjach językowych serwisu. Powód: tłumaczenie tekstu prawnego bez akceptacji
prawnika to ryzyko. W wersji angielskiej, ukraińskiej i rosyjskiej nad
regulaminem wyświetla się przetłumaczona informacja, że wiążąca jest wersja
polska i że chętnie omówimy zapisy w języku Gościa.

Po zatwierdzeniu tłumaczeń przez prawnika: uzupełnij klucze `terms.*`
w pozostałych językach w `i18n.js`. Mechanizm podmieni je automatycznie.

---

## 8. Co jeszcze zostało

- zdjęcia apartamentów (obecnie puste ramki)
- zdjęcia miejsc w okolicy
- potwierdzenie listy usług „W cenie pobytu" i „Na życzenie"
- prawdziwe opinie Gości — sekcja jest ukryta, `showReviews: false`
- treść strony „Oferty"
- podpięcie formularzy do usługi wysyłkowej (Formspree, Getform lub własny
  skrypt) — miejsce przygotowane w `main.js`, funkcja `initForms`
- weryfikacja tłumaczeń EN / UA / RU przez native speakera
- polityka prywatności — odnośnik w stopce **nie wyświetla się**, dopóki
  nie wpiszesz adresu dokumentu w `legal.privacyUrl` w `site-config.js`
- minimalna długość pobytu i zasady dotyczące zwierząt — nie ma ich
  w regulaminie, pola w `site-config.js` są ustawione na `null`
- dokładny pin na mapie: obecnie środek Zakopanego, warto wpisać prawdziwe
  współrzędne ulicy Topory w `company.latitude` i `company.longitude`
- odległości w sekcji „Lokalizacja" są orientacyjne

---

## 9. Zmiana tekstów

Wszystkie teksty są w `assets/js/i18n.js`, pogrupowane po języku: `pl`, `en`,
`uk`, `ru`. Zmieniasz tekst po prawej stronie klucza:

```js
'hero.tagline': 'Dwa domki góralskie, sześć apartamentów, widok na Tatry.',
```

Jeżeli zmieniasz tekst po polsku, zmień go też w pozostałych trzech językach.
Jeśli klucza brakuje w jakimś języku, serwis automatycznie pokaże wersję
polską — z tego mechanizmu korzysta regulamin.

---

## 10. Co strona już potrafi

- Sześć stron, cztery języki, zapamiętywanie wyboru i obsługa `?lang=en`
- Menu pełnoekranowe z animacją i pułapką fokusu
- Nagłówek przezroczysty nad zdjęciem, chowający się przy przewijaniu
- Karuzele obsługiwane myszą, palcem, klawiaturą i przyciskami
- Galeria z powiększaniem, miniaturami i gestem swipe
- Regulamin z przyklejonym spisem treści i odnośnikami do sekcji
- Zakładki usług, animacje wejścia, delikatna paralaksa
- Przyklejony pasek rezerwacji na telefonie
- Pełna responsywność od 320 px wzwyż
- Obsługa ustawienia „ogranicz animacje" w systemie
- Dane strukturalne dla Google (`LodgingBusiness`) generowane automatycznie
- Znaczniki `hreflang` dla czterech wersji językowych
- Odnośniki bez adresu w konfiguracji chowają się same, zamiast prowadzić
  donikąd
