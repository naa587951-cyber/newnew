import React, { useState } from 'react';
import { Download, Star, ShieldCheck, Smartphone, Clock, Sparkles } from 'lucide-react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onDownload: (gameId: string) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onDownload }) => {
  const [imgSrc, setImgSrc] = useState<string>(game.image);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleImageError = () => {
    // Graceful fallback chain if path resolution varies in sandbox preview
    if (!imgSrc.startsWith('/')) {
      setImgSrc(`/${game.image}`);
    } else if (imgSrc.includes('assets/images/')) {
      setImgSrc(game.image.replace('assets/images/', ''));
    }
  };

  const handleBtnClick = () => {
    setIsDownloading(true);
    onDownload(game.id);
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  return (
    <div
      id={`card-${game.id}`}
      className="group w-full rounded-2xl bg-gradient-to-b from-[#141829] to-[#0d0f1b] border border-slate-800/80 hover:border-purple-500/50 shadow-lg shadow-black/40 hover:shadow-purple-900/20 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Top Image Container */}
      <div className="relative w-full h-48 sm:h-52 bg-slate-950 overflow-hidden">
        <img
          src={imgSrc}
          alt={game.title}
          onError={handleImageError}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Subtle Dark Gradient Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141829] via-[#141829]/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-[#090b14]/85 backdrop-blur-md border border-purple-500/30 text-purple-300 text-[11px] font-bold tracking-wide shadow-md">
            {game.category}
          </span>
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[11px] font-bold shadow-md">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{game.rating}</span>
        </div>

        {/* Downloads indicator */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] font-medium text-slate-300 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md">
          <Download className="w-3 h-3 text-cyan-400" />
          <span>{game.downloads} downloads</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Game Title */}
          <h3 className="font-gaming text-lg sm:text-xl font-bold text-white tracking-wide group-hover:text-purple-300 transition-colors">
            {game.title}
          </h3>

          {/* Short Description */}
          <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
            {game.description}
          </p>

          {/* Features pills */}
          {game.features && game.features.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {game.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md bg-purple-950/40 text-purple-300 border border-purple-800/30"
                >
                  <Sparkles className="w-2.5 h-2.5 text-purple-400" />
                  {feat}
                </span>
              ))}
            </div>
          )}

          {/* Structured Information Grid */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-400 bg-slate-900/50 p-2 rounded-xl border border-slate-800/60">
              <Smartphone className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase text-slate-400">Platform</span>
                <span className="font-semibold text-slate-200 truncate">{game.platform}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400 bg-slate-900/50 p-2 rounded-xl border border-slate-800/60">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase text-slate-400">Version</span>
                <span className="font-semibold text-slate-200 truncate">{game.version}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400 bg-slate-900/50 p-2 rounded-xl border border-slate-800/60">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase text-slate-400">Updated</span>
                <span className="font-semibold text-slate-200 truncate">{game.updated}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400 bg-slate-900/50 p-2 rounded-xl border border-slate-800/60">
              <Download className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase text-slate-400">Category</span>
                <span className="font-semibold text-slate-200 truncate">{game.category}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Big Touch-Friendly Download Button */}
        <div className="pt-2">
          <button
            id={`download-btn-${game.id}`}
            onClick={handleBtnClick}
            disabled={isDownloading}
            className="w-full relative group overflow-hidden rounded-xl p-[1.5px] font-bold text-white shadow-lg shadow-purple-900/20 active:scale-[0.98] transition-transform"
          >
            {/* Animated glowing border */}
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 rounded-xl group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 group-hover:from-purple-600 group-hover:via-indigo-600 group-hover:to-purple-700 rounded-[10px] text-sm tracking-wider uppercase">
              <Download className={`w-4 h-4 text-white ${isDownloading ? 'animate-bounce' : 'group-hover:translate-y-0.5 transition-transform'}`} />
              <span>{isDownloading ? 'Connecting Vault...' : game.buttonText}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
