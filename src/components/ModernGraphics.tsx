import { motion } from 'framer-motion';

// Floating geometric shapes component
export const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl"
        animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-60 right-20 w-24 h-24 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-lg"
        animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 0.8, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-40 left-1/3 w-20 h-20 bg-gradient-to-bl from-accent/15 to-secondary/15 rounded-full blur-md"
        animate={{ x: [0, 60, 0], y: [0, -40, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/4 right-1/4 w-16 h-16 border border-primary/20 rotate-45"
        animate={{ rotate: [45, 225, 45], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-10 w-12 h-12 bg-gradient-to-r from-primary/10 to-transparent"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        animate={{ rotate: [0, 360], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

// Modern grid pattern
export const GridPattern = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary/10"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};
