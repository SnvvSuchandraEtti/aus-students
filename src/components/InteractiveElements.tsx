import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sparkles, Zap, Rocket, Star } from 'lucide-react';

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

// Parallax effect component
export const ParallaxCard = ({ children, offset = 50 }: { children: React.ReactNode; offset?: number }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, offset]);

  return (
    <motion.div style={{ y }} className="transform-gpu">
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
  glowColor = "primary"
}: { 
  children: React.ReactNode; 
  className?: string;
  glowColor?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative glass-card p-6 rounded-2xl border border-border/50 ${className}`}
      whileHover={{ scale: 1.02, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {isHovered && (
        <motion.div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-${glowColor}/10 to-accent/10 blur-xl`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

// Interactive feature showcase
export const FeatureShowcase = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Modern Design",
      description: "Beautiful glassmorphism with smooth animations",
      color: "text-blue-400"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance with React 18",
      color: "text-yellow-400"
    },
    {
      icon: Rocket,
      title: "Interactive UI",
      description: "Engaging user experience with Framer Motion",
      color: "text-purple-400"
    },
    {
      icon: Star,
      title: "Responsive",
      description: "Perfect on all devices and screen sizes",
      color: "text-green-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className="glass-card p-6 rounded-xl border border-border/30 hover:border-primary/30 transition-all duration-300"
        >
          <motion.div
            className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <feature.icon className={`w-6 h-6 ${feature.color}`} />
          </motion.div>
          <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </motion.div>
      ))}
    </div>
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