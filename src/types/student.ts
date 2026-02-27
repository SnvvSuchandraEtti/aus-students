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
  isLateralEntry: boolean;
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
    baseUrl: 'https://info.aec.edu.in/forensic/StudentPhotos/',
    prefix: 'FR',
    type: 'forensic'
  }
];

// Department data for all college types
export const DEPARTMENTS: Department[] = [
  // B-Tech Engineering Departments
  { id: 'ce', name: 'CE', code: '01', fullName: 'Civil Engineering', icon: '🏗️' },
  { id: 'eee', name: 'EEE', code: '02', fullName: 'Electrical & Electronics Engineering', icon: '⚡' },
  { id: 'me', name: 'ME', code: '03', fullName: 'Mechanical Engineering', icon: '⚙️' },
  { id: 'ece', name: 'ECE', code: '04', fullName: 'Electronics & Communication Engineering', icon: '📡' },
  { id: 'cse', name: 'CSE', code: '05', fullName: 'Computer Science & Engineering', icon: '💻' },
  { id: 'cse-ds', name: 'CSE-DS', code: '44', fullName: 'Computer Science & Engineering (Data Science)', icon: '📊' },
  { id: 'it', name: 'IT', code: '12', fullName: 'Information Technology', icon: '🌐' },
  { id: 'mining', name: 'MINING', code: '26', fullName: 'Mining Engineering', icon: '⛏️' },
  { id: 'petroleum', name: 'PETRO', code: '27', fullName: 'Petroleum Technology', icon: '🛢️' },
  { id: 'ae', name: 'AE', code: '35', fullName: 'Agricultural Engineering', icon: '🌾' },
  { id: 'aiml', name: 'AI&ML', code: '61', fullName: 'Artificial Intelligence & Machine Learning', icon: '🤖' },
  { id: 'iot', name: 'IoT', code: '49', fullName: 'Internet of Things', icon: '🌐' },
  // Diploma Departments
  { id: 'diploma-me', name: 'ME', code: 'M', fullName: 'Mechanical Engineering', icon: '⚙️' },
  { id: 'diploma-ce', name: 'CE', code: 'C', fullName: 'Civil Engineering', icon: '🏗️' },
  { id: 'diploma-eee', name: 'EEE', code: 'EE', fullName: 'Electrical & Electronics Engineering', icon: '⚡' },
  { id: 'diploma-ece', name: 'ECE', code: 'EC', fullName: 'Electronics & Communication Engineering', icon: '📡' },
  { id: 'diploma-cse', name: 'CSE', code: 'CM', fullName: 'Computer Science & Engineering', icon: '💻' },
  // BBA
  { id: 'bba', name: 'BBA', code: '', fullName: 'Bachelor of Business Administration', icon: '💼' },
  // Pharma
  { id: 'pharma', name: 'PHARMA', code: '', fullName: 'Pharmacy', icon: '💊' },
  // Forensic
  { id: 'forensic', name: 'FORENSIC', code: '', fullName: 'Forensic Science', icon: '🔬' }
];

// College Types
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

// Module-level cache so data is generated only ONCE
let _cachedStudents: Student[] | null = null;

