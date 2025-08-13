import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';
import AdityaLogo from '/lovable-uploads/61cec41c-2099-4569-a713-5fe165947d1f.png';
import { Button } from '@/components/ui/button';

import { ParticleBackground } from '@/components/ParticleBackground';
import { SearchAndFilters } from '@/components/SearchAndFilters';
import { StudentCard } from '@/components/StudentCard';
import { StudentModal } from '@/components/StudentModal';
import { FloatingShapes, GridPattern } from '@/components/ModernGraphics';
import { ScrollReveal, ModernCard } from '@/components/InteractiveElements';

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
    let filtered = students.filter(student => {
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

    // Keep original order when no filters applied for consistent display

    return filtered;
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
      <FloatingShapes />
      <GridPattern />
      
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
            {/* University Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <img 
                src={AdityaLogo} 
                alt="Aditya University Logo" 
                className="w-32 h-16 sm:w-48 sm:h-24 lg:w-64 lg:h-32 mx-auto object-contain drop-shadow-2xl"
              />
            </motion.div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-orange-500 to-blue-800 bg-clip-text text-transparent tracking-tight">
              Aditya Student Gallery
            </h1>
            
          </motion.div>
        </div>
      </div>


      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        {/* Search and Filters */}
        <section id="search-section" className="mb-12">
          <ScrollReveal>
            <SearchAndFilters
              filters={filters}
              onFiltersChange={setFilters}
              totalStudents={students.length}
              filteredCount={filteredStudents.length}
            />
          </ScrollReveal>
        </section>

        {/* Student Gallery */}
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mobile-grid tablet-grid tablet-lg-grid xs-mobile-grid"
          >
            {filteredStudents.slice(0, 120).map((student, index) => (
              <motion.div
                key={student.rollNumber}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02, duration: 0.3 }}
                
              >
                <StudentCard
                  student={student}
                  onClick={handleStudentClick}
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
        </ScrollReveal>


        {/* No Results */}
        {filteredStudents.length === 0 && (
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <ModernCard className="p-12 rounded-3xl max-w-md mx-auto">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                </motion.div>
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
              </ModernCard>
            </motion.div>
          </ScrollReveal>
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
