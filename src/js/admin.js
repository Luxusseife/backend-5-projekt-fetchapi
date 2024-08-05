"use strict";

// Funktion för att kontrollera om admin är inloggad.
function adminLoggedIn() {
    const token = sessionStorage.getItem("authToken");
    return token !== null;
}

// Funktion som kontrollerar autentisering för admin-gränssnittet.
function checkAuthentication() {
    if (!adminLoggedIn()) {
        // Om admin inte är inloggad, omdirigera till login.html.
        window.location.href = "login.html";
    } else {
        // Om admin är inloggad, visa innehållet.
        document.getElementById("content").style.display = "block";
    }
}

// Funktion som loggar ut en admin.
function logoutAdmin(event) {

    // Förhindrar default-omdirigering vid länk-klick.
    event.preventDefault();

    // Tar bort autentiseringstoken från sessionStorage.
    sessionStorage.removeItem("authToken");

    // Omdirigerar till startsidan.
    window.location.href = "index.html";
}

// Funktion som hämtar hela menyn med glassar.
async function getMenu() {
    // API-URL.
    const getUrl = "https://webbservice.onrender.com/icecreams";

    // AJAX-anrop, loopar genom glassar och skriver ut till DOM.
    try {
        const response = await fetch(getUrl);
        const data = await response.json();

        // Rensar kategori-listorna innan nya glassar läggs till.
        const categoryDivs = document.querySelectorAll(".icecream-list");
        categoryDivs.forEach(div => {
            div.innerHTML = "";
        });

        // Loopar genom glassar och lägger dem i rätt kategori-div.
        data.menu.forEach(icecream => {
            // Normaliserar kategorinamnet.
            const categoryId = icecream.category
                // Konverterar till gemener.
                .toLowerCase()
                // Ersätter mellanslag och specialtecken med bindestreck.
                .replace(/[^a-zåäö]+/g, "-");

            // Hittar div-elementet för glassens kategori.
            const categoryDiv = document.getElementById(categoryId);

            // Skapar ett listelement för varje glass inkl. knappar för uppdatera/radera.
            const icecreamItem = document.createElement("li");
            // Lägger till data-id på knappar för att kunna identifiera knapp/glass.
            icecreamItem.innerHTML = `
                <h4>${icecream.name}</h4>
                <p>${icecream.description}</p>
                <p>${icecream.price}</p>
                <button class="editIcecream" data-id="${icecream._id}">ÄNDRA<i class="fa-solid fa-pen-to-square"></i></button>
                <button class="eraseIcecream" data-id="${icecream._id}">RADERA<i class="fa-solid fa-trash-can"></i></button>
                `;

            // Lägger till listelementet i rätt kategori-div.
            const list = categoryDiv.querySelector(".icecream-list");
            list.appendChild(icecreamItem);
        });

        // Lägger till händelselyssnare för uppdatera-knappen.
        document.querySelectorAll(".editIcecream").forEach(button => {
            button.addEventListener("click", handleIcecreamUpdate);
        });

        // Lägger till händelselyssnare på samliga radera-knappar som anropar raderingsfunktion.
        document.querySelectorAll(".eraseIcecream").forEach(button => {
            button.addEventListener("click", eraseIcecream);
        });

    // Felmeddelande.
    } catch (error) {
        console.log("Fetch failed. This message was created:", error);
    }
}

