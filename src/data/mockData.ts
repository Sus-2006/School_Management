import type {
  AuthUser,
  StudentProfile,
  TeacherProfile,
  SchoolClass,
  SchoolBus,
  TimetableEntry,
  HomeworkItem,
  FeeRecord,
  Notice,
  NotificationAlert,
  StudentExamMark,
  ChatMessage,
} from '../types';

export const MOCK_USERS: AuthUser[] = [
  {
    id: 'USR-ADMIN-1',
    role: 'admin',
    loginId: 'admin',
    name: 'Dr. K. Swaminathan',
    email: 'admin@govschool.edu.in',
    phone: '9840123456',
    schoolName: 'Govt. Higher Secondary School',
  },
  {
    id: 'USR-TCHR-1',
    role: 'teacher',
    loginId: 'teacher',
    name: 'Mrs. Priya Sharma',
    email: 'priya.sharma@govschool.edu.in',
    phone: '9840123457',
    teacherId: 'T-01',
    schoolName: 'Govt. Higher Secondary School',
  },
  {
    id: 'USR-PRNT-1',
    role: 'parent',
    loginId: 'parent',
    name: 'Mr. Sundaram Raman',
    email: 'sundaram.r@gmail.com',
    phone: '9840123458',
    linkedStudentId: 'STU-001',
    childrenIds: ['STU-001', 'STU-021'],
    schoolName: 'Govt. Higher Secondary School',
  },
  {
    id: 'USR-STU-1',
    role: 'student',
    loginId: 'student',
    name: 'Aarav Sundaram',
    email: 'aarav.s@govschool.edu.in',
    phone: '9840123459',
    linkedStudentId: 'STU-001',
    schoolName: 'Govt. Higher Secondary School',
  },
];

export const MOCK_CLASSES: SchoolClass[] = [
  { id: 'CLS-6A', name: 'Class 6', section: 'A', fullName: 'Class 6-A', classTeacherId: 'T-03', classTeacherName: 'Mrs. Anitha Sundaram', studentCount: 20, roomNo: 'Room 101' },
  { id: 'CLS-6B', name: 'Class 6', section: 'B', fullName: 'Class 6-B', classTeacherId: 'T-07', classTeacherName: 'Mrs. Meenakshi Iyer', studentCount: 20, roomNo: 'Room 102' },
  { id: 'CLS-7A', name: 'Class 7', section: 'A', fullName: 'Class 7-A', classTeacherId: 'T-04', classTeacherName: 'Mr. David Williams', studentCount: 20, roomNo: 'Room 201' },
  { id: 'CLS-7B', name: 'Class 7', section: 'B', fullName: 'Class 7-B', classTeacherId: 'T-06', classTeacherName: 'Mr. Karthik Raja', studentCount: 20, roomNo: 'Room 202' },
  { id: 'CLS-8A', name: 'Class 8', section: 'A', fullName: 'Class 8-A', classTeacherId: 'T-01', classTeacherName: 'Mrs. Priya Sharma', studentCount: 20, roomNo: 'Room 301' },
  { id: 'CLS-9A', name: 'Class 9', section: 'A', fullName: 'Class 9-A', classTeacherId: 'T-02', classTeacherName: 'Mr. Rajesh Kumar', studentCount: 20, roomNo: 'Room 302' },
  { id: 'CLS-10A', name: 'Class 10', section: 'A', fullName: 'Class 10-A', classTeacherId: 'T-05', classTeacherName: 'Mr. Lakshmi Narayanan', studentCount: 20, roomNo: 'Room 401' },
];

