import type { Notice } from '../types';

export const mockNotices: Notice[] = [
  {
    id: 'n1',
    title: 'First Term Examination Schedule Released (2026-27)',
    date: '12 Aug 2026',
    category: 'Examination',
    priority: 'urgent',
    summary: 'The date sheet for Class 6 to 10 First Term Examinations has been published. Exams commence on August 24, 2026.',
    fullContent: 'All students are hereby informed that the First Term Examinations for the Academic Session 2026-27 will commence from August 24, 2026. The detailed subject-wise timetable is updated on the Examination Portal and posted on the school main notice board. Admit slips will be distributed by class teachers on August 20.',
    issuedBy: 'Examination Controller'
  },
  {
    id: 'n2',
    title: 'School Holiday Announcement: Independence Day',
    date: '10 Aug 2026',
    category: 'Holiday',
    priority: 'normal',
    summary: 'School will remain closed on August 15, 2026 on account of Independence Day. Flag hoisting ceremony at 8:00 AM.',
    fullContent: 'On the occasion of India’s Independence Day, August 15, 2026, regular classes will remain suspended. All students, teachers, and guardians are cordially invited to attend the Flag Hoisting and Cultural Program in the school assembly ground starting at 8:00 AM.',
    issuedBy: 'Headmaster Office'
  },
  {
    id: 'n3',
    title: 'Parent-Teacher Meeting (PTM) Scheduled',
    date: '08 Aug 2026',
    category: 'Notice',
    priority: 'high',
    summary: 'Quarterly Parent-Teacher Meeting will be held on August 18, 2026 from 9:30 AM to 1:00 PM.',
    fullContent: 'We invite all parents/guardians to attend the quarterly PTM to discuss student academic progress, attendance records, and preparation for upcoming term exams. Refreshments will be provided for visiting guardians.',
    issuedBy: 'Student Welfare Committee'
  },
  {
    id: 'n4',
    title: 'Annual District Science Fair & Exhibition',
    date: '05 Aug 2026',
    category: 'Event',
    priority: 'normal',
    summary: 'Submissions open for student science models and projects. District event scheduled for August 21.',
    fullContent: 'Students interested in participating in the District Rural Science Fair are encouraged to submit project ideas to the Science Department teacher by August 18. Outstanding models will receive district commendations.',
    issuedBy: 'Science Club Supervisor'
  },
  {
    id: 'n5',
    title: 'Distribution of Free Textbooks & Uniform Allowance',
    date: '01 Aug 2026',
    category: 'Academic',
    priority: 'normal',
    summary: 'Government scheme textbook distribution for Class 8 students will take place in the school library hall.',
    fullContent: 'Under the State Education Welfare Scheme, supplementary learning textbooks and uniform allowances will be disbursed to registered students on August 17. Guardians are requested to bring student ID card.',
    issuedBy: 'Administration Office'
  }
];
