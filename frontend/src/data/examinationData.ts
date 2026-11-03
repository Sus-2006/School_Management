import type { ExamScheduleItem } from '../types';

export const mockExamSchedule: ExamScheduleItem[] = [
  {
    id: 'ex-1',
    subject: 'Mathematics',
    date: '24 Aug 2026',
    time: '09:00 AM - 11:30 AM',
    duration: '2 Hours 30 Mins',
    maxMarks: 80,
    roomNo: 'Hall A (Ground Floor)',
    syllabus: ['Rational Numbers', 'Linear Equations in One Variable', 'Understanding Quadrilaterals', 'Data Handling']
  },
  {
    id: 'ex-2',
    subject: 'Science',
    date: '25 Aug 2026',
    time: '09:00 AM - 11:30 AM',
    duration: '2 Hours 30 Mins',
    maxMarks: 80,
    roomNo: 'Hall A (Ground Floor)',
    syllabus: ['Crop Production & Management', 'Microorganisms: Friend & Foe', 'Synthetic Fibres & Plastics', 'Cell Structure & Functions']
  },
  {
    id: 'ex-3',
    subject: 'Social Science',
    date: '26 Aug 2026',
    time: '09:00 AM - 11:30 AM',
    duration: '2 Hours 30 Mins',
    maxMarks: 80,
    roomNo: 'Hall B (First Floor)',
    syllabus: ['How, When and Where (History)', 'Resources (Geography)', 'The Indian Constitution (Civics)', 'Understanding Secularism']
  },
  {
    id: 'ex-4',
    subject: 'Hindi',
    date: '27 Aug 2026',
    time: '09:00 AM - 11:30 AM',
    duration: '2 Hours 30 Mins',
    maxMarks: 80,
    roomNo: 'Hall B (First Floor)',
    syllabus: ['Dhwani (Poem)', 'Lakh ki Choodiyan', 'Bus ki Yatra', 'Hindi Grammar & Letter Writing']
  },
  {
    id: 'ex-5',
    subject: 'English',
    date: '28 Aug 2026',
    time: '09:00 AM - 11:30 AM',
    duration: '2 Hours 30 Mins',
    maxMarks: 80,
    roomNo: 'Hall B (First Floor)',
    syllabus: ['The Best Christmas Present in the World', 'The Ant and the Cricket', 'Glimpses of the Past', 'Grammar & Unseen Passage']
  }
];
