/* =========================================
   All Exchanges Page Script
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("exchangesGrid");
    const loading = document.getElementById("loading");
    const filterInput = document.getElementById("filterInput");
    const noResults = document.getElementById("noResults");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const loadMoreContainer = document.getElementById("loadMoreContainer");

    let allExchanges = [];
    let currentList = [];
    let currentPage = 1;
    const itemsPerPage = 30;

    // Fetch Data
    fetch("data/exchanges.json")
        .then(res => res.json())
        .then(data => {
            allExchanges = data;
            updateDisplay(data);
            loading.style.display = "none";
        })
        .catch(err => {
            console.error("Error loading exchanges:", err);
            loading.textContent = "Failed to load data. Please try again later.";
        });

    // Load Initial or Filtered Data with Pagination
    function updateDisplay(list) {
        currentList = list;
        currentPage = 1;
        const pageData = currentList.slice(0, itemsPerPage);
        renderExchanges(pageData, false);
    }

    // Handle View More
    loadMoreBtn.addEventListener("click", () => {
        currentPage++;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = currentList.slice(startIndex, endIndex);
        renderExchanges(pageData, true);
    });

    // Render Function
    function renderExchanges(list, append = false) {
        if (!append) {
            grid.innerHTML = "";
        }

        if (list.length === 0 && !append) {
            noResults.classList.remove("hidden");
            loadMoreContainer.classList.add("hidden");
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

        // Show or hide Load More button
        if (currentList.length > currentPage * itemsPerPage) {
            loadMoreContainer.classList.remove("hidden");
        } else {
            loadMoreContainer.classList.add("hidden");
        }
    }

    // Filter Logic
    filterInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();

        const filtered = allExchanges.filter(ex => {
            return (
                ex.name.toLowerCase().includes(query) ||
                (ex.code && ex.code.toLowerCase().includes(query)) ||
                (ex.country && ex.country.toLowerCase().includes(query))
            );
        });

        updateDisplay(filtered);
    });
});
