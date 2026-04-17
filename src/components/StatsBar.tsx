import { motion } from 'framer-motion';
import { Users, Building2, BookOpen, Star } from 'lucide-react';

interface StatsBarProps {
  total: number;
  filtered: number;
  campuses: number;
  departments: number;
  favoritesCount: number;
}

export const StatsBar = ({ total, filtered, campuses, departments, favoritesCount }: StatsBarProps) => {
  const stats = [
    { icon: Users, label: 'Showing', value: filtered.toLocaleString(), sub: `of ${total.toLocaleString()}` },
    { icon: Building2, label: 'Campuses', value: campuses.toString() },
    { icon: BookOpen, label: 'Departments', value: departments.toString() },
    { icon: Star, label: 'Favorites', value: favoritesCount.toString() },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-card/80 backdrop-blur-sm border border-border/40"
        >
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <s.icon className="w-3.5 h-3.5 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">{s.label}</div>
            <div className="text-sm font-bold text-foreground leading-tight">
              {s.value}
              {s.sub && <span className="text-[10px] font-normal text-muted-foreground ml-1">{s.sub}</span>}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
