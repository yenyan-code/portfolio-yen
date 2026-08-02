/**
 * ==========================================================================
 * PAGE SCRIPT: Home Landing Page (home.js)
 * Enhances Itti's Portfolio with subtle card interactions and smooth scroll
 * ==========================================================================
 * 
 * TABLE OF CONTENTS:
 * 1. Card Parallax & Hover Physics
 * 2. Spotify Audio Widget Click Confirmation
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Itti Portfolio — Home Page Script Loaded");

    /* ==========================================================================
       1. CARD PARALLAX & HOVER PHYSICS
       Adds a subtle 3D tilt effect when hovering over project cards to match
       the interactive feel of high-end Framer prototypes.
       ========================================================================== */
    const cards = document.querySelectorAll('.work-card-exact, .play-card-exact');
    
    cards.forEach(card => {
        const imgBox = card.querySelector('.work-card-img-box, .play-card-img-box');
        
        if (imgBox) {
            card.addEventListener('mousemove', (e) => {
                const rect = imgBox.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -3; // max -3 to 3 deg
                const rotateY = ((x - centerX) / centerX) * 3;
                
                imgBox.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                imgBox.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        }
    });

    /* ==========================================================================
       2. SPOTIFY AUDIO WIDGET CLICK CONFIRMATION
       Gives visual feedback when clicking the "Sauna by Vulfpeck" widget.
       ========================================================================== */
    const spotifyWidget = document.querySelector('.spotify-widget');
    if (spotifyWidget) {
        spotifyWidget.addEventListener('click', () => {
            console.log("Opening Spotify Track: Sauna by Vulfpeck...");
        });
    }
});
