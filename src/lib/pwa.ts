// One-time cleanup: unregister any previously installed service worker
// and clear its caches. An earlier build cached a redirect-to-Vercel page;
// users who visited then are still being redirected by the stale SW until
// it's removed.
export const registerSW = () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
  window.addEventListener('load', async () => {
    try {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
    } catch (err) {
      console.warn('SW cleanup failed', err);
    }
  });
};
