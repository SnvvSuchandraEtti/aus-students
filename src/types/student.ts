export interface Campus {
  id: string;
  name: string;
  fullName: string;
  baseUrl: string;
  prefix?: string;
  type: 'engineering' | 'diploma' | 'pharma' | 'bba' | 'forensic';
}

export interface Department {
  id: string;
  name: string;
  code: string;
  fullName: string;
  icon: string;
}

export interface Student {
  rollNumber: string;
  campus: Campus;
  department: Department;
  year: string;
  imageUrl: string;
}

export interface SearchFilters {
  searchTerm: string;
  selectedCampus: string;
  selectedDepartment: string;
  selectedYear: string;
  selectedCollegeType: string;
}

// Campus data
export const CAMPUSES: Campus[] = [
  // Engineering Colleges
  {
    id: 'aec',
    name: 'AEC',
    fullName: 'Aditya Engineering College (1st Campus)',
    baseUrl: 'https://info.aec.edu.in/AEC/StudentPhotos/',
    prefix: 'A91A',
    type: 'engineering'
  },
  {
    id: 'acet',
    name: 'ACET',
    fullName: 'Aditya College of Engineering & Technology (2nd Campus)',
    baseUrl: 'https://info.aec.edu.in/ACET/StudentPhotos/',
    prefix: 'P31A',
    type: 'engineering'
  },
  {
    id: 'acoe',
    name: 'ACOE',
    fullName: 'Aditya College of Engineering (3rd Campus)',
    baseUrl: 'https://info.aec.edu.in/acoe/StudentPhotos/',
    prefix: 'MH1A',
    type: 'engineering'
  },
  // Other Colleges
  {
    id: 'aecpoly',
    name: 'AEC Polytechnic',
    fullName: 'Aditya Engineering College - Polytechnic',
    baseUrl: 'https://info.aec.edu.in/aecpoly/StudentPhotos/',
    type: 'diploma'
  },
  {
    id: 'apc',
    name: 'APC',
    fullName: 'Aditya Pharmaceutical College',
    baseUrl: 'https://info.aec.edu.in/APC/StudentPhotos/',
    type: 'pharma'
  },
  {
    id: 'agbs',
    name: 'AGBS',
    fullName: 'Aditya Global Business School',
    baseUrl: 'https://info.aec.edu.in/AGBS/StudentPhotos/',
    type: 'bba'
  },
  {
    id: 'forensic',
    name: 'AIFS',
    fullName: 'Aditya Institute of Forensic Science',
    baseUrl: 'https://aditya.ac.in/forensic/StudentPhotos/',
    type: 'forensic'
  }
];

// Department data
export const DEPARTMENTS: Department[] = [
  // Engineering Departments
  {
    id: 'cse',
    name: 'CSE',
    code: '05',
    fullName: 'Computer Science Engineering',
    icon: '💻'
  },
  {
    id: 'ece',
    name: 'ECE',
    code: '04',
    fullName: 'Electronics and Communication Engineering',
    icon: '📡'
  },
  {
    id: 'eee',
    name: 'EEE',
    code: '02',
    fullName: 'Electrical & Electronics Engineering',
    icon: '⚡'
  },
  {
    id: 'me',
    name: 'ME',
    code: '03',
    fullName: 'Mechanical Engineering',
    icon: '⚙️'
  },
  {
    id: 'ce',
    name: 'CE',
    code: '01',
    fullName: 'Civil Engineering',
    icon: '🏗️'
  },
  {
    id: 'it',
    name: 'IT',
    code: '12',
    fullName: 'Information Technology',
    icon: '🌐'
  },
  {
    id: 'ds',
    name: 'DS',
    code: '05',
    fullName: 'Data Science',
    icon: '📊'
  },
  {
    id: 'aiml',
    name: 'AIML',
    code: '05',
    fullName: 'Artificial Intelligence & Machine Learning',
    icon: '🤖'
  },
  {
    id: 'ae',
    name: 'AE',
    code: '35',
    fullName: 'Agricultural Engineering',
    icon: '🌾'
  },
  // Diploma Departments
  {
    id: 'cm',
    name: 'CM',
    code: 'CM',
    fullName: 'Computer Engineering (Diploma)',
    icon: '💻'
  },
  {
    id: 'ee',
    name: 'EE',
    code: 'EE',
    fullName: 'Electrical Engineering (Diploma)',
    icon: '⚡'
  },
  {
    id: 'mech',
    name: 'MECH',
    code: 'MECH',
    fullName: 'Mechanical Engineering (Diploma)',
    icon: '⚙️'
  },
  {
    id: 'civil',
    name: 'CIVIL',
    code: 'CIVIL',
    fullName: 'Civil Engineering (Diploma)',
    icon: '🏗️'
  },
  // Pharma Departments
  {
    id: 'pharma',
    name: 'PHARMA',
    code: 'PH',
    fullName: 'Pharmacy',
    icon: '💊'
  },
  // BBA Departments
  {
    id: 'bba',
    name: 'BBA',
    code: 'BBA',
    fullName: 'Bachelor of Business Administration',
    icon: '💼'
  },
  {
    id: 'mba',
    name: 'MBA',
    code: 'MBA',
    fullName: 'Master of Business Administration',
    icon: '🎓'
  },
  // Forensic Departments
  {
    id: 'forensic',
    name: 'FORENSIC',
    code: 'FS',
    fullName: 'Forensic Science',
    icon: '🔬'
  }
];

