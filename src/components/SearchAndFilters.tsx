import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, SlidersHorizontal, GraduationCap, Building2, BookOpen, Calendar, Users } from 'lucide-react';
import { SearchFilters, CAMPUSES, DEPARTMENTS, COLLEGE_TYPES, getDepartmentsByType } from '@/types/student';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useMemo } from 'react';

interface SearchAndFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

const getYearOptions = (collegeType: string) => {
  switch (collegeType) {
    case 'engineering':
      return [
        { value: '2014', label: '2014-18' }, { value: '2015', label: '2015-19' },
        { value: '2016', label: '2016-20' }, { value: '2017', label: '2017-21' },
        { value: '2018', label: '2018-22' }, { value: '2019', label: '2019-23' },
        { value: '2020', label: '2020-24' }, { value: '2021', label: '2021-25' },
        { value: '2022', label: '2022-26' }, { value: '2023', label: '2023-27' },
      ];
    case 'diploma':
      return [
        { value: '2017', label: '2017-20' }, { value: '2018', label: '2018-21' },
        { value: '2019', label: '2019-22' }, { value: '2020', label: '2020-23' },
        { value: '2021', label: '2021-24' }, { value: '2022', label: '2022-25' },
        { value: '2023', label: '2023-26' }, { value: '2024', label: '2024-27' },
      ];
    case 'bba':
      return [
        { value: '2019', label: '2019-22' }, { value: '2020', label: '2020-23' },
        { value: '2021', label: '2021-24' }, { value: '2022', label: '2022-25' },
        { value: '2023', label: '2023-26' },
      ];
    case 'pharma':
      return [
        { value: '2014', label: '2014-18' }, { value: '2015', label: '2015-19' },
        { value: '2016', label: '2016-20' }, { value: '2017', label: '2017-21' },
        { value: '2018', label: '2018-22' }, { value: '2019', label: '2019-23' },
        { value: '2020', label: '2020-24' }, { value: '2021', label: '2021-25' },
        { value: '2022', label: '2022-26' }, { value: '2023', label: '2023-27' },
      ];
    case 'forensic':
      return Array.from({ length: 10 }, (_, i) => ({ value: `${2014 + i}`, label: `${2014 + i}` }));
    default:
      return Array.from({ length: 10 }, (_, i) => ({ value: `${2014 + i}`, label: `${2014 + i}` }));
  }
};

