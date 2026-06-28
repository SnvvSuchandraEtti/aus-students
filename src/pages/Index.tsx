import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import AdityaLogo from '/aditya-logo.png';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

import { ParticleBackground } from '@/components/ParticleBackground';
import { SearchAndFilters } from '@/components/SearchAndFilters';
import { StudentCard } from '@/components/StudentCard';
import { StudentModal } from '@/components/StudentModal';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ScrollReveal, ModernCard } from '@/components/InteractiveElements';
import { InstallPrompt } from '@/components/InstallPrompt';
import { VercelMirrorLink } from '@/components/VercelMirrorLink';
import { FindMyClassmatesModal } from '@/components/FindMyClassmatesModal';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';

import { Student, SearchFilters, generateStudentData, CAMPUSES, DEPARTMENTS } from '@/types/student';

const ITEMS_PER_PAGE = 150;

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const students = useMemo(() => generateStudentData(), []);
  const { addRecent } = useRecentlyViewed();
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
  const [isFindMyClassmatesModalOpen, setIsFindMyClassmatesModalOpen] = useState(false);

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

  // Dynamic page title for SEO
  useEffect(() => {
    const parts: string[] = [];
    if (filters.selectedCollegeType) parts.push(filters.selectedCollegeType.toUpperCase());
    if (filters.selectedCampus) {
      const c = CAMPUSES.find(x => x.id === filters.selectedCampus);
      if (c) parts.push(c.name);
    }
    if (filters.selectedDepartment) {
      const d = DEPARTMENTS.find(x => x.id === filters.selectedDepartment);
      if (d) parts.push(d.name);
    }
    if (filters.selectedYear) parts.push(filters.selectedYear);
    document.title = parts.length
      ? `${parts.join(' · ')} — Aditya University Student Gallery`
      : 'Aditya University Student Gallery — Browse Student Profiles';
  }, [filters]);

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
    addRecent(student.rollNumber);
  }, [addRecent]);

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
              className="w-28 h-14 sm:w-48 sm:h-24 mx-auto object-contain mb-4 sm:mb-6 dark:drop-shadow-[0_0_15px_rgba(34,211,238,0.3)] contrast-125 dark:contrast-100"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            />
            <h1 className="relative text-3xl sm:text-5xl lg:text-6xl font-bold mb-3 tracking-tight z-10">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent blur-2xl" />
              <span className="text-foreground">Student</span>{' '}
              <span className="bg-gradient-to-r from-cyan-500 to-purple-500 dark:from-cyan-400 dark:to-purple-400 text-transparent bg-clip-text relative inline-block">
                Gallery
                <span className="absolute -bottom-1 left-0 w-full h-[2px] sm:h-[3px] bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] dark:shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
              </span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground opacity-60 max-w-md mx-auto mb-6 mt-4">
              Browse and discover student profiles across all campuses
            </p>
            <button
              onClick={() => setIsFindMyClassmatesModalOpen(true)}
              className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
            >
              Find My Classmates 🎯
            </button>
          </motion.div>
        </div>
      </header>

      {/* Main */}
      <main className="container max-w-[1400px] mx-auto px-3 sm:px-4 pb-16 flex-1 -mt-2">
        <section className="mb-8 sm:mb-12">
          <SearchAndFilters filters={filters} onFiltersChange={handleFiltersChange} />
        </section>

        <ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
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
        <div className="container mx-auto px-4 text-center space-y-2">
          <p className="text-[11px] text-muted-foreground">
            Built by Suchandra Etti · Aditya University · 2025
          </p>
          <a
            href="https://adityans.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/50 bg-muted/30 text-[11px] text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
          >
            Also available on Vercel →
          </a>
        </div>
      </footer>

      <ScrollToTop />
      <InstallPrompt />
      <VercelMirrorLink />

      <StudentModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        filteredStudents={paginatedStudents}
        onNavigate={handleNavigateStudent}
      />

      <FindMyClassmatesModal 
        isOpen={isFindMyClassmatesModalOpen}
        onClose={() => setIsFindMyClassmatesModalOpen(false)}
        onApply={({ program, department, year }) => {
          handleFiltersChange({
            searchTerm: '',
            selectedCampus: '',
            selectedDepartment: department,
            selectedYear: year,
            selectedCollegeType: program,
            isLateralEntry: false
          });
        }}
      />
    </div>
  );
};

export default Index;
