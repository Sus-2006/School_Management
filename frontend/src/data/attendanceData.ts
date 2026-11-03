import type { AttendanceData } from '../types';

export const mockAttendanceData: AttendanceData = {
  attendancePercentage: 94.6,
  classesAttended: 123,
  totalClasses: 129,
  streakDays: 14,
  lastUpdated: 'Today at 08:17 AM',
  monthlyAttendance: [
    { month: 'April 2026', percentage: 96.0, attended: 24, total: 25 },
    { month: 'May 2026', percentage: 95.2, attended: 20, total: 21 },
    { month: 'June 2026', percentage: 92.8, attended: 26, total: 28 },
    { month: 'July 2026', percentage: 95.8, attended: 23, total: 24 },
    { month: 'August 2026', percentage: 93.3, attended: 30, total: 31 }
  ],
  dailyAttendance: [
    { date: '2026-08-01', status: 'present', remarks: 'On time' },
    { date: '2026-08-02', status: 'weekend', remarks: 'Sunday' },
    { date: '2026-08-03', status: 'present', remarks: 'On time' },
    { date: '2026-08-04', status: 'present', remarks: 'On time' },
    { date: '2026-08-05', status: 'present', remarks: 'On time' },
    { date: '2026-08-06', status: 'absent', remarks: 'Sick leave (Informed)' },
    { date: '2026-08-07', status: 'present', remarks: 'On time' },
    { date: '2026-08-08', status: 'present', remarks: 'On time' },
    { date: '2026-08-09', status: 'weekend', remarks: 'Sunday' },
    { date: '2026-08-10', status: 'present', remarks: 'On time' },
    { date: '2026-08-11', status: 'present', remarks: 'On time' },
    { date: '2026-08-12', status: 'present', remarks: 'On time' },
    { date: '2026-08-13', status: 'present', remarks: 'On time' },
    { date: '2026-08-14', status: 'present', remarks: 'On time' },
    { date: '2026-08-15', status: 'holiday', remarks: 'Independence Day Holiday' },
    { date: '2026-08-16', status: 'weekend', remarks: 'Sunday' },
    { date: '2026-08-17', status: 'present', remarks: 'On time' },
    { date: '2026-08-18', status: 'present', remarks: 'On time' },
    { date: '2026-08-19', status: 'present', remarks: 'On time' },
    { date: '2026-08-20', status: 'present', remarks: 'On time' },
    { date: '2026-08-21', status: 'holiday', remarks: 'Special Event / School Sports Day' },
    { date: '2026-08-22', status: 'present', remarks: 'On time' },
    { date: '2026-08-23', status: 'weekend', remarks: 'Sunday' },
    { date: '2026-08-24', status: 'present', remarks: 'Exam Day - Mathematics' },
    { date: '2026-08-25', status: 'present', remarks: 'Exam Day - Science' },
    { date: '2026-08-26', status: 'present', remarks: 'Exam Day - Social Studies' },
    { date: '2026-08-27', status: 'present', remarks: 'Exam Day - Hindi' },
    { date: '2026-08-28', status: 'present', remarks: 'Exam Day - English' },
    { date: '2026-08-29', status: 'holiday', remarks: 'National Sports Day' },
    { date: '2026-08-30', status: 'weekend', remarks: 'Sunday' },
    { date: '2026-08-31', status: 'present', remarks: 'On time' }
  ]
};
