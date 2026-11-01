import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Common pages
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

// Admin pages
import { AdminHome } from './pages/admin/AdminHome';
import { StudentsListPage } from './pages/admin/StudentsListPage';
import { AddStudentPage } from './pages/admin/AddStudentPage';
import { StaffPage } from './pages/admin/StaffPage';
import { AddTeacherPage } from './pages/admin/AddTeacherPage';
import { TransportPage } from './pages/admin/TransportPage';
import { AdminMorePage } from './pages/admin/AdminMorePage';
import { AdminFeesPage } from './pages/admin/AdminFeesPage';
import { AdminNoticesPage } from './pages/admin/AdminNoticesPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';

// Teacher pages
import { TeacherHome } from './pages/teacher/TeacherHome';
import { MarkAttendancePage } from './pages/teacher/MarkAttendancePage';
import { EnterMarksPage } from './pages/teacher/EnterMarksPage';
import { PostHomeworkPage } from './pages/teacher/PostHomeworkPage';
import { TeacherMessagesPage } from './pages/teacher/TeacherMessagesPage';
import { TeacherProfilePage } from './pages/teacher/TeacherProfilePage';

// Parent pages
import { ParentHome } from './pages/parent/ParentHome';
import { ParentChildView } from './pages/parent/ParentChildView';
import { ParentBusTrackingPage } from './pages/parent/ParentBusTrackingPage';
import { ParentFeesPage } from './pages/parent/ParentFeesPage';
import { ParentMessagesPage } from './pages/parent/ParentMessagesPage';

// Student pages
import { StudentHome } from './pages/student/StudentHome';
import { StudentTimetablePage } from './pages/student/StudentTimetablePage';
import { StudentHomeworkPage } from './pages/student/StudentHomeworkPage';
import { StudentResultsPage } from './pages/student/StudentResultsPage';
import { StudentBusInfoPage } from './pages/student/StudentBusInfoPage';
import { StudentProfilePage } from './pages/student/StudentProfilePage';

// Existing legacy pages for backward compatibility
import { AttendancePage } from './pages/AttendancePage';
import { CalendarPage } from './pages/CalendarPage';
import { NoticesPage } from './pages/NoticesPage';
import { StudentInfoPage } from './pages/StudentInfoPage';
import { AcademicsPage } from './pages/AcademicsPage';
import { ExaminationPage } from './pages/ExaminationPage';
import { ContactPage } from './pages/ContactPage';

const RootRedirect: React.FC = () => {
  const { role, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Navigate to={`/${role}`} replace />;
};

export const App: React.FC = () => {
  // Support both local dev and GitHub Pages base URL (/lms_gov.school/)
  const basename = import.meta.env.BASE_URL || '/';

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router basename={basename}>
            <Routes>
              {/* Root redirect */}
              <Route path="/" element={<RootRedirect />} />

              {/* Authentication */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/admin/students" element={<StudentsListPage />} />
              <Route path="/admin/add-student" element={<AddStudentPage />} />
              <Route path="/admin/staff" element={<StaffPage />} />
              <Route path="/admin/add-teacher" element={<AddTeacherPage />} />
              <Route path="/admin/transport" element={<TransportPage />} />
              <Route path="/admin/more" element={<AdminMorePage />} />
              <Route path="/admin/fees" element={<AdminFeesPage />} />
              <Route path="/admin/notices" element={<AdminNoticesPage />} />
              <Route path="/admin/reports" element={<AdminReportsPage />} />

              {/* Teacher Routes */}
              <Route path="/teacher" element={<TeacherHome />} />
              <Route path="/teacher/attendance" element={<MarkAttendancePage />} />
              <Route path="/teacher/marks" element={<EnterMarksPage />} />
              <Route path="/teacher/homework" element={<PostHomeworkPage />} />
              <Route path="/teacher/messages" element={<TeacherMessagesPage />} />
              <Route path="/teacher/profile" element={<TeacherProfilePage />} />

              {/* Parent Routes */}
              <Route path="/parent" element={<ParentHome />} />
              <Route path="/parent/child" element={<ParentChildView />} />
              <Route path="/parent/bus" element={<ParentBusTrackingPage />} />
              <Route path="/parent/fees" element={<ParentFeesPage />} />
              <Route path="/parent/messages" element={<ParentMessagesPage />} />

              {/* Student Routes */}
              <Route path="/student" element={<StudentHome />} />
              <Route path="/student/timetable" element={<StudentTimetablePage />} />
              <Route path="/student/homework" element={<StudentHomeworkPage />} />
              <Route path="/student/results" element={<StudentResultsPage />} />
              <Route path="/student/bus" element={<StudentBusInfoPage />} />
              <Route path="/student/profile" element={<StudentProfilePage />} />

              {/* Legacy routes preserved */}
              <Route path="/legacy/attendance" element={<AttendancePage />} />
              <Route path="/legacy/calendar" element={<CalendarPage />} />
              <Route path="/legacy/notices" element={<NoticesPage />} />
              <Route path="/legacy/student-info" element={<StudentInfoPage />} />
              <Route path="/legacy/academics" element={<AcademicsPage />} />
              <Route path="/legacy/examination" element={<ExaminationPage />} />
              <Route path="/legacy/contact" element={<ContactPage />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
