import { mockStudentProfile } from '../data/studentData';
import { mockAttendanceData } from '../data/attendanceData';
import { mockCalendarEvents, mockDailyRoutine } from '../data/calendarData';
import { mockWardArrivalStatus } from '../data/wardArrivalData';
import { mockAcademicSubjects } from '../data/academicsData';
import { mockExamSchedule } from '../data/examinationData';
import { mockContactInfo } from '../data/contactData';
import type {
  StudentProfile,
  AttendanceData,
  Notice,
  CalendarEvent,
  DailyRoutinePeriod,
  WardArrivalStatus,
  AcademicSubject,
  ExamScheduleItem,
  SchoolContactInfo
} from '../types';
import { backendApi } from './backendApi';

/**
 * Service Abstraction Layer
 * Intermediary service simulating asynchronous API calls.
 * In future project stages, these promises will fetch data from backend REST/GraphQL endpoints.
 */

// Helper to simulate minor network delay in prototype
const simulateAsync = <T>(data: T, delayMs: number = 80): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delayMs);
  });
};

export const apiService = {
  getStudentProfile: (): Promise<StudentProfile> => {
    return simulateAsync(mockStudentProfile);
  },

  getAttendanceStats: (): Promise<AttendanceData> => {
    return simulateAsync(mockAttendanceData);
  },

  getNotices: async (categoryFilter?: string): Promise<Notice[]> => {
    const notices = await backendApi.getNotices();
    const mapped = notices.map((notice) => ({
      id: notice.id,
      title: notice.title,
      date: notice.date || notice.createdAt || new Date().toISOString(),
      category: 'Notice' as const,
      priority: 'normal' as const,
      summary: notice.content,
      fullContent: notice.content,
      audience: (['all', 'students', 'parents', 'teachers'].includes(notice.audience) ? notice.audience : 'all') as Notice['audience'],
      issuedBy: 'School Office',
    }));
    return !categoryFilter || categoryFilter === 'All'
      ? mapped
      : mapped.filter((notice) => notice.category.toLowerCase() === categoryFilter.toLowerCase());
  },

  getCalendarEvents: (typeFilter?: string): Promise<CalendarEvent[]> => {
    if (!typeFilter || typeFilter === 'all') {
      return simulateAsync(mockCalendarEvents);
    }
    const filtered = mockCalendarEvents.filter((e) => e.type === typeFilter);
    return simulateAsync(filtered);
  },

  getDailyRoutine: (): Promise<DailyRoutinePeriod[]> => {
    return simulateAsync(mockDailyRoutine);
  },

  getWardArrivalStatus: (): Promise<WardArrivalStatus> => {
    return simulateAsync(mockWardArrivalStatus);
  },

  getAcademicSubjects: (): Promise<AcademicSubject[]> => {
    return simulateAsync(mockAcademicSubjects);
  },

  getExamSchedule: (): Promise<ExamScheduleItem[]> => {
    return simulateAsync(mockExamSchedule);
  },

  getContactInfo: (): Promise<SchoolContactInfo> => {
    return simulateAsync(mockContactInfo);
  },

  // Mock contact form submission
  submitContactQuery: (formData: { name: string; email: string; subject: string; message: string }): Promise<{ success: boolean; message: string }> => {
    console.log('Mock submission received:', formData);
    return simulateAsync({
      success: true,
      message: 'Your inquiry has been submitted successfully to the school administration office.'
    }, 400);
  }
};
