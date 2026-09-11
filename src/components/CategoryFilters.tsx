import React from 'react';
import { CategoryFilter } from '../types';

interface CategoryFiltersProps {
  categories: CategoryFilter[];
  selectedCategory: CategoryFilter;
  onSelectCategory: (category: CategoryFilter) => void;
  categoryCounts: Record<string, number>;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts
}) => {
  return (
    <div
      id="category-filters-container"
      className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        const count = categoryCounts[category] || 0;

        return (
          <button
            key={category}
            id={`filter-btn-${category.toLowerCase()}`}
            onClick={() => onSelectCategory(category)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all focus:outline-none ${
              isSelected
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span>{category}</span>
            <span
              className={`ml-1.5 text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
