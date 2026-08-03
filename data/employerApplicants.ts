export interface EmployerApplicant {
  id: string;
  name: string;
  position: string;
  skills: string[];
  availability: string;
  distance: string;
  rating: number;
  matchScore: number;
  status: 'pending' | 'accepted' | 'rejected' | 'shortlisted';
  avatar: string;
  school: string;
  course: string;
  yearLevel: string;
}

export const employerApplicants: EmployerApplicant[] = [
  {
    id: '1',
    name: 'Junnyl Mabini',
    position: 'Service Crew',
    skills: ['Customer Service', 'Teamwork', 'Time Management'],
    availability: 'Weekdays after 3PM',
    distance: '1.2 km',
    rating: 4.8,
    matchScore: 95,
    status: 'pending',
    avatar: '',
    school: 'University of Santo Tomas',
    course: 'BS Information Technology',
    yearLevel: '3rd Year',
  },
  {
    id: '2',
    name: 'Ana Santos',
    position: 'Barista',
    skills: ['Coffee Knowledge', 'Customer Service', 'Multitasking'],
    availability: 'Weekends full day',
    distance: '2.5 km',
    rating: 4.6,
    matchScore: 92,
    status: 'pending',
    avatar: '',
    school: 'Ateneo de Manila',
    course: 'BS Psychology',
    yearLevel: '2nd Year',
  },
  {
    id: '3',
    name: 'Carlos Reyes',
    position: 'Sales Associate',
    skills: ['Sales', 'Communication', 'Fashion Knowledge'],
    availability: 'Weekends, Holidays',
    distance: '3.8 km',
    rating: 4.3,
    matchScore: 87,
    status: 'shortlisted',
    avatar: '',
    school: 'De La Salle University',
    course: 'BS Business',
    yearLevel: '4th Year',
  },
  {
    id: '4',
    name: 'Maria Santos',
    position: 'Cashier',
    skills: ['Cash Handling', 'Customer Service', 'Attention to Detail'],
    availability: 'Weekdays after 5PM',
    distance: '0.8 km',
    rating: 4.9,
    matchScore: 97,
    status: 'accepted',
    avatar: '',
    school: 'University of the Philippines',
    course: 'BS Accountancy',
    yearLevel: '3rd Year',
  },
  {
    id: '5',
    name: 'Juan Dela Cruz',
    position: 'Tutor',
    skills: ['Mathematics', 'Teaching', 'Communication'],
    availability: 'After class (6PM-8PM)',
    distance: '2 km',
    rating: 4.7,
    matchScore: 95,
    status: 'pending',
    avatar: '',
    school: 'University of the Philippines',
    course: 'BS Engineering',
    yearLevel: '2nd Year',
  },
];

export interface EmployerWorker {
  id: string;
  name: string;
  position: string;
  schedule: string;
  completedJobs: number;
  payment: string;
  status: 'active' | 'completed';
}

export const employerWorkers: EmployerWorker[] = [
  {
    id: 'w1',
    name: 'Maria Santos',
    position: 'Cashier',
    schedule: 'Mon-Fri 5PM-9PM',
    completedJobs: 12,
    payment: '₱85/hr • Weekly',
    status: 'active',
  },
  {
    id: 'w2',
    name: 'Carlos Reyes',
    position: 'Sales Associate',
    schedule: 'Weekends 10AM-6PM',
    completedJobs: 8,
    payment: '₱75/hr • Weekly',
    status: 'active',
  },
  {
    id: 'w3',
    name: 'Bea Torres',
    position: 'Service Crew',
    schedule: 'Mon, Wed, Fri 6PM-10PM',
    completedJobs: 15,
    payment: '₱80/hr • Weekly',
    status: 'active',
  },
];

export const employerRatings = {
  paymentReliability: 4.8,
  communication: 4.6,
  workCondition: 4.5,
  overall: 4.7,
  totalReviews: 24,
};
