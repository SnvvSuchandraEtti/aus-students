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
  const [shouldRender, setShouldRender] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setShouldRender(false); // Hide the entire card when image fails
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
    setShouldRender(true); // Show the card when image loads successfully
  };

  // Don't render the card if image failed to load
  if (!shouldRender && imageError) {
    return null;
  }

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
        <div className="relative aspect-[3/4] mb-3 overflow-hidden rounded-xl">
          <motion.img
            src={student.imageUrl}
            alt={student.rollNumber}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
          
          {/* Loading shimmer */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-r from-muted/20 via-muted/40 to-muted/20 animate-pulse" />
          )}
          
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