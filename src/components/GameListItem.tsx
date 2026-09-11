import React, { useState } from 'react';
import { Download, Star, Check } from 'lucide-react';
import { Game } from '../types';

interface GameListItemProps {
  game: Game;
  onDownload: (gameId: string) => void;
  badgeText?: string;
}

export const GameListItem: React.FC<GameListItemProps> = ({ game, onDownload, badgeText }) => {
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
      id={`list-item-${game.id}`}
      onClick={handleClick}
      className="group bg-white border border-gray-200/90 rounded-xl p-3 flex items-center justify-between gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-gray-300 hover:shadow-[0_3px_8px_rgba(0,0,0,0.04)] transition-all cursor-pointer select-none"
    >
      {/* Icon + Info */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
          <img
            src={imgSrc}
            alt={game.title}
            onError={handleImageError}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="font-bold text-gray-900 text-sm truncate group-hover:text-emerald-700 transition-colors">
              {game.title}
            </h4>
            {badgeText && (
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
                {badgeText}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            {game.category} • {game.size}
          </p>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500">
            <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
              <Star className="w-3 h-3 fill-amber-400" />
              {game.rating}
            </span>
            <span>•</span>
            <span className="text-gray-400">{game.downloads}</span>
          </div>
        </div>
      </div>

      {/* Download Action */}
      <button
        id={`list-download-btn-${game.id}`}
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
        disabled={isDownloading}
        className="shrink-0 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white font-semibold text-xs border border-emerald-200/80 transition-all flex items-center gap-1.5 focus:outline-none active:scale-95"
      >
        {isDownloading ? (
          <>
            <Check className="w-3.5 h-3.5 animate-pulse" />
            <span>Opening...</span>
          </>
        ) : (
          <>
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </>
        )}
      </button>
    </div>
  );
};
