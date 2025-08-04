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
  // Main Aditya University Campus
  {
    id: 'aditya-university',
    name: 'Aditya University',
    fullName: 'Aditya University - Main Campus, Surampalem',
    baseUrl: 'https://info.aec.edu.in/AEC/StudentPhotos/',
    prefix: 'A91A',
    type: 'engineering'
  },
  // Engineering Colleges under Aditya Group
  {
    id: 'aec',
    name: 'AEC',
    fullName: 'Aditya Engineering College - Surampalem',
    baseUrl: 'https://info.aec.edu.in/AEC/StudentPhotos/',
    prefix: 'A91A',
    type: 'engineering'
  },
  {
    id: 'acet',
    name: 'ACET',
    fullName: 'Aditya College of Engineering & Technology - Tekkali',
    baseUrl: 'https://info.aec.edu.in/ACET/StudentPhotos/',
    prefix: 'P31A',
    type: 'engineering'
  },
  {
    id: 'acem',
    name: 'ACEM',
    fullName: 'Aditya College of Engineering - Madanapalle',
    baseUrl: 'https://info.aec.edu.in/acoe/StudentPhotos/',
    prefix: 'MH1A',
    type: 'engineering'
  }
];

// Department data
export const DEPARTMENTS: Department[] = [
  // Real Aditya University Engineering Departments
  {
    id: 'cse',
    name: 'CSE',
    code: '05',
    fullName: 'Computer Science & Engineering',
    icon: '💻'
  },
  {
    id: 'ece',
    name: 'ECE',
    code: '04',
    fullName: 'Electronics & Communication Engineering',
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
    id: 'aiml',
    name: 'AI&ML',
    code: '66',
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
  {
    id: 'mining',
    name: 'MINING',
    code: '56',
    fullName: 'Mining Engineering',
    icon: '⛏️'
  },
  {
    id: 'petroleum',
    name: 'PETRO',
    code: '57',
    fullName: 'Petroleum Engineering',
    icon: '🛢️'
  },
  // Additional Engineering Specializations
  {
    id: 'biotech',
    name: 'BIOTECH',
    code: '06',
    fullName: 'Biotechnology',
    icon: '🧬'
  },
  {
    id: 'iot',
    name: 'IoT',
    code: '67',
    fullName: 'Internet of Things',
    icon: '🌐'
  }
];

// College Types - Real Aditya University Programs
export const COLLEGE_TYPES = [
  { id: 'engineering', name: 'Engineering', icon: '⚙️' }
];

// Department mapping by college type
export const getDepartmentsByType = (type: string) => {
  switch (type) {
    case 'engineering':
      return DEPARTMENTS.filter(d => ['cse', 'ece', 'eee', 'me', 'ce', 'it', 'aiml', 'ae', 'mining', 'petroleum', 'biotech', 'iot'].includes(d.id));
    default:
      return DEPARTMENTS;
  }
};

// Generate student data with real Aditya University roll number patterns
export const generateStudentData = (): Student[] => {
  const students: Student[] = [];
  const years = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];
  const yearPrefixes = ['18', '19', '20', '21', '22', '23', '24'];
  
  CAMPUSES.forEach(campus => {
    const relevantDepartments = getDepartmentsByType(campus.type);
    
    relevantDepartments.forEach(department => {
      years.forEach((year, yearIndex) => {
        const yearPrefix = yearPrefixes[yearIndex];
        
        // Real Aditya University roll number format: [YY][A91A][DEPT][NUMBER]
        if (campus.prefix) {
          const fullPrefix = `${yearPrefix}${campus.prefix}`;
          
          // Generate realistic range 01-60 (typical class size)
          for (let i = 1; i <= 60; i++) {
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
        }
      });
    });
  });
  
  return students;
};