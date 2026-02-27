import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, SlidersHorizontal, GraduationCap, Building2, BookOpen, Calendar, Sparkles, Users } from 'lucide-react';
import { SearchFilters, CAMPUSES, DEPARTMENTS, COLLEGE_TYPES, getDepartmentsByType } from '@/types/student';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useMemo } from 'react';

interface SearchAndFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  totalStudents: number;
  filteredCount: number;
}

const getYearOptions = (collegeType: string) => {
  switch (collegeType) {
    case 'engineering':
      return [
        { value: '2014', label: '2014-18' },
        { value: '2015', label: '2015-19' },
        { value: '2016', label: '2016-20' },
        { value: '2017', label: '2017-21' },
        { value: '2018', label: '2018-22' },
        { value: '2019', label: '2019-23' },
        { value: '2020', label: '2020-24' },
        { value: '2021', label: '2021-25' },
        { value: '2022', label: '2022-26' },
        { value: '2023', label: '2023-27' },
      ];
    case 'diploma':
      return [
        { value: '2017', label: '2017-20' },
        { value: '2018', label: '2018-21' },
        { value: '2019', label: '2019-22' },
        { value: '2020', label: '2020-23' },
        { value: '2021', label: '2021-24' },
        { value: '2022', label: '2022-25' },
        { value: '2023', label: '2023-26' },
        { value: '2024', label: '2024-27' },
      ];
    case 'bba':
      return [
        { value: '2019', label: '2019-22' },
        { value: '2020', label: '2020-23' },
        { value: '2021', label: '2021-24' },
        { value: '2022', label: '2022-25' },
        { value: '2023', label: '2023-26' },
      ];
    case 'pharma':
      return [
        { value: '2014', label: '2014-18' },
        { value: '2015', label: '2015-19' },
        { value: '2016', label: '2016-20' },
        { value: '2017', label: '2017-21' },
        { value: '2018', label: '2018-22' },
        { value: '2019', label: '2019-23' },
        { value: '2020', label: '2020-24' },
        { value: '2021', label: '2021-25' },
        { value: '2022', label: '2022-26' },
        { value: '2023', label: '2023-27' },
      ];
    case 'forensic':
      return [
        { value: '2014', label: '2014' },
        { value: '2015', label: '2015' },
        { value: '2016', label: '2016' },
        { value: '2017', label: '2017' },
        { value: '2018', label: '2018' },
        { value: '2019', label: '2019' },
        { value: '2020', label: '2020' },
        { value: '2021', label: '2021' },
        { value: '2022', label: '2022' },
        { value: '2023', label: '2023' },
      ];
    default:
      return [
        { value: '2014', label: '2014' },
        { value: '2015', label: '2015' },
        { value: '2016', label: '2016' },
        { value: '2017', label: '2017' },
        { value: '2018', label: '2018' },
        { value: '2019', label: '2019' },
        { value: '2020', label: '2020' },
        { value: '2021', label: '2021' },
        { value: '2022', label: '2022' },
        { value: '2023', label: '2023' },
      ];
  }
};

