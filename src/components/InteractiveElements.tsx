import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Scroll-triggered animations
export const ScrollReveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Interactive stats counter
export const CountingNumber = ({ target, duration = 2 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev >= target) {
          clearInterval(timer);
          return target;
        }
        return Math.min(prev + increment, target);
      });
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <motion.span
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className="font-bold text-2xl text-primary"
    >
      {Math.floor(count).toLocaleString()}
    </motion.span>
  );
};

// Modern card with hover effects
export const ModernCard = ({ 
  children, 
  className = "",
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  return (
    <motion.div
      className={`relative glass-card p-6 rounded-2xl border border-border/50 ${className}`}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

// Loading spinner with modern design
export const ModernSpinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} border-2 border-primary/20 border-t-primary rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};
