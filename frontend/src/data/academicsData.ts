import type { AcademicSubject } from '../types';

export const mockAcademicSubjects: AcademicSubject[] = [
  {
    id: 'sub-math',
    name: 'Mathematics',
    code: 'MATH-801',
    teacher: 'Shri R.K. Verma',
    topicsCount: 16,
    completedTopics: 11,
    progressPercentage: 68.7,
    upcomingAssignment: 'Linear Equations Exercises (Due Aug 22)',
    description: 'Covering Rational Numbers, Linear Equations, Quadrilaterals, Data Handling, Square Roots & Algebraic Expressions.'
  },
  {
    id: 'sub-sci',
    name: 'Science & Technology',
    code: 'SCI-802',
    teacher: 'Smt. Anita Devi',
    topicsCount: 18,
    completedTopics: 14,
    progressPercentage: 77.8,
    upcomingAssignment: 'Cell Structure Diagram & Observations (Due Aug 20)',
    description: 'Covering Crop Production, Microorganisms, Synthetic Fibres, Metals/Non-Metals, Cell Structure & Friction.'
  },
  {
    id: 'sub-sst',
    name: 'Social Studies',
    code: 'SST-803',
    teacher: 'Shri Manoj Kumar',
    topicsCount: 15,
    completedTopics: 10,
    progressPercentage: 66.7,
    upcomingAssignment: 'Indian Constitution Rights Summary (Due Aug 23)',
    description: 'Covering History (Modern India), Geography (Resources & Agriculture), and Civics (Indian Constitution & Secularism).'
  },
  {
    id: 'sub-hin',
    name: 'Hindi Literature & Grammar',
    code: 'HIN-804',
    teacher: 'Shri S.N. Tripathi',
    topicsCount: 14,
    completedTopics: 12,
    progressPercentage: 85.7,
    upcomingAssignment: 'Essay writing on Rural Education (Due Aug 19)',
    description: 'NCERT Vasant Part-3, Hindi Prose, Poetry, Grammar, Essay Writing and Comprehension.'
  },
  {
    id: 'sub-eng',
    name: 'English Language & Reader',
    code: 'ENG-805',
    teacher: 'Smt. Priya Singh',
    topicsCount: 14,
    completedTopics: 10,
    progressPercentage: 71.4,
    upcomingAssignment: 'Honeydew Chapter 4 Q&A (Due Aug 21)',
    description: 'NCERT Honeydew & It So Happened readers, English Grammar, Letter Writing & Spoken English drills.'
  }
];