// Funktion som skapar och lägger till en ny glass med inbyggd input-kontroll.
async function createIcecream() {

    // Hämtar in formulär och container för felmeddelande.
    const createForm = document.getElementById("createForm");
    const errorContainer = document.getElementById("create-errors");

    // Lägger en händelselyssnare på submit-knappen i formuläret.
    createForm.addEventListener("submit", async function (event) {

        // Förhindrar default-beteende.
        event.preventDefault();

        // Hämtar in inputvärden.
        const name = document.getElementById("create-name").value;
        const category = document.getElementById("create-category").value;
        const description = document.getElementById("create-description").value;
        const price = document.getElementById("create-price").value;

        // Radera tidigare innehåll.
        errorContainer.textContent = "";

        // Input-kontroll.
        if (!name || !category || !description || !price) {
            // Felmeddelande visas.
            errorContainer.textContent = "Alla fält måste fyllas i.";
            // Koden exekveras inte vidare.
            return;
        }

        // Skapar ett nytt glass-objekt.
        const newIcecream = {
            name,
            category,
            description,
            price
        };

        // API-URL.
        const createUrl = "https://webbservice.onrender.com/icecreams";

        // AJAX-anrop med metoden POST.
        try {
            const response = await fetch(createUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newIcecream)
            });

            // Svar.
            const result = await response.json();

            // Villkor, om lagring lyckas.
            if (response.ok) {
                // Visar en alert om lyckad lagring, kör reset på och döljer formulär.
                alert("Glassen lades till!");
                createForm.reset();
                createForm.style.display = "none";
                // Uppdaterar menyn.
                getMenu();

            // Alert med felmeddelande om lagringen misslyckas.
            } else {
                alert("Något gick fel när glassen skulle sparas. Prova igen!");
            }

        // Felmeddelande.
        } catch (error) {
            console.error("Error creating new ice cream:", error);
            errorContainer.textContent = "Ett fel uppstod. Försök igen.";
        }
    });
}

// Funktion som hämtar redan lagrad input från aktuell glass och fyller i formulär.
async function handleIcecreamUpdate(event) {

    // Hämtar ID för knappen/glassen.
    const icecreamId = event.currentTarget.getAttribute("data-id");

    // API-url med ID som endpoint.
    const handleUrl = `https://webbservice.onrender.com/icecreams/${icecreamId}`;

    // AJAX-anrop där lagrad data hämtas och skrivs ut i formulär.
    try {
        const response = await fetch(handleUrl);
        const data = await response.json();

        // Fyller i formuläret med befintlig data.
        document.getElementById("update-name").value = data.icecream.name;
        document.getElementById("update-description").value = data.icecream.description;
        document.getElementById("update-price").value = data.icecream.price;

        // Hämtar in selectboxen. 
        const updateCategory = document.getElementById("update-category");

        // Funktion som normaliserar kategorinamnen.
        function normalizeCategory(category) {
            return category
            .toLowerCase()
            .replace(/[^a-zåäö]+/g, "-");
        }

        // Hittar matchande alternativ i select-elementet.
        const normalizedCategory = normalizeCategory(data.icecream.category);
        const matchingOption = Array.from(updateCategory.options).find(option =>
            normalizeCategory(option.value) === normalizedCategory
            );

        // Villkor; om ett matchande värde hittas sätts värdet och detta visas i formuläret.
        if (matchingOption) {
            updateCategory.value = matchingOption.value;
        }

        // Visar formuläret.
        const updateForm = document.getElementById("updateForm");
        updateForm.style.display = "block";

        // Scrollar till formuläret.
        updateForm.scrollIntoView({ behavior: "smooth" });

        // Lägger till en händelselyssnare på submit-knappen.
        updateForm.addEventListener("submit", async function (event) {
            // Förhindrar default-beteende.
            event.preventDefault(); 
            // Väntar in händelser/åtgärder innan anrop av uppdateringsfunktion.
            await updateIcecream(icecreamId);
            // Ser till att händelselyssnaren endast körs en gång.
        }, { once: true });

    // Felmeddelande.
    } catch (error) {
        console.error("Error fetching ice cream data:", error);
    }
}

