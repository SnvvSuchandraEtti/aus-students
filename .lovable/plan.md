
# Add Regular/LE Student Toggle for B-Tech

## What This Does
When B-Tech is selected as the program, a toggle switch will appear that lets you switch between viewing **Regular students only** (default) and **Lateral Entry (LE) students only**. This separates the two lists cleanly.

## How It Works
- LE students are identified by their roll number pattern: they contain "5A" in the department code portion (e.g., `22A95A0501` vs regular `22a91a0501`)
- A styled toggle button appears in the filter bar only when B-Tech program is selected
- Default view shows Regular students; toggling switches to LE-only view
- The toggle state syncs to the URL (so links are shareable) and resets when switching away from B-Tech

## Changes

### 1. Add `isLateralEntry` field to SearchFilters (`src/types/student.ts`)
- Add `isLateralEntry: boolean` to the `SearchFilters` interface
- This tracks whether the LE toggle is active

### 2. Add LE toggle UI to filters (`src/components/SearchAndFilters.tsx`)
- Add a toggle switch (using existing Radix Switch component) that appears only when `selectedCollegeType === 'engineering'`
- Label: "Regular" / "Lateral Entry" with a visual indicator
- Styled consistently with the existing glassmorphism filter bar
- Include it as a filter chip when active
- Reset `isLateralEntry` to `false` when program changes away from engineering

### 3. Apply LE filtering logic (`src/pages/Index.tsx`)
- In the `filteredStudents` memo, when B-Tech is selected, filter based on roll number pattern:
  - Regular: roll number does NOT contain "5A" 
  - LE: roll number DOES contain "5A"
- Add `le` param to URL sync for shareability
- Initialize from URL params on load
- Reset page to 1 when toggle changes

## Technical Details

### Files to modify:
- **`src/types/student.ts`** -- Add `isLateralEntry` to `SearchFilters`
- **`src/components/SearchAndFilters.tsx`** -- Add toggle switch UI, reset logic, filter chip
- **`src/pages/Index.tsx`** -- Add LE filtering in `filteredStudents`, URL sync for `le` param, initialize from URL

### LE Detection Pattern:
Regular B-Tech roll numbers: `22a91a0501` (pattern: `{year}{prefix}{deptCode}{num}`)
LE roll numbers: `22A95A0501` (pattern: `{year}{campusLE}5A{deptCode}{num}`) -- the "5A" in positions after the campus prefix is the key differentiator.
