export interface Campus {
  id: string;
  name: string;
  fullName: string;
  baseUrl: string;
  prefix: string;
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
}

// Campus data
export const CAMPUSES: Campus[] = [
  {
    id: 'aec',
    name: 'AEC',
    fullName: 'Aditya Engineering College (1st Campus)',
    baseUrl: 'https://info.aec.edu.in/AEC/StudentPhotos/',
    prefix: 'A91A'
  },
  {
    id: 'acet',
    name: 'ACET',
    fullName: 'Aditya College of Engineering & Technology (2nd Campus)',
    baseUrl: 'https://info.aec.edu.in/ACET/StudentPhotos/',
    prefix: 'P31A'
  },
  {
    id: 'acoe',
    name: 'ACOE',
    fullName: 'Aditya College of Engineering (3rd Campus)',
    baseUrl: 'https://info.aec.edu.in/acoe/StudentPhotos/',
    prefix: 'MH1A'
  }
];

// Department data
export const DEPARTMENTS: Department[] = [
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
  }
];

// Generate student data
export const generateStudentData = (): Student[] => {
  const students: Student[] = [];
  const years = ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
  const yearPrefixes = ['14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  
  CAMPUSES.forEach(campus => {
    DEPARTMENTS.forEach(department => {
      years.forEach((year, yearIndex) => {
        const yearPrefix = yearPrefixes[yearIndex];
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
      });
    });
  });
  
  return students;
};