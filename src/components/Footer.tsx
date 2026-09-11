import React from 'react';
import { Layers, ShieldAlert } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (page: 'privacy' | 'disclaimer' | 'contact') => void;
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onNavigateTab }) => {
  return (
    <footer
      id="main-footer"
      className="bg-white border-t border-gray-200 mt-10 pt-8 pb-12 px-4 text-gray-500 text-xs"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
            <Layers className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-base tracking-tight text-gray-900">
            ALL<span className="text-emerald-600">MODS</span>
          </span>
        </div>

        {/* Primary Links: Games | Apps | News | Store */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-semibold text-gray-700">
          <button
            onClick={() => {
              onNavigateTab('games');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-emerald-600 transition-colors"
          >
            Games
          </button>
          <button
            onClick={() => onNavigateTab('apps')}
            className="hover:text-emerald-600 transition-colors"
          >
            Apps
          </button>
          <button
            onClick={() => onNavigateTab('news')}
            className="hover:text-emerald-600 transition-colors"
          >
            News
          </button>
          <button
            onClick={() => onNavigateTab('store')}
            className="hover:text-emerald-600 transition-colors"
          >
            Store
          </button>
        </div>

        {/* Secondary Legal Links: Privacy | Disclaimer | Contact */}
        <div className="mt-3 flex items-center justify-center gap-3 text-gray-500">
          <button
            id="footer-link-privacy"
            onClick={() => onOpenLegal('privacy')}
            className="hover:text-emerald-600 transition-colors"
          >
            Privacy
          </button>
          <span>•</span>
          <button
            id="footer-link-disclaimer"
            onClick={() => onOpenLegal('disclaimer')}
            className="hover:text-emerald-600 transition-colors"
          >
            Disclaimer
          </button>
          <span>•</span>
          <button
            id="footer-link-contact"
            onClick={() => onOpenLegal('contact')}
            className="hover:text-emerald-600 transition-colors"
          >
            Contact
          </button>
        </div>

        {/* Static HTML standalone file links for direct access or GitHub Pages */}
        <div className="mt-2 flex items-center justify-center gap-2 text-[11px] text-gray-400">
          <span>Static pages:</span>
          <a href="privacy.html" className="text-gray-500 hover:text-emerald-600 underline">privacy.html</a>
          <span>|</span>
          <a href="disclaimer.html" className="text-gray-500 hover:text-emerald-600 underline">disclaimer.html</a>
          <span>|</span>
          <a href="contact.html" className="text-gray-500 hover:text-emerald-600 underline">contact.html</a>
        </div>

        {/* Small Disclaimer */}
        <p className="mt-4 max-w-xl text-[11px] text-gray-400 leading-normal">
          AllMods is an independent discovery marketplace. Not affiliated with Google LLC, Niantic, Scopely, Toca Boca, or olzhass. All trademarks belong to their respective owners.
        </p>

        {/* Copyright */}
        <p className="mt-3 text-[11px] text-gray-400">
          © {new Date().getFullYear()} ALLMODS. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
