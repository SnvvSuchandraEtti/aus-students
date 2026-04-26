import { useState, useEffect } from 'react';
import { Target, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLLEGE_TYPES, getDepartmentsByType, Department } from '@/types/student';

interface FindMyClassmatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: { program: string; department: string; year: string }) => void;
}

const YEARS = ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

export const FindMyClassmatesModal = ({ isOpen, onClose, onApply }: FindMyClassmatesModalProps) => {
  const [program, setProgram] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [availableDepartments, setAvailableDepartments] = useState<Department[]>([]);

  useEffect(() => {
    if (program) {
      setAvailableDepartments(getDepartmentsByType(program));
    } else {
      setAvailableDepartments([]);
    }
  }, [program]);

  const handleApply = () => {
    onApply({ program, department, year });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-sm translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Find My Section
              </h2>
              <button onClick={onClose} className="rounded-full p-1 hover:bg-secondary transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Program</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={program}
                  onChange={(e) => {
                    setProgram(e.target.value);
                    setDepartment('');
                  }}
                >
                  <option value="">Select Program</option>
                  {COLLEGE_TYPES.map(type => (
                    <option key={type.id} value={type.id}>{type.icon} {type.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  disabled={!program}
                >
                  <option value="">Select Department</option>
                  {availableDepartments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name} - {dept.fullName}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Year</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="">Select Year</option>
                  {YEARS.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleApply}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            >
              Go
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
