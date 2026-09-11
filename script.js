// ==========================================================================
// ALLMODS - Mobile APK & Game Mod Marketplace
// Pure static vanilla JS for standalone browsers and GitHub Pages
// ==========================================================================

const CONTENT_LOCKER_URL = "https://trkoffer.net/cl/i/1x566e";

const CPA_CONFIG = {
  lockerUrl: CONTENT_LOCKER_URL,
  trackingEnabled: false,
  trackingParameter: "subid"
};

/**
 * Records the game ID click to localStorage.
 */
function trackGameClick(gameId) {
  try {
    localStorage.setItem("selectedGame", gameId);
    localStorage.setItem("lastClickTime", new Date().toISOString());
    console.log("[AllMods Tracking] Click recorded for game ID:", gameId);
  } catch (e) {
    console.warn("[AllMods Tracking] LocalStorage unavailable:", e);
  }
}

/**
 * Handles download button clicks for all game cards.
 * Stores selectedGame in localStorage and redirects to centralized locker URL.
 */
function handleDownload(gameId) {
  trackGameClick(gameId);

  let targetUrl = CONTENT_LOCKER_URL;
  if (CPA_CONFIG.trackingEnabled && CPA_CONFIG.trackingParameter) {
    const separator = targetUrl.includes("?") ? "&" : "?";
    targetUrl = targetUrl + separator + encodeURIComponent(CPA_CONFIG.trackingParameter) + "=" + encodeURIComponent(gameId);
  }

  window.location.href = targetUrl;
}

// ==========================================
// ALLMODS GAMES REPOSITORY (Prioritized Order)
// ==========================================
const games = [
  {
    id: "pokemon-go-spoofer",
    title: "Pokémon GO Spoofer Mod",
    image: "assets/images/pogo.jpg",
    category: "Adventure / AR",
    categories: ["Adventure"],
    platform: "Mobile",
    version: "Latest",
    updated: "Recently Updated",
    buttonText: "Download",
    description: "Teleport GPS joystick, enhanced throw, auto-walk route generator, fast catch & IV preview.",
    rating: 4.9,
    downloads: "3.6M",
    size: "145 MB",
    isFeatured: true
  },
  {
    id: "stumble-guys",
    title: "Stumble Guys Mod",
    image: "assets/images/stumble.webp",
    category: "Action / Multiplayer",
    categories: ["Action", "Multiplayer"],
    platform: "Mobile",
    version: "Latest",
    updated: "Recently Updated",
    buttonText: "Download",
    description: "Unlock all skins, unlimited gems & emotes, unlocked pass, and ad-free experience.",
    rating: 4.8,
    downloads: "2.4M",
    size: "165 MB",
    isFeatured: false
  },
  {
    id: "toca-boca",
    title: "Toca Boca World Mod",
    image: "assets/images/toca.webp",
    category: "Casual / Simulation",
    categories: ["Casual", "Simulation"],
    platform: "Mobile",
    version: "Latest",
    updated: "Recently Updated",
    buttonText: "Download",
    description: "All worlds unlocked, all furniture & houses accessible, character creator unlocked.",
    rating: 4.9,
    downloads: "1.8M",
    size: "540 MB",
    isFeatured: false
  },
  {
    id: "car-parking-multiplayer-2",
    title: "Car Parking Multiplayer 2 Mod",
    image: "assets/images/cpm 2.jpg",
    category: "Racing / Simulation",
    categories: ["Racing", "Simulation", "Multiplayer"],
    platform: "Mobile",
    version: "Latest",
    updated: "Recently Updated",
    buttonText: "Download",
    description: "Unlimited money & coins, all 160+ cars unlocked, W16 engine swap, police lights & smoke.",
    rating: 4.7,
    downloads: "950K",
    size: "980 MB",
    isFeatured: false
  },
  {
    id: "car-parking-multiplayer",
    title: "Car Parking Multiplayer Mod",
    image: "assets/images/cpm.jfif",
    category: "Racing / Simulation",
    categories: ["Racing", "Simulation", "Multiplayer"],
    platform: "Mobile",
    version: "Latest",
    updated: "Recently Updated",
    buttonText: "Download",
    description: "Unlimited gold & cash, free car purchases, unlocked siren, Chrome colors & tuning.",
    rating: 4.8,
    downloads: "5.1M",
    size: "820 MB",
    isFeatured: false
  }
];

const fictionalUsernames = [
  "@jhonn_doe",
  "@alex_m",
  "@sara_x",
  "@mike_22",
  "@gamingking",
  "@darkplayer",
  "@samir_g",
  "@lina_x",
  "@maxplay",
  "@ghost_77",
  "@adam_gaming",
  "@proplayer",
  "@zack_09",
  "@moonlight",
  "@speedking"
];

