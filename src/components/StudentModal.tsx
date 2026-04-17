import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, MapPin, GraduationCap, Calendar, Building, Copy, Check, ChevronLeft, ChevronRight, ExternalLink, Star } from 'lucide-react';
import { Student } from '@/types/student';
import { toast } from '@/hooks/use-toast';
import { useFavorites } from '@/hooks/useFavorites';

interface StudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  filteredStudents?: Student[];
  onNavigate?: (student: Student) => void;
}

const getBatchLabel = (student: Student): string => {
  const startYear = parseInt(student.year);
  switch (student.campus.type) {
    case 'engineering':
    case 'pharma':
      return `${startYear}–${(startYear + 4) % 100}`;
    case 'diploma':
    case 'bba':
      return `${startYear}–${(startYear + 3) % 100}`;
    default:
      return student.year;
  }
};

export const StudentModal = ({ student, isOpen, onClose, filteredStudents = [], onNavigate }: StudentModalProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [rollCopied, setRollCopied] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!student) return null;

  const currentIndex = filteredStudents.findIndex(s => s.rollNumber === student.rollNumber);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < filteredStudents.length - 1 && currentIndex !== -1;

  const goTo = (dir: -1 | 1) => {
    const next = filteredStudents[currentIndex + dir];
    if (next && onNavigate) {
      setImageError(false);
      setImageLoaded(false);
      onNavigate(next);
    }
  };

  const copyRollNumber = async () => {
    await navigator.clipboard.writeText(student.rollNumber);
    setRollCopied(true);
    toast({ title: 'Copied!', description: `${student.rollNumber} copied to clipboard` });
    setTimeout(() => setRollCopied(false), 2000);
  };

  const profileUrl = `${window.location.origin}/?search=${encodeURIComponent(student.rollNumber)}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(profileUrl)}&bgcolor=ffffff&color=000000`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-background/60 backdrop-blur-md"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          {/* Nav buttons */}
          {hasPrev && (
            <button
              onClick={() => goTo(-1)}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
          )}
          {hasNext && (
            <button
              onClick={() => goTo(1)}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          )}

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="bg-card border border-border/50 max-w-xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl shadow-foreground/5 relative"
          >
            {/* Top actions */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1">
              <button
                onClick={() => toggleFavorite(student.rollNumber)}
                className="p-2 rounded-lg hover:bg-muted/60 transition-colors"
                aria-label="Toggle favorite"
              >
                <Star className={`w-4 h-4 ${isFavorite(student.rollNumber) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted/60 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row">
              {/* Image */}
              <div className="relative bg-muted/20 sm:w-52 flex-shrink-0 flex items-center justify-center p-6 sm:p-4">
                <div className="w-36 h-48 sm:w-44 sm:h-60 rounded-xl overflow-hidden shadow-lg">
                  {!imageError ? (
                    <>
                      <img
                        src={student.imageUrl}
                        alt={student.rollNumber}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => { setImageLoaded(true); setImageError(false); }}
                        onError={() => { setImageError(true); setImageLoaded(false); }}
                      />
                      {!imageLoaded && <div className="absolute inset-0 bg-muted/30 animate-pulse rounded-xl" />}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted/10">
                      <User className="w-12 h-12 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 p-5 sm:p-6 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground font-mono tracking-tight">
                      {student.rollNumber}
                    </h2>
                    <button
                      onClick={copyRollNumber}
                      className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
                      title="Copy roll number"
                    >
                      {rollCopied ? (
                        <Check className="w-3.5 h-3.5 text-primary" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">Student Profile</p>
                </div>

                <div className="space-y-2">
                  <DetailRow icon={<GraduationCap className="w-4 h-4 text-primary" />} label="Department" value={student.department.fullName} />
                  <DetailRow icon={<Building className="w-4 h-4 text-primary" />} label="Campus" value={student.campus.fullName} />
                  <DetailRow icon={<MapPin className="w-4 h-4 text-primary" />} label="Location" value={student.campus.name} />
                  <DetailRow icon={<Calendar className="w-4 h-4 text-primary" />} label="Batch" value={getBatchLabel(student)} />
                </div>

                {/* QR & Share */}
                <div className="flex items-center gap-3 pt-3 border-t border-border/40">
                  <img
                    src={qrUrl}
                    alt="QR Code"
                    className="w-14 h-14 rounded-lg border border-border/30"
                    loading="lazy"
                  />
                  <div className="space-y-1.5">
                    <p className="text-[10px] text-muted-foreground">Scan or share profile link</p>
                    <button
                      onClick={async () => {
                        await navigator.clipboard.writeText(profileUrl);
                        toast({ title: 'Link copied!', description: 'Profile URL copied to clipboard' });
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-medium bg-primary/10 text-primary hover:bg-primary/15 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Copy Link
                    </button>
                  </div>
                </div>

                {currentIndex !== -1 && (
                  <p className="text-[10px] text-muted-foreground text-center pt-1">
                    Use ← → arrow keys to navigate
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DetailRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-muted/30">
    <div className="mt-0.5">{icon}</div>
    <div className="min-w-0">
      <p className="font-medium text-sm text-foreground leading-tight">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  </div>
);
