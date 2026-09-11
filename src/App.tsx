import React, { useState, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { NotificationPopup } from './components/NotificationPopup';
import { CategoryFilters } from './components/CategoryFilters';
import { GameCard } from './components/GameCard';
import { GameListItem } from './components/GameListItem';
import { FAQAccordion } from './components/FAQAccordion';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { games, appsList, newsList, handleDownload } from './data/games';
import { CategoryFilter } from './types';
import {
  ShieldCheck,
  Zap,
  Smartphone,
  ChevronRight,
  ChevronLeft,
  SearchX,
  Sparkles,
  Download,
  Star,
  CheckCircle2,
  Newspaper,
  Flame,
  ArrowRight
} from 'lucide-react';

const normalizeText = (text: string) =>
  text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [activeNavTab, setActiveNavTab] = useState<string>('games');
  const [legalPage, setLegalPage] = useState<'privacy' | 'disclaimer' | 'contact' | null>(null);

  const popularRowRef = useRef<HTMLDivElement>(null);

  // Category counts calculation
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: games.length };
    games.forEach((game) => {
      game.categories.forEach((cat) => {
        counts[cat] = (counts[cat] || 0) + 1;
      });
    });
    return counts;
  }, []);

  // Filtered games based on Search Query and Category
  const filteredGames = useMemo(() => {
    const rawQuery = searchQuery.trim();
    if (!rawQuery) {
      return games.filter((game) =>
        selectedCategory === 'All' || game.categories.includes(selectedCategory)
      );
    }

    const queryNorm = normalizeText(rawQuery);

    return games.filter((game) => {
      const matchesCategory =
        selectedCategory === 'All' || game.categories.includes(selectedCategory);

      const matchesQuery =
        normalizeText(game.title).includes(queryNorm) ||
        normalizeText(game.category).includes(queryNorm) ||
        normalizeText(game.id).includes(queryNorm) ||
        normalizeText(game.description).includes(queryNorm) ||
        game.categories.some((c) => normalizeText(c).includes(queryNorm));

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const categoriesList: CategoryFilter[] = [
    'All',
    'Adventure',
    'Action',
    'Casual',
    'Racing',
    'Simulation'
  ];

  // Scroll handler for horizontal Popular Games row
  const scrollPopular = (direction: 'left' | 'right') => {
    if (popularRowRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      popularRowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleNavClick = (tabId: string) => {
    setActiveNavTab(tabId);
    if (searchQuery) setSearchQuery('');

    if (tabId === 'games') {
      const el = document.getElementById('popular-games-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'apps') {
      const el = document.getElementById('popular-apps-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'news') {
      const el = document.getElementById('latest-news-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'store') {
      const el = document.getElementById('store-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-gray-900 antialiased selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      {/* 1. Marketplace Header with Search & Nav */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeNavTab={activeNavTab}
        onNavTabChange={handleNavClick}
        onOpenLegal={setLegalPage}
      />

      {/* 2. Top Notification: Small marketplace activity ticker */}
      <NotificationPopup />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-3">
        {/* Search Mode or Regular Discovery Mode */}
        {searchQuery.trim() ? (
          /* ==================================================== */
          /* SEARCH RESULTS VIEW                                  */
          /* ==================================================== */
          <section id="search-results-section" className="py-2">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  Search Results
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Showing matches for <span className="font-semibold text-emerald-700">"{searchQuery}"</span>
                </p>
              </div>
              <button
                id="clear-search-view-btn"
                onClick={() => setSearchQuery('')}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors border border-emerald-200/60"
              >
                Clear Search
              </button>
            </div>

            {filteredGames.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredGames.map((game) => (
                  <GameListItem
                    key={game.id}
                    game={game}
                    onDownload={handleDownload}
                    badgeText={game.id === 'pokemon-go-spoofer' ? 'Popular' : undefined}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center bg-white rounded-2xl border border-gray-200/90 mt-4 p-6 shadow-xs">
                <SearchX className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <h3 className="font-bold text-gray-900 text-sm">No games found</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                  We couldn't find any results matching "{searchQuery}". Try searching for "pokemon", "stumble", "toca", or "parking".
                </p>
                <button
                  id="search-empty-reset-btn"
                  onClick={() => setSearchQuery('')}
                  className="mt-3.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-xs"
                >
                  View All Games
                </button>
              </div>
            )}
          </section>
        ) : (
          /* ==================================================== */
          /* STANDARD MARKETPLACE VIEW                            */
          /* ==================================================== */
          <div className="space-y-7">
            {/* Category Filter Pills */}
            <div className="pt-1">
              <CategoryFilters
                categories={categoriesList}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                categoryCounts={categoryCounts}
              />
            </div>

            {/* 3. Section: "Popular Games" (Horizontal Scrollable Row with Prioritized Order) */}
            <section id="popular-games-section" className="relative scroll-mt-24">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-emerald-600" />
                  <h2 className="text-base sm:text-lg font-black tracking-tight text-gray-900">
                    Popular Games
                  </h2>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                    Top Verified
                  </span>
                </div>

                {/* Desktop Scroll Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    id="scroll-popular-left-btn"
                    onClick={() => scrollPopular('left')}
                    aria-label="Scroll left"
                    className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors hidden sm:flex items-center justify-center shadow-xs"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    id="scroll-popular-right-btn"
                    onClick={() => scrollPopular('right')}
                    aria-label="Scroll right"
                    className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors hidden sm:flex items-center justify-center shadow-xs"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Horizontal Scroll Row */}
              <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
                <div
                  ref={popularRowRef}
                  id="popular-games-row"
                  className="flex gap-3 overflow-x-auto snap-x scrollbar-none pb-2 pt-1 scroll-smooth"
                >
                  {filteredGames.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      onDownload={handleDownload}
                      isFeatured={game.id === 'pokemon-go-spoofer'}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 4. Section: "Recommended For You" / "Latest Games" */}
            <section id="recommended-section" className="pt-1">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <h2 className="text-base sm:text-lg font-black tracking-tight text-gray-900">
                    Latest Games & Updates
                  </h2>
                </div>
                <button
                  id="see-all-games-btn"
                  onClick={() => {
                    setSelectedCategory('All');
                    const el = document.getElementById('popular-games-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5"
                >
                  <span>See all</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grid of Existing Games */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {games.map((game, idx) => (
                  <GameListItem
                    key={`list-${game.id}`}
                    game={game}
                    onDownload={handleDownload}
                    badgeText={idx === 0 ? 'Top Pick' : 'Updated'}
                  />
                ))}
              </div>
            </section>

            {/* 5. Section: "Popular Apps & Utilities" */}
            <section id="popular-apps-section" className="pt-2 scroll-mt-24">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <h2 className="text-base sm:text-lg font-black tracking-tight text-gray-900">
                    Popular Apps & Utilities
                  </h2>
                  <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                    Gaming Tools
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {appsList.map((app) => (
                  <div
                    key={app.id}
                    id={`app-card-${app.id}`}
                    onClick={() => handleDownload(app.id)}
                    className="bg-white border border-gray-200/90 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between hover:border-gray-300 hover:shadow-xs transition-all cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                          {app.category}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-gray-700">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{app.rating}</span>
                        </div>
                      </div>

                      <h3 className="font-bold text-sm text-gray-900 mt-2 group-hover:text-emerald-700 transition-colors">
                        {app.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {app.description}
                      </p>

                      <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-500">
                        <span className="font-medium bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{app.version}</span>
                        <span>•</span>
                        <span>{app.size}</span>
                        <span>•</span>
                        <span>{app.downloads}</span>
                      </div>
                    </div>

                    <button
                      id={`app-download-btn-${app.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(app.id);
                      }}
                      className="mt-3.5 w-full py-2 px-3 rounded-lg bg-gray-50 hover:bg-emerald-600 hover:text-white text-gray-700 border border-gray-200 hover:border-emerald-600 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all focus:outline-none"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Tool</span>
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. Section: "Latest News & Updates" */}
            <section id="latest-news-section" className="pt-2 scroll-mt-24">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Newspaper className="w-4 h-4 text-emerald-600" />
                  <h2 className="text-base sm:text-lg font-black tracking-tight text-gray-900">
                    Latest News & Patch Notes
                  </h2>
                </div>
              </div>

              <div className="space-y-2.5">
                {newsList.map((item) => (
                  <div
                    key={item.id}
                    id={`news-item-${item.id}`}
                    onClick={() => {
                      const el = document.getElementById('popular-games-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-white border border-gray-200/90 rounded-xl p-3.5 shadow-2xs hover:border-gray-300 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                          {item.tag}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span>{item.date}</span>
                      </div>
                      <span className="text-[11px] text-gray-400">{item.readTime}</span>
                    </div>
                    <h3 className="font-bold text-sm text-gray-900 group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 7. Section: "Store & Platform Standards" (General Platform Neutral) */}
            <section id="store-section" className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-2xs scroll-mt-24">
              <div className="mb-3.5">
                <h2 className="text-sm sm:text-base font-bold text-gray-900">
                  Marketplace Verification Standards
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  High-speed direct distribution with verified package integrity.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-gray-50/60 border border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">100% Virus-Free</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">Every package and download link is verified before indexing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-gray-50/60 border border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Fast CDN Mirrors</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">High-speed global content delivery networks for smooth transfers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-gray-50/60 border border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Mobile Ready</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">Engineered for smooth responsiveness across all handheld displays.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 8. FAQ Accordion */}
            <FAQAccordion />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenLegal={setLegalPage}
        onNavigateTab={handleNavClick}
      />

      {/* Legal Dialog Modal */}
      <LegalModal
        page={legalPage}
        onClose={() => setLegalPage(null)}
        onSwitchPage={setLegalPage}
      />
    </div>
  );
}
