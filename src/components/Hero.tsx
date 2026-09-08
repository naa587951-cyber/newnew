import React from 'react';
import { Sparkles, ArrowDown, ShieldCheck, Zap, DownloadCloud } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section 
      id="hero"
      className="relative overflow-hidden pt-6 pb-8 px-4 text-center border-b border-purple-950/40"
    >
      {/* Background ambient lighting and glowing gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-0 w-60 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-4 w-48 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Cyber decorative grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none -z-10" />

      <div className="max-w-md mx-auto flex flex-col items-center">
        {/* Top badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-4 shadow-sm backdrop-blur-sm animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>VERIFIED MOBILE MODS & VIP ACCESS</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-gaming text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Your Favorite Games.{' '}
          <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent block mt-1">
            One Place.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-sm leading-relaxed">
          Discover popular games, mods and gaming experiences.
        </p>

        {/* Trust Badges Bar */}
        <div className="mt-5 grid grid-cols-3 gap-2 w-full max-w-xs text-left">
          <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-200 leading-tight">100% Tested</span>
              <span className="text-[8px] text-slate-400">Safe Files</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-200 leading-tight">Fast Speed</span>
              <span className="text-[8px] text-slate-400">No Queue</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <DownloadCloud className="w-4 h-4 text-cyan-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-200 leading-tight">Direct APK</span>
              <span className="text-[8px] text-slate-400">Android VIP</span>
            </div>
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className="mt-6 w-full max-w-xs">
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="w-full relative group overflow-hidden rounded-2xl p-[1px] font-semibold text-white shadow-xl shadow-purple-900/30 hover:shadow-purple-700/50 active:scale-[0.98] transition-all"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 rounded-2xl animate-gradient" />
            <span className="relative flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-700 to-indigo-700 rounded-2xl text-sm font-bold tracking-wide transition-colors group-hover:from-purple-600 group-hover:to-indigo-600">
              <span>Explore Games</span>
              <ArrowDown className="w-4 h-4 text-purple-200 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
