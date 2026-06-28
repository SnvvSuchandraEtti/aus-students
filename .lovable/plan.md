## Goal

Keep the Lovable site fully functional (no auto-redirect) and add a discoverable link that takes visitors to the Vercel mirror at `http://adityans.vercel.app/`.

## What to build

1. **Footer link (primary placement)**
   - Add a small footer bar at the bottom of the main page (`src/pages/Index.tsx`), shown after the student grid.
   - Text: "Also available on Vercel →"
   - Behavior: opens `http://adityans.vercel.app/` in a new tab (`target="_blank"`, `rel="noopener noreferrer"`).
   - Styled with existing design tokens (muted background, subtle border, primary accent on hover) — matches the glassmorphism / minimal aesthetic already in use.

2. **Floating pill button (secondary, always visible)**
   - A small fixed-position pill in the bottom-right corner with an external-link icon + "View on Vercel" label.
   - Auto-hides on very small screens to avoid covering content; collapses to icon-only on mobile.
   - Dismissible (stores dismissal in `localStorage` so it doesn't nag returning visitors).

Both entry points point to the same URL so users can find it whether they scroll or not.

## Files touched

- `src/pages/Index.tsx` — render the new footer link near the end of the page.
- `src/components/VercelMirrorLink.tsx` (new) — the floating pill button with dismiss state.
- No changes to routing, data, or backend. No redirect logic added.

## Out of scope

- No automatic redirect from Lovable to Vercel (explicitly removed earlier per your previous request).
- No analytics tracking on the click (can add later if you want).
