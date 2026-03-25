import { motion } from 'framer-motion';

export const FloatingShapes = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <motion.div
      animate={{
        y: [0, -30, 0],
        rotate: [0, 10, 0],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
    />
    <motion.div
      animate={{
        y: [0, 30, 0],
        rotate: [0, -10, 0],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
    />
  </div>
);

export const GridPattern = () => (
  <div className="fixed inset-0 -z-20 opacity-[0.03] pointer-events-none">
    <div className="absolute inset-0" style={{
      backgroundImage: `linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)`,
      backgroundSize: '40px 40px'
    }} />
  </div>
);
