/* =========================================
   EasyStockMarkets - Main JavaScript
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent click from bubbling
            mainNav.classList.toggle("open");
            
            // Toggle icon or state if needed
            const isOpened = mainNav.classList.contains("open");
            menuToggle.innerHTML = isOpened ? "✕" : "☰";
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (mainNav.classList.contains("open") && 
                !mainNav.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                mainNav.classList.remove("open");
                menuToggle.innerHTML = "☰";
            }
        });
    }

    // --- Active Link Highlight ---
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".navigation a");
    
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        }
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
