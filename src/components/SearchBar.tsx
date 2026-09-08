import React, { forwardRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onQueryChange: (val: string) => void;
  resultCount: number;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(({
  query,
  onQueryChange,
  resultCount
}, ref) => {
  return (
    <div className="w-full relative">
      <div className="relative flex items-center">
        <div className="absolute left-3.5 text-slate-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </div>

        <input
          ref={ref}
          id="games-search-input"
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search games..."
          className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-inner"
        />

        {query && (
          <button
            id="clear-search-btn"
            onClick={() => onQueryChange('')}
            className="absolute right-3 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Clear search query"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Query status feedback */}
      {query && (
        <div className="flex items-center justify-between px-2 pt-2 text-xs text-slate-400">
          <span>
            Found <strong className="text-purple-300">{resultCount}</strong> {resultCount === 1 ? 'game' : 'games'} matching "{query}"
          </span>
          <button 
            onClick={() => onQueryChange('')}
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
});

SearchBar.displayName = 'SearchBar';
