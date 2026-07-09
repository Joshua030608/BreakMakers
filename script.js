// Break Makers — simple UI helpers

(function () {
  // Set footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const toggleBtn = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");

  if (toggleBtn && nav) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
      toggleBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    // Close menu when a link is clicked (mobile)
    nav.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.matches("a.nav-link")) {
        nav.classList.remove("is-open");
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.setAttribute("aria-label", "Open menu");
      }
    });
  }

  // Active nav link highlighting for local files and Netlify clean URLs.
  const links = Array.from(document.querySelectorAll(".nav-link"));
  const pageKeyFromPath = (value) => {
    const parts = (value || "").toLowerCase().split(/[?#]/)[0].split("/").filter(Boolean);
    const lastPart = parts.pop() || "index";
    const page = lastPart.endsWith(".html") ? lastPart.slice(0, -5) : lastPart;

    if (page === "index") return "index";
    if (page.endsWith("-checklist")) return "checklists";
    return page;
  };
  const activePage = pageKeyFromPath(window.location.pathname);

  links.forEach((a) => {
    const hrefPage = pageKeyFromPath(a.getAttribute("href"));
    if (hrefPage === activePage) a.classList.add("is-active");
  });

  // Render published Google Sheet CSV rows as checklist cards.
  const parseCsv = (input) => {
    const rows = [];
    let row = [];
    let cell = "";
    let inQuotes = false;

    for (let i = 0; i < input.length; i += 1) {
      const char = input[i];
      const nextChar = input[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          cell += '"';
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === "," && !inQuotes) {
        row.push(cell);
        cell = "";
      } else if ((char === "\n" || char === "\r") && !inQuotes) {
        if (char === "\r" && nextChar === "\n") i += 1;
        row.push(cell);
        if (row.some((value) => value.trim() !== "")) rows.push(row);
        row = [];
        cell = "";
      } else {
        cell += char;
      }
    }

    row.push(cell);
    if (row.some((value) => value.trim() !== "")) rows.push(row);

    return rows;
  };

  const normalizeHeader = (value) =>
    value.replace(/^\uFEFF/, "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");

  // Keeps a polished, current preview available when the pages are opened directly as files.
  const checklistSnapshots = {
    "26350997": [
      ["2025 Topps Chrome Green Auto", "Football", "Jahmyr Gibbs"],
      ["2023 Panini National Treasures Autograph", "Football", "Drew Brees"],
      ["2023 Panini Prizm Orange Disco PSA 10", "Football", "C.J. Stroud"],
      ["2021 Panini Donruss Optic Holo PSA 9", "Football", "Trevor Lawrence"],
      ["2022 Panini Prizm Auto PSA 9", "Football", "Garrett Wilson"],
      ["2025 Topps Chrome Pink Autograph", "Football", "Drake London"],
      ["2020 Panini Prizm Silver PSA 9", "Football", "Jalen Hurts"],
      ["2022 Panini Contenders Autograph", "Football", "Brock Purdy"],
      ["2024 Panini Spectral Autographs /99", "Football", "Bijan Robinson"],
      ["2022 Panini Donruss Optic PSA 10 Holo", "Football", "Aidan Hutchinson"],
      ["2021 Donruss Optic Lime Green PSA 9", "Football", "Amon-Ra St Brown"],
      ["2020 Panini Select Lime Green Die-Cut PSA 10", "Football", "Justin Herbert"],
    ],
    "0": [
      ["2024 Donruss Optic Downtown!", "Football", "Marvin Harrison Jr"],
      ["2021 Donruss Optic Autograph PSA 10", "Football", "Ja'marr Chase"],
      ["2023 Panini Prizm Silver PSA 10", "Football", "C.J. Stroud"],
      ["2025 Topps Chrome PSA 10 Refractor", "Football", "Jaxson Dart"],
      ["2022 Panini Prizm Blue Ice PSA 10", "Football", "Tom Brady"],
      ["2025 Panini Prizm Silver PSA 10", "Football", "Drake Maye"],
      ["2020 Panini Select Zebra PSA 10", "Football", "Jalen Hurts"],
      ["2018 Panini Donruss Optic Holo PSA 9", "Football", "Lamar Jackson"],
      ["2017 Panini Prizm Silver Prizm PSA 10", "Football", "Christian Mcaffery"],
      ["2020 Panini Prizm Autograph PSA 9", "Football", "CeeDee Lamb"],
      ["2020 Panini Select Light Blue PSA 10", "Football", "Justin Jefferson"],
      ["2018 Panini Optic Holo PSA 10", "Football", "Saquon Barkley"],
    ],
    "1334537035": [
      ["2025 Topps Signature Autograph /99", "Football", "Jaxson Dart"],
      ["2022 Donruss Optic Downtown PSA 10", "Football", "Drake London"],
      ["2025 Panini Prizm Gold /10", "Football", "Josh Allen"],
      ["2021 Panini Select Color Wheel PSA 1", "Football", "Justin Herbert"],
      ["2025 Panini Absolute Kaboom PSA 9", "Football", "Aaron Donald"],
      ["2025 National Treasures Trio Autographs", "Football", "Lawrence, Hunter, Thomas"],
      ["2020 Panini One Shadow Box /99", "Football", "Jalen Hurts"],
      ["2025 Topps Chrome Autograph /199", "Football", "Cam Ward"],
    ],
    "58420158": [
      ["2024 Donruss Optic Downtown! PSA 9", "Football", "Rome Odunze"],
      ["2025 Panini Donruss Downtown!", "Football", "Tyler Shough"],
      ["2025 Panini Absolute Kaboom! Horizontal", "Football", "Nico Collins"],
      ["2024 Panini Prizm Prizmania PSA 9", "Football", "Drew Brees"],
      ["2025 Donruss Optic Downtown!", "Football", "Larry Fitzgerald"],
      ["2025 Topps Chrome Kaiju", "Football", "Jayden Daniels"],
      ["2023 Panini Absolute Kaboom! Horizontal", "Football", "Jalen Hurts"],
      ["2025 Topps Chrome Ultra Violet", "Football", "Ashton Jeanty"],
      ["2024 Panini Absolute Explosive PSA 10", "Football", "C.J. Stroud"],
      ["2024 Panini Donruss Downtown!", "Football", "Saquon Barkley"],
      ["2025 Panini Phoenix Colorblast", "Football", "Tyler Shough"],
      ["2025 Panini Prizm Prizmania", "Football", "Derrick Henry"],
    ],
  };

  const checklistBlocks = Array.from(document.querySelectorAll("[data-checklist-url]"));

  checklistBlocks.forEach(async (block) => {
    const listEl = block.querySelector("[data-checklist-list]");
    const statusEl = block.querySelector("[data-checklist-status]");
    const sourceUrl = block.getAttribute("data-checklist-url");
    const checklistMode = block.dataset.checklistMode;

    if (!listEl || !sourceUrl) return;

    const setStatus = (message) => {
      if (statusEl) statusEl.textContent = message;
    };

    const showMessage = (message) => {
      listEl.classList.remove("live-checklist-grid--embed");
      const messageEl = document.createElement("p");
      messageEl.className = "checklist-message";
      messageEl.textContent = message;
      listEl.replaceChildren(messageEl);
    };

    const showPublishedSheet = () => {
      const publishedUrl = new URL(sourceUrl);
      publishedUrl.pathname = publishedUrl.pathname.replace(/\/pub$/, "/pubhtml");
      publishedUrl.searchParams.delete("output");
      publishedUrl.searchParams.set("single", "true");
      publishedUrl.searchParams.set("widget", "false");
      publishedUrl.searchParams.set("headers", "false");

      const frame = document.createElement("iframe");
      frame.className = "checklist-embed";
      frame.title = block.querySelector("h2")?.textContent?.trim() || "Live checklist";
      frame.src = publishedUrl.toString();
      frame.loading = "lazy";

      listEl.classList.add("live-checklist-grid--embed");
      listEl.replaceChildren(frame);
    };

    const getCell = (rowValues, headerMap, key, fallbackIndex) => {
      const index = headerMap.has(key) ? headerMap.get(key) : fallbackIndex;
      return String(rowValues[index] || "").trim();
    };

    const renderPlayer = (item, index) => {
      const card = document.createElement("article");
      card.className = "player-card";

      const top = document.createElement("div");
      top.className = "player-card-top";

      const name = document.createElement("h3");
      name.className = "player-name";
      name.textContent = item.player || "Unnamed player";

      const number = document.createElement("span");
      number.className = "player-number";
      number.textContent = String(index + 1).padStart(2, "0");

      top.append(name, number);

      const detail = document.createElement("p");
      detail.className = "player-card-detail";
      detail.textContent = item.card || "Card details coming soon";

      const meta = document.createElement("div");
      meta.className = "player-meta";

      if (item.sport) {
        const sport = document.createElement("span");
        sport.className = "player-pill";
        sport.textContent = item.sport;
        meta.append(sport);
      }

      card.append(top, detail, meta);
      return card;
    };

    const renderPlayers = (players) => {
      listEl.classList.remove("live-checklist-grid--embed");
      const fragment = document.createDocumentFragment();
      players.forEach((item, index) => fragment.append(renderPlayer(item, index)));
      listEl.replaceChildren(fragment);
    };

    const showSnapshot = () => {
      const sheetId = new URL(sourceUrl).searchParams.get("gid");
      const snapshot = checklistSnapshots[sheetId];

      if (!snapshot?.length) return false;

      renderPlayers(
        snapshot.map(([card, sport, player]) => ({ card, sport, player }))
      );
      setStatus(`${snapshot.length} ${snapshot.length === 1 ? "player" : "players"}`);
      return true;
    };

    if (checklistMode === "embed") {
      setStatus("Live sheet");
      showPublishedSheet();
      return;
    }

    if (window.location.protocol === "file:" && showSnapshot()) return;

    try {
      setStatus("Loading players...");

      const response = await fetch(sourceUrl, { cache: "no-store" });
      if (!response.ok) throw new Error("Checklist request failed.");

      const rows = parseCsv(await response.text());
      if (rows.length < 2) {
        setStatus("0 players");
        showMessage("No checklist players are available yet.");
        return;
      }

      const headers = rows[0];
      const headerMap = new Map(headers.map((header, index) => [normalizeHeader(header), index]));
      const players = rows
        .slice(1)
        .map((rowValues) => ({
          card: getCell(rowValues, headerMap, "card", 0),
          sport: getCell(rowValues, headerMap, "sport", 1),
          player: getCell(rowValues, headerMap, "player", 2),
        }))
        .filter((item) => item.card || item.sport || item.player);

      if (!players.length) {
        setStatus("0 players");
        showMessage("No checklist players are available yet.");
        return;
      }

      renderPlayers(players);
      setStatus(`${players.length} ${players.length === 1 ? "player" : "players"}`);
    } catch (error) {
      if (showSnapshot()) return;

      setStatus("Unavailable");
      showMessage("This checklist is temporarily unavailable. Please refresh the page shortly.");
    }
  });

  // AJAX contact form enhancement for Netlify Forms.
  const contactForm = document.querySelector('form[name="contact"]');

  if (contactForm) {
    const statusEl = contactForm.querySelector(".form-status");
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const submitText = submitBtn ? submitBtn.textContent : "";

    const showStatus = (message, type) => {
      if (!statusEl) return;

      statusEl.textContent = message;
      statusEl.classList.remove("is-success", "is-error");
      statusEl.classList.add(type === "success" ? "is-success" : "is-error");
      statusEl.hidden = false;
    };

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      contactForm.setAttribute("aria-busy", "true");

      try {
        const formData = new FormData(contactForm);
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString(),
        });

        if (!response.ok) throw new Error("Form submission failed.");

        contactForm.reset();
        showStatus("Thanks, your message was sent. We’ll get back to you by email.", "success");
      } catch (error) {
        showStatus(
          "Sorry, your message couldn’t be sent. Please try again or email us directly.",
          "error"
        );
      } finally {
        contactForm.removeAttribute("aria-busy");

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitText;
        }
      }
    });
  }
})();
