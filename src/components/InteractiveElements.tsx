import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export const ScrollReveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export const CountingNumber = ({ target, duration = 2 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev >= target) { clearInterval(timer); return target; }
        return Math.min(prev + increment, target);
      });
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span className="font-bold text-2xl text-primary tabular-nums">
      {Math.floor(count).toLocaleString()}
    </span>
  );
};

export const ModernCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative glass-card p-6 rounded-2xl ${className}`}>
    {children}
  </div>
);

export const ModernSpinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = { sm: "w-4 h-4", md: "w-8 h-8", lg: "w-12 h-12" };
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
