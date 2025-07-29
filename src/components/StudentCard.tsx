import { useState } from 'react';
import { motion } from 'framer-motion';
import { Student } from '@/types/student';
import { User, MapPin, GraduationCap } from 'lucide-react';

interface StudentCardProps {
  student: Student;
  onClick: (student: Student) => void;
  index: number;
}

export const StudentCard = ({ student, onClick, index }: StudentCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleImageError = () => {
    if (retryCount < 3) {
      setRetryCount(prev => prev + 1);
      // Retry after a delay
      setTimeout(() => {
        setImageError(false);
      }, 1000);
    } else {
      setImageError(true);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      className="group cursor-pointer"
      onClick={() => onClick(student)}
    >
      <div className="glass-card rounded-2xl p-4 h-full transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/20">
        {/* Image Container */}
        <div className="relative aspect-square mb-3 overflow-hidden rounded-xl">
          {!imageError ? (
            <motion.img
              src={`${student.imageUrl}?retry=${retryCount}`}
              alt={student.rollNumber}
              className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted/20">
              <div className="text-center">
                <User className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Image Not Found</p>
              </div>
            </div>
          )}
          
          {/* Loading shimmer */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-r from-muted/20 via-muted/40 to-muted/20 animate-pulse" />
          )}
          
          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="text-center text-white">
              <GraduationCap className="w-6 h-6 mx-auto mb-1" />
              <p className="text-xs font-medium">View Details</p>
            </div>
          </motion.div>
        </div>
        
        {/* Card Content */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
              {student.rollNumber}
            </h3>
            <span className="text-lg">{student.department.icon}</span>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center text-xs text-muted-foreground">
              <GraduationCap className="w-3 h-3 mr-1" />
              <span>{student.department.name}</span>
            </div>
            
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{student.campus.name}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
              {student.year}
            </span>
            <span className="text-xs text-muted-foreground">
              {student.campus.fullName.split('(')[1]?.replace(')', '') || 'Campus'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};