export const MOCK_TEACHERS: TeacherProfile[] = [
  { id: 'T-01', name: 'Mrs. Priya Sharma', phone: '9840112233', email: 'priya.s@govschool.edu.in', subject: 'Mathematics', qualification: 'M.Sc., B.Ed.', classTeacherOf: 'Class 8-A', experienceYears: 11 },
  { id: 'T-02', name: 'Mr. Rajesh Kumar', phone: '9840112234', email: 'rajesh.k@govschool.edu.in', subject: 'Science (Physics)', qualification: 'M.Sc., M.Ed.', classTeacherOf: 'Class 9-A', experienceYears: 14 },
  { id: 'T-03', name: 'Mrs. Anitha Sundaram', phone: '9840112235', email: 'anitha.s@govschool.edu.in', subject: 'Tamil Language', qualification: 'M.A., B.Ed.', classTeacherOf: 'Class 6-A', experienceYears: 8 },
  { id: 'T-04', name: 'Mr. David Williams', phone: '9840112236', email: 'david.w@govschool.edu.in', subject: 'English', qualification: 'M.A., M.Phil.', classTeacherOf: 'Class 7-A', experienceYears: 9 },
  { id: 'T-05', name: 'Mr. Lakshmi Narayanan', phone: '9840112237', email: 'lakshmi.n@govschool.edu.in', subject: 'Social Science', qualification: 'M.A., B.Ed.', classTeacherOf: 'Class 10-A', experienceYears: 18 },
  { id: 'T-06', name: 'Mr. Karthik Raja', phone: '9840112238', email: 'karthik.r@govschool.edu.in', subject: 'Computer Science', qualification: 'MCA, B.Ed.', classTeacherOf: 'Class 7-B', experienceYears: 6 },
  { id: 'T-07', name: 'Mrs. Meenakshi Iyer', phone: '9840112239', email: 'meenakshi.i@govschool.edu.in', subject: 'Hindi', qualification: 'M.A., B.Ed.', classTeacherOf: 'Class 6-B', experienceYears: 12 },
  { id: 'T-08', name: 'Mr. Suresh Babu', phone: '9840112240', email: 'suresh.b@govschool.edu.in', subject: 'Physical Education', qualification: 'M.P.Ed.', experienceYears: 10 },
  { id: 'T-09', name: 'Mrs. Revathi Krishnan', phone: '9840112241', email: 'revathi.k@govschool.edu.in', subject: 'Science (Biology)', qualification: 'M.Sc., B.Ed.', experienceYears: 7 },
  { id: 'T-10', name: 'Mr. Mohan Das', phone: '9840112242', email: 'mohan.d@govschool.edu.in', subject: 'Science (Chemistry)', qualification: 'M.Sc., B.Ed.', experienceYears: 13 },
];