// Document initialization for standalone HTML
document.addEventListener("DOMContentLoaded", () => {
  const gamesRow = document.getElementById("popular-games-row");
  const latestList = document.getElementById("latest-games-list");
  const searchInputs = document.querySelectorAll(".market-search-input");
  const categoryContainer = document.getElementById("category-filters-container");
  const topNotification = document.getElementById("top-notification-chip");

  let currentCategory = "All";
  let currentSearch = "";

  function renderMarketplace() {
    const q = currentSearch.toLowerCase().trim();

    const mainNav = document.querySelector(".main-nav");
    if (mainNav) {
      mainNav.style.display = q ? "none" : "flex";
    }
    if (categoryContainer) {
      categoryContainer.style.display = q ? "none" : "flex";
    }

    const filtered = games.filter(g => {
      const matchCat = currentCategory === "All" || g.categories.includes(currentCategory);
      const matchQuery = !q ||
        g.title.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        g.id.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.categories.some(c => c.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });

    // Render Popular Games horizontal row
    if (gamesRow) {
      if (filtered.length === 0) {
        gamesRow.innerHTML = `
          <div class="empty-search-state">
            <p>No games found matching "${currentSearch}"</p>
            <button onclick="clearAllSearch()" class="btn-clear-empty">Clear search</button>
          </div>
        `;
      } else {
        gamesRow.innerHTML = filtered.map(game => `
          <div class="game-card ${game.isFeatured ? 'featured' : ''}" id="card-${game.id}">
            <div class="game-image-wrap">
              <img src="${game.image}" alt="${game.title}" class="game-img" loading="lazy" />
              ${game.isFeatured ? '<span class="featured-badge">Featured</span>' : ''}
              <span class="rating-badge">★ ${game.rating}</span>
            </div>
            <div class="game-card-body">
              <h3 class="game-title">${game.title}</h3>
              <p class="game-category">${game.category}</p>
              <div class="game-meta-row">
                <span class="version-pill">${game.version}</span>
                <span>•</span>
                <span>${game.platform}</span>
                <span>•</span>
                <span>${game.downloads}</span>
              </div>
              <button class="download-btn ${game.isFeatured ? 'btn-featured' : ''}" onclick="handleDownload('${game.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span>${game.buttonText}</span>
              </button>
            </div>
          </div>
        `).join("");
      }
    }

    // Render Latest Games List (if present)
    if (latestList) {
      latestList.innerHTML = games.map((game, index) => `
        <div class="game-list-item" id="list-item-${game.id}">
          <div class="list-item-left">
            <img src="${game.image}" alt="${game.title}" class="list-thumb" loading="lazy" />
            <div class="list-details">
              <div class="list-title-row">
                <h4 class="list-title">${game.title}</h4>
                ${index === 0 ? '<span class="list-badge">Top Pick</span>' : ''}
              </div>
              <p class="list-category">${game.category} • ${game.size}</p>
              <div class="list-stats">
                <span class="list-star">★ ${game.rating}</span>
                <span>•</span>
                <span>${game.downloads}</span>
              </div>
            </div>
          </div>
          <button class="list-download-btn" onclick="handleDownload('${game.id}')">
            Download
          </button>
        </div>
      `).join("");
    }
  }

  // Bind all search inputs (mobile + desktop)
  searchInputs.forEach(input => {
    input.addEventListener("input", (e) => {
      currentSearch = e.target.value;
      searchInputs.forEach(other => {
        if (other !== input) other.value = currentSearch;
      });
      renderMarketplace();
    });
  });

  window.clearAllSearch = function() {
    currentSearch = "";
    searchInputs.forEach(input => input.value = "");
    renderMarketplace();
  };

  // Category filter buttons
  if (categoryContainer) {
    categoryContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".cat-btn");
      if (!btn) return;
      document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.category || "All";
      renderMarketplace();
    });
  }

  // Top notification system (Ticker)
  let notifTimeout;
  function showNextNotification() {
    if (!topNotification) return;
    const randomUser = fictionalUsernames[Math.floor(Math.random() * fictionalUsernames.length)];
    const randomGame = games[Math.floor(Math.random() * games.length)];

    const userSpan = topNotification.querySelector(".toast-user");
    const gameSpan = topNotification.querySelector(".toast-game");
    const imgEl = topNotification.querySelector(".toast-img");

    if (userSpan) userSpan.textContent = randomUser;
    if (gameSpan) gameSpan.textContent = randomGame.title;
    if (imgEl) imgEl.src = randomGame.image;

    topNotification.classList.remove("notif-hidden");

    notifTimeout = setTimeout(() => {
      topNotification.classList.add("notif-hidden");
      const nextDelay = Math.floor(Math.random() * 4000) + 6000;
      setTimeout(showNextNotification, nextDelay);
    }, 6000);
  }

  const closeNotifBtn = document.getElementById("dismiss-top-notification-btn");
  if (closeNotifBtn && topNotification) {
    closeNotifBtn.addEventListener("click", () => {
      topNotification.style.display = "none";
      clearTimeout(notifTimeout);
    });
  }

  // Initial call
  renderMarketplace();
  showNextNotification();

  // FAQ Accordion
  document.querySelectorAll(".faq-item-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const parent = btn.closest(".faq-item");
      if (parent) parent.classList.toggle("open");
    });
  });
});

// Modal functions for standalone HTML
function openLegalModal(page) {
  const modal = document.getElementById("legal-modal");
  if (!modal) return;
  modal.style.display = "flex";
  switchLegalTab(page);
}

function closeLegalModal() {
  const modal = document.getElementById("legal-modal");
  if (modal) modal.style.display = "none";
}

function switchLegalTab(tab) {
  document.querySelectorAll(".modal-tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
  document.querySelectorAll(".modal-tab-content").forEach(content => {
    content.style.display = content.id === `modal-content-${tab}` ? "block" : "none";
  });
}

// Global accessibility
if (typeof window !== "undefined") {
  window.handleDownload = handleDownload;
  window.trackGameClick = trackGameClick;
  window.openLegalModal = openLegalModal;
  window.closeLegalModal = closeLegalModal;
  window.switchLegalTab = switchLegalTab;
}
