/* =========================================================================
   TATRAPART — OCENY OBIEKTU
   =========================================================================
   Ten plik jest odswiezany automatycznie przez tools/aktualizuj-oceny.py
   (uruchamiany co tydzien przez GitHub Actions — .github/workflows/oceny.yml).
   Mozna go tez poprawic recznie: wystarczy zmienic liczby ponizej.

   score  — srednia ocena
   max    — skala (Booking liczy do 10, Airbnb i Google do 5)
   count  — liczba opinii, z ktorych powstala srednia
   url    — dokad prowadzi klikniecie w kafelek
   ========================================================================= */
window.TATRAPART_RATINGS = {
  updated: '2026-09-21',
  items: [
    {
      id: 'booking',
      label: 'Booking.com',
      score: 9.6,
      max: 10,
      count: 134,
      url: 'https://www.booking.com/hotel/pl/gawra-tatrzanska.pl.html'
    },
    {
      id: 'airbnb',
      label: 'Airbnb',
      score: 4.89,
      max: 5,
      count: 115,
      url: 'https://www.airbnb.com/users/show/489507548'
    },
    {
      id: 'google',
      label: 'Google',
      score: 4.8,
      max: 5,
      count: 52,
      url: 'https://www.google.com/maps/search/?api=1&query=TatrApart+Topory+1B+Zakopane'
    }
  ]
};