// Funktion som uppdaterar en vald glass.
async function updateIcecream(icecreamId) {

    // Hämtar in inputvärden och container för felmeddelanden.
    const name = document.getElementById("update-name").value;
    const category = document.getElementById("update-category").value;
    const description = document.getElementById("update-description").value;
    const price = document.getElementById("update-price").value;
    const errorContainer = document.getElementById("update-errors");

    // Radera tidigare innehåll.
    errorContainer.textContent = "";

    // Input-kontroll
    if (!name || !category || !description || !price) {
        errorContainer.textContent = "Alla fält måste fyllas i.";
        return;
    }

    // Skapar ett uppdaterat glass-objekt.
    const updatedIcecream = {
        name,
        category,
        description,
        price
    };

    // API-url med ID som endpoint.
    const updateUrl = `https://webbservice.onrender.com/icecreams/${icecreamId}`;

    // AJAX-anrop med metoden PUT.
    try {
        const response = await fetch(updateUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedIcecream)
        });

        // Villkor; om uppdatering lyckas.
        if (response.ok) {
            // Visar en alert, kör reset på och döljer formuläret.
            alert("Glassen uppdaterades!");
            const updateForm = document.getElementById("updateForm");
            updateForm.reset();
            updateForm.style.display = "none";
            // Uppdaterar meny-listan.
            getMenu();

        // Alert med felmeddelande om uppdateringen misslyckas.
        } else {
            alert("Något gick fel när glassen skulle uppdateras. Prova igen!");
        }

    // Felmeddelande.
    } catch (error) {
        console.error("Error updating ice cream:", error);
        errorContainer.textContent = "Ett fel uppstod. Försök igen.";
    }
}

// Funktion som raderar en glass från menyn.
async function eraseIcecream(event) {
    // Hämtar ID för knappen/glassen.
    const icecreamId = event.currentTarget.getAttribute("data-id");

    // API-url med ID som endpoint.
    const deleteUrl = `https://webbservice.onrender.com/icecreams/${icecreamId}`;

    // AJAX-anrop med metoden DELETE.
    try {
        const response = await fetch(deleteUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Villkor, om radering lyckas.
        if (response.ok) {
            // Visar en alert om lyckad radering och uppdaterar menyn.
            alert("Glassen raderades!");
            getMenu();

        // Alert med felmeddelande om raderingen misslyckas.
        } else {
            alert("Något gick fel när glassen skulle raderas. Prova igen!");
        }

    // Felmeddelande.
    } catch (error) {
        console.error("Fel vid radering: ", error);
        alert("Det uppstod ett fel vid raderingen: " + error.message);
    }
}

// Funktion som hämtar lagrade besöksbetyg.
async function getScores() {
    // API-URL.
    const getUrl = "https://webbservice.onrender.com/scores";

    // AJAX-anrop, loopar genom besöksbetyg och skriver ut till DOM.
    try {
        const response = await fetch(getUrl);
        const data = await response.json();

        // Hämtar ul-elementet vari datan ska skrivas ut.
        let scoreListEl = document.getElementById("score-list");

        // Rensar listan innan ny data läggs till.
        scoreListEl.innerHTML = "";

        // Loopar genom besöksbetyg och skriver ut varje betyg för sig.
        data.scores.forEach(score => {

            // Skapar en "rubrik" med stjärnor för varje betyg.
            const stars = createStars(score.score);

            // Formaterar datumet till åå-mm-dd.
            const date = new Date(score.date);
            const formattedDate = date.toLocaleDateString("sv-SE", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            });

            // Skapar ett listelement för varje betyg inkl. knapp för att radera.
            const scoreItem = document.createElement("li");
            // Lägger till data-id för knapp för att kunna identifiera knappen/betyget.
            scoreItem.innerHTML = `
                <p>${stars}</p>
                <p>${score.name}</p>
                <p>${formattedDate}</p>
                <button class="eraseScore" data-id="${score._id}">RADERA<i class="fa-solid fa-trash-can"></i></button>
                `;

            // Lägger till listelementen i listan.
            scoreListEl.appendChild(scoreItem);

            // Lägger till händelselyssnare på samliga radera-knappar som anropar raderingsfunktion.
            document.querySelectorAll(".eraseScore").forEach(button => {
                button.addEventListener("click", eraseScore);
            });
        });

    // Felmeddelande.
    } catch (error) {
        console.log("Fetch failed. This message was created:", error);
    }
}

