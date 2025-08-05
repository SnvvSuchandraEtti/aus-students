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
      // B-Tech: Years 2014-2023 (14-23)
      const years = ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
      const yearPrefixes = ['14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
      
      relevantDepartments.forEach(department => {
        years.forEach((year, yearIndex) => {
          const yearPrefix = yearPrefixes[yearIndex];
          
          // Generate roll numbers based on campus pattern
          let rollNumberPattern = '';
          let imageUrlPattern = '';
          
          if (campus.id === 'aec-btech') {
            // Pattern: 14a91a0501 to 14a91a05z0
            for (let i = 1; i <= 999; i++) {
              const num = i.toString().padStart(2, '0');
              if (i <= 99) {
                rollNumberPattern = `${yearPrefix}${campus.prefix}${department.code}${num}`;
              } else {
                // For numbers > 99, use letter format
                const letter = String.fromCharCode(97 + Math.floor((i - 100) / 10)); // a, b, c...
                const lastDigit = (i - 100) % 10;
                rollNumberPattern = `${yearPrefix}${campus.prefix}${department.code}${letter}${lastDigit}`;
              }
              imageUrlPattern = `${campus.baseUrl}${rollNumberPattern}.jpg`;
              
              students.push({
                rollNumber: rollNumberPattern,
                campus,
                department,
                year,
                imageUrl: imageUrlPattern
              });
              
              if (i >= 999) break; // Limit to z9
            }
          } else if (campus.id === 'acet-btech') {
            // Pattern: 14P31A0501 to 14P31A05z0
            for (let i = 1; i <= 999; i++) {
              const num = i.toString().padStart(2, '0');
              if (i <= 99) {
                rollNumberPattern = `${yearPrefix}${campus.prefix}${department.code}${num}`;
              } else {
                const letter = String.fromCharCode(97 + Math.floor((i - 100) / 10));
                const lastDigit = (i - 100) % 10;
                rollNumberPattern = `${yearPrefix}${campus.prefix}${department.code}${letter}${lastDigit}`;
              }
              imageUrlPattern = `${campus.baseUrl}${rollNumberPattern}.jpg`;
              
              students.push({
                rollNumber: rollNumberPattern,
                campus,
                department,
                year,
                imageUrl: imageUrlPattern
              });
              
              if (i >= 999) break;
            }
          } else if (campus.id === 'acem-btech') {
            // Pattern: 14MH1A501 to 14MH1A5z0 (no 0 before dept code)
            for (let i = 1; i <= 999; i++) {
              const num = i.toString().padStart(2, '0');
              if (i <= 99) {
                rollNumberPattern = `${yearPrefix}${campus.prefix}${department.code}${num}`;
              } else {
                const letter = String.fromCharCode(97 + Math.floor((i - 100) / 10));
                const lastDigit = (i - 100) % 10;
                rollNumberPattern = `${yearPrefix}${campus.prefix}${department.code}${letter}${lastDigit}`;
              }
              imageUrlPattern = `${campus.baseUrl}${rollNumberPattern}.jpg`;
              
              students.push({
                rollNumber: rollNumberPattern,
                campus,
                department,
                year,
                imageUrl: imageUrlPattern
              });
              
              if (i >= 999) break;
            }
          }
        });
      });
    } else if (campus.type === 'diploma') {
      // Diploma: Years 2017-2024 (17-24)
      const years = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];
      const yearPrefixes = ['17', '18', '19', '20', '21', '22', '23', '24'];
      
      relevantDepartments.forEach(department => {
        years.forEach((year, yearIndex) => {
          const yearPrefix = yearPrefixes[yearIndex];
          
          // Pattern: 17255-M-001 to 17255-M-500
          for (let i = 1; i <= 500; i++) {
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
      // BBA: Years 2021-2023
      const bbaData = [
        { year: '2021', prefix: '1121', range: 500 },
        { year: '2022', prefix: '1122', range: 500 },
        { year: '2023', prefix: '1123', range: 500 }
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
      // Pharma: Pattern 61710 to 619500
      const pharmaDept = relevantDepartments[0];
      for (let i = 1710; i <= 9500; i++) {
        const rollNumber = `6${i}`;
        const imageUrl = `${campus.baseUrl}${rollNumber}.jpg`;
        
        students.push({
          rollNumber,
          campus,
          department: pharmaDept,
          year: '2020', // Default year for pharma
          imageUrl
        });
      }
    } else if (campus.type === 'forensic') {
      // Forensic: Pattern campus=01 to campus=100000
      const forensicDept = relevantDepartments[0];
      for (let i = 1; i <= 100000; i++) {
        const campusCode = i.toString().padStart(2, '0');
        const rollNumber = `FORENSIC-${campusCode}`;
        const imageUrl = `${campus.baseUrl}${campusCode}`;
        
        students.push({
          rollNumber,
          campus,
          department: forensicDept,
          year: '2020', // Default year for forensic
          imageUrl
        });
      }
    }
  });
  
  return students;
};