export type UserRole = 'admin' | 'teacher' | 'parent' | 'student';

export interface AuthUser {
  id: string;
  role: UserRole;
  loginId: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  linkedStudentId?: string;
  childrenIds?: string[];
  teacherId?: string;
  schoolName: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  rollNo: string;
  classId?: string;
  className: string;
  section: string;
  schoolName: string;
  academicYear: string;
  admissionNo: string;
  dob?: string;
  gender?: 'Male' | 'Female' | 'Other';
  bloodGroup?: string;
  photo?: string;
  
  // Parent details
  guardianName: string;
  guardianPhone: string;
  fatherName?: string;
  motherName?: string;
  parentEmail?: string;
  address?: string;
  district: string;
  state: string;

  // Transport details
  transportRequired?: boolean;
  busId?: string;
  busNo?: string;
  routeId?: string;
  routeName?: string;
  stopId?: string;
  stopName?: string;
  pickupTime?: string;
  dropTime?: string;
  monthlyTransportFee?: number;

  // Academic & status
  attendancePercentage?: number;
  todayAttendance?: 'present' | 'absent' | 'late' | 'holiday';
}

export interface TeacherProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  qualification: string;
  classTeacherOf?: string;
  experienceYears: number;
  avatar?: string;
}

export interface SchoolClass {
  id: string;
  name: string;
  section: string;
  fullName: string;
  classTeacherId: string;
  classTeacherName: string;
  studentCount: number;
  roomNo: string;
}

export interface BusStop {
  id: string;
  name: string;
  order: number;
  pickupTime: string;
  dropTime: string;
  landmark?: string;
}

export interface SchoolBus {
  id: string;
  busNo: string;
  registrationNo: string;
  capacity: number;
  routeId: string;
  routeName: string;
  driverId: string;
  driverName: string;
  driverPhone: string;
  attendantName: string;
  attendantPhone: string;
  assignedStudentsCount: number;
  currentStatus: 'On the way' | 'At school' | 'Not started' | 'Trip completed';
  currentLocationName: string;
  stops: BusStop[];
}

export interface TimetableEntry {
  id: string;
  classId: string;
  className: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  period: number;
  periodLabel: string;
  time: string;
  startTime: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  room: string;
}

export interface HomeworkItem {
  id: string;
  classId: string;
  className: string;
  subject: string;
  title: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  dueLabel: string;
  teacherName: string;
  status?: 'pending' | 'submitted' | 'graded';
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'holiday';
  remarks?: string;
}

export interface StudentExamMark {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  exam: string;
  subject: string;
  marks: number;
  maxMarks: number;
  grade: string;
  date: string;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  rollNo: string;
  term: string;
  tuitionFee: number;
  transportFee: number;
  otherFee: number;
  total: number;
  paid: number;
  balance: number;
  dueDate: string;
  status: 'Paid' | 'Partial' | 'Due' | 'Overdue';
  lastPaymentDate?: string;
}

export type NoticeCategory = 'Academic' | 'Examination' | 'Holiday' | 'Event' | 'Notice' | 'Transport' | 'Fee';
export type NoticePriority = 'high' | 'normal' | 'urgent';

export interface Notice {
  id: string;
  title: string;
  date: string;
  timeAgo?: string;
  category: NoticeCategory;
  priority: NoticePriority;
  summary: string;
  fullContent: string;
  audience?: 'all' | 'students' | 'parents' | 'teachers';
  issuedBy: string;
}

export interface NotificationAlert {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  timeAgo: string;
  read: boolean;
  type: 'bus' | 'attendance' | 'fee' | 'notice' | 'academic';
  targetRole: UserRole | 'all';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientId: string;
  recipientName: string;
  text: string;
  timestamp: string;
  time: string;
  read: boolean;
}

export interface MonthlyAttendance {
  month: string;
  percentage: number;
  attended: number;
  total: number;
}

export interface DailyAttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'holiday' | 'weekend';
  remarks?: string;
}

export interface AttendanceData {
  attendancePercentage: number;
  classesAttended: number;
  totalClasses: number;
  streakDays: number;
  lastUpdated: string;
  monthlyAttendance: MonthlyAttendance[];
  dailyAttendance: DailyAttendanceRecord[];
}

export type CalendarEventType = 'holiday' | 'exam' | 'event' | 'school_day' | 'special';

export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  type: CalendarEventType;
  description: string;
  timing?: string;
}

export interface DailyRoutinePeriod {
  period: number;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  isCurrent?: boolean;
}

export interface WardArrivalStatus {
  isArrived: boolean;
  arrivalTime: string;
  date: string;
  statusMessage: string;
  location: string;
  lastRecordedMethod: string;
}

export interface AcademicSubject {
  id: string;
  name: string;
  code: string;
  teacher: string;
  topicsCount: number;
  completedTopics: number;
  progressPercentage: number;
  upcomingAssignment?: string;
  description: string;
}

export interface ExamScheduleItem {
  id: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  maxMarks: number;
  roomNo: string;
  syllabus: string[];
}

export interface SchoolContactInfo {
  schoolName: string;
  address: string;
  phone: string;
  emergencyHelpline: string;
  email: string;
  officeHours: string;
  headmaster: string;
  districtOffice: string;
}
