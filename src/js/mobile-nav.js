"use strict";

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