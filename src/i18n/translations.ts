export type Language = 'en' | 'hi' | 'ta';

export interface TranslationKeys {
  // Navigation & General
  portalTitle: string;
  studentPortal: string;
  schoolName: string;
  homeDashboard: string;
  attendance: string;
  schoolRoutine: string;
  importantNotices: string;
  studentInfo: string;
  academics: string;
  examination: string;
  contactUs: string;
  prototypeNote: string;
  prototypeDesc: string;
  welcomeBack: string;
  namaste: string;
  rollNo: string;
  classSection: string;

  // Ward Arrival
  wardArrivalTitle: string;
  wardArrivedMsg: string;
  wardNotArrivedMsg: string;
  simToggle: string;
  arrivedAt: string;
  biometricScanner: string;

  // Dashboard Widgets & Headers
  attendanceOverview: string;
  currentTermProgress: string;
  standing: string;
  classesAttended: string;
  dayStreak: string;
  todaysRoutine: string;
  dailyClassSchedule: string;
  viewCalendar: string;
  seeFullTimetable: string;
  totalPeriodsToday: string;
  schoolAnnouncements: string;
  viewAllNotices: string;
  activeAnnouncements: string;
  openNoticeBoard: string;
  portalNavigationModules: string;
  clickToOpenSection: string;
  openSection: string;

  // Attendance Page
  attendanceRecordTitle: string;
  attendanceCompliant: string;
  overallPercentage: string;
  minThresholdMsg: string;
  currentStreak: string;
  absenteeDays: string;
  medicalLeave: string;
  monthlyBreakdown: string;
  dailyAttendanceLog: string;
  filterAll: string;
  filterPresent: string;
  filterAbsent: string;
  filterHoliday: string;
  filterWeekend: string;

  // Calendar Page
  academicCalendarTitle: string;
  academicSession: string;
  dailyTimetable: string;
  eventCategories: string;
  allEvents: string;
  exams: string;
  holidays: string;
  events: string;
  special: string;

  // Notices Page
  noticesBoardTitle: string;
  searchPlaceholder: string;
  readCircular: string;
  closeNotice: string;
  issuedBy: string;

  // Student Info Page
  studentProfileTitle: string;
  personalGuardianDetails: string;
  admissionNo: string;
  dob: string;
  bloodGroup: string;
  guardianName: string;
  guardianPhone: string;
  homeAddress: string;
  futureArchitecture: string;
  futureArchDesc: string;

  // Academics Page
  academicsCurriculumTitle: string;
  subjectWiseProgress: string;
  syllabusCovered: string;
  activeAssignments: string;

  // Examination Page
  examPortalTitle: string;
  firstTermDatesheet: string;
  examHallGuidelines: string;
  guideline1: string;
  guideline2: string;
  guideline3: string;
  maxMarks: string;

  // Contact Page
  contactHelpdeskTitle: string;
  schoolDirectory: string;
  officeHours: string;
  emergencyHelpline: string;
  headmasterName: string;
  sendInquiry: string;
  yourName: string;
  contactNumber: string;
  queryCategory: string;
  yourMessage: string;
  submitInquiry: string;
  submitting: string;
  inquirySuccessMsg: string;

  // Back button
  backToDashboard: string;
}