// Generate student data with real Aditya University roll number patterns
export const generateStudentData = (): Student[] => {
  if (_cachedStudents) return _cachedStudents;
  
  const students: Student[] = [];
  
  CAMPUSES.forEach(campus => {
    const relevantDepartments = getDepartmentsByType(campus.type);
    
    if (campus.type === 'engineering') {
      const years = ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
      const yearPrefixes = ['14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
      
      relevantDepartments.forEach(department => {
        years.forEach((year, yearIndex) => {
          const yearPrefix = yearPrefixes[yearIndex];
          
          let deptCode = department.code;
          if (department.id === 'aiml') {
            deptCode = campus.id === 'aec-btech' ? '61' : '42';
          }
          
          // Generate 01-99
          for (let i = 1; i <= 99; i++) {
            const num = i.toString().padStart(2, '0');
            const rollNumberPattern = `${yearPrefix}${campus.prefix}${deptCode}${num}`;
            students.push({
              rollNumber: rollNumberPattern,
              campus,
              department,
              year,
              imageUrl: `${campus.baseUrl}${rollNumberPattern}.jpg`
            });
          }
          
          // Generate A0-Z9
          for (let letterIndex = 0; letterIndex < 26; letterIndex++) {
            for (let digit = 0; digit <= 9; digit++) {
              const letter = String.fromCharCode(65 + letterIndex);
              const rollNumberPattern = `${yearPrefix}${campus.prefix}${deptCode}${letter}${digit}`;
              students.push({
                rollNumber: rollNumberPattern,
                campus,
                department,
                year,
                imageUrl: `${campus.baseUrl}${rollNumberPattern}.jpg`
              });
            }
          }
        });
      });

      // Lateral Entry
      const leYears = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
      const leYearPrefixes = ['15', '16', '17', '18', '19', '20', '21', '22', '23'];
      
      const leDepartments = [
        { ...DEPARTMENTS.find(d => d.id === 'ce')!, code: '5A01' },
        { ...DEPARTMENTS.find(d => d.id === 'eee')!, code: '5A02' },
        { ...DEPARTMENTS.find(d => d.id === 'me')!, code: '5A03' },
        { ...DEPARTMENTS.find(d => d.id === 'ece')!, code: '5A04' },
        { ...DEPARTMENTS.find(d => d.id === 'cse')!, code: '5A05' },
        { ...DEPARTMENTS.find(d => d.id === 'it')!, code: '5A12' },
        { ...DEPARTMENTS.find(d => d.id === 'aiml')!, code: '5A61' },
        { ...DEPARTMENTS.find(d => d.id === 'aiml')!, code: '5A42', id: 'aiml-acet' },
        { ...DEPARTMENTS.find(d => d.id === 'aiml')!, code: '5A42', id: 'aiml-acem' },
        { ...DEPARTMENTS.find(d => d.id === 'cse-ds')!, code: '5A44' },
        { ...DEPARTMENTS.find(d => d.id === 'mining')!, code: '5A26' },
        { ...DEPARTMENTS.find(d => d.id === 'petroleum')!, code: '5A27' },
        { ...DEPARTMENTS.find(d => d.id === 'ae')!, code: '5A35' },
        { ...DEPARTMENTS.find(d => d.id === 'iot')!, code: '5A49' }
      ];

      CAMPUSES.filter(c => c.type === 'engineering').forEach(leCampus => {
        leDepartments.forEach(department => {
          if ((department.id === 'aiml-acet' && leCampus.id !== 'acet-btech') ||
              (department.id === 'aiml-acem' && leCampus.id !== 'acem-btech') ||
              (department.id === 'aiml' && department.code === '5A61' && leCampus.id !== 'aec-btech')) {
            return;
          }

          leYears.forEach((year, yearIndex) => {
            const yearPrefix = leYearPrefixes[yearIndex];
            
            for (let i = 1; i <= 99; i++) {
              const num = i.toString().padStart(2, '0');
              let rollNumberPattern = '';
              
              if (leCampus.id === 'aec-btech') {
                rollNumberPattern = `${yearPrefix}A9${department.code}${num}`;
              } else if (leCampus.id === 'acet-btech') {
                rollNumberPattern = `${yearPrefix}P3${department.code}${num}`;
              } else if (leCampus.id === 'acem-btech') {
                rollNumberPattern = `${yearPrefix}MH${department.code}${num}`;
              }
              
              students.push({
                rollNumber: rollNumberPattern,
                campus: leCampus,
                department: department.id.includes('aiml') ? DEPARTMENTS.find(d => d.id === 'aiml')! : department,
                year,
                imageUrl: `${leCampus.baseUrl}${rollNumberPattern}.jpg`
              });
            }
          });
        });
      });
    } else if (campus.type === 'diploma') {
      const years = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];
      const yearPrefixes = ['17', '18', '19', '20', '21', '22', '23', '24'];
      
      relevantDepartments.forEach(department => {
        years.forEach((year, yearIndex) => {
          const yearPrefix = yearPrefixes[yearIndex];
          for (let i = 1; i <= 500; i++) {
            const num = i.toString().padStart(3, '0');
            const rollNumber = `${yearPrefix}${campus.prefix}-${department.code}-${num}`;
            students.push({
              rollNumber,
              campus,
              department,
              year,
              imageUrl: `${campus.baseUrl}${rollNumber}.jpg`
            });
          }
        });
      });
    } else if (campus.type === 'bba') {
      const bbaData = [
        { year: '2021', prefix: '1121', range: 500 },
        { year: '2022', prefix: '1122', range: 500 },
        { year: '2023', prefix: '1123', range: 500 }
      ];
      
      const bbaDept = relevantDepartments[0];
      bbaData.forEach(({ year, prefix, range }) => {
        for (let i = 1; i <= range; i++) {
          const num = i.toString().padStart(2, '0');
          const rollNumber = `${prefix}${num}`;
          students.push({
            rollNumber,
            campus,
            department: bbaDept,
            year,
            imageUrl: `${campus.baseUrl}${rollNumber}.jpg`
          });
        }
      });
    } else if (campus.type === 'pharma') {
      const pharmaYears = ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
      const pharmaDept = relevantDepartments[0];
      
      pharmaYears.forEach((year) => {
        const yearSuffix = year.slice(2);
        for (let i = 1; i <= 500; i++) {
          const num = i.toString().padStart(3, '0');
          const rollNumber = `6${yearSuffix}${num}`;
          students.push({
            rollNumber,
            campus,
            department: pharmaDept,
            year,
            imageUrl: `${campus.baseUrl}${rollNumber}.jpg`
          });
        }
      });
    } else if (campus.type === 'forensic') {
      const forensicYears = ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
      const forensicDept = relevantDepartments[0];
      
      forensicYears.forEach((year) => {
        const yearSuffix = year.slice(2);
        for (let i = 1; i <= 200; i++) {
          const num = i.toString().padStart(3, '0');
          const rollNumber = `FR${yearSuffix}${num}`;
          students.push({
            rollNumber,
            campus,
            department: forensicDept,
            year,
            imageUrl: `${campus.baseUrl}${rollNumber}.jpg`
          });
        }
      });
    }
  });
  
  _cachedStudents = students;
  return students;
};
