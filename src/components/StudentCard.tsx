import { useState, useRef, useEffect } from 'react';
import { Student } from '@/types/student';
import { User } from 'lucide-react';

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
      className="group cursor-pointer"
      style={{ 
        animationDelay: `${Math.min(index * 10, 200)}ms`, 
        animationFillMode: 'both',
        animation: 'fadeIn 0.3s ease-out forwards',
        opacity: 0,
      }}
      onClick={() => onClick(student)}
    >
      <div className="rounded-xl overflow-hidden bg-card border border-border/50 h-full transition-all duration-200 group-hover:shadow-lg group-hover:shadow-primary/8 group-hover:-translate-y-0.5 group-hover:border-primary/20">
        {/* Image */}
        <div className="relative aspect-[3/4] bg-muted/30 overflow-hidden">
          {isVisible && !imageError ? (
            <img
              src={student.imageUrl}
              alt={student.rollNumber}
              className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-[1.03] ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => { setImageLoaded(true); setImageError(false); }}
              onError={() => { setImageError(true); setImageLoaded(false); }}
              loading="lazy"
            />
          ) : null}
          
          {imageError && (
            <div className="w-full h-full bg-muted/20 flex flex-col items-center justify-center gap-1.5">
              <div className="w-10 h-10 rounded-full bg-muted/40 flex items-center justify-center">
                <User className="w-5 h-5 text-muted-foreground/50" />
              </div>
              <span className="text-[9px] text-muted-foreground/60 font-mono">{student.rollNumber}</span>
            </div>
          )}
          
          {isVisible && !imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-muted/30 animate-pulse" />
          )}

          {!isVisible && (
            <div className="w-full h-full bg-muted/10" />
          )}

          {/* Year badge */}
          <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-background/80 backdrop-blur-sm text-[9px] font-medium text-foreground/80 border border-border/30">
            {student.year}
          </div>
        </div>
        
        {/* Info */}
        <div className="p-2.5 sm:p-3 space-y-1">
          <div className="flex items-center justify-between gap-1">
            <h3 className="font-semibold text-[11px] sm:text-xs text-foreground group-hover:text-primary transition-colors truncate font-mono tracking-tight">
              {student.rollNumber}
            </h3>
            <span className="text-sm flex-shrink-0 leading-none">{student.department.icon}</span>
          </div>
          
          <p className="text-[9px] sm:text-[10px] text-muted-foreground truncate">
            {student.department.name} · {student.campus.name}
          </p>
        </div>
      </div>
    </div>
  );
};
