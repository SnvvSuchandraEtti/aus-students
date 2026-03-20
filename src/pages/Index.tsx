import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
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
  
  const students = useMemo(() => generateStudentData(), []);
  
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
    selectedCollegeType: searchParams.get('program') || '',
    isLateralEntry: searchParams.get('le') === '1'
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
    if (filters.isLateralEntry) params.set('le', '1');
    if (currentPage > 1) params.set('page', currentPage.toString());
    setSearchParams(params, { replace: true });
  }, [filters, currentPage, setSearchParams]);

  const handleFiltersChange = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      
      const upper = student.rollNumber.toUpperCase();
      const isLE = /\d{2}(A9|P3|MH)5A/.test(upper);
      const matchesLE = filters.selectedCollegeType !== 'engineering' || 
        (filters.isLateralEntry ? isLE : !isLE);
      
      return matchesSearch && matchesCampus && matchesDepartment && matchesYear && matchesCollegeType && matchesLE;
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

  const handleNavigateStudent = useCallback((student: Student) => {
    setSelectedStudent(student);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseModal();
      if (isModalOpen && selectedStudent) {
        const idx = paginatedStudents.findIndex(s => s.rollNumber === selectedStudent.rollNumber);
        if (e.key === 'ArrowLeft' && idx > 0) {
          handleNavigateStudent(paginatedStudents[idx - 1]);
        }
        if (e.key === 'ArrowRight' && idx < paginatedStudents.length - 1) {
          handleNavigateStudent(paginatedStudents[idx + 1]);
        }
      }
    };
    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, handleCloseModal, selectedStudent, paginatedStudents, handleNavigateStudent]);

  return (
    <div className="min-h-screen relative flex flex-col">
      <FloatingShapes />
      <GridPattern />
      
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <ParticleBackground />
        
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
            
            <h1 className="text-3xl sm:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent tracking-tight">
              Aditya Student Gallery
            </h1>
            
            <Link
              to="/game-zone"
              className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-sm shadow-lg shadow-purple-900/30 active:scale-95 transition-transform"
            >
              <Gamepad2 className="w-4 h-4" />
              Game Zone 🎮
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16 flex-1">
        <section id="search-section" className="mb-6 sm:mb-8">
          <ScrollReveal>
            <SearchAndFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </ScrollReveal>
        </section>


        {/* Student Gallery */}
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
          <nav aria-label="Pagination" className="mt-8 sm:mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => { setCurrentPage(prev => Math.max(1, prev - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  if (pageNumber > totalPages) return null;
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => { setCurrentPage(pageNumber); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
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
                    onClick={() => { setCurrentPage(prev => Math.min(totalPages, prev + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </nav>
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
                  selectedCollegeType: '',
                  isLateralEntry: false
                })}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
              >
                Clear All Filters
              </button>
            </ModernCard>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Aditya University Student Gallery. All rights reserved.
          </p>
        </div>
      </footer>

      <StudentModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        filteredStudents={paginatedStudents}
        onNavigate={handleNavigateStudent}
      />
    </div>
  );
};

export default Index;