export const SearchAndFilters = ({ 
  filters, 
  onFiltersChange, 
  totalStudents, 
  filteredCount 
}: SearchAndFiltersProps) => {
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
      searchTerm: '',
      selectedCampus: '',
      selectedDepartment: '',
      selectedYear: '',
      selectedCollegeType: '',
      isLateralEntry: false
    });
  };

  const hasActiveFilters = filters.searchTerm || filters.selectedCampus || 
                          filters.selectedDepartment || filters.selectedYear || 
                          filters.selectedCollegeType || filters.isLateralEntry;

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchTerm) count++;
    if (filters.selectedCampus) count++;
    if (filters.selectedDepartment) count++;
    if (filters.selectedYear) count++;
    if (filters.selectedCollegeType) count++;
    if (filters.isLateralEntry) count++;
    return count;
  }, [filters]);

  const yearOptions = useMemo(() => getYearOptions(filters.selectedCollegeType), [filters.selectedCollegeType]);

  // Hide campus/dept for single-option programs
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

  // Active filter chips
  const activeChips = useMemo(() => {
    const chips: { key: keyof SearchFilters; label: string; clearValue: string | boolean }[] = [];
    if (filters.selectedCollegeType) {
      const ct = COLLEGE_TYPES.find(t => t.id === filters.selectedCollegeType);
      if (ct) chips.push({ key: 'selectedCollegeType', label: `${ct.icon} ${ct.name}`, clearValue: '' });
    }
    if (filters.isLateralEntry) {
      chips.push({ key: 'isLateralEntry', label: '🔄 Lateral Entry', clearValue: false });
    }
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
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative rounded-2xl mb-6 sm:mb-8 sticky top-2 sm:top-4 z-40 overflow-visible"
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 p-[1px]">
        <div className="w-full h-full rounded-2xl bg-card/95 backdrop-blur-xl" />
      </div>

      <div className="relative p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">Filters</h3>
            <AnimatePresence>
              {activeFilterCount > 0 && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Badge className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5">
                    {activeFilterCount} active
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/20 transition-colors"
              >
                <X className="w-3 h-3" />
                Clear all
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4 sm:mb-5">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md bg-primary/10">
            <Search className="w-4 h-4 text-primary" />
          </div>
          <input
            type="text"
            placeholder="Search by roll number..."
            value={filters.searchTerm}
            onChange={(e) => updateFilter('searchTerm', e.target.value)}
            className="w-full pl-12 pr-10 py-3 bg-muted/40 border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 focus:bg-muted/60 transition-all duration-300 text-foreground placeholder:text-muted-foreground text-sm"
          />
          {filters.searchTerm && (
            <button
              onClick={() => updateFilter('searchTerm', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-muted/60 hover:bg-muted transition-colors"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Filter Grid - Radix Select */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${
          showCampusDept ? 'lg:grid-cols-4' : 'lg:grid-cols-2'
        }`}>
          {/* Program */}
          <FilterRadixSelect
            icon={<GraduationCap className="w-4 h-4 text-primary" />}
            label="Program"
            value={filters.selectedCollegeType}
            onChange={(v) => updateFilter('selectedCollegeType', v)}
            placeholder="All Programs"
            options={COLLEGE_TYPES.map(t => ({ value: t.id, label: `${t.icon} ${t.name}` }))}
          />

          {/* Campus */}
          {showCampusDept && (
            <FilterRadixSelect
              icon={<Building2 className="w-4 h-4 text-primary" />}
              label="Campus"
              value={filters.selectedCampus}
              onChange={(v) => updateFilter('selectedCampus', v)}
              placeholder="All Campuses"
              options={filteredCampuses.map(c => ({ value: c.id, label: c.name }))}
            />
          )}

          {/* Department */}
          {showCampusDept && (
            <FilterRadixSelect
              icon={<BookOpen className="w-4 h-4 text-primary" />}
              label="Department"
              value={filters.selectedDepartment}
              onChange={(v) => updateFilter('selectedDepartment', v)}
              placeholder="All Departments"
              options={filteredDepartments.map(d => ({ value: d.id, label: `${d.icon} ${d.name}` }))}
            />
          )}

          {/* Year */}
          <FilterRadixSelect
            icon={<Calendar className="w-4 h-4 text-primary" />}
            label={filters.selectedCollegeType === 'engineering' ? 'Batch' : 'Year'}
            value={filters.selectedYear}
            onChange={(v) => updateFilter('selectedYear', v)}
            placeholder={filters.selectedCollegeType === 'engineering' ? 'All Batches' : 'All Years'}
            options={yearOptions.map(o => ({ value: o.value, label: o.label }))}
          />
        </div>

        {/* LE Toggle - only for B-Tech */}
        <AnimatePresence>
          {filters.selectedCollegeType === 'engineering' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3"
            >
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-muted/40 border border-border/60 w-fit">
                <Users className="w-4 h-4 text-primary" />
                <span className={`text-xs font-medium transition-colors ${!filters.isLateralEntry ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Regular
                </span>
                <Switch
                  checked={filters.isLateralEntry}
                  onCheckedChange={(checked) => updateFilter('isLateralEntry', checked)}
                />
                <span className={`text-xs font-medium transition-colors ${filters.isLateralEntry ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Lateral Entry
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {activeChips.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 flex flex-wrap gap-2"
            >
              {activeChips.map(chip => (
                <motion.button
                  key={chip.key}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  onClick={() => updateFilter(chip.key, chip.clearValue)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  {chip.label}
                  <X className="w-3 h-3" />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results indicator */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-border/40"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>
                  Showing <span className="font-semibold text-foreground">{filteredCount.toLocaleString()}</span> of{' '}
                  <span className="text-foreground">{totalStudents.toLocaleString()}</span> students
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* Radix Select filter component */
const FilterRadixSelect = ({
  icon,
  label,
  value,
  onChange,
  placeholder,
  options,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
      {icon}
      {label}
    </label>
    <Select value={value || undefined} onValueChange={(v) => onChange(v === '__all__' ? '' : v)}>
      <SelectTrigger className="w-full bg-muted/40 border-border/60 rounded-lg text-sm h-10">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-popover border-border z-50">
        <SelectItem value="__all__">{placeholder}</SelectItem>
        {options.map(opt => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
