# ============================================================================
#  TatrApart - wysylka zmian na zywo
#  ---------------------------------------------------------------------------
#  Jedno polecenie: zapisuje zmiany, wysyla na GitHuba, a Vercel sam
#  aktualizuje strone w ciagu okolo minuty.
#
#  Uzycie: kliknij dwukrotnie plik wyslij.bat
#          albo w terminalu:  .\wyslij.bat "opis zmiany"
#
#  Uwaga: ten plik celowo nie zawiera polskich znakow. Windows PowerShell
#  czyta skrypty jako ANSI i polskie litery rozsypalyby skladnie.
# ============================================================================

param(
    [Parameter(Position = 0)]
    [string]$Opis = ""
)

# Uwaga: NIE ustawiamy tu "Stop". Git normalnie pisze ostrzezenia na
# strumien bledow (np. o koncach linii), a przy "Stop" PowerShell uznalby
# je za blad krytyczny i przerwal skrypt bez powodu. Powodzenie kazdego
# polecenia sprawdzamy ponizej przez $LASTEXITCODE, co jest wlasciwa metoda.
$ErrorActionPreference = "Continue"
Set-Location -Path $PSScriptRoot

if (-not (Test-Path ".git")) {
    Write-Host "To nie jest repozytorium Git. Przerywam." -ForegroundColor Red
    exit 1
}

$zmiany = git status --porcelain
if ([string]::IsNullOrWhiteSpace($zmiany)) {
    Write-Host ""
    Write-Host "Brak zmian do wyslania - wszystko jest juz aktualne." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "Zmienione pliki:" -ForegroundColor Cyan
git status --short
Write-Host ""

if ([string]::IsNullOrWhiteSpace($Opis)) {
    $Opis = "Aktualizacja strony - " + (Get-Date -Format "yyyy-MM-dd HH:mm")
}

git add -A
if ($LASTEXITCODE -ne 0) { Write-Host "Blad przy dodawaniu plikow." -ForegroundColor Red; exit 1 }

git commit -m $Opis
if ($LASTEXITCODE -ne 0) { Write-Host "Blad przy zapisywaniu zmian." -ForegroundColor Red; exit 1 }

git push
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Nie udalo sie wyslac na GitHuba." -ForegroundColor Red
    Write-Host "Sprawdz polaczenie z internetem i sprobuj ponownie." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Gotowe. Zmiany sa na GitHubie." -ForegroundColor Green
Write-Host "Vercel buduje nowa wersje - strona odswiezy sie za okolo minute." -ForegroundColor Green
Write-Host ""