export const translations: Record<Language, TranslationKeys> = {
  en: {
    portalTitle: 'test_lms_1',
    studentPortal: 'STUDENT PORTAL',
    schoolName: 'Govt. Higher Secondary School, Rampur',
    homeDashboard: 'Home / Dashboard',
    attendance: 'Attendance',
    schoolRoutine: 'School Routine',
    importantNotices: 'Important Notices',
    studentInfo: 'Student Info',
    academics: 'Academics',
    examination: 'Examination',
    contactUs: 'Contact Us',
    prototypeNote: 'Prototype Note',
    prototypeDesc: 'Optimized for low-bandwidth rural government school networks. Modular for future backend integration.',
    welcomeBack: 'Welcome Back',
    namaste: 'Namaste',
    rollNo: 'Roll No',
    classSection: 'Class 8 (Section A)',

    wardArrivalTitle: 'Ward Arrival Notification',
    wardArrivedMsg: 'Your ward has arrived at school safely.',
    wardNotArrivedMsg: 'Ward arrival not recorded yet for today.',
    simToggle: 'Simulate Toggle',
    arrivedAt: 'Arrived',
    biometricScanner: 'Main Gate Biometric Scanner',

    attendanceOverview: 'Attendance Overview',
    currentTermProgress: 'Current Term Progress',
    standing: 'Excellent Standing',
    classesAttended: 'Classes Attended',
    dayStreak: 'Days Streak',
    todaysRoutine: "Today's School Routine",
    dailyClassSchedule: 'Daily Class Schedule',
    viewCalendar: 'View Calendar',
    seeFullTimetable: 'See Full Timetable',
    totalPeriodsToday: 'Total Periods Today',
    schoolAnnouncements: 'School Announcements',
    viewAllNotices: 'View All',
    activeAnnouncements: 'Active Announcements',
    openNoticeBoard: 'Open Notice Board',
    portalNavigationModules: 'Portal Navigation Modules',
    clickToOpenSection: 'Click to open section',
    openSection: 'Open Section',

    attendanceRecordTitle: 'Detailed Attendance Record',
    attendanceCompliant: 'Regular & Compliant',
    overallPercentage: 'Overall Percentage',
    minThresholdMsg: 'Above Minimum Threshold (75%)',
    currentStreak: 'Current Streak',
    absenteeDays: 'Absentee Days',
    medicalLeave: 'Medical & Sick Leave',
    monthlyBreakdown: 'Monthly Attendance Breakdown',
    dailyAttendanceLog: 'Daily Attendance Log',
    filterAll: 'ALL',
    filterPresent: 'PRESENT',
    filterAbsent: 'ABSENT',
    filterHoliday: 'HOLIDAY',
    filterWeekend: 'WEEKEND',

    academicCalendarTitle: 'Academic Calendar & Routine',
    academicSession: 'Academic Session 2026-2027',
    dailyTimetable: 'Daily Period Timetable',
    eventCategories: 'Event Categories',
    allEvents: 'ALL',
    exams: 'EXAM',
    holidays: 'HOLIDAY',
    events: 'EVENT',
    special: 'SPECIAL',

    noticesBoardTitle: 'Important Notices & Circulars',
    searchPlaceholder: 'Search notices by keyword or subject...',
    readCircular: 'Read Circular',
    closeNotice: 'Close Circular',
    issuedBy: 'Issued by',

    studentProfileTitle: 'Student Profile & School Record',
    personalGuardianDetails: 'Personal & Guardian Details',
    admissionNo: 'Admission No',
    dob: 'Date of Birth',
    bloodGroup: 'Blood Group',
    guardianName: 'Guardian / Father Name',
    guardianPhone: 'Guardian Phone',
    homeAddress: 'Home Address',
    futureArchitecture: 'Future LMS Expansion Architecture',
    futureArchDesc: 'Modules for Digital Library, Fee Management, Homework Submission, and Online Assessments will link dynamically here upon backend deployment.',

    academicsCurriculumTitle: 'Academics & Subject Progress',
    subjectWiseProgress: 'Subject-wise Progress & Syllabus',
    syllabusCovered: 'Syllabus Covered',
    activeAssignments: 'Active Assignments',

    examPortalTitle: 'Examination Schedule & Syllabus',
    firstTermDatesheet: 'First Term Examination Datesheet',
    examHallGuidelines: 'Exam Hall Guidelines',
    guideline1: 'Students must carry their official School ID Card to the examination hall.',
    guideline2: 'Arrive at least 15 minutes before the scheduled exam start time.',
    guideline3: 'Mobile phones and unauthorized paper notes are strictly prohibited inside the hall.',
    maxMarks: 'Max Marks',

    contactHelpdeskTitle: 'School Contact & Helpdesk',
    schoolDirectory: 'School Directory & Location',
    officeHours: 'Office Hours',
    emergencyHelpline: 'Emergency Helpline',
    headmasterName: 'Headmaster / Principal',
    sendInquiry: 'Send Online Query / Inquiry',
    yourName: 'Your Full Name',
    contactNumber: 'Phone / Contact Number',
    queryCategory: 'Query Category',
    yourMessage: 'Your Message / Inquiry Details',
    submitInquiry: 'Submit Inquiry',
    submitting: 'Submitting...',
    inquirySuccessMsg: 'Your inquiry has been submitted successfully to the school administration office.',

    backToDashboard: 'Back to Dashboard'
  },
  hi: {
    portalTitle: 'test_lms_1',
    studentPortal: 'छात्र पोर्टल',
    schoolName: 'शासकीय उच्चतर माध्यमिक विद्यालय, रामपुर',
    homeDashboard: 'मुख्य पृष्ठ / डैशबोर्ड',
    attendance: 'उपस्थिति',
    schoolRoutine: 'समय सारिणी',
    importantNotices: 'महत्वपूर्ण सूचनाएं',
    studentInfo: 'छात्र जानकारी',
    academics: 'शैक्षणिक प्रगति',
    examination: 'परीक्षा विवरण',
    contactUs: 'संपर्क करें',
    prototypeNote: 'प्रारूप टिप्पणी',
    prototypeDesc: 'ग्रामीण सरकारी स्कूल नेटवर्क के लिए अनुकूलित। भविष्य के बैकएंड एकीकरण हेतु तैयार।',
    welcomeBack: 'पुनः स्वागत है',
    namaste: 'नमस्ते',
    rollNo: 'अनुक्रमांक',
    classSection: 'कक्षा 8 (वर्ग अ)',

    wardArrivalTitle: 'छात्र आगमन सूचना',
    wardArrivedMsg: 'आपका छात्र सुरक्षित विद्यालय पहुंच चुका है।',
    wardNotArrivedMsg: 'आज के लिए आगमन दर्ज नहीं हुआ है।',
    simToggle: 'स्थिति बदलें',
    arrivedAt: 'आगमन समय',
    biometricScanner: 'मुख्य द्वार बायोमेट्रिक स्कैनर',

    attendanceOverview: 'उपस्थिति विवरण',
    currentTermProgress: 'वर्तमान सत्र प्रगति',
    standing: 'उत्कृष्ट स्थिति',
    classesAttended: 'उपस्थित कक्षाएं',
    dayStreak: 'सतत उपस्थिति दिन',
    todaysRoutine: 'आज की समय सारिणी',
    dailyClassSchedule: 'दैनिक कक्षा अनुसूची',
    viewCalendar: 'कैलेण्डर देखें',
    seeFullTimetable: 'पूर्ण समय सारिणी देखें',
    totalPeriodsToday: 'आज कुल कालखंड',
    schoolAnnouncements: 'विद्यालय घोषणाएं',
    viewAllNotices: 'सभी देखें',
    activeAnnouncements: 'सक्रिय सूचनाएं',
    openNoticeBoard: 'सूचना पट्ट खोलें',
    portalNavigationModules: 'पोर्टल मुख्य अनुभाग',
    clickToOpenSection: 'अनुभाग खोलने के लिए क्लिक करें',
    openSection: 'अनुभाग खोलें',

    attendanceRecordTitle: 'विस्तृत उपस्थिति रिकॉर्ड',
    attendanceCompliant: 'नियमित एवं नियमसम्मत',
    overallPercentage: 'कुल प्रतिशत',
    minThresholdMsg: 'न्यूनतम सीमा (75%) से अधिक',
    currentStreak: 'वर्तमान सतत उपस्थिति',
    absenteeDays: 'अनुपस्थित दिन',
    medicalLeave: 'चिकित्सा एवं बीमारी अवकाश',
    monthlyBreakdown: 'मासिक उपस्थिति विवरण',
    dailyAttendanceLog: 'दैनिक उपस्थिति लॉग',
    filterAll: 'सभी',
    filterPresent: 'उपस्थित',
    filterAbsent: 'अनुपस्थित',
    filterHoliday: 'अवकाश',
    filterWeekend: 'रविवार/साप्ताहिक',

    academicCalendarTitle: 'शैक्षणिक कैलेण्डर एवं दिनचर्या',
    academicSession: 'शैक्षणिक सत्र 2026-2027',
    dailyTimetable: 'दैनिक कालखंड सारिणी',
    eventCategories: 'कार्यक्रम श्रेणियां',
    allEvents: 'सभी',
    exams: 'परीक्षा',
    holidays: 'अवकाश',
    events: 'कार्यक्रम',
    special: 'विशेष',

    noticesBoardTitle: 'महत्वपूर्ण सूचनाएं एवं परिपत्र',
    searchPlaceholder: 'कीवर्ड या विषय से सूचनाएं खोजें...',
    readCircular: 'परिपत्र पढ़ें',
    closeNotice: 'परिपत्र बंद करें',
    issuedBy: 'जारीकर्ता',

    studentProfileTitle: 'छात्र प्रोफाइल एवं स्कूल रिकॉर्ड',
    personalGuardianDetails: 'व्यक्तिगत एवं अभिभावक विवरण',
    admissionNo: 'प्रवेश संख्या',
    dob: 'जन्म तिथि',
    bloodGroup: 'रक्त समूह',
    guardianName: 'अभिभावक / पिता का नाम',
    guardianPhone: 'अभिभावक फोन',
    homeAddress: 'गृह पता',
    futureArchitecture: 'भविष्य एलएमएस विस्तार ढांचा',
    futureArchDesc: 'डिजिटल पुस्तकालय, शुल्क प्रबंधन, और ऑनलाइन मूल्यांकन मॉड्यूल बैकएंड से जुड़ेंगे।',

    academicsCurriculumTitle: 'शैक्षणिक एवं विषय प्रगति',
    subjectWiseProgress: 'विषयवार प्रगति एवं पाठ्यक्रम',
    syllabusCovered: 'पूर्ण पाठ्यक्रम',
    activeAssignments: 'गृहकार्य एवं असाइनमेंट',

    examPortalTitle: 'परीक्षा सारिणी एवं पाठ्यक्रम',
    firstTermDatesheet: 'प्रथम सत्र परीक्षा सारिणी',
    examHallGuidelines: 'परीक्षा कक्ष दिशानिर्देश',
    guideline1: 'छात्रों को परीक्षा कक्ष में आधिकारिक परिचय पत्र लाना अनिवार्य है।',
    guideline2: 'निर्धारित परीक्षा समय से कम से कम 15 मिनट पूर्व उपस्थित हों।',
    guideline3: 'परीक्षा कक्ष के भीतर मोबाइल फोन एवं कागज के टुकड़े पूर्णतः प्रतिबंधित हैं।',
    maxMarks: 'पूर्णांक',

    contactHelpdeskTitle: 'विद्यालय संपर्क एवं सहायता केंद्र',
    schoolDirectory: 'विद्यालय निर्देशिका एवं स्थान',
    officeHours: 'कार्यालय समय',
    emergencyHelpline: 'आपातकालीन हेल्पलाइन',
    headmasterName: 'प्रधानाध्यापक / प्राचार्य',
    sendInquiry: 'ऑनलाइन पूछताछ / प्रश्न भेजें',
    yourName: 'आपका पूरा नाम',
    contactNumber: 'फोन / संपर्क नंबर',
    queryCategory: 'पूछताछ श्रेणी',
    yourMessage: 'आपका संदेश / पूछताछ विवरण',
    submitInquiry: 'पूछताछ जमा करें',
    submitting: 'जमा हो रहा है...',
    inquirySuccessMsg: 'आपकी पूछताछ सफलतापूर्वक विद्यालय प्रशासन कार्यालय में जमा कर दी गई है।',

    backToDashboard: 'मुख्य डैशबोर्ड पर वापस जाएं'
  },
  ta: {
    portalTitle: 'test_lms_1',
    studentPortal: 'மாணவர் தளம்',
    schoolName: 'அரசு மேல்நிலைப் பள்ளி, ராம்பூர்',
    homeDashboard: 'முகப்பு / முகப்புப் பலகை',
    attendance: 'வருகைப்பதிவு',
    schoolRoutine: 'கால அட்டவணை',
    importantNotices: 'முக்கிய அறிவிப்புகள்',
    studentInfo: 'மாணவர் விவரம்',
    academics: 'கல்வி நிலை',
    examination: 'தேர்வு விவரம்',
    contactUs: 'தொடர்பு கொள்ள',
    prototypeNote: 'மாதிரி குறிப்பு',
    prototypeDesc: 'கிராமப்புற அரசுப் பள்ளி நெட்வொர்க்குகளுக்காக உருவாக்கப்பட்டது. பின்னணி சேவையக இணைப்புக்குத் தயாராக உள்ளது.',
    welcomeBack: 'நல்வரவு',
    namaste: 'வணக்கம்',
    rollNo: 'வரிசை எண்',
    classSection: 'வகுப்பு 8 (பிரிவு அ)',

    wardArrivalTitle: 'மாணவர் வருகை அறிவிப்பு',
    wardArrivedMsg: 'உங்கள் மாணவர் பள்ளிக்கு பாதுகாப்பாக வந்து சேர்ந்துள்ளார்.',
    wardNotArrivedMsg: 'இன்றைய வருகை இன்னும் பதிவு செய்யப்படவில்லை.',
    simToggle: 'நிலையை மாற்று',
    arrivedAt: 'வந்த நேரம்',
    biometricScanner: 'முதன்மை வாயில் கைரேகை கருவி',

    attendanceOverview: 'வருகைப்பதிவு கண்ணோட்டம்',
    currentTermProgress: 'தற்போதைய பருவ முன்னேற்றம்',
    standing: 'சிறப்பான நிலை',
    classesAttended: 'பங்கேற்ற வகுப்புகள்',
    dayStreak: 'தொடர் வருகை நாட்கள்',
    todaysRoutine: 'இன்றைய பள்ளி அட்டவணை',
    dailyClassSchedule: 'தினசரி வகுப்பு அட்டவணை',
    viewCalendar: 'நாட்காட்டியைப் பார்',
    seeFullTimetable: 'முழு அட்டவணையைப் பார்',
    totalPeriodsToday: 'இன்றைய மொத்த பாடவேளைகள்',
    schoolAnnouncements: 'பள்ளி அறிவிப்புகள்',
    viewAllNotices: 'அனைத்தும் காண்க',
    activeAnnouncements: 'செயலில் உள்ள அறிவிப்புகள்',
    openNoticeBoard: 'அறிவிப்புப் பலகையைத் திற',
    portalNavigationModules: 'தளத்தின் முதன்மைப் பிரிவுகள்',
    clickToOpenSection: 'பிரிவைத் திறக்க சொடுக்கவும்',
    openSection: 'பிரிவைத் திற',

    attendanceRecordTitle: 'விரிவான வருகைப்பதிவு',
    attendanceCompliant: 'முறையான மற்றும் திருப்திகரமானது',
    overallPercentage: 'மொத்த சதவீதம்',
    minThresholdMsg: 'குறைந்தபட்ச வரம்பிற்கு மேல் (75%)',
    currentStreak: 'தற்போதைய தொடர் வருகை',
    absenteeDays: 'வருகை தராத நாட்கள்',
    medicalLeave: 'மருத்துவ விடுப்பு',
    monthlyBreakdown: 'மாதாந்திர வருகை விவரம்',
    dailyAttendanceLog: 'தினசரி வருகைப் பதிவு',
    filterAll: 'அனைத்தும்',
    filterPresent: 'வந்தவர்',
    filterAbsent: 'வராதவர்',
    filterHoliday: 'விடுமுறை',
    filterWeekend: 'வார இறுதி',

    academicCalendarTitle: 'கல்வி நாட்காட்டி மற்றும் அட்டவணை',
    academicSession: 'கல்வியாண்டு 2026-2027',
    dailyTimetable: 'தினசரி பாடவேளை அட்டவணை',
    eventCategories: 'நிகழ்வு வகைகள்',
    allEvents: 'அனைத்தும்',
    exams: 'தேர்வு',
    holidays: 'விடுமுறை',
    events: 'நிகழ்வு',
    special: 'சிறப்பு',

    noticesBoardTitle: 'முக்கிய அறிவிப்புகள் மற்றும் சுற்றறிக்கைகள்',
    searchPlaceholder: 'முக்கிய வார்த்தை அல்லது தலைப்பால் தேடுக...',
    readCircular: 'சுற்றறிக்கையைப் படி',
    closeNotice: 'சுற்றறிக்கையை மூடு',
    issuedBy: 'வழங்கியவர்',

    studentProfileTitle: 'மாணவர் சுயவிவரம் மற்றும் பள்ளிப் பதிவு',
    personalGuardianDetails: 'தனிப்பட்ட மற்றும் பெற்றோர் விவரங்கள்',
    admissionNo: 'சேர்க்கை எண்',
    dob: 'பிறந்த தேதி',
    bloodGroup: 'ரத்த வகை',
    guardianName: 'பெற்றோர் / தந்தை பெயர்',
    guardianPhone: 'பெற்றோர் தொலைபேசி',
    homeAddress: 'வீட்டு முகவரி',
    futureArchitecture: 'எதிர்கால LMS விரிவாக்க கட்டமைப்பு',
    futureArchDesc: 'டிஜிட்டல் நூலகம், கட்டண மேலாண்மை, மற்றும் ஆன்லைன் தேர்வுகள் இணைக்கப்படும்.',

    academicsCurriculumTitle: 'கல்வி மற்றும் பாடப் பிரிவு முன்னேற்றம்',
    subjectWiseProgress: 'பாடம் வாரியான முன்னேற்றம்',
    syllabusCovered: 'முடிக்கப்பட்ட பாடப்பகுதி',
    activeAssignments: 'வீட்டுப்பாடங்கள்',

    examPortalTitle: 'தேர்வு அட்டவணை மற்றும் பாடத்திட்டம்',
    firstTermDatesheet: 'முதல் பருவத் தேர்வு அட்டவணை',
    examHallGuidelines: 'தேர்வுக்கூட விதிமுறைகள்',
    guideline1: 'மாணவர்கள் அதிகாரப்பூர்வ பள்ளி அடையாள அட்டையைக் கொண்டு வர வேண்டும்.',
    guideline2: 'தேர்வு தொடங்கும் நேரத்திற்கு 15 நிமிடங்களுக்கு முன்பே வரவும்.',
    guideline3: 'தேர்வுக்கூடத்திற்குள் கைபேசிகள் மற்றும் காகிதங்கள் முற்றிலும் தடை செய்யப்பட்டுள்ளன.',
    maxMarks: 'அதிகபட்ச மதிப்பெண்கள்',

    contactHelpdeskTitle: 'பள்ளி தொடர்பு மற்றும் உதவி மையம்',
    schoolDirectory: 'பள்ளி முகவரி மற்றும் இருப்பிடம்',
    officeHours: 'அலுவலக நேரம்',
    emergencyHelpline: 'அவசர உதவி எண்',
    headmasterName: 'தலைமை ஆசிரியர் / முதல்வர்',
    sendInquiry: 'ஆன்லைன் வினா / தகவலை அனுப்புக',
    yourName: 'உங்கள் முழு பெயர்',
    contactNumber: 'தொலைபேசி எண்',
    queryCategory: 'வினா வகை',
    yourMessage: 'உங்கள் செய்தி / விவரங்கள்',
    submitInquiry: 'சமர்ப்பிக்கவும்',
    submitting: 'சமர்ப்பிக்கப்படுகிறது...',
    inquirySuccessMsg: 'உங்கள் செய்தி பள்ளி நிர்வாக அலுவலகத்திற்கு வெற்றிகரமாக அனுப்பப்பட்டது.',

    backToDashboard: 'முதன்மை முகப்பிற்குத் திரும்பு'
  }
};
