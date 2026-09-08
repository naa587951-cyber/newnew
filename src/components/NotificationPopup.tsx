import React, { useState, useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { games, fictionalUsernames } from '../data/games';
import { NotificationItem } from '../types';

export const NotificationPopup: React.FC = () => {
  const [currentNotification, setCurrentNotification] = useState<NotificationItem | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDismissedByUser, setIsDismissedByUser] = useState<boolean>(false);

  useEffect(() => {
    let stayTimer: NodeJS.Timeout;
    let nextTimer: NodeJS.Timeout;

    const triggerNotification = () => {
      if (isDismissedByUser) return;

      const randomUser = fictionalUsernames[Math.floor(Math.random() * fictionalUsernames.length)];
      const randomGame = games[Math.floor(Math.random() * games.length)];

      const item: NotificationItem = {
        id: `${Date.now()}-${Math.random()}`,
        username: randomUser,
        gameTitle: randomGame.title,
        gameImage: randomGame.image,
        timestamp: "Just now"
      };

      setCurrentNotification(item);
      setIsVisible(true);

      // Visible duration: 5.5 seconds
      stayTimer = setTimeout(() => {
        setIsVisible(false);
        // Next notification interval between 8 and 14 seconds
        const nextInterval = Math.floor(Math.random() * 6000) + 8000;
        nextTimer = setTimeout(triggerNotification, nextInterval);
      }, 5500);
    };

    // First appearance 3 seconds after page loads
    const initialTimer = setTimeout(triggerNotification, 3000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(stayTimer);
      clearTimeout(nextTimer);
    };
  }, [isDismissedByUser]);

  const handleClose = () => {
    setIsVisible(false);
    // Pause for 30 seconds if dismissed by user
    setTimeout(() => {
      setIsDismissedByUser(false);
    }, 30000);
  };

  if (!currentNotification) return null;

  return (
    <aside 
      aria-label="Recent activity notification"
      id="live-notification-toast"
      className={`fixed bottom-20 left-3 right-3 sm:left-5 sm:right-auto sm:w-84 z-30 transition-all duration-500 ease-out transform ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-6 opacity-0 pointer-events-none scale-95'
      }`}
    >
      <div className="p-2.5 rounded-2xl bg-[#101322]/95 border border-purple-800/40 shadow-xl shadow-black/60 backdrop-blur-md flex items-center justify-between gap-3">
        {/* Game Icon */}
        <div className="relative shrink-0 w-11 h-11 rounded-xl overflow-hidden border border-purple-500/30 bg-slate-900">
          <img 
            src={currentNotification.gameImage} 
            alt={currentNotification.gameTitle}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback to relative or public path if needed
              const target = e.currentTarget;
              if (!target.src.includes('public/')) {
                target.src = currentNotification.gameImage.replace('assets/images/', '');
              }
            }}
          />
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white border-2 border-[#101322]">
            <CheckCircle2 className="w-2.5 h-2.5" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-xs font-bold text-purple-300 truncate">
              {currentNotification.username}
            </span>
            <span className="text-[10px] text-slate-400">just got</span>
          </div>
          <p className="text-xs font-semibold text-slate-100 truncate mt-0.5">
            {currentNotification.gameTitle}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] font-medium text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              {currentNotification.timestamp}
            </span>
            <span className="text-[9px] text-slate-500">Activity preview</span>
          </div>
        </div>

        {/* Close Button */}
        <button
          id="close-notification-btn"
          onClick={handleClose}
          className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
