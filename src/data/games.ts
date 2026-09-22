import { Game, CPAConfig, FAQItem, AppItem, NewsItem } from '../types';

export const CONTENT_LOCKER_URL = "https://allmods.top/cl/i/1x566e";

export const GAME_LOCKER_URLS: Record<string, string> = {
  "pokemon-go-spoofer": "https://allmods.top/cl/i/1x566e",
  "toca-boca": "https://allmods.top/cl/i/qn12ow",
  "car-parking-multiplayer": "https://allmods.top/cl/i/4o2dvj",
  "car-parking-multiplayer-2": "https://allmods.top/cl/i/m5nkv4",
  "clock-blast": "https://allmods.top/cl/i/34jdwm",
  "block-blast": "https://allmods.top/cl/i/34jdwm",
  "stumble-guys": "https://allmods.top/cl/i/vej19x"
};

export const CPA_CONFIG: CPAConfig = {
  lockerUrl: CONTENT_LOCKER_URL,
  trackingEnabled: false,
  trackingParameter: "subid"
};

/**
 * Tracks click on a game download button.
 * Records gameId in localStorage and console.
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
 * Records click and redirects to the specific content locker URL for each game.
 */
export function handleDownload(gameId: string): void {
  trackGameClick(gameId);

  const lockerUrl = GAME_LOCKER_URLS[gameId] || games.find(g => g.id === gameId)?.downloadUrl || CONTENT_LOCKER_URL;
  let targetUrl = lockerUrl;
  if (CPA_CONFIG.trackingEnabled && CPA_CONFIG.trackingParameter) {
    const separator = targetUrl.includes("?") ? "&" : "?";
    targetUrl = `${targetUrl}${separator}${encodeURIComponent(CPA_CONFIG.trackingParameter)}=${encodeURIComponent(gameId)}`;
  }

  // Redirect to locker
  window.location.href = targetUrl;
}

// ==========================================
// ALLMODS GAMES REPOSITORY (Prioritized Order)
// ==========================================
export const games: Game[] = [
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
    description: "Virtual GPS joystick, instant teleportation to coordinates, 100% IV radar scanner, and auto-walking route planner.",
    rating: 4.9,
    downloads: "3.6M+",
    size: "145 MB",
    features: ["GPS Joystick & Teleport", "Enhanced Throw & Fast Catch", "Auto Walk GPX Route"],
    downloadUrl: "https://allmods.top/cl/i/1x566e"
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
    description: "Unlock all legendary skins, unlimited gems, unlocked battle pass, and remove all ads in knockout rounds.",
    rating: 4.8,
    downloads: "2.4M+",
    size: "165 MB",
    features: ["All Skins Unlocked", "Unlimited Gems & Tokens", "Ad-Free Experience"],
    downloadUrl: "https://allmods.top/cl/i/vej19x"
  },
  {
    id: "clock-blast",
    title: "Clock Blast Mod",
    image: "assets/images/clock-blast.jpg",
    category: "Casual / Puzzle",
    categories: ["Casual"],
    platform: "Mobile",
    version: "Latest",
    updated: "Recently Updated",
    buttonText: "Download",
    description: "Unlimited coins & boosters, all puzzle stages unlocked, infinite timer power-ups, and ad-free experience.",
    rating: 4.9,
    downloads: "1.5M+",
    size: "85 MB",
    features: ["Unlimited Coins & Boosters", "All Levels Unlocked", "Ad-Free Experience"],
    downloadUrl: "https://allmods.top/cl/i/34jdwm"
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
    description: "All 100+ locations unlocked, all designer houses, complete furniture packs, and full character creator items.",
    rating: 4.9,
    downloads: "1.8M+",
    size: "540 MB",
    features: ["All Locations Unlocked", "All Furniture Packs", "Speed Acceleration"],
    downloadUrl: "https://allmods.top/cl/i/qn12ow"
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
    description: "Unlimited gold coins & cash, all 160+ hypercars unlocked, custom livery editor, and free W16 engine swaps.",
    rating: 4.7,
    downloads: "950K+",
    size: "980 MB",
    features: ["Unlimited Money & Gold", "All 160+ Cars Free", "Unlocked Police Light"],
    downloadUrl: "https://allmods.top/cl/i/m5nkv4"
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
    description: "Unlimited in-game currency, unlocked luxury fleet, chrome paint finish, free engine tuning, and open-world access.",
    rating: 4.8,
    downloads: "5.1M+",
    size: "820 MB",
    features: ["Unlimited Money/Coins", "Free Car Purchases", "Unlocked Siren & Smoke"],
    downloadUrl: "https://allmods.top/cl/i/4o2dvj"
  }
];

