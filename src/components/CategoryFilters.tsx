import React from 'react';
import { CategoryFilter } from '../types';

interface CategoryFiltersProps {
  selectedCategory: CategoryFilter;
  onSelectCategory: (cat: CategoryFilter) => void;
  categoryCounts: Record<string, number>;
}

const CATEGORIES: CategoryFilter[] = [
  'All',
  'Action',
  'Racing',
  'Simulation',
  'Casual',
  'Adventure',
  'Multiplayer'
];

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts
}) => {
  return (
    <div className="w-full relative">
      {/* Scrollable Container */}
      <div 
        id="category-filters-scroll"
        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-4 -mx-4 scroll-smooth"
      >
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          const count = categoryCounts[category] || 0;

          return (
            <button
              key={category}
              id={`cat-filter-${category.toLowerCase()}`}
              onClick={() => onSelectCategory(category)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{category}</span>
              {count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
