/* =========================================
   All Exchanges Page Script
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("exchangesGrid");
    const loading = document.getElementById("loading");
    const filterInput = document.getElementById("filterInput");
    const noResults = document.getElementById("noResults");

    let allExchanges = [];

    // Fetch Data
    fetch("data/exchanges.json")
        .then(res => res.json())
        .then(data => {
            allExchanges = data;
            renderExchanges(data);
            loading.style.display = "none";
        })
        .catch(err => {
            console.error("Error loading exchanges:", err);
            loading.textContent = "Failed to load data. Please try again later.";
        });

    // Render Function
    function renderExchanges(list) {
        grid.innerHTML = "";

        if (list.length === 0) {
            noResults.classList.remove("hidden");
            return;
        } else {
            noResults.classList.add("hidden");
        }

        list.forEach(ex => {
            const card = document.createElement("div");
            card.className = "card";

            // Generate Card Content
            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                    <h3>${ex.name}</h3>
                    <span style="background: var(--primary-light); color: var(--primary); padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; font-weight: 600;">${ex.code}</span>
                </div>
                <div style="margin-bottom: 1rem; font-size: 0.9rem; color: var(--text-muted);">
                    <strong>${ex.country}</strong> • ${ex.region}
                </div>
                <p>${ex.description ? ex.description.substring(0, 100) + '...' : 'No description available.'}</p>
                <a href="markets/${ex.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '')}.html" class="link-arrow">
                    View Details & Timings →
                </a>
            `;

            grid.appendChild(card);
        });
    }

    // Filter Logic
    filterInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();

        const filtered = allExchanges.filter(ex => {
            return (
                ex.name.toLowerCase().includes(query) ||
                ex.code.toLowerCase().includes(query) ||
                ex.country.toLowerCase().includes(query)
            );
        });

        renderExchanges(filtered);
    });
});
