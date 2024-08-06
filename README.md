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
14. Den publicerade klientwebbplatsen testas för första gången i PageSpeed Insights, med Wave Evaluation Tool och med hjälp av W3Cs valideringssida och nödvändiga åtgärdes görs.
15. Ett formulär för att skicka in besöksbetyg skapas och stylas med HTML och CSS på startsidan. Funktionalitet för formuläret skapas med JavaScript i form av en funktion som kontrollerar input och en funktion som gör anrop mot webbtjänsten och sköter lagringen.
16. Innehållet för den skyddade admin-sidan utformas med HTML och CSS i form av knappar avsedda för olika sektionsvisningar; för meny eller besöksbetyg. I sektionerna hämtas meny/betyg från databasen med en fetch och visas i listor där knappar för uppdatering och/eller radering läggs till för varje listelement för att kunna utföra CRUD.
17. Funktionalitet för admin-sidan görs med JavaScript där hanterings-knappar visar olika innehåll och där klick på radera på ett listelement tar bort glass/betyg från listan och från databasen. 
18. Funktionalitet för att skapa ny glasspost görs med JavaScript där ett knappklick fäller ut ett formulär vars submit-knapp lägger till glassen i listan och i databasen.
19. Funktionalitet för att uppdatera specifika glassar görs med JavaScript där klick på uppdatera på ett listelement fäller ut ett formulär (samma som skapa ny) där tidigare värden redan är ifyllda. Submitknappen uppdaterar posten i listan och i databasen.
20. Webbplatsen valideras med verktyg från W3C och testas i mobil enhet samt i tre olika webbläsare i olika desktop-lägen för att säkerställa att utseendet är detsamma och att funktionaliteten fungerar korrekt. 


#### _Skapad av Jenny Lind, jeli2308_.