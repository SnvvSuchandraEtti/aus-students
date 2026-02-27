import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Users, Building, GraduationCap, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { Student, CAMPUSES, COLLEGE_TYPES } from '@/types/student';
import { CountingNumber } from '@/components/InteractiveElements';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from 'recharts';

interface AnalyticsDashboardProps {
  students: Student[];
  filteredStudents: Student[];
}

const CHART_COLORS = [
  'hsl(210, 100%, 56%)',
  'hsl(142, 76%, 36%)',
  'hsl(38, 92%, 50%)',
  'hsl(0, 84%, 60%)',
  'hsl(280, 67%, 51%)',
  'hsl(190, 90%, 50%)',
  'hsl(340, 82%, 52%)',
  'hsl(160, 60%, 45%)',
];

export const AnalyticsDashboard = ({ filteredStudents }: AnalyticsDashboardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const programData = useMemo(() => {
    return COLLEGE_TYPES.map((ct, i) => ({
      name: ct.name,
      count: filteredStudents.filter(s => s.campus.type === ct.id).length,
      fill: CHART_COLORS[i % CHART_COLORS.length],
    })).filter(d => d.count > 0);
  }, [filteredStudents]);

  const campusData = useMemo(() => {
    return CAMPUSES.map((c, i) => ({
      name: c.name,
      count: filteredStudents.filter(s => s.campus.id === c.id).length,
      fill: CHART_COLORS[i % CHART_COLORS.length],
    })).filter(d => d.count > 0);
  }, [filteredStudents]);

  const yearData = useMemo(() => {
    const yearMap: Record<string, number> = {};
    filteredStudents.forEach(s => {
      yearMap[s.year] = (yearMap[s.year] || 0) + 1;
    });
    return Object.entries(yearMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([year, count]) => ({ name: year, count }));
  }, [filteredStudents]);

  const statCards = [
    { title: 'Total Students', value: filteredStudents.length, icon: Users, gradient: 'from-blue-500 to-cyan-500' },
    { title: 'Programs', value: programData.length, icon: GraduationCap, gradient: 'from-purple-500 to-pink-500' },
    { title: 'Campuses', value: campusData.length, icon: Building, gradient: 'from-green-500 to-emerald-500' },
    { title: 'Year Spans', value: yearData.length, icon: TrendingUp, gradient: 'from-orange-500 to-red-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 sm:mb-8"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-4 sm:p-5 rounded-2xl relative overflow-hidden group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 sm:p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} text-white`}>
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
              <CountingNumber target={stat.value} duration={1} />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Expandable Charts */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <BarChart3 className="w-3.5 h-3.5" />
        {isExpanded ? 'Hide Charts' : 'Show Analytics Charts'}
        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {/* Program Distribution */}
              <div className="glass-card p-4 sm:p-5 rounded-2xl">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  By Program
                </h4>
                <div className="h-48 sm:h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={programData} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                      <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                      <Tooltip
                        contentStyle={{
                          background: 'hsl(var(--popover))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          color: 'hsl(var(--popover-foreground))',
                          fontSize: '12px',
                        }}
                      />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {programData.map((entry, i) => (
                          <Cell key={i} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Campus Distribution Pie */}
              <div className="glass-card p-4 sm:p-5 rounded-2xl">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Building className="w-4 h-4 text-primary" />
                  By Campus
                </h4>
                <div className="h-48 sm:h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={campusData}
                        cx="50%"
                        cy="50%"
                        outerRadius="70%"
                        dataKey="count"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                        fontSize={9}
                      >
                        {campusData.map((entry, i) => (
                          <Cell key={i} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: 'hsl(var(--popover))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          color: 'hsl(var(--popover-foreground))',
                          fontSize: '12px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Year Distribution */}
              <div className="glass-card p-4 sm:p-5 rounded-2xl md:col-span-2 lg:col-span-1">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  By Year
                </h4>
                <div className="h-48 sm:h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={yearData} margin={{ top: 5, right: 5, bottom: 5, left: -15 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                      <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                      <Tooltip
                        contentStyle={{
                          background: 'hsl(var(--popover))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          color: 'hsl(var(--popover-foreground))',
                          fontSize: '12px',
                        }}
                      />
                      <Bar dataKey="count" fill="hsl(210, 100%, 56%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
