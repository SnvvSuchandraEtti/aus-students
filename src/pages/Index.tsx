import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';
import AdityaLogo from '@/assets/aditya-university-logo.png';
import { Button } from '@/components/ui/button';

import { ThemeToggle } from '@/components/ThemeToggle';
import { ParticleBackground } from '@/components/ParticleBackground';
import { SearchAndFilters } from '@/components/SearchAndFilters';
import { StudentCard } from '@/components/StudentCard';
import { StudentModal } from '@/components/StudentModal';
import { StatsSection } from '@/components/StatsSection';
import { FloatingShapes, CursorTrail, GridPattern } from '@/components/ModernGraphics';
import { ScrollReveal, ParallaxCard, FeatureShowcase, CountingNumber, ModernCard } from '@/components/InteractiveElements';

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
      <FloatingShapes />
      <CursorTrail />
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
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl lg:text-3xl text-muted-foreground mb-6 sm:mb-8 max-w-4xl mx-auto px-4 leading-relaxed font-light"
            >
              Discover the brilliant minds of <span className="font-semibold text-primary bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">Aditya University</span>
              <br />
              <span className="text-base sm:text-lg lg:text-xl">Find students by roll number, department, or campus across all engineering programs</span>
            </motion.p>
            
            {/* Enhanced Stats Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto mb-8"
            >
              <div className="text-center group">
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl p-4 sm:p-6 mb-4 border border-primary/20 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2">
                    <CountingNumber target={filteredStudents.length} />+
                  </div>
                  <div className="text-sm sm:text-base text-muted-foreground font-medium">Students</div>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-2xl p-4 sm:p-6 mb-4 border border-orange-500/20 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-600 mb-2">
                    <CountingNumber target={4} />
                  </div>
                  <div className="text-sm sm:text-base text-muted-foreground font-medium">Campuses</div>
                </div>
              </div>
              
              <div className="text-center group">
                <div className="bg-gradient-to-br from-blue-600/20 to-blue-600/10 rounded-2xl p-4 sm:p-6 mb-4 border border-blue-600/20 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                    <CountingNumber target={12} />+
                  </div>
                  <div className="text-sm sm:text-base text-muted-foreground font-medium">Departments</div>
                </div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Student Gallery
              </Button>
              
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Real Aditya University Data</span>
                <Sparkles className="w-4 h-4 text-blue-600" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <ScrollReveal>
        <section className="relative z-10 py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
                Modern Student Experience
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience the future of student connectivity with our cutting-edge platform
              </p>
            </div>
            <FeatureShowcase />
          </div>
        </section>
      </ScrollReveal>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        {/* Statistics Section */}
        <ParallaxCard offset={30}>
          <StatsSection students={students} />
        </ParallaxCard>
        
        {/* Search and Filters */}
        <section id="search-section" className="mb-12">
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                Find Your Peers
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Search through our comprehensive database of students across all Aditya University campuses
              </p>
            </motion.div>
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
                whileHover={{ y: -5, scale: 1.02 }}
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
