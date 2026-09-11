import React, { useState } from 'react';
import { Download, Star, Check } from 'lucide-react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onDownload: (gameId: string) => void;
  isFeatured?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onDownload, isFeatured = false }) => {
  const [imgSrc, setImgSrc] = useState<string>(game.image);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleImageError = () => {
    if (!imgSrc.startsWith('/')) {
      setImgSrc(`/${game.image}`);
    } else if (imgSrc.includes('assets/images/')) {
      setImgSrc(game.image.replace('assets/images/', ''));
    }
  };

  const handleClick = () => {
    setIsDownloading(true);
    onDownload(game.id);
    setTimeout(() => {
      setIsDownloading(false);
    }, 2500);
  };

  return (
    <div
      id={`card-${game.id}`}
      onClick={handleClick}
      className={`group relative shrink-0 snap-start rounded-2xl bg-white border transition-all duration-200 flex flex-col justify-between p-3 select-none cursor-pointer hover:-translate-y-0.5 ${
        isFeatured
          ? 'w-[245px] sm:w-[265px] border-emerald-400 ring-1 ring-emerald-500/20 shadow-[0_2px_10px_rgba(16,185,129,0.12)] hover:shadow-[0_6px_16px_rgba(16,185,129,0.18)]'
          : 'w-[230px] sm:w-[250px] border-gray-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:border-gray-300'
      }`}
    >
      {/* Top Banner / Image */}
      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
        <img
          src={imgSrc}
          alt={game.title}
          onError={handleImageError}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
            Priority Mod
          </div>
        )}

        {/* Rating badge */}
        <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/95 backdrop-blur-xs text-gray-800 text-[11px] font-bold border border-gray-200/60 shadow-xs">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{game.rating}</span>
        </div>
      </div>

      {/* Game Details */}
      <div className="mt-2.5 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-1 group-hover:text-emerald-700 transition-colors">
          {game.title}
        </h3>

        {/* Short category */}
        <p className="text-xs text-emerald-700 font-medium mt-0.5">
          {game.category}
        </p>

        {/* Meta pill row */}
        <div className="flex items-center gap-1.5 mt-2 text-[11px] text-gray-500 font-medium">
          <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-semibold">{game.version}</span>
          <span>•</span>
          <span>{game.size}</span>
          <span>•</span>
          <span>{game.downloads}</span>
        </div>
      </div>

      {/* Download Action Button */}
      <div className="mt-3 pt-2 border-t border-gray-100">
        <button
          id={`download-btn-${game.id}`}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          disabled={isDownloading}
          className={`w-full py-2.5 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all focus:outline-none active:scale-[0.98] ${
            isFeatured
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs'
          }`}
        >
          {isDownloading ? (
            <>
              <Check className="w-3.5 h-3.5 animate-pulse" />
              <span>Opening Link...</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
