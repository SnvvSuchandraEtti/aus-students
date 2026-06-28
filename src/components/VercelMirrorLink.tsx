import { useEffect, useState } from 'react';
import { ExternalLink, X } from 'lucide-react';

const VERCEL_URL = 'https://adityans.vercel.app/';
const DISMISS_KEY = 'vercel-mirror-dismissed';

export const VercelMirrorLink = () => {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(localStorage.getItem(DISMISS_KEY) === '1');
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, '1');
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-1 rounded-full border border-border/60 bg-card/80 backdrop-blur-md shadow-lg pl-1 pr-1 py-1">
      <a
        href={VERCEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-foreground hover:text-primary transition-colors"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">View on Vercel</span>
      </a>
      <button
        onClick={dismiss}
        aria-label="Dismiss Vercel link"
        className="p-1 rounded-full hover:bg-muted/60 transition-colors text-muted-foreground"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};