export const MOCK_BUSES: SchoolBus[] = [
  {
    id: 'BUS-01',
    busNo: 'Bus 1',
    registrationNo: 'TN 01 AB 1001',
    capacity: 25,
    routeId: 'RT-01',
    routeName: 'Route 1: North Ring - Gandhi Nagar',
    driverId: 'DRV-01',
    driverName: 'Mr. Ramanathan',
    driverPhone: '+91 98765 43210',
    attendantName: 'Mr. Selvam',
    attendantPhone: '+91 98765 43290',
    assignedStudentsCount: 18,
    currentStatus: 'On the way',
    currentLocationName: 'Near Gandhi Nagar Circle (2.4 km away)',
    stops: [
      { id: 'STP-101', name: 'Gandhi Statue Junction', order: 1, pickupTime: '07:30 AM', dropTime: '04:45 PM', landmark: 'Opp. BSNL Tower' },
      { id: 'STP-102', name: 'North Main Road Corner', order: 2, pickupTime: '07:42 AM', dropTime: '04:32 PM', landmark: 'Near SBI ATM' },
      { id: 'STP-103', name: 'Periyar Nagar Arch', order: 3, pickupTime: '07:55 AM', dropTime: '04:20 PM', landmark: 'Bus Stand' },
      { id: 'STP-104', name: 'Govt. Hospital Stop', order: 4, pickupTime: '08:08 AM', dropTime: '04:10 PM', landmark: 'Main Gate' },
    ],
  },
  {
    id: 'BUS-02',
    busNo: 'Bus 2',
    registrationNo: 'TN 01 CD 2002',
    capacity: 25,
    routeId: 'RT-02',
    routeName: 'Route 2: South Bypass - Anna Nagar',
    driverId: 'DRV-02',
    driverName: 'Mr. Murugan',
    driverPhone: '+91 98765 43211',
    attendantName: 'Mr. Kannan',
    attendantPhone: '+91 98765 43291',
    assignedStudentsCount: 19,
    currentStatus: 'On the way',
    currentLocationName: 'Crossing South Bypass Flyover',
    stops: [
      { id: 'STP-201', name: 'Anna Arch Roundabout', order: 1, pickupTime: '07:35 AM', dropTime: '04:40 PM', landmark: 'Near Police Booth' },
      { id: 'STP-202', name: 'Shanthi Colony 4th Avenue', order: 2, pickupTime: '07:48 AM', dropTime: '04:28 PM', landmark: 'Opp. Park' },
      { id: 'STP-203', name: 'Thirumangalam Metro', order: 3, pickupTime: '08:00 AM', dropTime: '04:15 PM', landmark: 'Pillar 42' },
    ],
  },
  {
    id: 'BUS-03',
    busNo: 'Bus 3',
    registrationNo: 'TN 01 EF 3003',
    capacity: 25,
    routeId: 'RT-03',
    routeName: 'Route 3: West Sector - Kamaraj Nagar',
    driverId: 'DRV-03',
    driverName: 'Mr. Velu Pillai',
    driverPhone: '+91 98765 43212',
    attendantName: 'Mr. Ravi',
    attendantPhone: '+91 98765 43292',
    assignedStudentsCount: 17,
    currentStatus: 'On the way',
    currentLocationName: 'Arriving at Kamaraj Circle Stop in 4 mins',
    stops: [
      { id: 'STP-301', name: 'Kamaraj Circle', order: 1, pickupTime: '07:35 AM', dropTime: '04:45 PM', landmark: 'Opp. Post Office' },
      { id: 'STP-302', name: 'West Sector 3rd Cross', order: 2, pickupTime: '07:46 AM', dropTime: '04:30 PM', landmark: 'Near Water Tank' },
      { id: 'STP-303', name: 'Railway Colony Gate', order: 3, pickupTime: '08:00 AM', dropTime: '04:15 PM', landmark: 'Platform 1 Gate' },
      { id: 'STP-304', name: 'Teacher Colony Junction', order: 4, pickupTime: '08:12 AM', dropTime: '04:05 PM', landmark: 'Community Hall' },
    ],
  },
  {
    id: 'BUS-04',
    busNo: 'Bus 4',
    registrationNo: 'TN 01 GH 4004',
    capacity: 28,
    routeId: 'RT-04',
    routeName: 'Route 4: East Coastal - Bharathi Nagar',
    driverId: 'DRV-04',
    driverName: 'Mr. Joseph Inbaraj',
    driverPhone: '+91 98765 43213',
    attendantName: 'Mr. Arul',
    attendantPhone: '+91 98765 43293',
    assignedStudentsCount: 16,
    currentStatus: 'At school',
    currentLocationName: 'School Bus Bay 4',
    stops: [
      { id: 'STP-401', name: 'Bharathi Nagar Market', order: 1, pickupTime: '07:30 AM', dropTime: '04:50 PM', landmark: 'Old Clock Tower' },
      { id: 'STP-402', name: 'Beach Road Signal', order: 2, pickupTime: '07:44 AM', dropTime: '04:35 PM', landmark: 'Lighthouse Turn' },
      { id: 'STP-403', name: 'Kotturpuram Bridge', order: 3, pickupTime: '07:58 AM', dropTime: '04:20 PM', landmark: 'Near Library' },
    ],
  },
  {
    id: 'BUS-05',
    busNo: 'Bus 5',
    registrationNo: 'TN 01 IJ 5005',
    capacity: 25,
    routeId: 'RT-05',
    routeName: 'Route 5: Central Avenue - Nehru Colony',
    driverId: 'DRV-05',
    driverName: 'Mr. Balaji',
    driverPhone: '+91 98765 43214',
    attendantName: 'Mr. Mani',
    attendantPhone: '+91 98765 43294',
    assignedStudentsCount: 15,
    currentStatus: 'Trip completed',
    currentLocationName: 'School Parking Bay',
    stops: [
      { id: 'STP-501', name: 'Nehru Statue Circle', order: 1, pickupTime: '07:40 AM', dropTime: '04:40 PM', landmark: 'Govt. Park' },
      { id: 'STP-502', name: 'Central Avenue 2nd Stop', order: 2, pickupTime: '07:52 AM', dropTime: '04:25 PM', landmark: 'Near Temple' },
      { id: 'STP-503', name: 'Old Town Chathiram', order: 3, pickupTime: '08:05 AM', dropTime: '04:12 PM', landmark: 'Panchayat Office' },
    ],
  },
];

// Helper to generate 140 realistic students (20 per class, 7 classes)
const FIRST_NAMES = [
  'Aarav', 'Aditi', 'Ananya', 'Arun', 'Bhuvan', 'Deepika', 'Dinesh', 'Divya',
  'Ganesh', 'Hari', 'Ishwarya', 'Janani', 'Kavya', 'Madhavan', 'Manojkumar', 'Naveen',
  'Pooja', 'Praveen', 'Priyanka', 'Rahul', 'Rithika', 'Sai Krishna', 'Sanjay', 'Santhosh',
  'Saravanan', 'Shalini', 'Sneha', 'Sowmya', 'Subash', 'Surya', 'Swetha', 'Tharun',
  'Varun', 'Vignesh', 'Vijay', 'Vinoth', 'Yamini', 'Yuvan', 'Abhinav', 'Archana'
];

