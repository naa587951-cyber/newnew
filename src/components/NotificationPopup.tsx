import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { games, fictionalUsernames } from '../data/games';
import { NotificationItem } from '../types';

export const NotificationPopup: React.FC = () => {
  const [currentNotification, setCurrentNotification] = useState<NotificationItem | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isDismissedByUser, setIsDismissedByUser] = useState<boolean>(false);

  useEffect(() => {
    // Generate an initial notification immediately
    const getRandomItem = (): NotificationItem => {
      const randomUser = fictionalUsernames[Math.floor(Math.random() * fictionalUsernames.length)];
      const randomGame = games[Math.floor(Math.random() * games.length)];
      return {
        id: `${Date.now()}-${Math.random()}`,
        username: randomUser,
        gameTitle: randomGame.title,
        gameImage: randomGame.image,
        timestamp: "Just now"
      };
    };

    setCurrentNotification(getRandomItem());

    let changeTimer: NodeJS.Timeout;
    const scheduleNext = () => {
      if (isDismissedByUser) return;
      changeTimer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentNotification(getRandomItem());
          setIsVisible(true);
          scheduleNext();
        }, 500);
      }, 7000);
    };

    scheduleNext();

    return () => {
      clearTimeout(changeTimer);
    };
  }, [isDismissedByUser]);

  if (!currentNotification || isDismissedByUser) return null;

  return (
    <div
      id="top-notification-chip"
      role="status"
      aria-live="polite"
      className={`w-full max-w-4xl mx-auto px-4 pt-3 pb-1 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-center justify-between gap-2.5 bg-white border border-gray-200/90 rounded-xl px-3 py-2 shadow-[0_1px_3px_rgba(0,0,0,0.03)] text-xs text-gray-700">
        {/* Left: Green indicator dot + Game icon + text */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {/* Green dot */}
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" aria-hidden="true" />

          {/* Small game thumbnail */}
          <img
            src={currentNotification.gameImage}
            alt=""
            className="w-5 h-5 rounded-md object-cover shrink-0 border border-gray-100"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.includes('assets/images/')) {
                target.src = currentNotification.gameImage.replace('assets/images/', '');
              }
            }}
          />

          {/* Text ticker */}
          <div className="truncate">
            <span className="font-semibold text-gray-900">{currentNotification.username}</span>
            <span className="text-gray-500 ml-1">just got</span>
            <span className="font-semibold text-emerald-700 ml-1">{currentNotification.gameTitle}</span>
          </div>
        </div>

        {/* Dismiss button */}
        <button
          id="dismiss-top-notification-btn"
          onClick={() => setIsDismissedByUser(true)}
          className="shrink-0 p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
