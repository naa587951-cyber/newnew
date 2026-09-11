import React from 'react';
import { Search, X, Sparkles, Layers, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeNavTab: string;
  onNavTabChange: (tab: string) => void;
  onOpenLegal: (page: 'privacy' | 'disclaimer' | 'contact') => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  activeNavTab,
  onNavTabChange,
  onOpenLegal
}) => {
  return (
    <header id="main-header" className="sticky top-0 z-40 w-full bg-white border-b border-gray-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="max-w-4xl mx-auto px-4 pt-3 pb-0">
        {/* Top bar: Brand + Search (on desktop) */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => {
              onNavTabChange('games');
              onSearchChange('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 text-left focus:outline-none shrink-0 group"
            aria-label="AllMods Home"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-600/20 group-hover:bg-emerald-700 transition-colors">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-gray-900 leading-none">
                ALL<span className="text-emerald-600">MODS</span>
              </span>
              <span className="text-[10px] font-medium tracking-wider text-gray-500 uppercase mt-0.5">
                APK Marketplace
              </span>
            </div>
          </button>

          {/* Search bar on desktop */}
          <div className="hidden sm:block flex-1 max-w-md ml-auto">
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-gray-400 pointer-events-none">
                <Search className="w-4 h-4" />
              </div>
              <input
                id="desktop-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search for your game..."
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50 hover:bg-gray-100/80 focus:bg-white border border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
              {searchQuery && (
                <button
                  id="desktop-clear-search-btn"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick badge */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Mods</span>
          </div>
        </div>

        {/* Mobile Search Bar (Full width below brand) */}
        <div className="sm:hidden mt-2.5">
          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-gray-400 pointer-events-none">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="mobile-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for your game..."
              className="w-full pl-10 pr-10 py-2 text-sm bg-gray-50 focus:bg-white border border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
            {searchQuery && (
              <button
                id="mobile-clear-search-btn"
                onClick={() => onSearchChange('')}
                className="absolute right-3 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Horizontal Navigation: Games | Apps | News | Store */}
        <nav
          id="main-nav-menu"
          aria-label="Marketplace Navigation"
          className="mt-3 flex items-center gap-6 overflow-x-auto no-scrollbar border-t border-gray-100 pt-1"
        >
          {[
            { id: 'games', label: 'Games' },
            { id: 'apps', label: 'Apps' },
            { id: 'news', label: 'News' },
            { id: 'store', label: 'Store' }
          ].map((tab) => {
            const isActive = activeNavTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => onNavTabChange(tab.id)}
                className={`relative py-2.5 text-sm font-medium whitespace-nowrap transition-colors focus:outline-none ${
                  isActive
                    ? 'text-emerald-600 font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
