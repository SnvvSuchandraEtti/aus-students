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

// Campus data with all college types
export const CAMPUSES: Campus[] = [
  // B-Tech Engineering Colleges
  {
    id: 'aec-btech',
    name: 'AEC',
    fullName: 'Aditya Engineering College - Surampalem (B-Tech)',
    baseUrl: 'https://info.aec.edu.in/AEC/StudentPhotos/',
    prefix: 'a91a',
    type: 'engineering'
  },
  {
    id: 'acet-btech',
    name: 'ACET',
    fullName: 'Aditya College of Engineering & Technology - Tekkali (B-Tech)',
    baseUrl: 'https://info.aec.edu.in/ACET/StudentPhotos/',
    prefix: 'P31A',
    type: 'engineering'
  },
  {
    id: 'acem-btech',
    name: 'ACEM',
    fullName: 'Aditya College of Engineering - Madanapalle (B-Tech)',
    baseUrl: 'https://info.aec.edu.in/acoe/StudentPhotos/',
    prefix: 'MH1A',
    type: 'engineering'
  },
  // Diploma Colleges
  {
    id: 'aec-diploma',
    name: 'AEC Poly',
    fullName: 'Aditya Engineering College - Polytechnic',
    baseUrl: 'https://info.aec.edu.in/aecpoly/StudentPhotos/',
    prefix: '255',
    type: 'diploma'
  },
  {
    id: 'acet-diploma',
    name: 'ACET Poly',
    fullName: 'Aditya College of Engineering & Technology - Polytechnic',
    baseUrl: 'https://info.aec.edu.in/aecpoly/StudentPhotos/',
    prefix: '404',
    type: 'diploma'
  },
  {
    id: 'acem-diploma',
    name: 'ACEM Poly',
    fullName: 'Aditya College of Engineering - Polytechnic',
    baseUrl: 'https://info.aec.edu.in/aecpoly/StudentPhotos/',
    prefix: '255',
    type: 'diploma'
  },
  // BBA
  {
    id: 'agbs',
    name: 'AGBS',
    fullName: 'Aditya Global Business School',
    baseUrl: 'https://info.aec.edu.in/AGBS/StudentPhotos/',
    prefix: '112',
    type: 'bba'
  },
  // Pharma
  {
    id: 'apc',
    name: 'APC',
    fullName: 'Aditya Pharmacy College',
    baseUrl: 'https://info.aec.edu.in/APC/StudentPhotos/',
    prefix: '6',
    type: 'pharma'
  },
  // Forensic
  {
    id: 'forensic',
    name: 'Forensic',
    fullName: 'Aditya Institute of Forensic Science',
    baseUrl: 'https://aditya.ac.in/forensic-science/placements.php?campus=',
    prefix: '',
    type: 'forensic'
  }
];

// Department data for all college types
export const DEPARTMENTS: Department[] = [
  // B-Tech Engineering Departments
  {
    id: 'ce',
    name: 'CE',
    code: '01',
    fullName: 'Civil Engineering',
    icon: '🏗️'
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
    id: 'ece',
    name: 'ECE',
    code: '04',
    fullName: 'Electronics & Communication Engineering',
    icon: '📡'
  },
  {
    id: 'cse',
    name: 'CSE',
    code: '05',
    fullName: 'Computer Science & Engineering',
    icon: '💻'
  },
  {
    id: 'cse-ds',
    name: 'CSE-DS',
    code: '44',
    fullName: 'Computer Science & Engineering (Data Science)',
    icon: '📊'
  },
  {
    id: 'it',
    name: 'IT',
    code: '12',
    fullName: 'Information Technology',
    icon: '🌐'
  },
  {
    id: 'mining',
    name: 'MINING',
    code: '26',
    fullName: 'Mining Engineering',
    icon: '⛏️'
  },
  {
    id: 'petroleum',
    name: 'PETRO',
    code: '27',
    fullName: 'Petroleum Technology',
    icon: '🛢️'
  },
  {
    id: 'ae',
    name: 'AE',
    code: '35',
    fullName: 'Agricultural Engineering',
    icon: '🌾'
  },
  {
    id: 'aiml',
    name: 'AI&ML',
    code: '61',
    fullName: 'Artificial Intelligence & Machine Learning',
    icon: '🤖'
  },
  {
    id: 'iot',
    name: 'IoT',
    code: '49',
    fullName: 'Internet of Things',
    icon: '🌐'
  },
  // Diploma Departments
  {
    id: 'diploma-me',
    name: 'ME',
    code: 'M',
    fullName: 'Mechanical Engineering',
    icon: '⚙️'
  },
  {
    id: 'diploma-ce',
    name: 'CE',
    code: 'C',
    fullName: 'Civil Engineering',
    icon: '🏗️'
  },
  {
    id: 'diploma-eee',
    name: 'EEE',
    code: 'EE',
    fullName: 'Electrical & Electronics Engineering',
    icon: '⚡'
  },
  {
    id: 'diploma-ece',
    name: 'ECE',
    code: 'EC',
    fullName: 'Electronics & Communication Engineering',
    icon: '📡'
  },
  {
    id: 'diploma-cse',
    name: 'CSE',
    code: 'CM',
    fullName: 'Computer Science & Engineering',
    icon: '💻'
  },
  // BBA (no departments)
  {
    id: 'bba',
    name: 'BBA',
    code: '',
    fullName: 'Bachelor of Business Administration',
    icon: '💼'
  },
  // Pharma (no departments)
  {
    id: 'pharma',
    name: 'PHARMA',
    code: '',
    fullName: 'Pharmacy',
    icon: '💊'
  },
  // Forensic (no departments)
  {
    id: 'forensic',
    name: 'FORENSIC',
    code: '',
    fullName: 'Forensic Science',
    icon: '🔬'
  }
];

