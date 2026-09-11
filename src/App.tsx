import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { NotificationPopup } from './components/NotificationPopup';
import { CategoryFilters } from './components/CategoryFilters';
import { GameCard } from './components/GameCard';
import { GameListItem } from './components/GameListItem';
import { FAQAccordion } from './components/FAQAccordion';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { games, handleDownload } from './data/games';
import { CategoryFilter } from './types';
import { Sparkles, ShieldCheck, Zap, Smartphone, ChevronRight, SearchX } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [activeNavTab, setActiveNavTab] = useState<string>('games');
  const [legalPage, setLegalPage] = useState<'privacy' | 'disclaimer' | 'contact' | null>(null);

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
    const query = searchQuery.trim().toLowerCase();

    return games.filter((game) => {
      // Category Match
      const matchesCategory =
        selectedCategory === 'All' || game.categories.includes(selectedCategory);

      if (!query) return matchesCategory;

      // Search matches title, category, id, description, and keywords
      const matchesQuery =
        game.title.toLowerCase().includes(query) ||
        game.category.toLowerCase().includes(query) ||
        game.id.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query) ||
        game.categories.some((c) => c.toLowerCase().includes(query));

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

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fa] text-gray-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. Marketplace Header with Search & Nav */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeNavTab={activeNavTab}
        onNavTabChange={(tab) => {
          setActiveNavTab(tab);
          if (tab !== 'games') {
            // Scroll to games or keep user oriented
            const el = document.getElementById('popular-games-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
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
                onClick={() => setSearchQuery('')}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg transition-colors"
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
              <div className="py-12 text-center bg-white rounded-2xl border border-gray-200/90 mt-4 p-6">
                <SearchX className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <h3 className="font-bold text-gray-900 text-sm">No games found</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                  We couldn't find any results matching "{searchQuery}". Try searching for "pokemon", "stumble", "toca", or "parking".
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-3.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors"
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
          <div className="space-y-6">
            {/* Category Filter Pills */}
            <div className="pt-1">
              <CategoryFilters
                categories={categoriesList}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                categoryCounts={categoryCounts}
              />
            </div>

            {/* 3. Section: "Popular Games" (Horizontal Scrollable Row) */}
            <section id="popular-games-section" className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black tracking-tight text-gray-900">
                    Popular Games
                  </h2>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                    Top Verified
                  </span>
                </div>
                <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                  Swipe horizontally →
                </span>
              </div>

              {/* Horizontal Scroll Row */}
              <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
                <div
                  id="popular-games-row"
                  className="flex gap-3 overflow-x-auto snap-x scrollbar-none pb-2 pt-1"
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
            <section id="recommended-section" className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black tracking-tight text-gray-900">
                    Latest Games & Updates
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5"
                >
                  <span>See all</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grid / List of Existing Games */}
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

            {/* 5. Clean Trust Badges: Android Marketplace Standards */}
            <section className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                <div className="flex items-start gap-2.5 p-1">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">100% Virus-Free</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">Every APK package signature is verified before indexing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-1">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Fast CDN Mirrors</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">High-speed content delivery networks for instant downloads.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-1">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Android Compatible</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">Optimized for Android 8.0 through the latest Android 15.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. FAQ Accordion */}
            <FAQAccordion />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenLegal={setLegalPage}
        onNavigateTab={(tab) => {
          setActiveNavTab(tab);
          if (tab === 'games') {
            setSelectedCategory('All');
            setSearchQuery('');
          }
        }}
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
