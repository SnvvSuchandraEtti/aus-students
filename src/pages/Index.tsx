import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import AdityaLogo from '/lovable-uploads/61cec41c-2099-4569-a713-5fe165947d1f.png';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

import { ParticleBackground } from '@/components/ParticleBackground';
import { SearchAndFilters } from '@/components/SearchAndFilters';
import { StudentCard } from '@/components/StudentCard';
import { StudentModal } from '@/components/StudentModal';
import { FloatingShapes, GridPattern } from '@/components/ModernGraphics';
import { ScrollReveal, ModernCard } from '@/components/InteractiveElements';

import { Student, SearchFilters, generateStudentData } from '@/types/student';

const ITEMS_PER_PAGE = 150;

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Generate data ONCE (cached at module level)
  const students = useMemo(() => generateStudentData(), []);
  
  // Shuffle once for home page display
  const shuffledStudents = useMemo(() => {
    const shuffled = [...students];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [students]);
  
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [filters, setFilters] = useState<SearchFilters>(() => ({
    searchTerm: searchParams.get('search') || '',
    selectedCampus: searchParams.get('campus') || '',
    selectedDepartment: searchParams.get('dept') || '',
    selectedYear: searchParams.get('year') || '',
    selectedCollegeType: searchParams.get('program') || ''
  }));
  
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get('page');
    return page ? parseInt(page, 10) : 1;
  });

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.searchTerm) params.set('search', filters.searchTerm);
    if (filters.selectedCampus) params.set('campus', filters.selectedCampus);
    if (filters.selectedDepartment) params.set('dept', filters.selectedDepartment);
    if (filters.selectedYear) params.set('year', filters.selectedYear);
    if (filters.selectedCollegeType) params.set('program', filters.selectedCollegeType);
    if (currentPage > 1) params.set('page', currentPage.toString());
    setSearchParams(params, { replace: true });
  }, [filters, currentPage, setSearchParams]);

  const handleFiltersChange = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const filteredStudents = useMemo(() => {
    const noFiltersApplied = !filters.searchTerm && !filters.selectedCampus && 
                           !filters.selectedDepartment && !filters.selectedYear && 
                           !filters.selectedCollegeType;

    if (noFiltersApplied) return shuffledStudents;

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
  }, [students, shuffledStudents, filters]);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredStudents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredStudents, currentPage]);

  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);

  const handleStudentClick = useCallback((student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseModal();
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
  }, [isModalOpen, handleCloseModal]);

  return (
    <div className="min-h-screen relative">
      <FloatingShapes />
      <GridPattern />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <Suspense fallback={<div className="h-48 sm:h-96" />}>
          <ParticleBackground />
        </Suspense>
        
        <div className="relative z-10 container mx-auto px-4 py-6 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 sm:mb-8"
            >
              <img 
                src={AdityaLogo} 
                alt="Aditya University Logo" 
                className="w-28 h-14 sm:w-48 sm:h-24 lg:w-64 lg:h-32 mx-auto object-contain drop-shadow-2xl"
              />
            </motion.div>
            
            <h1 className="text-3xl sm:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-orange-500 to-blue-800 bg-clip-text text-transparent tracking-tight">
              Aditya Student Gallery
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <section id="search-section" className="mb-8 sm:mb-12">
          <ScrollReveal>
            <SearchAndFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              totalStudents={students.length}
              filteredCount={filteredStudents.length}
            />
          </ScrollReveal>
        </section>

        {/* Student Gallery - no per-card framer-motion delays */}
        <ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
            {paginatedStudents.map((student, index) => (
              <StudentCard
                key={student.rollNumber}
                student={student}
                onClick={handleStudentClick}
                index={index}
              />
            ))}
          </div>
        </ScrollReveal>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 sm:mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  if (pageNumber > totalPages) return null;
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNumber)}
                        isActive={currentPage === pageNumber}
                        className="cursor-pointer"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* No Results */}
        {filteredStudents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <ModernCard className="p-12 rounded-3xl max-w-md mx-auto">
              <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">No Students Found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or filters
              </p>
              <button
                onClick={() => handleFiltersChange({
                  searchTerm: '',
                  selectedCampus: '',
                  selectedDepartment: '',
                  selectedYear: '',
                  selectedCollegeType: ''
                })}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
              >
                Clear All Filters
              </button>
            </ModernCard>
          </motion.div>
        )}
      </div>

      <StudentModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;