// College Types - All Aditya University Programs
export const COLLEGE_TYPES = [
  { id: 'engineering', name: 'B-Tech', icon: '⚙️' },
  { id: 'diploma', name: 'Diploma', icon: '🎓' },
  { id: 'bba', name: 'BBA', icon: '💼' },
  { id: 'pharma', name: 'Pharma', icon: '💊' },
  { id: 'forensic', name: 'Forensic', icon: '🔬' }
];

// Department mapping by college type
export const getDepartmentsByType = (type: string) => {
  switch (type) {
    case 'engineering':
      return DEPARTMENTS.filter(d => ['ce', 'eee', 'me', 'ece', 'cse', 'cse-ds', 'it', 'mining', 'petroleum', 'ae', 'aiml', 'iot'].includes(d.id));
    case 'diploma':
      return DEPARTMENTS.filter(d => ['diploma-me', 'diploma-ce', 'diploma-eee', 'diploma-ece', 'diploma-cse'].includes(d.id));
    case 'bba':
      return DEPARTMENTS.filter(d => d.id === 'bba');
    case 'pharma':
      return DEPARTMENTS.filter(d => d.id === 'pharma');
    case 'forensic':
      return DEPARTMENTS.filter(d => d.id === 'forensic');
    default:
      return DEPARTMENTS;
  }
};

