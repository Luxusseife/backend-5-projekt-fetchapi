// Mobil-meny.
document.addEventListener("DOMContentLoaded", function () {
    // Hämtar in hamburgerikonen för mobilmeny, länk-listan och länkarna.
    const mobileMenuIcon = document.getElementById("mobile-menu");
    const mobileLinks = document.getElementById("mobile-links");
    const mobileLinkItems = mobileLinks.querySelectorAll("a");

    // Vid klick på hamburgerikonen körs toggle-funktionen.
    mobileMenuIcon.addEventListener("click", toggleMenu);

    // Funktion för att toggla mobilmenyn och hamburgerikonen.
    function toggleMenu() {
        // Togglar aktivt och passivt läge.
        mobileLinks.classList.toggle("active");
        // Om ikonen är "hamburgare" - ändra till kryss.
        if (mobileMenuIcon.classList.contains("fa-bars")) {
            mobileMenuIcon.classList.remove("fa-bars");
            mobileMenuIcon.classList.add("fa-times");
        // Om ikonen är kryss - ändra till "hamburgare". 
        } else {
            mobileMenuIcon.classList.remove("fa-times");
            mobileMenuIcon.classList.add("fa-bars");
        }
    }

    // Vid klick på länkarna i mobilmenyn stängs menyn.
    // Händelselyssnare på varje länk som ändrar från kryss till "hamburgare".
    mobileLinkItems.forEach(link => {
        link.addEventListener("click", function () {
            mobileLinks.classList.remove("active");
            mobileMenuIcon.classList.remove("fa-times");
            mobileMenuIcon.classList.add("fa-bars");
        });
    });

    // Vid klick utanför menyn stängs den.
    // Händelselyssnare på hela sidan som ändrar från kryss till "hamburgare".
    document.addEventListener("click", function (event) {
        // Kollar av om klicket görs på ikonen eller länkarna, om inte körs resterande kod. 
        if (!mobileMenuIcon.contains(event.target) && !mobileLinks.contains(event.target)) {
            mobileLinks.classList.remove("active");
            mobileMenuIcon.classList.remove("fa-times");
            mobileMenuIcon.classList.add("fa-bars");
        }
    });
});

// Händelselyssnare för hela sidan, kör funktionerna getMenu och getScores direkt.
document.addEventListener("DOMContentLoaded", getMenu);
document.addEventListener("DOMContentLoaded", getScores);

// Funktion som hämtar lagrade glassar i menyn.
async function getMenu() {
    // API-URL.
    const getUrl = "http://127.0.0.1:3131/icecreams";

    // AJAX-anrop, loopar genom data och skriver ut till skärm.
    try {
        const response = await fetch(getUrl);
        const data = await response.json();

        // Loopar genom glassar och lägger dem i rätt kategori-div.
        data.menu.forEach(icecream => {
            // Hittar div-elementet för glassens kategori.
            const categoryDiv = document.getElementById(icecream.category.toLowerCase());

            // Skapar ett listelement för varje glass.
            const icecreamItem = document.createElement("li");
            icecreamItem.innerHTML = `
                <h3>${icecream.name}</h3>
                <p>${icecream.description}</p>
                <p>${icecream.price}</p>
            `;

            // Lägger till listelementet i rätt kategori-div.
            const list = categoryDiv.querySelector(".icecream-list");
            list.appendChild(icecreamItem);
        });

    // Felmeddelande.
    } catch (error) {
        console.log("Fetch failed. This message was created:", error);
    }
}

// Funktion som hämtar lagrade omdömen.
async function getScores() {
    // API-URL.
    const getUrl = "http://127.0.0.1:3131/scores";

    // AJAX-anrop, loopar genom data och skriver ut till skärm.
    try {
        const response = await fetch(getUrl);
        const data = await response.json();

        // Hämtar ul-elementet vari datan ska skrivas ut.
        let scoreListEl = document.getElementById("score-list");

        // Rensar listan innan ny data läggs till.
        scoreListEl.innerHTML = "";

        // Loopar genom omdömena och skriver ut varje omdöme för sig.
        data.scores.forEach(score => {
            // Skapar en "rubrik" med stjärnor för varje omdöme.
            const stars = createStars(score.score);

            // Formaterar datumet till åå-mm-dd.
            const date = new Date(score.date);
            const formattedDate = date.toLocaleDateString('sv-SE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });

            // Skapar ett listelement för varje omdöme.
            const scoreItem = document.createElement("li");
            scoreItem.innerHTML = `
                <h3>${stars}</h3>
                <p>${score.name}</p>
                <p>${formattedDate}</p>
            `;

            // Lägger till listelementen i listan.
            scoreListEl.appendChild(scoreItem);
        });

    // Felmeddelande.
    } catch (error) {
        console.log("Fetch failed. This message was created:", error);
    }
}

// Funktion som skapar stjärn-ikoner baserat på betyget som angetts, 1-5.
function createStars(score) {
    // Börjar med tom sträng.
    let stars = '';

    // Loopar genom siffrorna 1 till 5 fem gånger.
    for (let i = 1; i <= 5; i++) {
        // Villkor; om i är mindre än eller lika med det angivna betyget lagras en full stjärna, annars en tom stjärna.
        if (i <= score) {
            stars += '<i class="fas fa-star full-star"></i>';
        } else {
            stars += '<i class="far fa-star empty-star"></i>';
        }
    }

    // Returnerar en fylld sträng med stjärn-ikonerna.
    return stars;
}

// Händelselyssnare för text som försvinner vid scroll.
document.addEventListener("scroll", function() {
    const scrollText = document.getElementById("scroll-text");

    // Villkor; vid scroll neråt försvinner texten, annars syns den.
    if (window.scrollY > 0) {
        scrollText.style.opacity = "0";
    } else {
        scrollText.style.opacity = "1";
    }
});