const LAST_NAMES = [
  'Sundaram', 'Murugan', 'Kumar', 'Natarajan', 'Subramanian', 'Raman', 'Krishnan',
  'Balachandar', 'Chinnadurai', 'Dharmalingam', 'Govindarajan', 'Jayaraman', 'Kandasamy',
  'Manickam', 'Palanisamy', 'Radhakrishnan', 'Sengottaiyan', 'Thangavel', 'Veerappan', 'Velayutham'
];

function generate140Students(): StudentProfile[] {
  const students: StudentProfile[] = [];
  let idCounter = 1;

  MOCK_CLASSES.forEach((cls) => {
    for (let r = 1; r <= 20; r++) {
      const idStr = String(idCounter).padStart(3, '0');
      const studentId = `STU-${idStr}`;
      const rollNo = String(r).padStart(2, '0');
      const firstName = FIRST_NAMES[(idCounter - 1) % FIRST_NAMES.length];
      const lastName = LAST_NAMES[(idCounter - 1) % LAST_NAMES.length];
      const fullName = (idCounter === 1) ? 'Aarav Sundaram' : `${firstName} ${lastName}`;
      
      const isMale = (r % 2 === 1);
      const gender = isMale ? 'Male' : 'Female';
      const bloodGroups = ['A+', 'B+', 'O+', 'AB+', 'A-', 'O-'];
      const bloodGroup = bloodGroups[idCounter % bloodGroups.length];
      
      // Transport rule: about 60% of students assigned to bus transport
      const needsTransport = (r <= 12); // 12 out of 20 = 60%
      const busIndex = (idCounter % 5);
      const bus = MOCK_BUSES[busIndex];
      const stop = bus.stops[r % bus.stops.length];

      const dobYear = 2010 + parseInt(cls.name.replace('Class ', '')) - 6;
      const dobMonth = String((idCounter % 12) + 1).padStart(2, '0');
      const dobDay = String((idCounter % 28) + 1).padStart(2, '0');

      students.push({
        id: studentId,
        name: fullName,
        rollNo,
        classId: cls.id,
        className: cls.fullName,
        section: cls.section,
        schoolName: 'Govt. Higher Secondary School',
        academicYear: '2026-2027',
        admissionNo: `ADM-2024-${idStr}`,
        dob: `${dobYear}-${dobMonth}-${dobDay}`,
        gender,
        bloodGroup,
        guardianName: `${lastName} ${isMale ? 'Raman' : 'Devi'}`,
        guardianPhone: `9840${String(100000 + idCounter).slice(1)}`,
        fatherName: `${lastName} ${isMale ? 'Raman' : 'Kumar'}`,
        motherName: `Mrs. Revathi ${lastName}`,
        parentEmail: `parent.${studentId.toLowerCase()}@gmail.com`,
        address: `No. ${r * 7}, ${stop?.name || 'Gandhi Road'}, Sector 4`,
        district: 'Kanchipuram',
        state: 'Tamil Nadu',
        transportRequired: needsTransport,
        busId: needsTransport ? bus.id : undefined,
        busNo: needsTransport ? bus.busNo : undefined,
        routeId: needsTransport ? bus.routeId : undefined,
        routeName: needsTransport ? bus.routeName : undefined,
        stopId: needsTransport ? stop.id : undefined,
        stopName: needsTransport ? stop.name : undefined,
        pickupTime: needsTransport ? stop.pickupTime : undefined,
        dropTime: needsTransport ? stop.dropTime : undefined,
        monthlyTransportFee: needsTransport ? 850 : 0,
        attendancePercentage: 88 + (idCounter % 11),
        todayAttendance: (idCounter % 15 === 0) ? 'absent' : 'present',
      });

      idCounter++;
    }
  });

  return students;
}

export const MOCK_STUDENTS: StudentProfile[] = generate140Students();

