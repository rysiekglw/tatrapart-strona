# TatrApart — Lista kontrolna projektu

Aktualizacja: 12 września 2026
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
- [ ] Zdjęcia apartamentów (obecnie puste ramki)
- [ ] Zdjęcia miejsc w okolicy
- [ ] Potwierdzenie listy usług w cenie i na życzenie
- [ ] Prawdziwe opinie Gości i włączenie sekcji
- [ ] Treść strony „Oferty"
- [ ] Podpięcie formularzy do usługi wysyłkowej
- [ ] Weryfikacja tłumaczeń EN / UA / RU przez native speakera
- [ ] Tłumaczenie regulaminu po akceptacji prawnika
- [ ] Polityka prywatności
