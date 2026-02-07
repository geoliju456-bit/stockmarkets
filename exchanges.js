/* =====================================================
   GLOBAL STOCK EXCHANGES – exchanges.js
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- DOM ---------- */
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const suggestions = document.getElementById("suggestions");
  const exchangeResult = document.getElementById("exchangeResult");
  const initialState = document.getElementById("initialState");

  const toggleConvert = document.getElementById("toggleConvert");
  const convertBox = document.getElementById("convertBox");
  const tzInput = document.getElementById("tzInput");
  const tzSuggestions = document.getElementById("tzSuggestions");
  const convertBtn = document.getElementById("convertBtn");
  const convertedResult = document.getElementById("convertedResult");

  const readMoreBtn = document.getElementById("readMoreBtn");
  const descEl = document.getElementById("ex-description");

  /* ---------- SAFETY ---------- */
  if (!searchInput || !exchangeResult) {
    console.warn("Required DOM elements missing for exchange search");
    return;
  }

  /* ---------- STATE ---------- */
  let exchanges = [];
  let currentExchange = null;
  let expanded = false;

  /* ---------- HELPER: Error Display ---------- */
  function showExchangeError(message) {
    exchangeResult.style.display = "block";
    if (initialState) initialState.style.display = "none";
    exchangeResult.innerHTML = `
      <div style="
        padding:1rem;
        background:#fef2f2;
        color:#991b1b;
        border:1px solid #fecaca;
        border-radius: var(--radius-md);
        font-weight:600;
        text-align:center;
      ">
        ⚠ ${message}
      </div>
    `;
  }

  /* ---------- LOAD DATA ---------- */
  // 1. Immediate Load for Static Pages
  if (window.PRELOADED_EXCHANGE) {
    loadFromURL();
  }

  // 2. Fetch Full Data (for Search functionality)
  // Determine path based on location (handle /markets/ subdirectory)
  const isMarketsDir = window.location.href.includes("/markets/");
  const dataPath = isMarketsDir ? "../data/exchanges.json" : "data/exchanges.json";

  fetch(dataPath)
    .then(res => res.json())
    .then(data => {
      exchanges = data;
      // Only trigger load if we didn't have preloaded data
      if (!window.PRELOADED_EXCHANGE) {
        loadFromURL();
      }
    })
    .catch(err => {
      console.error("JSON load error:", err);
      // If fetch fails but we have preloaded data, that's fine for viewing,
      // but search won't work.
    });

  /* ---------- HELPERS ---------- */
  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val || "—";
  }

  function toAMPM(time) {
    if (!time) return "—";
    const [h, m] = time.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  }

  function convertTime(time, fromTZ, toTZ) {
    if (!time) return "—";
    const [h, m] = time.split(":").map(Number);
    const base = new Date();
    base.setDate(base.getDate()); // Ensure valid date
    base.setHours(h, m, 0);

    // Create date string in source timezone
    const fromStr = base.toLocaleString("en-US", { timeZone: fromTZ });
    const fromDate = new Date(fromStr);

    // Correcting the object if needed but usually better to:
    // 1. Create a date object interpreting the time in the fromTZ.
    // simpler approach with modern JS:
    // We treat 'base' as if it is in 'fromTZ'.
    // To do this accurately without libraries like moment-timezone is tricky if limited to old environments,
    // but with modern Intl we can just format it directly if we have the timestamp.

    // Alternative robust way:
    // 1. Get current date components.
    // 2. We want { Y, M, D, h, m } in fromTZ to equal the input.
    // This is hard without a library.
    //
    // Simplified approximation (assuming same day):
    // Just use toLocaleString on the base object which is local, but that's wrong.

    // Let's use the provided logic which was working sufficiently for the user:
    // It creates a date object 'base' in local time with the hh:mm.
    // Then it effectively treats that as a string to parse? No, let's stick to the previous implementation logic:

    const options = {
      timeZone: toTZ,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    };

    // We need a Date object that REPRESENTS the specific time in the source TimeZone.
    // Since we don't have a library, we'll assume the time is for "today" in that timezone.
    // The previous code:
    // const fromDate = new Date(base.toLocaleString("en-US", { timeZone: fromTZ }));
    // This is problematic because base is local.

    // Let's stick to the simple conversion (reusing previous logic mainly):
    try {
      // Create an arbitrary date
      let d = new Date();
      d.setHours(h, m, 0);

      // This 'd' is in local time. 
      // We want to find a UTC timestamp such that in 'fromTZ' it reads as h:m.
      // That is complex. 

      // HOWEVER, if the user was happy with the old functionality:
      // The old functionality:
      // const fromDate = new Date(base.toLocaleString("en-US", { timeZone: fromTZ }));
      // This lines basically converts the local time representation of 'base' to 'fromTZ' string, then parses it back to local.
      // This is actually converting "Local time X" -> "What time is X in fromTZ?".
      // That is NOT what we want. We want "Time X in fromTZ" -> "What time is that in toTZ?".

      // Correct approach without library:
      // 1. Get offset of fromTZ.
      // 2. Get offset of toTZ.
      // 3. Diff.

      // Let's just use the display logic for now. The previous code was buggy conceptually but maybe "worked" for testing.
      // I will try to leave it as close as possible but safeguard it.

      // Better attempt:
      // formatted string in target timezone
      // We can't easily construct the source date.

      // Let's use the old logic for stability if it wasn't complained about, 
      // OR slightly improve it by just showing the time as is if we can't convert.

      // I'll keep the previous function body to strictly follow "keep all things" rule but wrapped in try-catch.
      const fromDate = new Date(base.toLocaleString("en-US", { timeZone: fromTZ }));
      // Wait, the previous code was:
      // const fromDate = new Date(base.toLocaleString("en-US", { timeZone: fromTZ }));
      // return fromDate.toLocaleTimeString("en-US", { timeZone: toTZ ... });

      // This logic calculates: Take "Now" (with hours changed). content of 'base' is treated as a moment in time (UTC).
      // It converts that moment to 'fromTZ' string.
      // Then it parses that string as a LOCAL time.
      // Then it converts that LOCAL time to 'toTZ'.
      // This makes zero sense.

      // I will fix this LOGICAL ERROR.

      // FIX:
      // We need a UTC timestamp that corresponds to T in Z1.
      // We can loop to find it or use a string trick (append timezone offset).
      // But since we have IANA names, we can't easily get offset numbers.

      // Let's just format the current time in both timezones to see the difference? No.

      // Simple hack: Assume the user meant "What is X time (Ex: 9:30 AM) in New York" converted to "London".
      // I will use a library-less approach:
      // 1. Get current time T. 
      // 2. Find difference between T in Z1 and T in Z2. 
      // 3. Apply difference to h:m.

      const now = new Date();
      const str1 = now.toLocaleString('en-US', { timeZone: fromTZ });
      const str2 = now.toLocaleString('en-US', { timeZone: toTZ });
      const diff = (new Date(str2) - new Date(str1)); // difference in ms

      const sourceTime = new Date();
      sourceTime.setHours(h, m, 0);
      // This sourceTime is set to h:m in LOCAL time.

      // We want to apply the DIFF.
      // The diff tells us how much ahead/behind Z2 is from Z1.
      const targetTime = new Date(sourceTime.getTime() + diff);

      return targetTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });

    } catch (e) {
      console.error(e);
      return "N/A";
    }
  }

  /* ---------- SEARCH AUTOSUGGEST ---------- */
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase().trim();
    suggestions.innerHTML = "";
    if (q.length < 1) return;

    const matches = exchanges.filter(ex =>
      ex.name.toLowerCase().includes(q) ||
      ex.code.toLowerCase().includes(q)
    );

    if (!matches.length) {
      suggestions.innerHTML =
        `<div class="suggestion-item">No exchanges found</div>`;
      return;
    }

    matches.slice(0, 6).forEach(ex => {
      const div = document.createElement("div");
      div.className = "suggestion-item";
      div.textContent = `${ex.name} (${ex.code})`;
      div.onclick = () => {
        searchInput.value = ex.name;
        suggestions.innerHTML = "";
        displayExchange(ex);
      };
      suggestions.appendChild(div);
    });
  });

  /* ---------- SEARCH ---------- */
  function runSearch() {
    const q = searchInput.value.trim().toLowerCase();

    if (!q) {
      showExchangeError("Please enter a stock exchange name or code.");
      return;
    }

    const found = exchanges.find(ex =>
      ex.name.toLowerCase().includes(q) ||
      ex.code.toLowerCase() === q
    );

    if (!found) {
      showExchangeError("Stock exchange not found.");
      return;
    }

    displayExchange(found);
  }

  if (searchBtn) searchBtn.addEventListener("click", runSearch);
  searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") runSearch();
  });

  /* ---------- DISPLAY EXCHANGE ---------- */
  function displayExchange(ex) {
    if (!ex) return;

    currentExchange = ex;
    expanded = false;

    // Show result, hide initial state
    exchangeResult.style.display = "block";
    if (initialState) initialState.style.display = "none";

    // Reset converter
    if (convertedResult) convertedResult.style.display = "none";
    if (convertBox) convertBox.style.display = "none";

    setText("ex-name", ex.name);
    setText("ex-code", ex.code);
    setText("ex-country", ex.country);
    setText("ex-region", ex.region);
    setText("ex-owned", ex.owned_by);
    setText("ex-index", ex.index);
    setText("ex-established", ex.established);

    setText(
      "ex-timezone",
      window.Timezones ? Timezones.getTimezonePath(ex.timezone) : ex.timezone
    );

    setText("ex-pre", toAMPM(ex.pre));
    setText("ex-open", toAMPM(ex.open));
    setText("ex-close", toAMPM(ex.close));
    setText("ex-post", toAMPM(ex.post));

    const site = document.getElementById("ex-website");
    if (site) {
      site.href = ex.website;
    }

    if (descEl && ex.description) {
      descEl.textContent = ex.description.slice(0, 120) + "...";
      if (readMoreBtn) {
        readMoreBtn.style.display = "inline-block";
        readMoreBtn.textContent = "Read more";
      }
    }
    updateSEO(ex);
  }

  /* ---------- READ MORE ---------- */
  if (readMoreBtn) {
    readMoreBtn.addEventListener("click", () => {
      if (!currentExchange || !descEl) return;

      const full = currentExchange.description || "";

      descEl.textContent = expanded
        ? full.slice(0, 120) + "..."
        : full;

      readMoreBtn.textContent = expanded ? "Read more" : "Read less";
      expanded = !expanded;
    });
  }

  /* ---------- CONVERTER ---------- */
  if (toggleConvert) {
    toggleConvert.addEventListener("click", e => {
      e.preventDefault();
      convertBox.style.display =
        convertBox.style.display === "block" ? "none" : "block";
    });
  }

  /* ---------- TIMEZONE SUGGESTIONS ---------- */
  const IANA_TIMEZONES = Intl.supportedValuesOf("timeZone");

  if (tzInput) {
    tzInput.addEventListener("input", () => {
      const q = tzInput.value.toLowerCase().trim();
      tzSuggestions.innerHTML = "";

      if (q.length < 2) return;

      IANA_TIMEZONES
        .filter(tz => tz.toLowerCase().includes(q))
        .slice(0, 6)
        .forEach(tz => {
          const div = document.createElement("div");
          div.className = "suggestion-item";
          div.textContent = window.Timezones
            ? Timezones.getTimezonePath(tz)
            : tz;

          div.addEventListener("click", () => {
            tzInput.value = tz;
            tzSuggestions.innerHTML = "";
          });

          tzSuggestions.appendChild(div);
        });
    });
  }

  /* ---------- TIME CONVERSION (BUTTON + ENTER) ---------- */
  function runConversion(e = null) {
    if (e && e.type === "keydown" && e.key !== "Enter") return;

    if (!currentExchange) {
      alert("Please select a stock exchange first.");
      return;
    }

    const tz = tzInput.value.trim();
    if (!tz) return;

    setText(
      "cv-timezone",
      window.Timezones ? Timezones.getTimezonePath(tz) : tz
    );

    setText("cv-pre",
      convertTime(currentExchange.pre, currentExchange.timezone, tz)
    );
    setText("cv-open",
      convertTime(currentExchange.open, currentExchange.timezone, tz)
    );
    setText("cv-close",
      convertTime(currentExchange.close, currentExchange.timezone, tz)
    );
    setText("cv-post",
      convertTime(currentExchange.post, currentExchange.timezone, tz)
    );

    convertedResult.style.display = "block";
  }

  if (convertBtn) convertBtn.addEventListener("click", runConversion);
  if (tzInput) tzInput.addEventListener("keydown", runConversion);

  function loadFromURL() {
    // 1. Check for Static Preloaded Data (SEO Friendly Mode)
    if (window.PRELOADED_EXCHANGE) {
      displayExchange(window.PRELOADED_EXCHANGE);
      // We don't need updateSEO here because the static build already corrected the tags!
      // But we might want to ensure everything is consistent.
      return;
    }

    // 2. Fallback to Dynamic URL Params (Old Mode)
    const params = new URLSearchParams(window.location.search);
    const exchangeName = params.get("exchange");
    if (!exchangeName) return;

    const decodedName = decodeURIComponent(exchangeName);

    // Try finding by code first, then name
    const found = exchanges.find(
      e => e.code === decodedName || e.name === decodedName
    );

    if (found) {
      displayExchange(found);
    }
  }

  /* ---------- DYNAMIC SEO UPDATES ---------- */
  function updateSEO(ex) {
    if (!ex) return;

    // 1. Update Title
    document.title = `${ex.name} (${ex.code}) - Trading Hours & Market Info`;

    // 2. Update Meta Description
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute("content",
        `Track ${ex.name} (${ex.code}) trading hours, holidays, and market status. Convert ${ex.name} opening times to your local timezone.`
      );
    }

    // 3. Update Canonical Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }

    // Construct the canonical URL with the exchange parameter
    const url = new URL(window.location.protocol + "//" + window.location.host + window.location.pathname);
    url.searchParams.set("exchange", ex.code);
    canonicalLink.href = url.toString();

    // 4. Update URL in browser address bar (optional but good for UX)
    const newUrl = url.toString();
    if (window.location.href !== newUrl) {
      window.history.pushState({ path: newUrl }, '', newUrl);
    }
  }

});