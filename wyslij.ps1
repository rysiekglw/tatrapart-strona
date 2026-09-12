# ============================================================================
#  TatrApart — wysylka zmian na zywo
#  ----------------------------------------------------------------------------
#  Jedno polecenie: zapisuje zmiany, wysyla na GitHuba, a Vercel sam
#  aktualizuje strone w ciagu okolo minuty.
#
#  Uzycie w terminalu, w katalogu projektu:
#
#      .\wyslij.ps1
#      .\wyslij.ps1 "poprawione zdjecia apartamentow"
#
#  Pierwszy sposob wpisze opis automatycznie z dzisiejsza data.
# ============================================================================

param(
    [Parameter(Position = 0)]
    [string]$Opis = ""
)

$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

if (-not (Test-Path ".git")) {
    Write-Host "To nie jest repozytorium Git. Przerywam." -ForegroundColor Red
    exit 1
}

# Czy w ogole cokolwiek sie zmienilo?
$zmiany = git status --porcelain
if ([string]::IsNullOrWhiteSpace($zmiany)) {
    Write-Host "Brak zmian do wyslania — wszystko jest juz aktualne." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "Zmienione pliki:" -ForegroundColor Cyan
git status --short
Write-Host ""

if ([string]::IsNullOrWhiteSpace($Opis)) {
    $Opis = "Aktualizacja strony — " + (Get-Date -Format "d MMMM yyyy, HH:mm")
}

git add -A
git commit -m $Opis
if ($LASTEXITCODE -ne 0) {
    Write-Host "Nie udalo sie zapisac zmian." -ForegroundColor Red
    exit 1
}

git push
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Nie udalo sie wyslac na GitHuba. Sprawdz polaczenie z internetem." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Gotowe. Zmiany sa na GitHubie." -ForegroundColor Green
Write-Host "Vercel zaczal juz budowac nowa wersje — strona odswiezy sie za okolo minute." -ForegroundColor Green
Write-Host ""
