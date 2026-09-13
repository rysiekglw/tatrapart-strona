# TatrApart — Lista kontrolna projektu

Aktualizacja: 12 września 2026 (etap 12)
Legenda: `[x]` gotowe · `[ ]` do zrobienia · `[!]` czekam na decyzję od Ciebie

---

## ETAP 0 — Analiza i przygotowanie
- [x] Analiza struktury Ultima Hotel Gstaad, sekcja po sekcji
- [x] Typografia: Cormorant Garamond + Montserrat
- [x] Paleta „Milk & Oak"
- [x] Mapowanie sekcji Ultima na sekcje TatrApart

## ETAP 1 — Fundament techniczny
- [x] `assets/css/style.css`
- [x] `assets/js/site-config.js`
- [x] `assets/js/i18n.js` — cztery języki
- [x] `assets/js/main.js`
- [x] Mechanizm zastępczy dla brakujących zdjęć i logo

## ETAP 2 — Strona główna wg układu Ultima Gstaad
- [x] Nagłówek: menu, logo pośrodku, język i „Rezerwuj" w prawym rogu
- [x] Menu pełnoekranowe
- [x] Hero pełnoekranowe z „Zobacz zdjęcia"
- [x] Sekcja wprowadzająca — Domek Forest i Domek Snow
- [x] Pasek liczb: 6 apartamentów, 40 miejsc, 60–90 m², doba od 16:00
- [x] Apartamenty — karuzela trzech typów
- [x] Duże zdjęcie na całą szerokość z paralaksą
- [x] Wnętrza — dwa zdjęcia
- [x] Zakładki „W cenie pobytu" / „Na życzenie"
- [x] Karuzela „Zakopane i okolica" na ciemnym tle
- [x] Lokalizacja — odległości i mapa
- [x] „O Zakopanem"
- [x] Blok „Oferty"
- [x] Karuzela opinii (ukryta do czasu wpisania prawdziwych)
- [x] Okruszki, newsletter, stopka

## ETAP 3 — Podstrony
- [x] `apartamenty.html` — trzy typy, warianty Brown i White
- [x] `galeria.html`
- [x] `oferty.html` — celowo pusta
- [x] `kontakt.html`
- [x] `regulamin.html` — nowa zakładka ze spisem treści

## ETAP 4 — Interaktywność
- [x] Nagłówek reagujący na przewijanie
- [x] Animacje wejścia i paralaksa
- [x] Karuzele: strzałki, przeciąganie, swipe, klawiatura
- [x] Lightbox z miniaturami i licznikiem
- [x] Zakładki obsługiwane klawiaturą
- [x] Przełącznik języka z zapamiętywaniem wyboru
- [x] Przyklejony pasek „Rezerwuj" na telefonie
- [x] Walidacja formularzy w czterech językach
- [x] Wszystkie przyciski rezerwacji w jednym miejscu konfiguracji
- [x] Odnośniki bez adresu chowają się same (dotyczy Facebooka)

## ETAP 5 — Treść
- [x] Dane firmowe: nazwa, adres, NIP, REGON, telefon, e-mail, Instagram
- [x] Zasady pobytu z regulaminu: doba, cisza nocna, zadatek, kaucja
- [x] Trzy typy apartamentów z metrażami, pojemnościami, cenami i opisami
      przepisanymi z tatrapart.pl
- [x] Warianty Brown (Domek Forest) i White (Domek Snow) przy każdym typie
- [x] Wyposażenie apartamentów: sauna, jacuzzi, kominek, taras i pozostałe
- [x] Regulamin rezerwacji i regulamin obiektu w całości
- [x] Dane firmy na dole regulaminu

## ETAP 6 — Jakość
- [x] Responsywność od 320 px wzwyż
- [x] Dostępność: pułapka fokusu, ARIA, klawiatura, `prefers-reduced-motion`
- [x] SEO: meta, Open Graph, `hreflang`, dane strukturalne
- [x] Weryfikacja: 206 użytych kluczy tłumaczeń rozwiązuje się w 4 językach
- [x] Weryfikacja: znaczniki HTML zbilansowane na 6 stronach
- [x] Weryfikacja: wszystkie odnośniki wewnętrzne i zasoby istnieją
- [x] `README.md`

