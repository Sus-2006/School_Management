import type { CalendarEvent, DailyRoutinePeriod } from '../types';

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'e1',
    date: '2026-08-15',
    title: 'Independence Day',
    type: 'holiday',
    description: 'National Holiday & Flag Hoisting Ceremony at 8:00 AM in school ground.'
  },
  {
    id: 'e2',
    date: '2026-08-18',
    title: 'Parent-Teacher Meeting',
    type: 'event',
    description: 'Quarterly review with parents and discussion on term exam readiness.',
    timing: '09:30 AM - 01:00 PM'
  },
  {
    id: 'e3',
    date: '2026-08-21',
    title: 'School Sports Day & Science Fair',
    type: 'special',
    description: 'Annual inter-house sports competitions and district science model display.',
    timing: '08:00 AM - 02:00 PM'
  },
  {
    id: 'e4',
    date: '2026-08-24',
    title: 'Mathematics Examination',
    type: 'exam',
    description: 'First Term Exam - Mathematics Paper 1 (Algebra & Geometry).',
    timing: '09:00 AM - 11:30 AM'
  },
  {
    id: 'e5',
    date: '2026-08-25',
    title: 'Science Examination',
    type: 'exam',
    description: 'First Term Exam - Science (Physics, Chemistry & Biology).',
    timing: '09:00 AM - 11:30 AM'
  },
  {
    id: 'e6',
    date: '2026-08-26',
    title: 'Social Science Examination',
    type: 'exam',
    description: 'First Term Exam - History, Geography & Civics.',
    timing: '09:00 AM - 11:30 AM'
  },
  {
    id: 'e7',
    date: '2026-08-27',
    title: 'Hindi Language Examination',
    type: 'exam',
    description: 'First Term Exam - Hindi Literature & Grammar.',
    timing: '09:00 AM - 11:30 AM'
  },
  {
    id: 'e8',
    date: '2026-08-28',
    title: 'English Language Examination',
    type: 'exam',
    description: 'First Term Exam - English Composition & Reading.',
    timing: '09:00 AM - 11:30 AM'
  },
  {
    id: 'e9',
    date: '2026-08-29',
    title: 'National Sports Day',
    type: 'holiday',
    description: 'School holiday in honor of Major Dhyan Chand.'
  }
];

export const mockDailyRoutine: DailyRoutinePeriod[] = [
  { period: 1, time: '08:30 - 09:15 AM', subject: 'Mathematics', teacher: 'Shri R.K. Verma', room: 'Room 8-A', isCurrent: false },
  { period: 2, time: '09:15 - 10:00 AM', subject: 'Science', teacher: 'Smt. Anita Devi', room: 'Lab 2 / Room 8-A', isCurrent: true },
  { period: 3, time: '10:00 - 10:45 AM', subject: 'Hindi Literature', teacher: 'Shri S.N. Tripathi', room: 'Room 8-A', isCurrent: false },
  { period: 4, time: '10:45 - 11:15 AM', subject: 'Recess / Meal Time', teacher: 'School Staff', room: 'Dining Hall', isCurrent: false },
  { period: 5, time: '11:15 - 12:00 PM', subject: 'Social Studies', teacher: 'Shri Manoj Kumar', room: 'Room 8-A', isCurrent: false },
  { period: 6, time: '12:00 - 12:45 PM', subject: 'English Grammar', teacher: 'Smt. Priya Singh', room: 'Room 8-A', isCurrent: false },
  { period: 7, time: '12:45 - 01:30 PM', subject: 'Physical Education / Library', teacher: 'Shri Vikram Singh', room: 'Playground', isCurrent: false }
];
