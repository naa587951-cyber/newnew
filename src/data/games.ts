import { Game, CPAConfig, FAQItem } from '../types';

export const CONTENT_LOCKER_URL = "https://attorneycambridge.com/cl/i/vej19x";

export const CPA_CONFIG: CPAConfig = {
  lockerUrl: "https://attorneycambridge.com/cl/i/vej19x",
  trackingEnabled: false,
  // The trackingParameter must be changed to the actual parameter supported by the CPA/content-locker provider.
  trackingParameter: "subid"
};

/**
 * Tracks click on a game download button.
 * Records gameId in localStorage and console.
 * Note: localStorage records client intent and does not represent server-side CPA conversion/payout tracking.
 */
export function trackGameClick(gameId: string): void {
  try {
    localStorage.setItem("selectedGame", gameId);
    localStorage.setItem("lastClickTimestamp", new Date().toISOString());
    console.log(`[AllMods Tracking] Click recorded for game ID: "${gameId}" at ${new Date().toLocaleTimeString()}`);
  } catch (err) {
    console.warn("[AllMods Tracking] LocalStorage write failed:", err);
  }
}

/**
 * Central download handler for all game cards.
 * Records click and redirects to the content locker URL.
 */
export function handleDownload(gameId: string): void {
  trackGameClick(gameId);

  let targetUrl = CPA_CONFIG.lockerUrl;
  if (CPA_CONFIG.trackingEnabled && CPA_CONFIG.trackingParameter) {
    const separator = targetUrl.includes("?") ? "&" : "?";
    targetUrl = `${targetUrl}${separator}${encodeURIComponent(CPA_CONFIG.trackingParameter)}=${encodeURIComponent(gameId)}`;
  }

  // Open in a new tab or navigate directly
  window.location.href = targetUrl;
}

// ==========================================
// ADD NEW GAMES HERE
// ==========================================
export const games: Game[] = [
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
    description: "Unlock all legendary skins, unlimited gems, unlocked battle pass, and remove all ads in knockout rounds.",
    rating: 4.8,
    downloads: "2.4M+",
    size: "165 MB",
    features: ["All Skins Unlocked", "Unlimited Gems & Tokens", "Ad-Free Experience"]
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
    description: "All 100+ locations unlocked, all designer houses, complete furniture packs, and full character creator items.",
    rating: 4.9,
    downloads: "1.8M+",
    size: "540 MB",
    features: ["All Locations Unlocked", "All Furniture Packs", "Speed Acceleration"]
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
    description: "Unlimited gold coins & cash, all 160+ hypercars unlocked, custom livery editor, and free W16 engine swaps.",
    rating: 4.7,
    downloads: "950K+",
    size: "980 MB",
    features: ["Unlimited Money & Gold", "All 160+ Cars Free", "Unlocked Police Light"]
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
    description: "Unlimited in-game currency, unlocked luxury fleet, chrome paint finish, free engine tuning, and open-world access.",
    rating: 4.8,
    downloads: "5.1M+",
    size: "820 MB",
    features: ["Unlimited Money/Coins", "Free Car Purchases", "Unlocked Siren & Smoke"]
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
    description: "Virtual GPS joystick, instant teleportation to coordinates, 100% IV radar scanner, and auto-walking route planner.",
    rating: 4.9,
    downloads: "3.6M+",
    size: "145 MB",
    features: ["GPS Joystick & Teleport", "Enhanced Throw & Fast Catch", "Auto Walk GPX Route"]
  }
];

export const fictionalUsernames: string[] = [
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

export const faqs: FAQItem[] = [
  {
    question: "What is AllMods?",
    answer: "AllMods is a curated mobile gaming discovery platform designed for discovering popular games, modified editions, and enhancements. We organize top trending titles in a fast, mobile-friendly interface."
  },
  {
    question: "Why does the Download button open another page?",
    answer: "To ensure server stability and protect bandwidth from automated web scrapers, game links are routed through a verification locker. Simply complete the brief verification step on the next screen to access your file."
  },
  {
    question: "Are these games officially affiliated with AllMods?",
    answer: "No. AllMods is an independent directory and is not affiliated, endorsed, or associated with Google LLC, Niantic, Scopely, Toca Boca, olzhass, or any of the original game publishers. All trademarks and character designs belong entirely to their respective rights holders."
  },
  {
    question: "How often are games updated?",
    answer: "Our team regularly checks for updates to maintain compatibility with the latest Android OS releases. When a new game patch is published, the latest version is verified and refreshed in the catalog."
  },
  {
    question: "Does AllMods work on mobile?",
    answer: "Yes! AllMods was built from the ground up with a mobile-first design philosophy. It runs smoothly on any smartphone (360px and up) with fast touch controls, zero lag, and instant responsive layouts."
  }
];
