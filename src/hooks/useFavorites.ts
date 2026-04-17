import { useCallback, useEffect, useState } from 'react';

const FAVORITES_KEY = 'aus-student-favorites';
const RECENT_KEY = 'aus-student-recent';
const MAX_RECENT = 12;

const readSet = (key: string): string[] => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => readSet(FAVORITES_KEY));

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === FAVORITES_KEY) setFavorites(readSet(FAVORITES_KEY));
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const toggleFavorite = useCallback((rollNumber: string) => {
    setFavorites(prev => {
      const next = prev.includes(rollNumber)
        ? prev.filter(r => r !== rollNumber)
        : [rollNumber, ...prev];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback((rollNumber: string) => favorites.includes(rollNumber), [favorites]);

  return { favorites, toggleFavorite, isFavorite };
};

export const useRecentlyViewed = () => {
  const [recent, setRecent] = useState<string[]>(() => readSet(RECENT_KEY));

  const addRecent = useCallback((rollNumber: string) => {
    setRecent(prev => {
      const next = [rollNumber, ...prev.filter(r => r !== rollNumber)].slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearRecent = useCallback(() => {
    localStorage.removeItem(RECENT_KEY);
    setRecent([]);
  }, []);

  return { recent, addRecent, clearRecent };
};
