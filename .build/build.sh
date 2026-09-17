#!/usr/bin/env bash
# Sklada podstrony z wspolnego naglowka i stopki wyodrebnionych z index.html.
set -euo pipefail
cd "$(dirname "$0")/.."

make_page () {
  local file="$1" page="$2" titlekey="$3" title="$4" ogimg="$5" mainfile="$6"

  {
    cat <<HEAD
<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="Dwa domki góralskie i pięć apartamentów w Zakopanem, przy ul. Topory 1B.">
<meta name="theme-color" content="#FBF8F3">

<meta property="og:type" content="website">
<meta property="og:site_name" content="TatrApart">
<meta property="og:title" content="${title}">
<meta property="og:image" content="assets/images/${ogimg}">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="assets/images/logo-tatrapart.png">
<link rel="alternate" hreflang="pl" href="./${file}">
<link rel="alternate" hreflang="en" href="./${file}?lang=en">
<link rel="alternate" hreflang="uk" href="./${file}?lang=uk">
<link rel="alternate" hreflang="ru" href="./${file}?lang=ru">
<link rel="alternate" hreflang="x-default" href="./${file}">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Montserrat:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
<script>document.documentElement.classList.add("js");</script>
</head>

<body data-page="${page}" data-title-key="${titlekey}">

<a class="skip-link" href="#main">TatrApart</a>

HEAD

    cat .build/header.html
    echo
    cat "${mainfile}"
    echo
    cat .build/footer.html

    cat <<'TAIL'
</body>
</html>
TAIL
  } > "${file}"

  echo "  zbudowano: ${file}"
}

echo "Skladanie podstron Tatrapart..."
make_page "apartamenty.html" "apartments" "meta.title.apartments" "Apartamenty — TatrApart Zakopane" "gallery-04.jpg" ".build/main-apartamenty.html"
make_page "galeria.html"     "gallery"    "meta.title.gallery"    "Galeria — TatrApart Zakopane"     "gallery-06.jpg" ".build/main-galeria.html"
make_page "oferty.html"      "offers"     "meta.title.offers"     "Oferty — TatrApart Zakopane"      "gallery-10.jpg" ".build/main-oferty.html"
make_page "kontakt.html"     "contact"    "meta.title.contact"    "Kontakt — TatrApart Zakopane"      "gallery-11.jpg" ".build/main-kontakt.html"
make_page "regulamin.html"   "terms"      "meta.title.terms"      "Regulamin — TatrApart Zakopane"    "gallery-04.jpg" ".build/main-regulamin.html"
echo "Gotowe."
