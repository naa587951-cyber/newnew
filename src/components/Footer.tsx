import React from 'react';
import { Gamepad2, ShieldAlert, Heart } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (page: 'privacy' | 'disclaimer' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  return (
    <footer 
      id="main-footer"
      className="bg-[#06070c] border-t border-slate-900 pt-8 pb-28 px-4 text-center text-slate-400"
    >
      <div className="max-w-md mx-auto flex flex-col items-center">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center">
            <Gamepad2 className="w-4 h-4 text-purple-400" />
          </div>
          <span className="font-gaming text-lg font-bold tracking-wider text-white">
            ALL<span className="text-purple-400">MODS</span>
          </span>
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
            Store
          </span>
        </div>

        <p className="mt-2 text-xs text-slate-300">
          Discover games, mods and gaming experiences.
        </p>

        {/* Navigation / Legal Links */}
        <div className="mt-5 flex items-center justify-center gap-4 text-xs font-semibold">
          <button
            id="footer-link-privacy"
            onClick={() => onOpenLegal('privacy')}
            className="text-slate-300 hover:text-purple-300 transition-colors underline-offset-4 hover:underline"
          >
            Privacy Policy
          </button>
          <span className="text-slate-700">•</span>
          <button
            id="footer-link-disclaimer"
            onClick={() => onOpenLegal('disclaimer')}
            className="text-slate-300 hover:text-purple-300 transition-colors underline-offset-4 hover:underline"
          >
            Disclaimer
          </button>
          <span className="text-slate-700">•</span>
          <button
            id="footer-link-contact"
            onClick={() => onOpenLegal('contact')}
            className="text-slate-300 hover:text-purple-300 transition-colors underline-offset-4 hover:underline"
          >
            Contact
          </button>
        </div>

        {/* Static HTML standalone file links for direct access or GitHub Pages */}
        <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-slate-400">
          <span>Direct static files:</span>
          <a href="privacy.html" className="text-purple-400 hover:underline">privacy.html</a>
          <span>|</span>
          <a href="disclaimer.html" className="text-purple-400 hover:underline">disclaimer.html</a>
          <span>|</span>
          <a href="contact.html" className="text-purple-400 hover:underline">contact.html</a>
        </div>

        {/* Mandatory Intellectual Property and Affiliation Disclaimer */}
        <div className="mt-6 p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-[11px] text-slate-400 text-left leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold text-slate-300 mb-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Trademark & Intellectual Property Notice</span>
          </div>
          <p>
            AllMods is an independent gaming enthusiast resource and discovery catalog. AllMods is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Niantic, Scopely, Toca Boca, olzhass, or any of their subsidiaries or affiliates. All product and company names, game titles, and registered trademarks are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 flex flex-col items-center gap-1 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} AllMods Store. Built for mobile gamers.</p>
          <p className="flex items-center gap-1 text-[10px]">
            <span>Crafted with</span>
            <Heart className="w-2.5 h-2.5 fill-red-500 text-red-500" />
            <span>for high-performance mobile browsing</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
