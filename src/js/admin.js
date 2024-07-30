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

// Händelselyssnare vid sidladdning.
document.addEventListener("DOMContentLoaded", () => {

    // Hämtar alla logga ut-knappar.
    const logoutButton = document.querySelectorAll(".logout");

    // Lägger till händelselyssnare för varje logga ut-knapp.
    logoutButton.forEach(button => {
        button.addEventListener("click", logoutAdmin);
    });

    // Kontrollerar autentisering om admin är på admin-gränssnittet.
    if (window.location.pathname.endsWith("admin.html")) {
        checkAuthentication();
    }
});
