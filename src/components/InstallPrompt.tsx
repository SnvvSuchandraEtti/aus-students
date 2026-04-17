import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'aus-install-dismissed';

export const InstallPrompt = () => {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) return;
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setShow(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setShow(false);
    setDeferred(null);
  };

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, '1');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-card/95 backdrop-blur-xl border border-border shadow-lg max-w-sm"
        >
          <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
            <Download className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground">Install Gallery</p>
            <p className="text-[10px] text-muted-foreground">Open faster, works offline</p>
          </div>
          <button onClick={install} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90">
            Install
          </button>
          <button onClick={dismiss} className="p-1 rounded-lg hover:bg-muted">
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