export const SearchAndFilters = ({ filters, onFiltersChange }: SearchAndFiltersProps) => {
  const updateFilter = (key: keyof SearchFilters, value: string | boolean) => {
    const newFilters = { ...filters, [key]: value };
    if (key === 'selectedCollegeType') {
      newFilters.selectedCampus = '';
      newFilters.selectedDepartment = '';
      newFilters.selectedYear = '';
      newFilters.isLateralEntry = false;
    }
    if (key === 'selectedCampus') {
      newFilters.selectedDepartment = '';
    }
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    onFiltersChange({
      searchTerm: '', selectedCampus: '', selectedDepartment: '',
      selectedYear: '', selectedCollegeType: '', isLateralEntry: false
    });
  };

  const hasActiveFilters = filters.searchTerm || filters.selectedCampus ||
    filters.selectedDepartment || filters.selectedYear ||
    filters.selectedCollegeType || filters.isLateralEntry;

  const activeFilterCount = useMemo(() => {
    let c = 0;
    if (filters.searchTerm) c++;
    if (filters.selectedCampus) c++;
    if (filters.selectedDepartment) c++;
    if (filters.selectedYear) c++;
    if (filters.selectedCollegeType) c++;
    if (filters.isLateralEntry) c++;
    return c;
  }, [filters]);

  const yearOptions = useMemo(() => getYearOptions(filters.selectedCollegeType), [filters.selectedCollegeType]);

  const showCampusDept = filters.selectedCollegeType !== 'bba' &&
    filters.selectedCollegeType !== 'forensic' &&
    filters.selectedCollegeType !== 'pharma';

  const filteredCampuses = useMemo(() =>
    CAMPUSES.filter(campus => !filters.selectedCollegeType || campus.type === filters.selectedCollegeType),
    [filters.selectedCollegeType]
  );

  const filteredDepartments = useMemo(() =>
    filters.selectedCollegeType ? getDepartmentsByType(filters.selectedCollegeType) : DEPARTMENTS,
    [filters.selectedCollegeType]
  );

  const activeChips = useMemo(() => {
    const chips: { key: keyof SearchFilters; label: string; clearValue: string | boolean }[] = [];
    if (filters.selectedCollegeType) {
      const ct = COLLEGE_TYPES.find(t => t.id === filters.selectedCollegeType);
      if (ct) chips.push({ key: 'selectedCollegeType', label: `${ct.icon} ${ct.name}`, clearValue: '' });
    }
    if (filters.isLateralEntry) chips.push({ key: 'isLateralEntry', label: '🔄 Lateral Entry', clearValue: false });
    if (filters.selectedCampus) {
      const c = CAMPUSES.find(c => c.id === filters.selectedCampus);
      if (c) chips.push({ key: 'selectedCampus', label: c.name, clearValue: '' });
    }
    if (filters.selectedDepartment) {
      const d = DEPARTMENTS.find(d => d.id === filters.selectedDepartment);
      if (d) chips.push({ key: 'selectedDepartment', label: `${d.icon} ${d.name}`, clearValue: '' });
    }
    if (filters.selectedYear) {
      const y = yearOptions.find(o => o.value === filters.selectedYear);
      if (y) chips.push({ key: 'selectedYear', label: y.label, clearValue: '' });
    }
    return chips;
  }, [filters, yearOptions]);

  return (
    <div className="relative rounded-2xl bg-card/90 backdrop-blur-xl border border-border/50 shadow-sm sticky top-3 z-40">
      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Filters</span>
            <AnimatePresence>
              {activeFilterCount > 0 && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4">
                    {activeFilterCount}
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {hasActiveFilters && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={clearFilters}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-medium text-destructive hover:bg-destructive/10 transition-colors"
              >
                <X className="w-3 h-3" />
                Clear
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by roll number..."
            value={filters.searchTerm}
            onChange={(e) => updateFilter('searchTerm', e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 bg-muted/40 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all text-foreground placeholder:text-muted-foreground text-sm"
          />
          {filters.searchTerm && (
            <button
              onClick={() => updateFilter('searchTerm', '')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/60 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Filters Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2.5 ${showCampusDept ? 'lg:grid-cols-4' : 'lg:grid-cols-2'}`}>
          <FilterSelect
            icon={<GraduationCap className="w-3.5 h-3.5 text-primary" />}
            label="Program"
            value={filters.selectedCollegeType}
            onChange={(v) => updateFilter('selectedCollegeType', v)}
            placeholder="All Programs"
            options={COLLEGE_TYPES.map(t => ({ value: t.id, label: `${t.icon} ${t.name}` }))}
          />

          {showCampusDept && (
            <>
              <FilterSelect
                icon={<Building2 className="w-3.5 h-3.5 text-primary" />}
                label="Campus"
                value={filters.selectedCampus}
                onChange={(v) => updateFilter('selectedCampus', v)}
                placeholder="All Campuses"
                options={filteredCampuses.map(c => ({ value: c.id, label: c.name }))}
              />
              <FilterSelect
                icon={<BookOpen className="w-3.5 h-3.5 text-primary" />}
                label="Department"
                value={filters.selectedDepartment}
                onChange={(v) => updateFilter('selectedDepartment', v)}
                placeholder="All Departments"
                options={filteredDepartments.map(d => ({ value: d.id, label: `${d.icon} ${d.name}` }))}
              />
            </>
          )}

          <FilterSelect
            icon={<Calendar className="w-3.5 h-3.5 text-primary" />}
            label={filters.selectedCollegeType === 'engineering' ? 'Batch' : 'Year'}
            value={filters.selectedYear}
            onChange={(v) => updateFilter('selectedYear', v)}
            placeholder={filters.selectedCollegeType === 'engineering' ? 'All Batches' : 'All Years'}
            options={yearOptions.map(o => ({ value: o.value, label: o.label }))}
          />
        </div>

        {/* LE Toggle */}
        <AnimatePresence>
          {filters.selectedCollegeType === 'engineering' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2.5"
            >
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-muted/30 border border-border/40 w-fit">
                <Users className="w-3.5 h-3.5 text-primary" />
                <span className={`text-[11px] font-medium transition-colors ${!filters.isLateralEntry ? 'text-foreground' : 'text-muted-foreground'}`}>Regular</span>
                <Switch
                  checked={filters.isLateralEntry}
                  onCheckedChange={(checked) => updateFilter('isLateralEntry', checked)}
                />
                <span className={`text-[11px] font-medium transition-colors ${filters.isLateralEntry ? 'text-foreground' : 'text-muted-foreground'}`}>Lateral Entry</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active chips */}
        <AnimatePresence>
          {activeChips.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2.5 flex flex-wrap gap-1.5"
            >
              {activeChips.map(chip => (
                <motion.button
                  key={chip.key}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  onClick={() => updateFilter(chip.key, chip.clearValue)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary hover:bg-primary/15 transition-colors"
                >
                  {chip.label}
                  <X className="w-2.5 h-2.5" />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const FilterSelect = ({
  icon, label, value, onChange, placeholder, options,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) => (
  <div className="space-y-1">
    <label className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
      {icon}
      {label}
    </label>
    <Select value={value || '__all__'} onValueChange={(v) => onChange(v === '__all__' ? '' : v)}>
      <SelectTrigger className="w-full bg-muted/30 border-border/40 rounded-lg text-xs h-9">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-popover border-border z-50">
        <SelectItem value="__all__">{placeholder}</SelectItem>
        {options.map(opt => (
          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
