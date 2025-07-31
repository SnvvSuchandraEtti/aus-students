import { motion } from 'framer-motion';
import { Student, CAMPUSES, DEPARTMENTS } from '@/types/student';
import { Users, Building, GraduationCap, TrendingUp } from 'lucide-react';

interface StatsSectionProps {
  students: Student[];
}

export const StatsSection = ({ students }: StatsSectionProps) => {
  const campusStats = CAMPUSES.map(campus => ({
    ...campus,
    count: students.filter(s => s.campus.id === campus.id).length
  }));

  const departmentStats = DEPARTMENTS.map(dept => ({
    ...dept,
    count: students.filter(s => s.department.id === dept.id).length
  }));

  const totalStudents = students.length;

  const statCards = [
    {
      title: 'Total Students',
      value: totalStudents.toLocaleString(),
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Campuses',
      value: CAMPUSES.length.toString(),
      icon: Building,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Departments',
      value: DEPARTMENTS.length.toString(),
      icon: GraduationCap,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Active Programs',
      value: '27+',
      icon: TrendingUp,
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-12"
    >
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 mobile-stats">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="glass-card p-6 rounded-2xl relative overflow-hidden group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-2xl opacity-20"
              >
                <stat.icon className="w-8 h-8" />
              </motion.div>
            </div>
            
            <h3 className="text-3xl font-bold text-foreground mb-2">{stat.value}</h3>
            <p className="text-muted-foreground">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Campus Breakdown */}
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card p-6 rounded-2xl"
        >
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
            <Building className="w-5 h-5 mr-2 text-primary" />
            Campus Distribution
          </h3>
          <div className="space-y-3">
            {campusStats.map((campus, index) => (
              <motion.div
                key={campus.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{campus.name}</p>
                  <p className="text-sm text-muted-foreground">{campus.fullName.split('(')[1]?.replace(')', '')}</p>
                </div>
                <span className="text-lg font-bold text-primary">{campus.count.toLocaleString()}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card p-6 rounded-2xl"
        >
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2 text-primary" />
            Department Overview
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {departmentStats
              .sort((a, b) => b.count - a.count)
              .map((dept, index) => (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center">
                    <span className="text-lg mr-2">{dept.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{dept.name}</p>
                      <p className="text-xs text-muted-foreground">{dept.fullName}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-primary">{dept.count}</span>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};