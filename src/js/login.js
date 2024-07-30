// Händelselyssnare på logga in-knappen.
const loginForm = document.getElementById("login");
loginForm.addEventListener("submit", checkInput);

// Kontrollerar input.
function checkInput(event) {

    // Hanterar default för submit vid formulär.
    event.preventDefault();

    // Hämtar in inputvärden.
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Felmeddelande i formuläret.
    const formErrors = document.getElementById("error-container");
    // Rensar tidigare felmeddelanden.
    formErrors.innerHTML = "";

    // Kontrollerar input.
    if (username === "" || password === "") {
        // Visar ett felmeddelande till användaren om att input saknas.
        formErrors.innerHTML = "Användarnamn och lösenord måste anges!";
        // Koden exekveras inte vidare om input saknas.
        return;
    }

    // Skickar med inputvärden till inloggnings-funktion.
    loginAdmin(username, password);
}

// Funktion som loggar in en admin.
async function loginAdmin(username, password) {

    // API-url.
    const loginUrl = "http://127.0.0.1:3131/admin/login";

    // AJAX-anrop med metoden POST.
    try {
        const response = await fetch(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        // Villkor, om inloggning lyckas.
        if (response.ok) {
            // Lägger till token i sessionStorage.
            const data = await response.json();
            sessionStorage.setItem("authToken", data.token);
            
            // Rensar formulär på inputvärden.
            document.getElementById("login").reset();

            // Dirigerar om till admin-gränssnittet.
            window.location.href = "admin.html";

        // Felmeddelande om inloggning misslyckas.
        } else {
            const formErrors = document.getElementById("error-container");
            formErrors.innerHTML = "Inloggningen misslyckades. Prova igen!";
        }
    // Felmeddelande om fel vid inloggning.
    } catch (error) {
        const formErrors = document.getElementById("error-container");
        formErrors.innerHTML = "Det uppstod ett fel vid inloggningen: " + error.message;
        console.error("Fel vid inloggning: ", error);
    }
}

// Händelselyssnare vid sidladdning.
document.addEventListener("DOMContentLoaded", () => {

    // Lägger till händelselyssnare för synligt/osynligt lösenord.
    const passwordCheckbox = document.getElementById("show-password");
    const passwordInput = document.getElementById("password");

    // Villkor för checkbox.
    if (passwordCheckbox) {
        passwordCheckbox.addEventListener("change", () => {
            // Visar text om i-bockad.
            if (passwordCheckbox.checked) {
                passwordInput.type = "text";
                // Osynligt lösenord om inte i-bockad (prickar). 
            } else {
                passwordInput.type = "password";
            }
        });
    }
});
