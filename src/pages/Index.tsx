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
import { ScrollToTop } from '@/components/ScrollToTop';
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
        if (e.key === 'ArrowLeft' && idx > 0) handleNavigateStudent(paginatedStudents[idx - 1]);
        if (e.key === 'ArrowRight' && idx < paginatedStudents.length - 1) handleNavigateStudent(paginatedStudents[idx + 1]);
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
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
        <ParticleBackground />
        <div className="relative z-10 container mx-auto px-4 py-8 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.img
              src={AdityaLogo}
              alt="Aditya University Logo"
              className="w-24 h-12 sm:w-40 sm:h-20 mx-auto object-contain mb-4 sm:mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            />
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-2 text-foreground tracking-tight">
              Student <span className="text-gradient bg-gradient-to-r from-primary to-primary-glow">Gallery</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
              Browse and discover student profiles across all campuses
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-3 sm:px-4 pb-16 flex-1 -mt-2">
        <section className="mb-4 sm:mb-6">
          <SearchAndFilters filters={filters} onFiltersChange={handleFiltersChange} />
        </section>

        <ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
            {paginatedStudents.map((student, index) => (
              <StudentCard key={student.rollNumber} student={student} onClick={handleStudentClick} index={index} />
            ))}
          </div>
        </ScrollReveal>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav aria-label="Pagination" className="mt-8 flex justify-center">
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <ModernCard className="p-10 rounded-2xl max-w-sm mx-auto">
              <GraduationCap className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-foreground mb-1">No Students Found</h3>
              <p className="text-sm text-muted-foreground mb-4">Try adjusting your filters</p>
              <button
                onClick={() => handleFiltersChange({
                  searchTerm: '', selectedCampus: '', selectedDepartment: '',
                  selectedYear: '', selectedCollegeType: '', isLateralEntry: false
                })}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Clear Filters
              </button>
            </ModernCard>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 py-5 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} Aditya University Student Gallery
          </p>
        </div>
      </footer>

      <ScrollToTop />

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
