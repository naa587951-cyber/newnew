// ==========================================================================
// ALLMODS - Mobile Gaming System
// Pure static vanilla JS for mobile browsers and GitHub Pages
// ==========================================================================

const CONTENT_LOCKER_URL = "https://attorneycambridge.com/cl/i/vej19x";

const CPA_CONFIG = {
  lockerUrl: "https://attorneycambridge.com/cl/i/vej19x",
  trackingEnabled: false,
  // The trackingParameter must be changed to the actual parameter supported by the CPA/content-locker provider.
  trackingParameter: "subid"
};

/**
 * Records the game ID click.
 * Note: localStorage records user click history and does not pretend to provide CPA conversion/payout tracking.
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
 */
function handleDownload(gameId) {
  trackGameClick(gameId);

  let targetUrl = CPA_CONFIG.lockerUrl;
  if (CPA_CONFIG.trackingEnabled && CPA_CONFIG.trackingParameter) {
    const separator = targetUrl.includes("?") ? "&" : "?";
    targetUrl = targetUrl + separator + encodeURIComponent(CPA_CONFIG.trackingParameter) + "=" + encodeURIComponent(gameId);
  }

  window.location.href = targetUrl;
}

// ==========================================
// ADD NEW GAMES HERE
// ==========================================
const games = [
  {
    id: "stumble-guys",
    title: "Stumble Guys Mod",
    image: "assets/images/stumble.webp",
    category: "Action / Multiplayer",
    categories: ["Action", "Multiplayer"],
    platform: "Android",
    version: "Latest",
    updated: "Recently Updated",
    buttonText: "DOWNLOAD MOD",
    description: "Unlock all skins, unlimited gems & emotes, unlocked pass, and ad-free experience.",
    rating: 4.8,
    downloads: "2.4M"
  },
  {
    id: "toca-boca",
    title: "Toca Boca World Mod",
    image: "assets/images/toca.webp",
    category: "Casual / Simulation",
    categories: ["Casual", "Simulation"],
    platform: "Android",
    version: "Latest",
    updated: "Recently Updated",
    buttonText: "DOWNLOAD MOD",
    description: "All worlds unlocked, all furniture & houses accessible, character creator unlocked.",
    rating: 4.9,
    downloads: "1.8M"
  },
  {
    id: "car-parking-multiplayer-2",
    title: "Car Parking Multiplayer 2 Mod",
    image: "assets/images/cpm 2.jpg",
    category: "Racing / Simulation",
    categories: ["Racing", "Simulation", "Multiplayer"],
    platform: "Android",
    version: "Latest",
    updated: "Recently Updated",
    buttonText: "DOWNLOAD MOD",
    description: "Unlimited money & coins, all 160+ cars unlocked, W16 engine swap, police lights & smoke.",
    rating: 4.7,
    downloads: "950K"
  },
  {
    id: "car-parking-multiplayer",
    title: "Car Parking Multiplayer Mod",
    image: "assets/images/cpm.jfif",
    category: "Racing / Simulation",
    categories: ["Racing", "Simulation", "Multiplayer"],
    platform: "Android",
    version: "Latest",
    updated: "Recently Updated",
    buttonText: "DOWNLOAD MOD",
    description: "Unlimited gold & cash, free car purchases, unlocked siren, Chrome colors & tuning.",
    rating: 4.8,
    downloads: "5.1M"
  },
  {
    id: "pokemon-go-spoofer",
    title: "Pokémon GO Spoofer Mod",
    image: "assets/images/pogo.jpg",
    category: "Adventure / AR",
    categories: ["Adventure"],
    platform: "Android",
    version: "Latest",
    updated: "Recently Updated",
    buttonText: "DOWNLOAD",
    description: "Teleport GPS joystick, enhanced throw, auto-walk route generator, fast catch & IV preview.",
    rating: 4.9,
    downloads: "3.6M"
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
  "@speedking",
  "@gamezone"
];

// Document initialization
document.addEventListener("DOMContentLoaded", () => {
  const gamesContainer = document.getElementById("games-container");
  const searchInput = document.getElementById("search-input");
  const categoryContainer = document.getElementById("category-scroll");
  const notificationToast = document.getElementById("notification-toast");

  let currentCategory = "All";
  let currentSearch = "";

  function renderCards() {
    if (!gamesContainer) return;

    const filtered = games.filter(g => {
      const matchCat = currentCategory === "All" || g.categories.includes(currentCategory);
      const q = currentSearch.toLowerCase().trim();
      const matchQuery = !q || 
        g.title.toLowerCase().includes(q) || 
        g.category.toLowerCase().includes(q) || 
        g.id.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      gamesContainer.innerHTML = `
        <div style="text-align: center; padding: 32px 16px; background: #121524; border-radius: 16px; border: 1px solid #1e2438;">
          <p style="font-weight: 600; margin-bottom: 4px;">No games found</p>
          <p style="font-size: 12px; color: #94a3b8;">Try changing your keyword or selecting "All" categories.</p>
        </div>
      `;
      return;
    }

    gamesContainer.innerHTML = filtered.map(game => `
      <div class="game-card" id="card-${game.id}">
        <div class="game-image-wrap">
          <img src="${game.image}" alt="${game.title}" class="game-img" loading="lazy" />
          <span class="game-category-badge">${game.category}</span>
        </div>
        <div class="game-card-body">
          <h3 class="game-title">${game.title}</h3>
          <p class="game-description">${game.description}</p>
          <div class="game-info-grid">
            <div class="info-item">
              <span class="info-label">Platform</span>
              <span class="info-val">${game.platform}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Version</span>
              <span class="info-val">${game.version}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Category</span>
              <span class="info-val">${game.category}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Updated</span>
              <span class="info-val">${game.updated}</span>
            </div>
          </div>
          <button class="download-btn" onclick="handleDownload('${game.id}')">
            ${game.buttonText}
          </button>
        </div>
      </div>
    `).join("");
  }

  // Live search listener
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value;
      renderCards();
    });
  }

  // Category filter buttons listener
  if (categoryContainer) {
    categoryContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".cat-btn");
      if (!btn) return;

      document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      currentCategory = btn.dataset.category;
      renderCards();
    });
  }

  // Initial render
  renderCards();

  // Floating notification system
  function showNextNotification() {
    if (!notificationToast) return;
    const randomUser = fictionalUsernames[Math.floor(Math.random() * fictionalUsernames.length)];
    const randomGame = games[Math.floor(Math.random() * games.length)];

    const userSpan = notificationToast.querySelector(".toast-user");
    const gameSpan = notificationToast.querySelector(".toast-game");
    const imgEl = notificationToast.querySelector(".toast-img");

    if (userSpan) userSpan.textContent = randomUser;
    if (gameSpan) gameSpan.textContent = randomGame.title;
    if (imgEl) imgEl.src = randomGame.image;

    notificationToast.classList.remove("toast-hidden");

    setTimeout(() => {
      notificationToast.classList.add("toast-hidden");
      const nextDelay = Math.floor(Math.random() * 6000) + 8000;
      setTimeout(showNextNotification, nextDelay);
    }, 5000);
  }

  setTimeout(showNextNotification, 3000);
});
