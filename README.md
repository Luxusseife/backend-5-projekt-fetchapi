# Moment 5, _PROJEKT, klientwebbplats och admin-gränssnitt_
Den här README-filen har skapats för att beskriva momentets syfte och kort redogöra för processen.

## Projektets syfte

- Kunna skapa dynamiska webbplatser uppdelade i olika delar för publik webbplats och webbtjänst.
- Kunna använda tidigare moment i kursen i en större sammanhängande webbplats.

    ### Webbplatsen ska utarbetas med inriktning mot en:

    - Vald målgrupp.
    - Vald grafisk profil.
    - En webbtjänst skapad med registrering och inloggning samt en frontend-applikation som använder denna webbtjänst för sitt data.
    - Vald funktionalitet innehållande interaktivitet/dynamik skapad med kunskap från kursens olika moment.

## Arbetsprocess

1. Utvecklingsmiljön för projektet förbereds med NPM och Parcel.
2. Projektets struktur skapas i form av nödvändiga kataloger och filer.
3. Klientwebbplatsens grund med responsiv header med navigationslänkar och footer med information skapas med HTML och CSS.
4. En fungerande och responsiv navigationsmeny för mobil skapas med CSS och JavaScript.
5. Innehållet för startsidan, meny och besöksbetyg, hämtas från databasen via fetch-anrop och skrivs ut med JavaScript och stylas med CSS.
6. Övrigt innehåll för startsidan så som information, bilder och hero i form av bildkarusell skapas med HTML och CSS.
7. För besöksbetygen omvandlas de lagrade betygen från siffror till stjärnikoner med hjälp av en funktion i JavaScript.
8. Innehållet på startsidan stylas ytterligare och görs responsivt för olika typer av enheter.
9. För inloggnings-sidan skapas och stylas innehåll i form av ett formulär i en inloggnings-ruta med HTML och CSS. 
10. Funktionalitet för submit av formuläret med en knapp skapas med JavaScript. Här görs en kontroll av input innan en inloggningsfunktion körs där en JWT-token lagras i sessionStorage och en omdirigering görs till admin-gränssnittet.
11. Ett innehåll för den skyddade admin-sidan skapas med HTML och CSS. Här består navigationsmenyn endast av en länk till startsidan och en logga ut-knapp.
12. Funktionalitet för att autentisera admin genom inhämtning av lagrad JWT-token samt en utloggnings-funktion skapas med JavaScript.
13. Klientwebbplatsen med tillhörande admin-gränssnitt publiceras på Render och samtliga fetch-urls anges med Render-adressen som grund.
14. ...


#### _Skapad av Jenny Lind, jeli2308_.