export const MOCK_TIMETABLE: TimetableEntry[] = [
  { id: 'TT-01', classId: 'CLS-8A', className: 'Class 8-A', day: 'Monday', period: 1, periodLabel: 'P1', time: '8:30 AM - 9:15 AM', startTime: '8:30', subject: 'Mathematics', teacherId: 'T-01', teacherName: 'Mrs. Priya Sharma', room: 'Room 301' },
  { id: 'TT-02', classId: 'CLS-8A', className: 'Class 8-A', day: 'Monday', period: 2, periodLabel: 'P2', time: '9:20 AM - 10:05 AM', startTime: '9:20', subject: 'English', teacherId: 'T-04', teacherName: 'Mr. David Williams', room: 'Room 301' },
  { id: 'TT-03', classId: 'CLS-8A', className: 'Class 8-A', day: 'Monday', period: 3, periodLabel: 'P3', time: '10:10 AM - 10:55 AM', startTime: '10:10', subject: 'Science', teacherId: 'T-02', teacherName: 'Mr. Rajesh Kumar', room: 'Physics Lab' },
  { id: 'TT-04', classId: 'CLS-8A', className: 'Class 8-A', day: 'Monday', period: 4, periodLabel: 'P4', time: '11:15 AM - 12:00 PM', startTime: '11:15', subject: 'Tamil', teacherId: 'T-03', teacherName: 'Mrs. Anitha Sundaram', room: 'Room 301' },
  { id: 'TT-05', classId: 'CLS-8A', className: 'Class 8-A', day: 'Monday', period: 5, periodLabel: 'P5', time: '12:45 PM - 01:30 PM', startTime: '12:45', subject: 'Social Science', teacherId: 'T-05', teacherName: 'Mr. Lakshmi Narayanan', room: 'Room 301' },
  { id: 'TT-06', classId: 'CLS-8A', className: 'Class 8-A', day: 'Monday', period: 6, periodLabel: 'P6', time: '01:35 PM - 02:20 PM', startTime: '01:35', subject: 'Computer Science', teacherId: 'T-06', teacherName: 'Mr. Karthik Raja', room: 'Computer Lab' },
  { id: 'TT-07', classId: 'CLS-8A', className: 'Class 8-A', day: 'Monday', period: 7, periodLabel: 'P7', time: '02:25 PM - 03:10 PM', startTime: '02:25', subject: 'Physical Education', teacherId: 'T-08', teacherName: 'Mr. Suresh Babu', room: 'Playground' },
];

export const MOCK_HOMEWORK: HomeworkItem[] = [
  {
    id: 'HW-01',
    classId: 'CLS-8A',
    className: 'Class 8-A',
    subject: 'Science',
    title: 'Science - Worksheet',
    description: 'Complete questions 1 to 10 on Light and Reflection from Chapter 4 worksheet.',
    assignedDate: '2026-10-30',
    dueDate: '2026-11-01',
    dueLabel: 'Tomorrow',
    teacherName: 'Mr. Rajesh Kumar',
    status: 'pending',
  },
  {
    id: 'HW-02',
    classId: 'CLS-8A',
    className: 'Class 8-A',
    subject: 'Mathematics',
    title: 'Maths - Exercise',
    description: 'Solve Algebraic Expressions Exercise 6.2 in homework notebook with steps.',
    assignedDate: '2026-10-29',
    dueDate: '2026-11-04',
    dueLabel: 'Friday',
    teacherName: 'Mrs. Priya Sharma',
    status: 'pending',
  },
  {
    id: 'HW-03',
    classId: 'CLS-8A',
    className: 'Class 8-A',
    subject: 'English',
    title: 'English - Essay Writing',
    description: 'Write an essay of 200 words on "The Importance of Environmental Conservation".',
    assignedDate: '2026-10-28',
    dueDate: '2026-11-06',
    dueLabel: 'Next Monday',
    teacherName: 'Mr. David Williams',
    status: 'submitted',
  },
];

export const MOCK_NOTICES: Notice[] = [
  {
    id: 'NOT-01',
    title: 'Fee reminder - Term 2',
    date: '2026-10-31',
    timeAgo: 'Today',
    category: 'Fee',
    priority: 'high',
    summary: 'Second term academic and bus transport fees are due by November 15, 2026.',
    fullContent: 'Parents and guardians are requested to clear the Term 2 tuition and transport fees on or before November 15, 2026. Online payment receipts can be downloaded instantly from the Parent portal.',
    audience: 'parents',
    issuedBy: 'Accounts Office',
  },
  {
    id: 'NOT-02',
    title: 'Unit test schedule',
    date: '2026-10-29',
    timeAgo: '2 days ago',
    category: 'Examination',
    priority: 'normal',
    summary: 'Second cycle unit tests for Classes 6 to 10 will commence from November 10th.',
    fullContent: 'The detailed timetable for Unit Test 2 has been released. The tests will be conducted during the first two morning periods. Hall tickets and seating plans will be displayed on school notice boards.',
    audience: 'all',
    issuedBy: 'Academic Coordinator',
  },
  {
    id: 'NOT-03',
    title: 'Annual Science & Tech Fair 2026',
    date: '2026-10-25',
    timeAgo: '6 days ago',
    category: 'Event',
    priority: 'normal',
    summary: 'Inter-school project displays and robot models exhibition next Friday.',
    fullContent: 'Students from Classes 7 to 10 are invited to submit their science project working model proposals to their respective science teachers by Thursday afternoon.',
    audience: 'students',
    issuedBy: 'Science Club',
  },
  {
    id: 'NOT-04',
    title: 'Bus Route 3 Timings Adjustment',
    date: '2026-10-31',
    timeAgo: 'Today',
    category: 'Transport',
    priority: 'urgent',
    summary: 'Bus 3 will arrive 5 minutes earlier at Kamaraj Circle due to road resurfacing.',
    fullContent: 'Due to road maintenance on the West Sector bridge, Bus 3 morning departure will be advanced by 5 minutes starting Monday morning. Drivers have been notified.',
    audience: 'parents',
    issuedBy: 'Transport Manager',
  },
];