// Generate student data with real Aditya University roll number patterns
export const generateStudentData = (): Student[] => {
  const students: Student[] = [];
  
  CAMPUSES.forEach(campus => {
    const relevantDepartments = getDepartmentsByType(campus.type);
    
    if (campus.type === 'engineering') {
      // B-Tech: Focus on recent years 2020-2023 for better performance
      const years = ['2020', '2021', '2022', '2023'];
      const yearPrefixes = ['20', '21', '22', '23'];
      
      relevantDepartments.forEach(department => {
        years.forEach((year, yearIndex) => {
          const yearPrefix = yearPrefixes[yearIndex];
          
          // Generate regular B-Tech students (reduced range for performance)
          if (campus.id === 'aec-btech') {
            // Pattern: 20a91a0501 to 20a91a0550 (limited to 50 students per dept/year)
            let deptCode = department.code;
            if (department.id === 'aiml') {
              deptCode = '61'; // AEC campus uses 61 for AIML
            }
            
            // Generate 01-50 (reduced for performance)
            for (let i = 1; i <= 50; i++) {
              const num = i.toString().padStart(2, '0');
              const rollNumberPattern = `${yearPrefix}${campus.prefix}${deptCode}${num}`;
              const imageUrlPattern = `${campus.baseUrl}${rollNumberPattern}.jpg`;
              
              students.push({
                rollNumber: rollNumberPattern,
                campus,
                department,
                year,
                imageUrl: imageUrlPattern
              });
            }
          } else if (campus.id === 'acet-btech') {
            // Pattern: 20P31A0501 to 20P31A0550
            let deptCode = department.code;
            if (department.id === 'aiml') {
              deptCode = '42'; // ACET campus uses 42 for AIML
            }
            
            // Generate 01-50 (reduced for performance)
            for (let i = 1; i <= 50; i++) {
              const num = i.toString().padStart(2, '0');
              const rollNumberPattern = `${yearPrefix}${campus.prefix}${deptCode}${num}`;
              const imageUrlPattern = `${campus.baseUrl}${rollNumberPattern}.jpg`;
              
              students.push({
                rollNumber: rollNumberPattern,
                campus,
                department,
                year,
                imageUrl: imageUrlPattern
              });
            }
          } else if (campus.id === 'acem-btech') {
            // Pattern: 20MH1A0501 to 20MH1A0550
            let deptCode = department.code;
            if (department.id === 'aiml') {
              deptCode = '42'; // ACEM campus uses 42 for AIML
            }
            
            // Generate 01-50 (reduced for performance)
            for (let i = 1; i <= 50; i++) {
              const num = i.toString().padStart(2, '0');
              const rollNumberPattern = `${yearPrefix}${campus.prefix}${deptCode}${num}`;
              const imageUrlPattern = `${campus.baseUrl}${rollNumberPattern}.jpg`;
              
              students.push({
                rollNumber: rollNumberPattern,
                campus,
                department,
                year,
                imageUrl: imageUrlPattern
              });
            }
          }
        });
      });

      // Add Lateral Entry students (reduced for performance)
      // For 2022 B-Tech, LE will be 2023 (23A95A...)
      const leYears = ['2022', '2023', '2024'];
      const leYearPrefixes = ['23', '24', '25'];
      
      // Lateral Entry departments with their codes (reduced set)
      const leDepartments = [
        { ...DEPARTMENTS.find(d => d.id === 'ce')!, code: '5A01' },
        { ...DEPARTMENTS.find(d => d.id === 'cse')!, code: '5A05' },
        { ...DEPARTMENTS.find(d => d.id === 'ece')!, code: '5A04' }
      ];

      CAMPUSES.filter(c => c.type === 'engineering').forEach(campus => {
        leDepartments.forEach(department => {
          leYears.forEach((year, yearIndex) => {
            const yearPrefix = leYearPrefixes[yearIndex];
            
            // Reduced range to 10 students per LE dept/year
            for (let i = 1; i <= 10; i++) {
              const num = i.toString().padStart(2, '0');
              let rollNumberPattern = '';
              
              if (campus.id === 'aec-btech') {
                rollNumberPattern = `${yearPrefix}A9${department.code}${num}`;
              } else if (campus.id === 'acet-btech') {
                rollNumberPattern = `${yearPrefix}P3${department.code}${num}`;
              } else if (campus.id === 'acem-btech') {
                rollNumberPattern = `${yearPrefix}MH${department.code}${num}`;
              }
              
              const imageUrlPattern = `${campus.baseUrl}${rollNumberPattern}.jpg`;
              
              students.push({
                rollNumber: rollNumberPattern,
                campus,
                department,
                year,
                imageUrl: imageUrlPattern
              });
            }
          });
        });
      });
    } else if (campus.type === 'diploma') {
      // Diploma: Recent years only (2022-2024) - reduced for performance
      const years = ['2022', '2023', '2024'];
      const yearPrefixes = ['22', '23', '24'];
      
      relevantDepartments.forEach(department => {
        years.forEach((year, yearIndex) => {
          const yearPrefix = yearPrefixes[yearIndex];
          
          // Pattern: 22255-M-001 to 22255-M-020 (reduced range)
          for (let i = 1; i <= 20; i++) {
            const num = i.toString().padStart(3, '0');
            const rollNumber = `${yearPrefix}${campus.prefix}-${department.code}-${num}`;
            const imageUrl = `${campus.baseUrl}${rollNumber}.jpg`;
            
            students.push({
              rollNumber,
              campus,
              department,
              year,
              imageUrl
            });
          }
        });
      });
    } else if (campus.type === 'bba') {
      // BBA: Recent years - reduced range
      const bbaData = [
        { year: '2022', prefix: '1122', range: 30 },
        { year: '2023', prefix: '1123', range: 30 }
      ];
      
      const bbaDept = relevantDepartments[0]; // BBA department
      bbaData.forEach(({ year, prefix, range }) => {
        for (let i = 1; i <= range; i++) {
          const num = i.toString().padStart(2, '0');
          const rollNumber = `${prefix}${num}`;
          const imageUrl = `${campus.baseUrl}${rollNumber}.jpg`;
          
          students.push({
            rollNumber,
            campus,
            department: bbaDept,
            year,
            imageUrl
          });
        }
      });
    } else if (campus.type === 'pharma') {
      // Pharma: Reduced range for performance
      const pharmaDept = relevantDepartments[0];
      for (let i = 1710; i <= 1750; i++) {
        const rollNumber = `6${i}`;
        const imageUrl = `${campus.baseUrl}${rollNumber}.jpg`;
        
        students.push({
          rollNumber,
          campus,
          department: pharmaDept,
          year: '2022', // Recent year
          imageUrl
        });
      }
    } else if (campus.type === 'forensic') {
      // Forensic: Drastically reduced range
      const forensicDept = relevantDepartments[0];
      for (let i = 1; i <= 50; i++) {
        const campusCode = i.toString().padStart(2, '0');
        const rollNumber = `FORENSIC-${campusCode}`;
        const imageUrl = `${campus.baseUrl}${campusCode}`;
        
        students.push({
          rollNumber,
          campus,
          department: forensicDept,
          year: '2022', // Recent year
          imageUrl
        });
      }
    }
  });
  
  console.log(`Generated ${students.length} students total`);
  return students;
};