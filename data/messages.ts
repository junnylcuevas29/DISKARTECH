import { Message } from '@/types';

export const conversations: Message[] = [
  {
    id: '1',
    senderId: 'emp1',
    senderName: "McDonald's HR",
    senderAvatar: 'https://ui-avatars.com/api/?name=McDonalds&background=D32F2F&color=fff&size=200',
    lastMessage: 'Hi! We would like to invite you for an interview tomorrow at 2PM.',
    timestamp: '2 min ago',
    unread: true,
    online: true,
    messages: [
      { id: 'm1', text: 'Hi! Thank you for applying at McDonald\'s SM North.', sender: 'them', timestamp: '10:30 AM' },
      { id: 'm2', text: 'Thank you! I\'m excited about the opportunity.', sender: 'me', timestamp: '10:32 AM' },
      { id: 'm3', text: 'We\'ve reviewed your application and we\'re impressed!', sender: 'them', timestamp: '10:33 AM' },
      { id: 'm4', text: 'We would like to invite you for an interview tomorrow at 2PM.', sender: 'them', timestamp: '10:34 AM' },
    ],
  },
  {
    id: '2',
    senderId: 'emp2',
    senderName: 'Starbucks - Maria',
    senderAvatar: 'https://ui-avatars.com/api/?name=Starbucks&background=00704A&color=fff&size=200',
    lastMessage: 'Congratulations! You\'ve been accepted for the Barista position.',
    timestamp: '1 hour ago',
    unread: true,
    online: true,
    messages: [
      { id: 'm5', text: 'Hello! Thank you for your application.', sender: 'them', timestamp: '9:00 AM' },
      { id: 'm6', text: 'Congratulations! You\'ve been accepted for the Barista position.', sender: 'them', timestamp: '9:01 AM' },
    ],
  },
  {
    id: '3',
    senderId: 'emp3',
    senderName: 'Grab Support',
    senderAvatar: 'https://ui-avatars.com/api/?name=Grab&background=00B14D&color=fff&size=200',
    lastMessage: 'Your partner application is being processed.',
    timestamp: '3 hours ago',
    unread: false,
    online: false,
    messages: [
      { id: 'm7', text: 'Welcome to Grab! Your documents are being verified.', sender: 'them', timestamp: 'Yesterday' },
      { id: 'm8', text: 'Your partner application is being processed.', sender: 'them', timestamp: '3 hours ago' },
    ],
  },
  {
    id: '4',
    senderId: 'emp4',
    senderName: 'TutorPro PH',
    senderAvatar: 'https://ui-avatars.com/api/?name=TutorPro&background=4CAF50&color=fff&size=200',
    lastMessage: 'We have a new student match for you! Grade 10 Math.',
    timestamp: '1 day ago',
    unread: false,
    online: true,
    messages: [
      { id: 'm9', text: 'We have a new student match for you! Grade 10 Math.', sender: 'them', timestamp: '1 day ago' },
    ],
  },
  {
    id: '5',
    senderId: 'emp5',
    senderName: 'Jollibee Recruitment',
    senderAvatar: 'https://ui-avatars.com/api/?name=Jollibee&background=FF0000&color=fff&size=200',
    lastMessage: 'Your scholar application is under review. We\'ll get back to you soon!',
    timestamp: '2 days ago',
    unread: false,
    online: false,
    messages: [
      { id: 'm10', text: 'Thank you for applying to the Jollibee Student Scholar Program.', sender: 'them', timestamp: '2 days ago' },
      { id: 'm11', text: 'Your scholar application is under review. We\'ll get back to you soon!', sender: 'them', timestamp: '2 days ago' },
    ],
  },
];

