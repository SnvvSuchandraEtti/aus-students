import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';

import { ThemeToggle } from '@/components/ThemeToggle';
import { ParticleBackground } from '@/components/ParticleBackground';
import { SearchAndFilters } from '@/components/SearchAndFilters';
import { StudentCard } from '@/components/StudentCard';
import { StudentModal } from '@/components/StudentModal';
import { StatsSection } from '@/components/StatsSection';

import { Student, SearchFilters, generateStudentData } from '@/types/student';

const Index = () => {
  const [students] = useState<Student[]>(() => generateStudentData());
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    selectedCampus: '',
    selectedDepartment: '',
    selectedYear: '',
    selectedCollegeType: ''
  });

  // Filter students based on search criteria
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = !filters.searchTerm || 
        student.rollNumber.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesCampus = !filters.selectedCampus || 
        student.campus.id === filters.selectedCampus;
      
      const matchesDepartment = !filters.selectedDepartment || 
        student.department.id === filters.selectedDepartment;
      
      const matchesYear = !filters.selectedYear || 
        student.year === filters.selectedYear;

      const matchesCollegeType = !filters.selectedCollegeType || 
        student.campus.type === filters.selectedCollegeType;

      return matchesSearch && matchesCampus && matchesDepartment && matchesYear && matchesCollegeType;
    });
  }, [students, filters]);

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <div className="min-h-screen relative">
      <ThemeToggle />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <Suspense fallback={<div className="h-96" />}>
          <ParticleBackground />
        </Suspense>
        
        <div className="relative z-10 container mx-auto px-4 py-8 sm:py-16 mobile-hero">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block mb-6"
            >
              <GraduationCap className="w-20 h-20 text-primary mx-auto" />
            </motion.div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
              Aditya Student Gallery
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
            >
              Discover students from all Aditya institutions - Engineering, Diploma, Pharmacy, Business & Forensic Science
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center space-x-2 text-muted-foreground"
            >
              <Sparkles className="w-4 h-4" />
              <span>Premium Student Portal Experience</span>
              <Sparkles className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        {/* Statistics Section */}
        <StatsSection students={students} />
        
        {/* Search and Filters */}
        <SearchAndFilters
          filters={filters}
          onFiltersChange={setFilters}
          totalStudents={students.length}
          filteredCount={filteredStudents.length}
        />

        {/* Student Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mobile-grid tablet-grid tablet-lg-grid xs-mobile-grid"
        >
          {filteredStudents.slice(0, 120).map((student, index) => (
            <StudentCard
              key={student.rollNumber}
              student={student}
              onClick={handleStudentClick}
              index={index}
            />
          ))}
        </motion.div>

        {/* Load More Message */}
        {filteredStudents.length > 120 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12 p-6 glass-card rounded-2xl"
          >
            <p className="text-muted-foreground mb-2">
              Showing first 120 of {filteredStudents.length} results
            </p>
            <p className="text-sm text-muted-foreground">
              Use search and filters to narrow down results
            </p>
          </motion.div>
        )}

        {/* No Results */}
        {filteredStudents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="glass-card p-12 rounded-3xl max-w-md mx-auto">
              <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">No Students Found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or filters
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilters({
                  searchTerm: '',
                  selectedCampus: '',
                  selectedDepartment: '',
                  selectedYear: '',
                  selectedCollegeType: ''
                })}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
              >
                Clear All Filters
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Student Modal */}
      <StudentModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;
