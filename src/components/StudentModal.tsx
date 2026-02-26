import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, MapPin, GraduationCap, Calendar, Building } from 'lucide-react';
import { Student } from '@/types/student';

interface StudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

const getBatchLabel = (student: Student): string => {
  const startYear = parseInt(student.year);
  switch (student.campus.type) {
    case 'engineering': return `${startYear}-${(startYear + 4) % 100}`;
    case 'pharma': return `${startYear}-${(startYear + 4) % 100}`;
    case 'diploma': return `${startYear}-${(startYear + 3) % 100}`;
    case 'bba': return `${startYear}-${(startYear + 3) % 100}`;
    default: return student.year;
  }
};

export const StudentModal = ({ student, isOpen, onClose }: StudentModalProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!student) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl p-0 relative mx-2 sm:mx-4"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full glass hover:bg-destructive/20 transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 p-4 sm:p-6 flex items-center justify-center">
                <div className="relative">
                  <div className="w-40 h-52 sm:w-48 sm:h-64 lg:w-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl">
                    {!imageError ? (
                      <>
                        <img
                          src={student.imageUrl}
                          alt={student.rollNumber}
                          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                          onLoad={() => { setImageLoaded(true); setImageError(false); }}
                          onError={() => { setImageError(true); setImageLoaded(false); }}
                        />
                        {!imageLoaded && (
                          <div className="absolute inset-0 bg-muted/40 animate-pulse" />
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted/20">
                        <div className="text-center">
                          <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground text-sm">Image Not Available</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Floating department icon */}
                  <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-2 -right-2 text-4xl"
                  >
                    {student.department.icon}
                  </motion.div>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-4 sm:p-6 flex flex-col justify-center space-y-4 sm:space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-2">
                    {student.rollNumber}
                  </h2>
                  <p className="text-muted-foreground">Student Profile</p>
                </div>

                <div className="space-y-3">
                  <DetailRow icon={<GraduationCap className="w-5 h-5 text-primary" />} label="Department" value={student.department.fullName} />
                  <DetailRow icon={<Building className="w-5 h-5 text-primary" />} label="Campus" value={student.campus.fullName} />
                  <DetailRow icon={<MapPin className="w-5 h-5 text-primary" />} label="Location" value={student.campus.name} />
                  <DetailRow icon={<Calendar className="w-5 h-5 text-primary" />} label="Batch" value={getBatchLabel(student)} />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DetailRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
    {icon}
    <div>
      <p className="font-medium text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  </div>
);
