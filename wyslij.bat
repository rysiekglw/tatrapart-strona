@echo off
REM =========================================================================
REM  TatrApart - wysylka zmian na zywo
REM  Kliknij ten plik dwukrotnie, zeby wyslac zmiany na GitHuba.
REM  Vercel zaktualizuje strone automatycznie w ciagu okolo minuty.
REM
REM  Ten plik omija domyslna blokade skryptow w Windows, wiec nie trzeba
REM  niczego zmieniac w ustawieniach bezpieczenstwa systemu.
REM =========================================================================
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0wyslij.ps1" %*
echo.
pause
