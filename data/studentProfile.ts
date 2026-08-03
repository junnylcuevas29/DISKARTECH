// Registration-matching student profile data.
// Mirrors the fields collected in app/auth/register-student.tsx so the
// profile screen shows exactly what the student entered during registration.

export interface StudentProfileData {
  // Personal Info
  firstName: string;
  middleName: string;
  lastName: string;
  birthday: string;
  age: string;
  gender: string;
  mobile: string;
  email: string;
  hasProfilePicture: boolean;

  // School Info
  schoolName: string;
  schoolType: 'College' | 'SHS';
  course: string;
  strand: string;
  yearLevel: string;
  studentNumber: string;

  // Schedule & Availability
  schedule: Record<string, { class: string; avail: string }>;

  // Skills & Job
  skills: string[];
  jobTypes: string[];
  locations: string[];

  // Documents
  documents: string[];

  // Verification
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

export const registerStudentData: StudentProfileData = {
  // Personal Info
  firstName: 'Junnyl',
  middleName: '',
  lastName: 'Mabini',
  birthday: '01/15/2004',
  age: '21',
  gender: 'Male',
  mobile: '0917 123 4567',
  email: 'junnyl.mabini@example.com',
  hasProfilePicture: true,

  // School Info
  schoolName: 'University of the Philippines',
  schoolType: 'College',
  course: 'BS Computer Science',
  strand: '',
  yearLevel: '3rd Year',
  studentNumber: '2022-12345',

  // Schedule & Availability
  schedule: {
    Monday: { class: '8:00 AM - 5:00 PM', avail: '6PM - 10PM' },
    Tuesday: { class: '8:00 AM - 12:00 PM', avail: 'Afternoon' },
    Wednesday: { class: '8:00 AM - 5:00 PM', avail: '6PM - 10PM' },
    Thursday: { class: '1:00 PM - 5:00 PM', avail: 'Morning' },
    Friday: { class: '8:00 AM - 12:00 PM', avail: 'Weekends' },
    Saturday: { class: '', avail: '8AM - 8PM' },
    Sunday: { class: '', avail: '8AM - 8PM' },
  },

  // Skills & Job
  skills: ['Cooking', 'Tutoring', 'Data Entry', 'Customer Service', 'Cleaning', 'Sales Assistance'],
  jobTypes: ['Part-Time', 'Weekend Job', 'After-Class Job'],
  locations: ['Barangay', 'Pinamalayan Area', '3-5 KM Radius'],

  // Documents
  documents: ['School ID', 'Government ID', 'Certificate of Enrollment', 'Resume'],

  // Verification
  verificationStatus: 'verified',
};

export const getFullName = (p: StudentProfileData): string =>
  [p.firstName, p.middleName, p.lastName].filter(Boolean).join(' ');

export const getInitials = (p: StudentProfileData): string => {
  const n = getFullName(p).trim();
  if (!n) return '?';
  const words = n.split(' ');
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return n.substring(0, 2).toUpperCase();
};

// Profile completion calculation (85%):
// - Personal info filled = 30%
// - School info filled = 20%
// - Skills + job prefs = 20%
// - Documents (Resume required) = 20%
// - Verification = 10%
export const computeProfileCompletion = (p: StudentProfileData): number => {
  let score = 0;
  if (p.firstName && p.lastName && p.email && p.mobile && p.birthday && p.gender) score += 30;
  if (p.schoolName && p.yearLevel && p.studentNumber) score += 20;
  if (p.skills.length > 0 && p.jobTypes.length > 0 && p.locations.length > 0) score += 20;
  if (p.documents.includes('Resume')) score += 20;
  if (p.verificationStatus === 'verified') score += 10;
  return score;
};

// Derived completion hints
export const missingResume = (p: StudentProfileData): boolean => !p.documents.includes('Resume');
export const skillCount = (p: StudentProfileData): number => p.skills.length;
