import { useState, useRef, useEffect } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for lazy rendering
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="group cursor-pointer animate-fade-in"
      style={{ animationDelay: `${Math.min(index * 15, 300)}ms`, animationFillMode: 'both' }}
      onClick={() => onClick(student)}
    >
      <div className="glass-card rounded-2xl p-3 sm:p-4 h-full transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-1 will-change-transform">
        {/* Image Container */}
        <div className="relative aspect-[3/4] mb-3 overflow-hidden rounded-xl bg-muted/30">
          {isVisible && !imageError ? (
            <img
              src={student.imageUrl}
              alt={student.rollNumber}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => { setImageLoaded(true); setImageError(false); }}
              onError={() => { setImageError(true); setImageLoaded(false); }}
              loading="lazy"
            />
          ) : null}
          
          {/* Error fallback */}
          {imageError && (
            <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10 flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-6 h-6 text-primary/40" />
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">{student.rollNumber}</span>
            </div>
          )}
          
          {/* Skeleton loading */}
          {isVisible && !imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-muted/40 animate-pulse rounded-xl" />
          )}

          {/* Placeholder before visible */}
          {!isVisible && (
            <div className="w-full h-full bg-muted/20 rounded-xl" />
          )}
        </div>
        
        {/* Card Content */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors truncate">
              {student.rollNumber}
            </h3>
            <span className="text-base sm:text-lg flex-shrink-0">{student.department.icon}</span>
          </div>
          
          <div className="space-y-0.5">
            <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground">
              <GraduationCap className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="truncate">{student.department.name}</span>
            </div>
            
            <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground">
              <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="truncate">{student.campus.name}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-1">
            <span className="text-[10px] sm:text-xs font-medium px-2 py-0.5 bg-primary/10 text-primary rounded-full">
              {student.year}
            </span>
            <span className="text-[10px] text-muted-foreground truncate ml-1">
              {student.campus.fullName.split('(')[1]?.replace(')', '') || 'Campus'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