export const MOCK_NOTIFICATIONS: NotificationAlert[] = [
  {
    id: 'ALR-01',
    title: 'Bus 3 Status Update',
    message: 'Bus 3 is arriving at your child pickup stop (Kamaraj Circle) in 5 minutes.',
    timestamp: '07:30 AM',
    timeAgo: '5 mins ago',
    read: false,
    type: 'bus',
    targetRole: 'parent',
  },
  {
    id: 'ALR-02',
    title: 'Daily Attendance Marked',
    message: 'Aarav Sundaram was marked PRESENT at 08:25 AM today.',
    timestamp: '08:30 AM',
    timeAgo: '2 hours ago',
    read: false,
    type: 'attendance',
    targetRole: 'parent',
  },
  {
    id: 'ALR-03',
    title: 'New Homework Assigned',
    message: 'Maths Exercise 6.2 assigned by Mrs. Priya Sharma, due on Friday.',
    timestamp: '11:00 AM',
    timeAgo: '3 hours ago',
    read: true,
    type: 'academic',
    targetRole: 'student',
  },
  {
    id: 'ALR-04',
    title: 'Bus 3 Route Updated',
    message: 'Transport officer modified stop order for Kamaraj Circle route.',
    timestamp: 'Yesterday',
    timeAgo: 'Yesterday',
    read: true,
    type: 'bus',
    targetRole: 'admin',
  },
  {
    id: 'ALR-05',
    title: 'Fee Reminder Notice',
    message: 'Term 2 fee invoices sent to 140 parents.',
    timestamp: 'Yesterday',
    timeAgo: 'Yesterday',
    read: true,
    type: 'fee',
    targetRole: 'admin',
  },
];

export const MOCK_EXAM_MARKS: StudentExamMark[] = [
  { id: 'MK-01', studentId: 'STU-001', studentName: 'Aarav Sundaram', classId: 'CLS-8A', exam: 'Unit Test 1', subject: 'Mathematics', marks: 24, maxMarks: 25, grade: 'A+', date: '2026-09-15' },
  { id: 'MK-02', studentId: 'STU-001', studentName: 'Aarav Sundaram', classId: 'CLS-8A', exam: 'Unit Test 1', subject: 'Science', marks: 23, maxMarks: 25, grade: 'A+', date: '2026-09-16' },
  { id: 'MK-03', studentId: 'STU-001', studentName: 'Aarav Sundaram', classId: 'CLS-8A', exam: 'Unit Test 1', subject: 'Tamil', marks: 22, maxMarks: 25, grade: 'A', date: '2026-09-17' },
  { id: 'MK-04', studentId: 'STU-001', studentName: 'Aarav Sundaram', classId: 'CLS-8A', exam: 'Unit Test 1', subject: 'English', marks: 23, maxMarks: 25, grade: 'A+', date: '2026-09-18' },
  { id: 'MK-05', studentId: 'STU-001', studentName: 'Aarav Sundaram', classId: 'CLS-8A', exam: 'Unit Test 1', subject: 'Social Science', marks: 21, maxMarks: 25, grade: 'A', date: '2026-09-19' },
  
  { id: 'MK-06', studentId: 'STU-001', studentName: 'Aarav Sundaram', classId: 'CLS-8A', exam: 'Mid-Term', subject: 'Mathematics', marks: 95, maxMarks: 100, grade: 'A+', date: '2026-10-10' },
  { id: 'MK-07', studentId: 'STU-001', studentName: 'Aarav Sundaram', classId: 'CLS-8A', exam: 'Mid-Term', subject: 'Science', marks: 91, maxMarks: 100, grade: 'A+', date: '2026-10-11' },
  { id: 'MK-08', studentId: 'STU-001', studentName: 'Aarav Sundaram', classId: 'CLS-8A', exam: 'Mid-Term', subject: 'Tamil', marks: 88, maxMarks: 100, grade: 'A', date: '2026-10-12' },
  { id: 'MK-09', studentId: 'STU-001', studentName: 'Aarav Sundaram', classId: 'CLS-8A', exam: 'Mid-Term', subject: 'English', marks: 92, maxMarks: 100, grade: 'A+', date: '2026-10-13' },
  { id: 'MK-10', studentId: 'STU-001', studentName: 'Aarav Sundaram', classId: 'CLS-8A', exam: 'Mid-Term', subject: 'Social Science', marks: 89, maxMarks: 100, grade: 'A', date: '2026-10-14' },
];

