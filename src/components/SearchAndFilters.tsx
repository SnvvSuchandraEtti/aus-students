import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { SearchFilters, CAMPUSES, DEPARTMENTS, COLLEGE_TYPES, getDepartmentsByType } from '@/types/student';

interface SearchAndFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  totalStudents: number;
  filteredCount: number;
}

export const SearchAndFilters = ({ 
  filters, 
  onFiltersChange, 
  totalStudents, 
  filteredCount 
}: SearchAndFiltersProps) => {
  const updateFilter = (key: keyof SearchFilters, value: string) => {
    console.log('Updating filter:', key, value); // Debug log
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    onFiltersChange({
      searchTerm: '',
      selectedCampus: '',
      selectedDepartment: '',
      selectedYear: '',
      selectedCollegeType: ''
    });
  };

  const hasActiveFilters = filters.searchTerm || filters.selectedCampus || 
                          filters.selectedDepartment || filters.selectedYear || filters.selectedCollegeType;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-4 sm:p-6 rounded-2xl mb-6 sm:mb-8 sticky top-2 sm:top-4 z-40 mobile-card"
    >
      {/* Search Bar */}
      <div className="relative mb-4 sm:mb-6 mobile-search">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <input
          type="text"
          placeholder="Search by roll number..."
          value={filters.searchTerm}
          onChange={(e) => updateFilter('searchTerm', e.target.value)}
          className="w-full pl-12 pr-4 py-3 sm:py-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-foreground placeholder:text-muted-foreground text-base touch-target"
        />
        {filters.searchTerm && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => updateFilter('searchTerm', '')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-muted/20 transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        )}
      </div>

      {/* Filters */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 mobile-filters tablet-filters ${
        filters.selectedCollegeType === 'bba' || filters.selectedCollegeType === 'forensic' 
          ? 'lg:grid-cols-3' 
          : 'lg:grid-cols-5'
      }`}>

        {/* College Type Filter */}
        <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Program</label>
          <select
            value={filters.selectedCollegeType}
            onChange={(e) => updateFilter('selectedCollegeType', e.target.value)}
            className="w-full p-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-foreground z-50"
          >
            <option value="">All Programs</option>
            {COLLEGE_TYPES.map(type => (
              <option key={type.id} value={type.id}>
                {type.icon} {type.name}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Campus Filter - Hide for BBA and Forensic */}
        {filters.selectedCollegeType !== 'bba' && filters.selectedCollegeType !== 'forensic' && (
          <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Campus</label>
            <select
              value={filters.selectedCampus}
              onChange={(e) => updateFilter('selectedCampus', e.target.value)}
              className="w-full p-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-foreground z-50"
            >
              <option value="">All Campuses</option>
              {CAMPUSES
                .filter(campus => !filters.selectedCollegeType || campus.type === filters.selectedCollegeType)
                .map(campus => (
                <option key={campus.id} value={campus.id}>
                  {campus.name} - {campus.fullName.split('(')[1]?.replace(')', '') || campus.fullName}
                </option>
              ))}
            </select>
          </motion.div>
        )}

        {/* Department Filter - Hide for BBA and Forensic */}
        {filters.selectedCollegeType !== 'bba' && filters.selectedCollegeType !== 'forensic' && (
          <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Department</label>
            <select
              value={filters.selectedDepartment}
              onChange={(e) => updateFilter('selectedDepartment', e.target.value)}
              className="w-full p-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-foreground z-50"
            >
              <option value="">All Departments</option>
              {(filters.selectedCollegeType ? getDepartmentsByType(filters.selectedCollegeType) : DEPARTMENTS).map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.icon} {dept.name} - {dept.fullName}
                </option>
              ))}
            </select>
          </motion.div>
        )}

        {/* Year Filter */}
        <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Year</label>
          <select
            value={filters.selectedYear}
            onChange={(e) => updateFilter('selectedYear', e.target.value)}
            className="w-full p-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-foreground z-50"
          >
            <option value="">All Years</option>
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </motion.div>

        {/* Clear Filters */}
        <motion.div className="space-y-2">
          <label className="block text-sm font-medium text-transparent">Clear</label>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearFilters}
            disabled={!hasActiveFilters}
            className={`w-full p-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
              hasActiveFilters 
                ? 'bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/20' 
                : 'bg-muted/20 text-muted-foreground cursor-not-allowed border border-muted/20'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Clear Filters</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Results Count */}
      <motion.div
        key={filteredCount}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center justify-between text-sm text-muted-foreground"
      >
        <span>
          {hasActiveFilters && (
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-primary font-medium"
            >
              Filters active
            </motion.span>
          )}
        </span>
      </motion.div>
    </motion.div>
  );
};