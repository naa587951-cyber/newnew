import React, { useState, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchBar } from './components/SearchBar';
import { CategoryFilters } from './components/CategoryFilters';
import { GameCard } from './components/GameCard';
import { HowItWorks } from './components/HowItWorks';
import { FAQAccordion } from './components/FAQAccordion';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { NotificationPopup } from './components/NotificationPopup';
import { LegalModal } from './components/LegalModal';
import { games, handleDownload } from './data/games';
import { CategoryFilter } from './types';
import { Flame, RefreshCw, AlertCircle } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [activeNavTab, setActiveNavTab] = useState<string>('hero');
  const [legalPage, setLegalPage] = useState<'privacy' | 'disclaimer' | 'contact' | null>(null);
  const [downloadToast, setDownloadToast] = useState<{ gameTitle: string } | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

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
    return games.filter((game) => {
      // Category Match
      const matchesCategory =
        selectedCategory === 'All' || game.categories.includes(selectedCategory);

      // Search Query Match (checks title, category, tags, and description)
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesQuery =
        game.title.toLowerCase().includes(query) ||
        game.category.toLowerCase().includes(query) ||
        game.id.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query) ||
        game.categories.some((c) => c.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const scrollToSection = (sectionId: string) => {
    setActiveNavTab(sectionId);
    if (sectionId === 'search') {
      const el = document.getElementById('games-section');
      el?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 400);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadClick = (gameId: string) => {
    const game = games.find((g) => g.id === gameId);
    if (game) {
      setDownloadToast({ gameTitle: game.title });
      setTimeout(() => {
        setDownloadToast(null);
      }, 3500);
    }
    handleDownload(gameId);
  };

  return (
    <div className="min-h-screen bg-[#08090e] text-slate-100 flex flex-col antialiased selection:bg-purple-600 selection:text-white">
      {/* Sticky Mobile Header */}
      <Header
        onSearchClick={() => scrollToSection('search')}
        onNavigate={scrollToSection}
        onOpenLegal={(page) => setLegalPage(page)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-md md:max-w-lg lg:max-w-2xl mx-auto px-4 pb-20">
        {/* Hero Section */}
        <Hero onExploreClick={() => scrollToSection('games-section')} />

        {/* Popular Mods Section */}
        <section id="games-section" className="pt-6 pb-6">
          {/* Section Header */}
          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400">
                <Flame className="w-4 h-4" />
              </div>
              <h2 className="font-gaming text-2xl font-bold tracking-tight text-white">
                Popular Mods
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Explore our latest game additions.
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="mb-3">
            <SearchBar
              ref={searchInputRef}
              query={searchQuery}
              onQueryChange={setSearchQuery}
              resultCount={filteredGames.length}
            />
          </div>

          {/* Horizontal Category Filters */}
          <div className="mb-5">
            <CategoryFilters
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              categoryCounts={categoryCounts}
            />
          </div>

          {/* Game Cards List */}
          {filteredGames.length > 0 ? (
            <div className="space-y-4">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onDownload={handleDownloadClick}
                />
              ))}
            </div>
          ) : (
            /* Empty Search/Filter State */
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-white text-base">No games found</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                No titles match "{searchQuery}". Try a different keyword or reset the category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* How It Works Section */}
        <HowItWorks />

        {/* FAQ Accordion Section */}
        <FAQAccordion />
      </main>

      {/* Footer */}
      <Footer onOpenLegal={(page) => setLegalPage(page)} />

      {/* Fixed Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeNavTab}
        onTabSelect={(tab) => scrollToSection(tab === 'games' ? 'games-section' : tab)}
      />

      {/* Floating Simulated Activity Popup */}
      <NotificationPopup />

      {/* In-App Legal Modal */}
      <LegalModal
        page={legalPage}
        onClose={() => setLegalPage(null)}
        onSwitchPage={(page) => setLegalPage(page)}
      />

      {/* Download Confirmation Toast */}
      {downloadToast && (
        <aside
          aria-label="Download status notice"
          id="download-status-toast"
          className="fixed top-16 left-4 right-4 max-w-md mx-auto z-50 p-3 rounded-2xl bg-[#12162a] border border-purple-500/50 shadow-2xl flex items-center gap-3 animate-fade-in"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <div className="flex-1 text-xs">
            <span className="font-bold text-white">Opening Content Locker...</span>
            <p className="text-[11px] text-slate-300">
              Connecting to secure download for {downloadToast.gameTitle}
            </p>
          </div>
        </aside>
      )}
    </div>
  );
}