## ETAP 7 — Rozstrzygnięte
- [x] Terminy rezygnacji ujednolicone na **30 dni** w obu dokumentach, bez luki
      między 30 a 45 dniem
- [x] Apartament White na parterze: 4–6 osób, spójnie w czterech językach
- [x] Odnośnik „Polityka prywatności" chowa się, dopóki nie ma dokumentu,
      zamiast prowadzić donikąd
- [x] Zabezpieczenie: przy wyłączonym lub uszkodzonym JavaScripcie treść jest
      normalnie widoczna, zamiast pozostać przezroczysta
- [x] Sterowanie karuzelą chowa się, gdy wszystkie karty mieszczą się na ekranie
- [!] Teksty zastępcze na obecnej stronie tatrapart.pl — do poprawy po Waszej
      stronie, patrz `README.md` punkt 6.3
- [!] Minimalna długość pobytu i zasady dotyczące zwierząt — brak w regulaminie
- [!] Dokładne współrzędne ulicy Topory do pinezki na mapie
- [!] Adres profilu na Facebooku, jeśli istnieje

## ETAP 8 — Weryfikacja wizualna
- [x] Strona wyrenderowana i obejrzana w przeglądarce: strona główna,
      apartamenty, regulamin, galeria
- [x] Sprawdzenie na szerokości telefonu (390 px) — brak przewijania w poziomie,
      marginesy symetryczne, nagłówek mieści się w całości
- [x] Poprawione: „8 Gości · 90 m²" zamiast „Gości 8", jednostka metrażu małą
      literą

## ETAP 9 — Kolejne kroki
- [ ] Podpięcie Hotres — jedna sekcja w `site-config.js`
- [x] Zdjęcia apartamentów — przeniesione z tatrapart.pl, etap 14
- [ ] Zdjęcia miejsc w okolicy
- [ ] Potwierdzenie listy usług w cenie i na życzenie
- [ ] Prawdziwe opinie Gości i włączenie sekcji
- [ ] Treść strony „Oferty"
- [ ] Podpięcie formularzy do usługi wysyłkowej
- [ ] Weryfikacja tłumaczeń EN / UA / RU przez native speakera
- [ ] Tłumaczenie regulaminu po akceptacji prawnika
- [ ] Polityka prywatności

## ETAP 10 — Publikacja
- [x] Repozytorium Git zainicjowane, gałąź `main`
- [x] Repozytorium prywatne na GitHubie: rysiekglw/tatrapart-strona
- [x] `.gitignore` i `.gitattributes` (pliki `.bat` wymuszone na CRLF)
- [x] `vercel.json` — nagłówki bezpieczeństwa i pamięć podręczna obrazków
- [x] `wyslij.bat` + `wyslij.ps1` — wysyłka zmian jednym kliknięciem
- [x] Sprawdzone realnym uruchomieniem: skrypt wysłał zmiany na GitHuba
- [x] Repozytorium podłączone w panelu Vercela — push na `main` buduje stronę
      sam; potwierdzone wdrożeniem etapu 12 na `tatrapart-strona.vercel.app`
- [ ] Przepięcie domeny tatrapart.pl — dopiero gdy nowa strona ma zastąpić starą

## ETAP 11 — Poprawki po obejrzeniu strony
- [x] Dziura w siatce galerii: szeroki kafelek co 6. pozycję nie mieścił się
      w końcówce rzędu i przeskakiwał niżej, zostawiając puste pole.
      Zmieniony na co 5. pozycję + `grid-auto-flow: dense`
- [x] Nierówne odstępy w regulaminie: zamiast osobnych wartości przy każdym
      elemencie wprowadzona jedna skala (akapit / blok / podtytuł)
- [x] Podtytuł stojący pod akapitem wstępnym odzyskał pełny odstęp

## ETAP 12 — Poprawki po obejrzeniu opublikowanej wersji
- [x] Zdjęcie główne: `gallery-05.jpg` w hero strony głównej i w `og:image`
- [x] Panel „Usługi": zakładka „Na życzenie" usunięta w całości (treść, style,
      obsługa klawiatury i klucze tłumaczeń w czterech językach). Została jedna
      lista „W cenie pobytu"
- [x] „W cenie pobytu": „sala rozrywkowa ze stołem bilardowym" → „stół
      bilardowy"; „kominek w każdym apartamencie" → „kominek w apartamentach
      na parterze i I piętrze"