// Funktion som raderar ett besöksbetyg.
async function eraseScore(event) {
    // Hämtar ID för knappen/betyget.
    const scoreId = event.currentTarget.getAttribute("data-id");

    // API-url med ID som endpoint.
    const deleteUrl = `https://webbservice.onrender.com/scores/${scoreId}`;

    // AJAX-anrop med metoden DELETE.
    try {
        const response = await fetch(deleteUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Villkor, om radering lyckas.
        if (response.ok) {
            // Visar en alert om lyckad radering och uppdaterar listan.
            alert("Betyget raderades!");
            getScores();

        // Alert med felmeddelande om radering misslyckas.
        } else {
            alert("Något gick fel när betyget skulle raderas. Prova igen!");
        }

    // Felmeddelande.
    } catch (error) {
        console.error("Fel vid radering: ", error);
        alert("Det uppstod ett fel vid raderingen: " + error.message);
    }
}

// Händelselyssnare vid sidladdning.
document.addEventListener("DOMContentLoaded", () => {

    // Hämtar in knappar, formulär och sektioner.
    const logoutButton = document.querySelectorAll(".logout");
    const newIcecreamButton = document.getElementById("newIcecream");
    const menuButton = document.getElementById("menu-button");
    const scoreButton = document.getElementById("score-button");
    const createForm = document.getElementById("createForm");
    const updateForm = document.getElementById("updateForm");
    const menuSection = document.getElementById("menu");
    const scoreSection = document.getElementById("score");

    // Lägger till händelselyssnare för varje logga ut-knapp.
    logoutButton.forEach(button => {
        button.addEventListener("click", logoutAdmin);
    });

    // Lägger till händelselyssnare på "skapa ny"-knappen.
    newIcecreamButton.addEventListener("click", function () {
        createForm.style.display = "block";
    });

    // Anropar skapa-ny-glass-funktionen.
    createIcecream();

    // Funktion som lägger till händelselyssnare på avbryt-knappar.
    function addCancelListener() {
        document.querySelectorAll(".cancel-button").forEach(button => {
            button.addEventListener("click", function (event) {
                // Förhindrar default-beteende.
                event.preventDefault();
                // Fäller ihop/döljer fomuläret.
                createForm.style.display = "none";
                updateForm.style.display = "none";
            });
        });
    }

    // Anropar funktionen som sköter händelselyssnare för avbryt-knappen.
    addCancelListener();

    // Kontrollerar autentisering om admin är på admin-gränssnittet.
    if (window.location.pathname.endsWith("admin.html")) {
        checkAuthentication();
    }

    // Funktion för att visa och dölja sektioner.
    function toggleSections(showSection, hideSection) {
        showSection.style.display = "block";
        hideSection.style.display = "none";
    }

    // Funktion för att hantera knappklick och tilldela aktiv klass.
    function handleButtonClick(activeButton, inactiveButton) {
        activeButton.classList.add("active-button");
        inactiveButton.classList.remove("active-button");
    }

    // Händelselyssnare för MENY-knappen som anropar meny-funktionen.
    menuButton.addEventListener("click", () => {
        toggleSections(menuSection, scoreSection);
        handleButtonClick(menuButton, scoreButton);
        getMenu();
    });

    // Händelselyssnare för BETYG-knappen som anropar betygs-funktionen.
    scoreButton.addEventListener("click", () => {
        toggleSections(scoreSection, menuSection);
        handleButtonClick(scoreButton, menuButton);
        getScores();
    });
});

// Funktion som skapar stjärn-ikoner baserat på betyget som angetts, 1-5.
function createStars(score) {
    // Börjar med tom sträng.
    let stars = "";

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