export const MOCK_FEES: FeeRecord[] = [
  {
    id: 'FEE-01',
    studentId: 'STU-001',
    studentName: 'Aarav Sundaram',
    className: 'Class 8-A',
    rollNo: '01',
    term: 'Term 1',
    tuitionFee: 3500,
    transportFee: 2550,
    otherFee: 450,
    total: 6500,
    paid: 6500,
    balance: 0,
    dueDate: '2026-07-31',
    status: 'Paid',
    lastPaymentDate: '2026-07-20',
  },
  {
    id: 'FEE-02',
    studentId: 'STU-001',
    studentName: 'Aarav Sundaram',
    className: 'Class 8-A',
    rollNo: '01',
    term: 'Term 2',
    tuitionFee: 3500,
    transportFee: 2550,
    otherFee: 450,
    total: 6500,
    paid: 4000,
    balance: 2500,
    dueDate: '2026-11-15',
    status: 'Partial',
    lastPaymentDate: '2026-10-15',
  },
];

export const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: 'MSG-01',
    senderId: 'T-01',
    senderName: 'Mrs. Priya Sharma (Maths)',
    senderRole: 'teacher',
    recipientId: 'USR-PRNT-1',
    recipientName: 'Mr. Sundaram Raman',
    text: 'Good evening Mr. Sundaram, Aarav has performed excellently in the algebra unit test this week!',
    timestamp: '2026-10-30T17:30:00Z',
    time: '5:30 PM',
    read: true,
  },
  {
    id: 'MSG-02',
    senderId: 'USR-PRNT-1',
    senderName: 'Mr. Sundaram Raman',
    senderRole: 'parent',
    recipientId: 'T-01',
    recipientName: 'Mrs. Priya Sharma (Maths)',
    text: 'Thank you so much teacher! He was very excited about the topics you taught.',
    timestamp: '2026-10-30T18:10:00Z',
    time: '6:10 PM',
    read: true,
  },
  {
    id: 'MSG-03',
    senderId: 'T-01',
    senderName: 'Mrs. Priya Sharma (Maths)',
    senderRole: 'teacher',
    recipientId: 'USR-PRNT-1',
    recipientName: 'Mr. Sundaram Raman',
    text: 'Please remind him to complete worksheet 6.2 by this Friday.',
    timestamp: '2026-10-31T09:15:00Z',
    time: '9:15 AM',
    read: false,
  },
];

// In-memory data store with localStorage sync
class LocalSchoolStore {
  private students: StudentProfile[] = [];
  private teachers: TeacherProfile[] = [];
  private buses: SchoolBus[] = [];
  private notices: Notice[] = [];
  private notifications: NotificationAlert[] = [];
  private homework: HomeworkItem[] = [];
  private messages: ChatMessage[] = [];

  constructor() {
    this.init();
  }

  private init() {
    try {
      const storedStudents = localStorage.getItem('lms_students');
      this.students = storedStudents ? JSON.parse(storedStudents) : [...MOCK_STUDENTS];

      const storedTeachers = localStorage.getItem('lms_teachers');
      this.teachers = storedTeachers ? JSON.parse(storedTeachers) : [...MOCK_TEACHERS];

      const storedBuses = localStorage.getItem('lms_buses');
      this.buses = storedBuses ? JSON.parse(storedBuses) : [...MOCK_BUSES];

      const storedNotices = localStorage.getItem('lms_notices');
      this.notices = storedNotices ? JSON.parse(storedNotices) : [...MOCK_NOTICES];

      const storedAlerts = localStorage.getItem('lms_alerts');
      this.notifications = storedAlerts ? JSON.parse(storedAlerts) : [...MOCK_NOTIFICATIONS];

      const storedHw = localStorage.getItem('lms_homework');
      this.homework = storedHw ? JSON.parse(storedHw) : [...MOCK_HOMEWORK];

      const storedMsgs = localStorage.getItem('lms_messages');
      this.messages = storedMsgs ? JSON.parse(storedMsgs) : [...MOCK_MESSAGES];
    } catch {
      this.students = [...MOCK_STUDENTS];
      this.teachers = [...MOCK_TEACHERS];
      this.buses = [...MOCK_BUSES];
      this.notices = [...MOCK_NOTICES];
      this.notifications = [...MOCK_NOTIFICATIONS];
      this.homework = [...MOCK_HOMEWORK];
      this.messages = [...MOCK_MESSAGES];
    }
  }

