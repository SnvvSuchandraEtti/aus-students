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
      role="button"
      tabIndex={0}
      aria-label={`View details for student ${student.rollNumber}`}
      className="group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl"
      style={{ 
        animationDelay: `${Math.min(index * 10, 200)}ms`, 
        animationFillMode: 'both',
        animation: 'fadeIn 0.3s ease-out forwards',
        opacity: 0,
      }}
      onClick={() => onClick(student)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(student); } }}
    >
      <div className="rounded-xl overflow-hidden bg-card border border-transparent transition-all duration-300 group-hover:-translate-y-1 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
        {/* Image */}
        <div className="relative aspect-[3/4] bg-muted/30 overflow-hidden">
          {isVisible && !imageError ? (
            <img
              src={student.imageUrl}
              alt={`Photo of student ${student.rollNumber}`}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
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

          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

          {/* Top-left pill for department/campus */}
          <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-background/60 backdrop-blur-md border border-white/10 text-[9px] font-medium text-foreground flex items-center gap-1 shadow-sm">
            <span>{student.department.icon}</span>
            {student.department.name} · {student.campus.name}
          </div>

          {/* Year badge */}
          <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-[9px] font-bold text-primary dark:shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            {student.year}
          </div>

          {/* Roll number at the bottom */}
          <div className="absolute bottom-1.5 left-2 right-2 text-white z-10">
            <h3 className="font-bold text-[11px] sm:text-xs font-mono tracking-wider drop-shadow-md truncate">
              {student.rollNumber}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