// College Types
export const COLLEGE_TYPES = [
  { id: 'engineering', name: 'Engineering', icon: '⚙️' },
  { id: 'diploma', name: 'Diploma', icon: '📜' },
  { id: 'pharma', name: 'Pharmacy', icon: '💊' },
  { id: 'bba', name: 'Business', icon: '💼' },
  { id: 'forensic', name: 'Forensic Science', icon: '🔬' }
];

// Department mapping by college type
export const getDepartmentsByType = (type: string) => {
  switch (type) {
    case 'engineering':
      return DEPARTMENTS.filter(d => ['cse', 'ece', 'eee', 'me', 'ce', 'it', 'ds', 'aiml', 'ae'].includes(d.id));
    case 'diploma':
      return DEPARTMENTS.filter(d => ['cm', 'ee', 'mech', 'civil'].includes(d.id));
    case 'pharma':
      return DEPARTMENTS.filter(d => ['pharma'].includes(d.id));
    case 'bba':
      return DEPARTMENTS.filter(d => ['bba', 'mba'].includes(d.id));
    case 'forensic':
      return DEPARTMENTS.filter(d => ['forensic'].includes(d.id));
    default:
      return DEPARTMENTS;
  }
};

// Generate student data
export const generateStudentData = (): Student[] => {
  const students: Student[] = [];
  const years = ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
  const yearPrefixes = ['14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  
  CAMPUSES.forEach(campus => {
    const relevantDepartments = getDepartmentsByType(campus.type);
    
    relevantDepartments.forEach(department => {
      years.forEach((year, yearIndex) => {
        const yearPrefix = yearPrefixes[yearIndex];
        
        // Generate roll numbers based on college type
        switch (campus.type) {
          case 'engineering':
            // Engineering colleges: [year][campus_prefix][dept_code][number]
            if (campus.prefix) {
              const fullPrefix = `${yearPrefix}${campus.prefix}`;
              
              // Generate 01-99 range
              for (let i = 1; i <= 99; i++) {
                const num = i.toString().padStart(2, '0');
                const rollNumber = `${fullPrefix}${department.code}${num}`;
                const imageUrl = `${campus.baseUrl}${rollNumber}.jpg`;
                
                students.push({
                  rollNumber,
                  campus,
                  department,
                  year,
                  imageUrl
                });
              }
              
              // Generate A0-Z0 range
              for (let charCode = 65; charCode <= 90; charCode++) {
                const letter = String.fromCharCode(charCode);
                const rollNumber = `${fullPrefix}${department.code}${letter}0`;
                const imageUrl = `${campus.baseUrl}${rollNumber}.jpg`;
                
                students.push({
                  rollNumber,
                  campus,
                  department,
                  year,
                  imageUrl
                });
              }
            }
            break;
            
          case 'diploma':
            // Diploma: [year][number]-[dept]-[sequence]
            for (let i = 1; i <= 100; i++) {
              const num = (200 + i).toString();
              for (let seq = 1; seq <= 50; seq++) {
                const seqNum = seq.toString().padStart(3, '0');
                const rollNumber = `${yearPrefix}${num}-${department.code}-${seqNum}`;
                const imageUrl = `${campus.baseUrl}${rollNumber}.jpg`;
                
                students.push({
                  rollNumber,
                  campus,
                  department,
                  year,
                  imageUrl
                });
              }
            }
            break;
            
          case 'pharma':
            // Pharma: [year][sequence] (6 digits)
            for (let i = 1; i <= 999; i++) {
              const rollNumber = `${yearPrefix}19${i.toString().padStart(3, '0')}`;
              const imageUrl = `${campus.baseUrl}${rollNumber}.jpg`;
              
              students.push({
                rollNumber,
                campus,
                department,
                year,
                imageUrl
              });
            }
            break;
            
          case 'bba':
            // BBA: [year][sequence] (7 digits)
            for (let i = 1; i <= 999; i++) {
              const rollNumber = `${yearPrefix}22${i.toString().padStart(3, '0')}`;
              const imageUrl = `${campus.baseUrl}${rollNumber}.jpg`;
              
              students.push({
                rollNumber,
                campus,
                department,
                year,
                imageUrl
              });
            }
            break;
            
          case 'forensic':
            // Forensic: [year]FS[sequence]
            for (let i = 1; i <= 100; i++) {
              const rollNumber = `${yearPrefix}FS${i.toString().padStart(3, '0')}`;
              const imageUrl = `${campus.baseUrl}${rollNumber}.jpg`;
              
              students.push({
                rollNumber,
                campus,
                department,
                year,
                imageUrl
              });
            }
            break;
        }
      });
    });
  });
  
  return students;
};