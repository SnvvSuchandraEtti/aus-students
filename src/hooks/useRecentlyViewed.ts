import { useCallback, useEffect, useState } from 'react';

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
