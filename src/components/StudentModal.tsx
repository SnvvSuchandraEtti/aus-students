import { motion, AnimatePresence } from 'framer-motion';
import { X, User, MapPin, GraduationCap, Calendar, Building } from 'lucide-react';
import { Student } from '@/types/student';

interface StudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StudentModal = ({ student, isOpen, onClose }: StudentModalProps) => {
  if (!student) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
              rotateX: 0,
              rotateY: 0
            }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            whileHover={{
              rotateX: 2,
              rotateY: 2,
              transition: { duration: 0.3 }
            }}
            className="glass-card max-w-2xl w-full max-h-[90vh] overflow-hidden rounded-3xl p-0 relative"
            style={{ perspective: "1000px" }}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full glass hover:bg-destructive/20 transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </motion.button>

            <div className="grid md:grid-cols-2 gap-0 h-full">
              {/* Image Section */}
              <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 p-6 flex items-center justify-center">
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-64 h-64 rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <img
                      src={student.imageUrl}
                      alt={student.rollNumber}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden w-full h-full flex items-center justify-center bg-muted/20">
                      <div className="text-center">
                        <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Image Not Available</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Floating elements */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-2 -right-2 text-4xl"
                  >
                    {student.department.icon}
                  </motion.div>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-6 flex flex-col justify-center space-y-6">
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-2">
                    {student.rollNumber}
                  </h2>
                  <p className="text-muted-foreground">Student Profile</p>
                </motion.div>

                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{student.department.fullName}</p>
                      <p className="text-sm text-muted-foreground">Department</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
                    <Building className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{student.campus.fullName}</p>
                      <p className="text-sm text-muted-foreground">Campus</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{student.campus.name}</p>
                      <p className="text-sm text-muted-foreground">Location</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Batch {student.year}</p>
                      <p className="text-sm text-muted-foreground">Academic Year</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="pt-4 border-t border-border"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Roll Number Pattern</span>
                    <code className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-mono">
                      {student.campus.prefix}{student.department.code}XX
                    </code>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};