export const appsList: AppItem[] = [
  {
    id: "turbo-game-booster",
    title: "Game Turbo Booster Pro",
    category: "Performance Utility",
    version: "v4.2.0",
    rating: 4.8,
    size: "24 MB",
    downloads: "1.2M+",
    description: "FPS optimizer, hardware memory cleaner, ping stabilizer, and latency reducer for mobile games.",
    features: ["FPS Stabilization", "Background Task Cleaner", "Ultra Ping Optimizer"]
  },
  {
    id: "custom-crosshair-pro",
    title: "Precision Crosshair Tool",
    category: "Gaming Tools",
    version: "v2.8.5",
    rating: 4.9,
    size: "18 MB",
    downloads: "850K+",
    description: "Custom floating crosshair overlay with adjustable opacity, color palette, and dynamic sizing.",
    features: ["Custom Sight Shapes", "Dynamic Scale & Opacity", "Zero Latency Overlay"]
  },
  {
    id: "screen-recorder-60fps",
    title: "Ultra Screen Recorder HD",
    category: "Media & Creator",
    version: "v3.1.2",
    rating: 4.7,
    size: "32 MB",
    downloads: "2.1M+",
    description: "Crystal-clear gameplay capture at 60 FPS with internal audio, facecam support, and zero watermarks.",
    features: ["1080p 60FPS Recording", "Internal Audio Support", "No Watermarks"]
  }
];

export const newsList: NewsItem[] = [
  {
    id: "news-pogo-update",
    title: "Pokémon GO Spoofer: Coordinate Teleport & Radar Upgrade",
    date: "September 2026",
    tag: "Release Note",
    summary: "The latest Spoofer update adds improved GPS simulation routes, high-speed walking pacing, and automatic 100% IV catch assistance.",
    readTime: "2 min read"
  },
  {
    id: "news-stumble-season",
    title: "Stumble Guys Mod: Knockout Pass & Mythic Outfits Unlocked",
    date: "September 2026",
    tag: "Changelog",
    summary: "New version unlocked! Enjoy all mythic animations, tournament tickets, unlimited tokens, and ad-free party room lobbies.",
    readTime: "3 min read"
  },
  {
    id: "news-cpm-cars",
    title: "Car Parking Multiplayer 2: Custom Livery Engine & W16 Tuning",
    date: "August 2026",
    tag: "Patch Update",
    summary: "Over 20 new hypercars added to the catalog, unlocked police strobe flashers, and realistic drift physics handling.",
    readTime: "2 min read"
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
    answer: "AllMods is a curated games and mobile apps marketplace designed for discovering popular games, modified editions, utilities, and enhancements. We organize top trending titles in a fast, mobile-friendly interface."
  },
  {
    question: "Why does the Download button open another page?",
    answer: "To ensure server stability and protect bandwidth from automated web scrapers, links are routed through a verification locker. Simply complete the brief verification step on the next screen to access your file."
  },
  {
    question: "Are these games and apps officially affiliated with AllMods?",
    answer: "No. AllMods is an independent third-party discovery catalog and is not affiliated, endorsed, or associated with Google, Apple, Niantic, Scopely, Toca Boca, olzhass, or any of the original publishers. All trademarks belong entirely to their respective rights holders."
  },
  {
    question: "How often are catalog items updated?",
    answer: "Our team regularly checks for updates to maintain compatibility with modern mobile operating systems. When a new game patch is published, the latest version is verified and refreshed in the catalog."
  },
  {
    question: "Does AllMods work on mobile devices?",
    answer: "Yes! AllMods was built from the ground up with a mobile-first design philosophy. It runs smoothly on any smartphone (360px and up) with fast touch controls, zero lag, and instant responsive layouts."
  }
];
