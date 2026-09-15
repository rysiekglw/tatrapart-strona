# -*- coding: utf-8 -*-
"""
TATRAPART — ODSWIEZANIE OCEN OBIEKTU
====================================
Skrypt czyta srednie oceny z trzech serwisow i zapisuje je do pliku
assets/data/ratings.js, z ktorego korzysta ramka na stronie glownej.

Uruchomienie recznie:      python tools/aktualizuj-oceny.py
Uruchomienie automatyczne: .github/workflows/oceny.yml (raz w tygodniu)

Zasada bezpieczenstwa: jesli ktores zrodlo nie odpowie albo zwroci smiec,
zostaje ostatnia znana liczba. Strona nigdy nie pokaze zera ani pustki.
"""

import io
import os
import re
import sys
import json
import datetime
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TARGET = os.path.join(ROOT, 'assets', 'data', 'ratings.js')

UA = ('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36')

# Bez pelnego kompletu naglowkow przegladarki Airbnb odsyla pusta strone.
HEADERS = {
    'User-Agent': UA,
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9,pl;q=0.8',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
}


# --------------------------------------------------------------------------
# Zrodla. Booking i Google blokuja czytanie wprost, wiec siegamy po serwisy,
# ktore publikuja te same liczby w formacie JSON-LD.
# --------------------------------------------------------------------------
SOURCES = [
    {
        'id': 'booking',
        'label': 'Booking.com',
        'max': 10,
        'url': 'https://www.booking.com/hotel/pl/gawra-tatrzanska.pl.html',
        'fetch': 'https://domki-gawra-tatrzanska.hotels-zakopane.com/en/',
        'scope_re': r'aggregateRating',
        'score_re': r'"ratingValue"\s*:\s*"?([0-9]+(?:\.[0-9]+)?)',
        'count_re': r'"(?:reviewCount|ratingCount)"\s*:\s*"?([0-9]+)',
    },
    {
        # Profil gospodarza, nie pojedyncze ogloszenie — zbiera opinie
        # ze wszystkich apartamentow TatrApartu naraz.
        'id': 'airbnb',
        'label': 'Airbnb',
        'max': 5,
        'url': 'https://www.airbnb.com/users/show/489507548',
        'fetch': 'https://www.airbnb.com/users/show/489507548',
        'score_re': r'"hostRatingStats"\s*:\s*\{[^}]*"ratingAverage"\s*:\s*([0-9]+(?:\.[0-9]+)?)',
        'count_re': r'"reviewsReceivedFromGuests"\s*:\s*\{[^}]*"count"\s*:\s*([0-9]+)',
    },
    {
        'id': 'google',
        'label': 'Google',
        'max': 5,
        'url': 'https://www.google.com/maps/search/?api=1&query=TatrApart+Topory+1B+Zakopane',
        'fetch': 'https://wanderlog.com/place/details/4444482/tatrapart',
        'score_re': r'"rating"\s*:\s*([0-9]+(?:\.[0-9]+)?)',
        'count_re': r'"numRatings"\s*:\s*([0-9]+)',
    },
]


def download(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=40) as resp:
        return resp.read().decode('utf-8', 'replace')


def slice_scope(html, src):
    """Zaweza szukanie do fragmentu z ocena laczna — na tych stronach
    slowo "ratingValue" pada tez w formularzu dodawania wlasnej opinii."""
    pattern = src.get('scope_re')
    if not pattern:
        return html
    m = re.search(pattern, html)
    return html[m.start():m.start() + 600] if m else html


def read_previous():
    """Ostatnio zapisane liczby — sluza jako siatka bezpieczenstwa."""
    if not os.path.exists(TARGET):
        return {}
    text = io.open(TARGET, encoding='utf-8').read()
    out = {}
    for block in re.findall(r'\{[^{}]*\}', text):
        ident = re.search(r"id:\s*'([^']+)'", block)
        score = re.search(r'score:\s*([0-9.]+)', block)
        count = re.search(r'count:\s*([0-9]+)', block)
        if ident and score and count:
            out[ident.group(1)] = (float(score.group(1)), int(count.group(1)))
    return out


def plausible(src, score, count):
    """Odrzuca oczywiste bzdury: zero opinii, ocena poza skala."""
    return 0 < score <= src['max'] and count > 0


def main():
    previous = read_previous()
    items = []
    problems = []

    for src in SOURCES:
        score = count = None
        try:
            html = slice_scope(download(src['fetch']), src)
            m_score = re.search(src['score_re'], html)
            m_count = re.search(src['count_re'], html)
            if m_score and m_count:
                score = round(float(m_score.group(1)), 2)
                count = int(m_count.group(1))
        except Exception as exc:                       # noqa: BLE001
            problems.append('%s: %s' % (src['id'], exc))

        if score is None or not plausible(src, score, count):
            if src['id'] in previous:
                score, count = previous[src['id']]
                problems.append('%s: zostaje poprzednia liczba' % src['id'])
            else:
                problems.append('%s: brak danych, pomijam' % src['id'])
                continue

        items.append({
            'id': src['id'], 'label': src['label'],
            'score': score, 'max': src['max'],
            'count': count, 'url': src['url'],
        })

    if not items:
        print('Nie udalo sie odczytac zadnej oceny — plik zostaje bez zmian.')
        for p in problems:
            print('  ' + p)
        return 1

    today = datetime.date.today().isoformat()
    lines = []
    for it in items:
        score = it['score']
        if score == int(score):
            score = int(score)
        lines.append(
            "    {\n"
            "      id: '%s',\n"
            "      label: '%s',\n"
            "      score: %s,\n"
            "      max: %d,\n"
            "      count: %d,\n"
            "      url: '%s'\n"
            "    }" % (it['id'], it['label'], score, it['max'], it['count'], it['url'])
        )

    body = HEADER + "window.TATRAPART_RATINGS = {\n  updated: '%s',\n  items: [\n%s\n  ]\n};\n" % (
        today, ',\n'.join(lines))

    old = io.open(TARGET, encoding='utf-8').read() if os.path.exists(TARGET) else ''
    # Porownanie bez daty — sama zmiana daty nie jest powodem do zapisu
    strip = lambda t: re.sub(r"updated: '[^']*'", '', t)
    if strip(old) == strip(body):
        print('Oceny bez zmian.')
    else:
        io.open(TARGET, 'w', encoding='utf-8', newline='\n').write(body)
        print('Zapisano nowe oceny:')
        for it in items:
            print('  %-12s %s/%s (%d opinii)' % (it['label'], it['score'], it['max'], it['count']))

    for p in problems:
        print('  uwaga — ' + p)
    return 0


HEADER = """/* =========================================================================
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
"""


if __name__ == '__main__':
    sys.exit(main())
