import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Check, Loader2 } from 'lucide-react';
import { Student } from '@/types/student';
import { toast } from '@/hooks/use-toast';

interface ExportShareActionsProps {
  filteredStudents: Student[];
}

export const ExportShareActions = ({ filteredStudents }: ExportShareActionsProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const exportCSV = async () => {
    setIsExporting(true);
    try {
      await new Promise(r => setTimeout(r, 300)); // brief delay for UX
      const headers = ['Roll Number', 'Department', 'Campus', 'Year', 'Program Type', 'Image URL'];
      const rows = filteredStudents.map(s => [
        s.rollNumber,
        s.department.fullName,
        s.campus.fullName,
        s.year,
        s.campus.type,
        s.imageUrl,
      ]);

      const csvContent = [headers, ...rows]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `aditya-students-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);

      toast({ title: 'Export complete', description: `${filteredStudents.length} students exported as CSV` });
    } finally {
      setIsExporting(false);
    }
  };

  const copyShareLink = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast({ title: 'Link copied!', description: 'Share this link to show the same filtered view' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={exportCSV}
        disabled={isExporting || filteredStudents.length === 0}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition-colors disabled:opacity-50"
      >
        {isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
        Export CSV
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={copyShareLink}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition-colors"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
        {copied ? 'Copied!' : 'Share'}
      </motion.button>
    </div>
  );
};
