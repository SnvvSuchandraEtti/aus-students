

## Bug: Filters Not Updating Until Page Refresh

### Root Cause

The `FilterRadixSelect` component passes `value={value || undefined}` to the Radix Select. When a filter is cleared (set to `''`), this becomes `undefined`, which switches the Radix Select from **controlled** to **uncontrolled** mode. In uncontrolled mode, the Select ignores further `value` prop changes -- so when you pick a new campus/department/year, the component may not respond correctly until a full page refresh resets everything.

### Fix

In `src/components/SearchAndFilters.tsx`, change the Select's `value` prop from `value={value || undefined}` to `value={value || '__all__'}`. This keeps the component permanently in **controlled** mode. When a filter is empty (`''`), it correctly shows the `__all__` option (which displays the placeholder text). When a new option is selected, it updates immediately.

**Single line change** at line 373:
```tsx
// Before:
<Select value={value || undefined} onValueChange={(v) => onChange(v === '__all__' ? '' : v)}>

// After:
<Select value={value || '__all__'} onValueChange={(v) => onChange(v === '__all__' ? '' : v)}>
```

This ensures all Select dropdowns always stay controlled and respond instantly to filter changes without needing a page refresh.

