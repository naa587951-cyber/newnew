import React from 'react';
import { Home, Flame, Search, HelpCircle } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabSelect: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabSelect }) => {
  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'games', label: 'Games', icon: Flame },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  return (
    <nav
      aria-label="Mobile navigation bar"
      id="mobile-bottom-nav"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#090b16]/95 border-t border-purple-900/30 backdrop-blur-lg px-2 py-1.5 sm:hidden safe-bottom"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              id={`bottom-nav-${item.id}`}
              onClick={() => onTabSelect(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 active:scale-90 ${
                isActive
                  ? 'text-purple-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110 text-purple-400' : ''}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400 animate-pulse" />
                )}
              </div>
              <span className={`text-[10px] mt-1 font-medium tracking-tight ${isActive ? 'font-bold text-purple-300' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