- [x] Panel „Wnętrza" usunięty ze strony głównej, razem z pozycją w menu
      (prowadziłaby do nieistniejącej sekcji) na wszystkich sześciu stronach
- [x] Panel „Destynacja" („O Zakopanem") usunięty
- [x] Mapa: pełny kolor zamiast szarości, przesuwanie i przybliżanie działa,
      pinezka przesunięta na ul. Topory 1B — współrzędne 49.311585, 19.996076
      z bazy OpenStreetMap; ten sam punkt otwiera się w Mapach Google
- [x] Przyciski prowadzące w inne miejsce mają pełne, kontrastowe tło:
      na jasnym tle ciemny atrament, na zdjęciu i na ciemnym tle mleczny lub
      dębowy. „Otwórz w Mapach Google" i „Zobacz wszystkie apartamenty" nie są
      już samymi podkreślonymi napisami
- [x] Zdjęcia z tekstem przyciemnione: hero, nagłówki podstron, blok „Oferty",
      najazd na kafelek galerii
- [x] Sprawdzone w przeglądarce: strona główna, apartamenty, galeria oraz
      wszystkie cztery języki listy usług

## ETAP 13 — Do rozstrzygnięcia po etapie 12
- [!] Odległości w sekcji „Lokalizacja" liczono od dawnego, błędnego punktu
      w centrum. Prawdziwy adres leży w Olczy, więc np. „Krupówki 2,5 km"
      jest zaniżone — potrzebne prawdziwe wartości
- [!] Opis apartamentów mówi „Wszystkie z kominkiem", a apartament na poddaszu
      ma kominek na liście wyposażenia. Jeśli kominek jest tylko na parterze
      i I piętrze, trzeba poprawić opis i listę `features` w `site-config.js`
- [!] Rosyjskie nazwy kondygnacji („Первый уровень" dla parteru, „Первый этаж"
      dla I piętra) są mylące — do przejrzenia razem z całym tłumaczeniem RU

## ETAP 14 — Zakładka Apartamenty
- [x] Kolejność apartamentów: 4–6 osobowy, potem 6–8 osobowy, na końcu
      6 osobowy typu Suite
- [x] 109 zdjęć przeniesionych z tatrapart.pl do `assets/images/apartamenty/`,
      każde w tym samym apartamencie i wariancie co na starej stronie
      (Brown i White rozdzielone, sprawdzone porównaniem zdjęć)
- [x] Przy każdym wariancie pasek czterech kafelków; ostatni pokazuje, ile
      zdjęć czeka dalej. Kliknięcie otwiera powiększenie z całym zestawem
      tego wariantu
- [x] Duże zdjęcie apartamentu otwiera powiększenie ze wszystkimi zdjęciami
      obu wariantów
- [x] Nagłówek „Wyposażenie" nad listą, w czterech językach
- [x] Ikony przy wyposażeniu — 20 przeniesionych z tatrapart.pl, dwie
      dorysowane (bidet, mikrofalówka). Malowane kolorem dębowym maską CSS,
      więc pasują do palety
- [x] Sprawdzone w przeglądarce: kolejność, zdjęcia, ikony, powiększenie
      i wszystkie cztery języki

## ETAP 15 — Do rozstrzygnięcia po etapie 14
- [!] Zdjęcia mają 616 × 411 pikseli — tylko taki rozmiar udostępnia obecna
      strona. Oryginały z aparatu byłyby wyraźniejsze na dużych ekranach
- [x] Kominek na poddaszu: potwierdzone, że go nie ma. Usunięty z wyposażenia
      apartamentu Suite i z jego opisu, a zdanie „Wszystkie z kominkiem"
      w sekcji „Apartamenty" zamienione na „te na parterze i I piętrze także
      z kominkiem" — w czterech językach

## ETAP 16 — Poprawki ze zrzutow ekranu (folder `assets/images/zdjecia/`)
- [x] `przyciski.png` — przelacznik jezyka i przycisk „Rezerwuj" w naglowku:
      ta sama wysokosc (44 px, na telefonie 40 px) i ten sam debowy kolor
      co pozostale przyciski drugoplanowe. Po najechaniu i po rozwinieciu
      listy jezykow oba ciemnieja tak samo
