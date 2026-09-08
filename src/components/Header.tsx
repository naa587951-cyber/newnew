import React, { useState } from 'react';
import { Gamepad2, Search, Menu, X, ShieldCheck, HelpCircle, FileText, Mail, Flame } from 'lucide-react';

interface HeaderProps {
  onSearchClick: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenLegal: (page: 'privacy' | 'disclaimer' | 'contact') => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick, onNavigate, onOpenLegal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    onNavigate(sectionId);
  };

  const handleLegalClick = (page: 'privacy' | 'disclaimer' | 'contact') => {
    setIsMenuOpen(false);
    onOpenLegal(page);
  };

  return (
    <>
      <header 
        id="main-header"
        className="sticky top-0 z-40 w-full bg-[#090b14]/90 backdrop-blur-md border-b border-purple-900/30 px-4 py-3 transition-all duration-200"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button 
            id="brand-logo-btn"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2 group text-left focus:outline-none"
            aria-label="AllMods Home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-lg shadow-purple-600/20 group-hover:shadow-purple-500/40 transition-shadow">
              <div className="w-full h-full bg-[#0a0c16] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-gaming text-xl font-bold tracking-wider bg-gradient-to-r from-white via-slate-100 to-purple-300 bg-clip-text text-transparent">
                ALL<span className="text-purple-400">MODS</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
                Mobile Vault
              </span>
            </div>
          </button>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            <button
              id="header-search-btn"
              onClick={onSearchClick}
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500/40 hover:bg-slate-800 transition-all active:scale-95"
              aria-label="Open Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              id="header-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500/40 hover:bg-slate-800 transition-all active:scale-95"
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? <X className="w-4 h-4 text-purple-400" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div 
          id="mobile-drawer-backdrop"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            id="mobile-drawer-panel"
            className="fixed top-0 right-0 w-72 max-w-[85vw] h-full bg-[#0d0f1c] border-l border-purple-900/40 p-5 shadow-2xl flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                    <Gamepad2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-gaming font-bold text-lg text-white">ALLMODS</span>
                </div>
                <button
                  id="close-drawer-btn"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-4 space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold px-3 py-1">Menu</p>
                <button
                  id="drawer-nav-home"
                  onClick={() => handleNavClick('hero')}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-purple-950/40 hover:text-purple-300 flex items-center gap-3 transition-colors"
                >
                  <Gamepad2 className="w-4 h-4 text-purple-400" />
                  Home
                </button>
                <button
                  id="drawer-nav-games"
                  onClick={() => handleNavClick('games')}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-purple-950/40 hover:text-purple-300 flex items-center gap-3 transition-colors"
                >
                  <Flame className="w-4 h-4 text-amber-400" />
                  Popular Mods
                </button>
                <button
                  id="drawer-nav-how"
                  onClick={() => handleNavClick('how-it-works')}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-purple-950/40 hover:text-purple-300 flex items-center gap-3 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  How It Works
                </button>
                <button
                  id="drawer-nav-faq"
                  onClick={() => handleNavClick('faq')}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-purple-950/40 hover:text-purple-300 flex items-center gap-3 transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-cyan-400" />
                  Frequently Asked Questions
                </button>
              </div>

              {/* Legal Section */}
              <div className="pt-4 border-t border-slate-800/80 space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold px-3 py-1">Legal & Info</p>
                <button
                  id="drawer-legal-disclaimer"
                  onClick={() => handleLegalClick('disclaimer')}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white flex items-center gap-2.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  Disclaimer & Trademark Notice
                </button>
                <button
                  id="drawer-legal-privacy"
                  onClick={() => handleLegalClick('privacy')}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white flex items-center gap-2.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  Privacy Policy
                </button>
                <button
                  id="drawer-legal-contact"
                  onClick={() => handleLegalClick('contact')}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white flex items-center gap-2.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  Contact Support
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/60 text-center">
              <span className="text-[11px] text-slate-500">AllMods Store • v2.4</span>
              <p className="text-[10px] text-slate-600 mt-0.5">Optimized for Android Mobile</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
