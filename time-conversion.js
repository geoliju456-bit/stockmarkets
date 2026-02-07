/* ==========================================
   TIME CONVERSION – data from exchanges.json
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ================================
     LOAD DATA & VARS
     ================================ */
  let exchanges = [];
  const IANA_TIMEZONES = Intl.supportedValuesOf("timeZone");

  const exInput = document.getElementById("exchangeInput");
  const tzInput = document.getElementById("timezoneInput");
  const exSug = document.getElementById("exchangeSug");
  const tzSug = document.getElementById("timezoneSug");
  const resultDiv = document.getElementById("result");
  const convertBtn = document.getElementById("convertBtn");

  if (!exInput) return; // Guard clause

  /* ================================
     FETCH EXCHANGES
     ================================ */
  fetch("data/exchanges.json")
    .then(r => r.json())
    .then(d => exchanges = d);

  /* ================================
     SUGGESTION HELPER
     ================================ */
  function showList(box, items, clickFn) {
    box.innerHTML = "";
    items.forEach(item => {
      const div = document.createElement("div");
      div.className = "suggestion-item";
      div.innerHTML = item.html;
      div.onclick = () => clickFn(item.value);
      box.appendChild(div);
    });
    box.style.display = items.length ? "block" : "none";
  }

  /* ================================
     EXCHANGE AUTOSUGGEST
     ================================ */
  exInput.addEventListener("input", () => {
    const q = exInput.value.toLowerCase().trim();
    exSug.innerHTML = "";

    if (q.length < 1) {
      exSug.style.display = "none";
      return;
    }

    const matches = exchanges
      .filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.code?.toLowerCase().includes(q)
      )
      .slice(0, 8)
      .map(e => ({
        value: e.name,
        html: `<strong>${e.name}</strong> <span>${e.code || ""}</span>`
      }));

    if (!matches.length) {
      exSug.innerHTML = `<div class="suggestion-item">No exchanges found</div>`;
      exSug.style.display = "block";
      return;
    }

    showList(exSug, matches, val => {
      exInput.value = val;
      exSug.style.display = "none";
    });
  });

  /* ================================
     TIMEZONE AUTOSUGGEST
     ================================ */
  tzInput.addEventListener("input", () => {
    if (!tzSug || !window.Timezones) return;

    const q = tzInput.value.toLowerCase().trim();
    tzSug.innerHTML = "";

    if (q.length < 1) {
      tzSug.style.display = "none";
      return;
    }

    const matches = IANA_TIMEZONES.filter(iana => {
      const info = Timezones.getTimezoneInfo(iana);

      return (
        iana.toLowerCase().includes(q) ||
        info.city.toLowerCase().includes(q) ||
        info.country.toLowerCase().includes(q) ||
        info.region.toLowerCase().includes(q)
      );
    }).slice(0, 8);

    if (!matches.length) {
      tzSug.innerHTML = `<div class="suggestion-item">No timezones found</div>`;
      tzSug.style.display = "block";
      return;
    }

    matches.forEach(iana => {
      const info = Timezones.getTimezoneInfo(iana);

      const div = document.createElement("div");
      div.className = "suggestion-item";
      div.innerHTML = `<strong>${info.city}</strong> / ${info.country} / ${info.region}`;

      div.onclick = () => {
        tzInput.value = iana;
        tzSug.style.display = "none";
      };

      tzSug.appendChild(div);
    });

    tzSug.style.display = "block";
  });

  /* ================================
     CLOSE SUGGESTIONS
     ================================ */
  document.addEventListener("click", e => {
    if (!e.target.closest(".input-group")) {
      if (exSug) exSug.style.display = "none";
      if (tzSug) tzSug.style.display = "none";
    }
  });

  /* ================================
     TIME FORMAT
     ================================ */
  function formatTime(time, tz) {
    if (!time) return "—";
    const [h, m] = time.split(":").map(Number);

    // Calculate diff approach again for consistency with exchanges.js correction
    const now = new Date();
    const str1 = now.toLocaleString('en-US', { timeZone: tz });
    // This logic is actually for displaying time IN tz.
    // previous implementation used "timezone: tz" which is correct for "What time is it there?".
    // But the input 'time' (h:m) is already in 'ex.timezone'.
    // We want to convert 'time' FROM 'ex.timezone' TO 'tz'.

    // Correct Logic:
    // 1. We have 'time' in Exchange TZ.
    // 2. We want to show it in Target TZ.

    // This function effectively displays: "What time is [h,m] (interpreted as local date components) in [tz]?"
    // That is NOT what we want.

    // We want:
    // Convert h:m (which is in ex.timezone) -> targetTZ.

    // Reusing the diff logic:
    // Note: 'time' variable here is just a string "HH:MM".

    // To properly calculate, we need the source conversion. But this function `formatTime` 
    // is only called later with result from `resultDiv.innerHTML` ?
    // Wait, let's check call site.

    // Call site:
    // formatTime(ex.pre, ex.timezone)
    // formatTime(ex.pre, tz)

    // The intention of the second call is to show the time in the target timezone.
    // BUT `formatTime` implementation:
    // d.toLocaleTimeString(..., { timeZone: tz })
    // This takes 'd' (local time set to h:m) and converts it to 'tz'.
    // This is wrong unless source is local.

    // Since I can't easily change the signature without breaking logic potentially, 
    // I will implement the conversion inline in the handleConvert function 
    // or make formatTime smarter.

    // Actually, looking at `handleConvert` below:
    // It calls: formatTime(ex.pre, ex.timezone) -> This is "Show 9:00 (Local) in ExchangeTZ". WRONG.
    // It should just show ex.pre for the first column (maybe formatted).

    // I will change handleConvert logic to be correct and formatTime to be a simple formatter.

    const d = new Date();
    d.setHours(h, m, 0);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  }

  function timeInZone(timeStr, sourceTZ, targetTZ) {
    if (!timeStr) return "—";
    const [h, m] = timeStr.split(":").map(Number);

    try {
      const now = new Date();
      const strSource = now.toLocaleString('en-US', { timeZone: sourceTZ });
      const strTarget = now.toLocaleString('en-US', { timeZone: targetTZ });

      // Diff in ms between Target and Source relative to UTC
      // Actually, we can just compare date objects constructed from these strings
      const dSource = new Date(strSource);
      const dTarget = new Date(strTarget);
      const diff = dTarget - dSource;

      const timeDate = new Date();
      timeDate.setHours(h, m, 0);

      const resultDate = new Date(timeDate.getTime() + diff);
      return resultDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });

    } catch (e) {
      console.error(e);
      return timeStr;
    }
  }

  /* ================================
     ERROR DISPLAY
     ================================ */
  function showError(message) {
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `
        <div style="
          padding:14px;
          background:#fef2f2;
          color:#991b1b;
          border:1px solid #fecaca;
          border-radius:8px;
          font-weight:600;
          text-align:center;
        ">
          ⚠ ${message}
        </div>
      `;
  }

  /* ================================
     CONVERT HANDLER
     ================================ */
  function handleConvert() {
    const exName = exInput.value.trim();
    const tz = tzInput.value.trim();

    if (!exName || !tz) {
      showError("Please select a stock exchange or a timezone or both.");
      return;
    }

    const ex = exchanges.find(e => e.name === exName);
    if (!ex) {
      showError("Stock exchange not found. Please select from suggestions.");
      return;
    }

    if (!IANA_TIMEZONES.includes(tz)) {
      showError("Timezone not found. Please select a valid timezone.");
      return;
    }

    const displayExTZ =
      window.Timezones?.getTimezonePath
        ? Timezones.getTimezonePath(ex.timezone)
        : ex.timezone;

    const displayToTZ =
      window.Timezones?.getTimezonePath
        ? Timezones.getTimezonePath(tz)
        : tz;

    resultDiv.style.display = "block";

    resultDiv.innerHTML = `
        <table class="result-table">
          <tr><td><b>Name</b></td><td>${ex.name} (${ex.code || ""})</td></tr>
          <tr><td><b>Country</b></td><td>${ex.country}</td></tr>
          <tr>
            <td><b>Website</b></td>
            <td><a href="${ex.website}" target="_blank" style="color: var(--primary); text-decoration: underline;">${ex.website}</a></td>
          </tr>
        </table>

        <table class="result-table">
          <tr>
            <th>Session</th>
            <th>${displayExTZ} (Market)</th>
            <th>${displayToTZ} (Varied)</th>
          </tr>
          <tr><td>Pre</td><td>${formatTime(ex.pre)}</td><td>${timeInZone(ex.pre, ex.timezone, tz)}</td></tr>
          <tr><td>Open</td><td>${formatTime(ex.open)}</td><td>${timeInZone(ex.open, ex.timezone, tz)}</td></tr>
          <tr><td>Close</td><td>${formatTime(ex.close)}</td><td>${timeInZone(ex.close, ex.timezone, tz)}</td></tr>
          <tr><td>Post</td><td>${formatTime(ex.post)}</td><td>${timeInZone(ex.post, ex.timezone, tz)}</td></tr>
        </table>

        <div class="exchange-link">
          <a href="exchanges.html?exchange=${encodeURIComponent(ex.code || ex.name)}" class="btn btn-secondary">
            View full exchange details →
          </a>
        </div>

        <div class="text-center text-muted" style="margin-top: 1rem; font-size: 0.8rem;">
          ⚠ Market timings are subject to change due to holidays or special sessions.
        </div>
      `;
  }

  /* ================================
     EVENTS
     ================================ */
  convertBtn.addEventListener("click", handleConvert);

  [exInput, tzInput].forEach(input => {
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleConvert();
      }
    });
  });

});
