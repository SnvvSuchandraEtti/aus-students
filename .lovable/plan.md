

# Fix and Enhance Aditya Student Gallery

## Issues Found

### Critical Bugs
1. **Massive performance bottleneck**: `generateStudentData()` is called TWICE on mount (lines 20 and 24 of Index.tsx), generating hundreds of thousands of student records. Engineering alone creates ~129,000+ students per campus, plus lateral entry -- totaling potentially 500K+ objects in memory, duplicated.
2. **Broken Forensic image URLs**: The forensic baseUrl is `https://aditya.ac.in/forensic-science/placements.php?campus=` which is a PHP page, not a photo directory. Image URLs become `placements.php?campus=1` which won't load photos.
3. **Pharma department filter not hidden**: `showCampusDept` only hides campus/dept for BBA and Forensic, but Pharma also has a single department -- selecting Pharma still shows a useless Department dropdown with only "Pharmacy".
4. **Animation performance**: Rendering 1000 cards per page each with individual `framer-motion` animation delays (`index * 0.02`) causes massive frame drops and slow renders.

### UI/UX Issues
5. Native `<select>` dropdowns look inconsistent and unpolished compared to the glassmorphism design
6. Student cards lack visual polish -- no skeleton loading, harsh error states
7. Modal image error handling uses DOM manipulation (`target.style.display = 'none'`) instead of React state
8. No loading state when switching between large filter results
9. Hero section is overly tall on mobile

## Plan

### 1. Fix data generation performance
- Generate data only ONCE using a shared module-level variable or single `useState` call
- Remove the duplicate `generateStudentData()` call for `shuffledStudents` -- shuffle the same array reference instead
- Reduce `ITEMS_PER_PAGE` from 1000 to a reasonable 100-200 with proper pagination

### 2. Fix Forensic image URLs
- Update the Forensic campus `baseUrl` to point to actual student photo storage, or mark it as a placeholder with a proper fallback pattern

### 3. Fix filter logic
- Add `pharma` to the `showCampusDept` check so Department filter is hidden for single-department programs
- Ensure campus filter is also hidden for Forensic (single campus)

### 4. Optimize animations
- Remove per-card animation delays for large lists (use CSS `animation-delay` or batch animations)
- Use `layout` animations only for small result sets
- Add `will-change: transform` for smoother card hover effects

### 5. Upgrade filter UI with custom styled selects
- Replace native `<select>` elements with custom dropdown components using Radix Select
- Add smooth open/close animations
- Better visual integration with the glassmorphism theme
- Add filter chip pills showing active filters below the filter bar

### 6. Improve Student Cards
- Add proper skeleton loading placeholders while images load
- Better error state with initials/avatar fallback
- Smoother hover transitions with card lift effect
- Lazy loading with IntersectionObserver for off-screen cards

### 7. Fix Student Modal
- Replace DOM manipulation error handling with React state
- Add image loading skeleton in modal
- Show batch year format (e.g., "2022-26") in modal based on program type
- Better responsive layout

### 8. Add loading/transition states
- Show a subtle loading indicator when filters change and results are recalculating
- Animate result count changes smoothly

## Technical Details

### Files to modify:
- `src/pages/Index.tsx` -- Fix double data generation, reduce page size, optimize animations
- `src/types/student.ts` -- Fix Forensic URLs, cache generated data
- `src/components/SearchAndFilters.tsx` -- Fix pharma filter visibility, upgrade to custom selects, add filter chips
- `src/components/StudentCard.tsx` -- Add skeleton loading, better error states, optimize animations
- `src/components/StudentModal.tsx` -- Fix image error handling, add batch year display
- `src/index.css` -- Add utility classes for new card effects

### Dependencies: No new dependencies needed -- using existing Radix Select component already installed.