  private persist(key: string, data: unknown) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  getStudents(): StudentProfile[] {
    return this.students;
  }

  getStudentById(id: string): StudentProfile | undefined {
    return this.students.find((s) => s.id === id);
  }

  addStudent(newStudent: Omit<StudentProfile, 'id'>): StudentProfile {
    const nextIdNum = this.students.length + 1;
    const newId = `STU-${String(nextIdNum).padStart(3, '0')}`;
    const student: StudentProfile = {
      ...newStudent,
      id: newId,
    };
    this.students.unshift(student);

    // If assigned to bus, increment bus assigned count
    if (student.busId) {
      const bus = this.buses.find((b) => b.id === student.busId);
      if (bus) {
        bus.assignedStudentsCount += 1;
        this.persist('lms_buses', this.buses);
      }
    }

    this.persist('lms_students', this.students);
    return student;
  }

  updateStudent(id: string, updates: Partial<StudentProfile>): StudentProfile | null {
    const idx = this.students.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    this.students[idx] = { ...this.students[idx], ...updates };
    this.persist('lms_students', this.students);
    return this.students[idx];
  }

  deleteStudent(id: string): boolean {
    const student = this.students.find((s) => s.id === id);
    if (student?.busId) {
      const bus = this.buses.find((b) => b.id === student.busId);
      if (bus && bus.assignedStudentsCount > 0) {
        bus.assignedStudentsCount -= 1;
        this.persist('lms_buses', this.buses);
      }
    }
    this.students = this.students.filter((s) => s.id !== id);
    this.persist('lms_students', this.students);
    return true;
  }

  getTeachers(): TeacherProfile[] {
    return this.teachers;
  }

  addTeacher(teacher: Omit<TeacherProfile, 'id'>): TeacherProfile {
    const nextId = `T-${String(this.teachers.length + 1).padStart(2, '0')}`;
    const created: TeacherProfile = { ...teacher, id: nextId };
    this.teachers.push(created);
    this.persist('lms_teachers', this.teachers);
    return created;
  }

  getBuses(): SchoolBus[] {
    return this.buses;
  }

  getBusById(id: string): SchoolBus | undefined {
    return this.buses.find((b) => b.id === id);
  }

  addBus(bus: Omit<SchoolBus, 'id' | 'assignedStudentsCount'>): SchoolBus {
    const id = `BUS-0${this.buses.length + 1}`;
    const newBus: SchoolBus = {
      ...bus,
      id,
      assignedStudentsCount: 0,
    };
    this.buses.push(newBus);
    this.persist('lms_buses', this.buses);
    return newBus;
  }

  getNotices(): Notice[] {
    return this.notices;
  }

  addNotice(notice: Omit<Notice, 'id' | 'timeAgo'>): Notice {
    const newNotice: Notice = {
      ...notice,
      id: `NOT-${String(this.notices.length + 1).padStart(2, '0')}`,
      timeAgo: 'Just now',
    };
    this.notices.unshift(newNotice);
    this.persist('lms_notices', this.notices);
    return newNotice;
  }

  getNotifications(role?: string): NotificationAlert[] {
    if (!role || role === 'admin') return this.notifications;
    return this.notifications.filter((n) => n.targetRole === role || n.targetRole === 'all');
  }

  markAllNotificationsRead() {
    this.notifications.forEach((n) => (n.read = true));
    this.persist('lms_alerts', this.notifications);
  }

  getHomework(classId?: string): HomeworkItem[] {
    if (!classId) return this.homework;
    return this.homework.filter((h) => h.classId === classId);
  }

  addHomework(hw: Omit<HomeworkItem, 'id'>): HomeworkItem {
    const newHw: HomeworkItem = {
      ...hw,
      id: `HW-${String(this.homework.length + 1).padStart(2, '0')}`,
    };
    this.homework.unshift(newHw);
    this.persist('lms_homework', this.homework);
    return newHw;
  }

  getMessages(): ChatMessage[] {
    return this.messages;
  }

  sendMessage(senderId: string, senderName: string, role: AuthUser['role'], recipientId: string, recipientName: string, text: string): ChatMessage {
    const msg: ChatMessage = {
      id: `MSG-${Date.now()}`,
      senderId,
      senderName,
      senderRole: role,
      recipientId,
      recipientName,
      text,
      timestamp: new Date().toISOString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };
    this.messages.push(msg);
    this.persist('lms_messages', this.messages);
    return msg;
  }
}

export const schoolStore = new LocalSchoolStore();
