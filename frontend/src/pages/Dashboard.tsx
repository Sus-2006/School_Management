import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  GraduationCap,
  FileSpreadsheet,
  PhoneCall,
  Sparkles,
  ChevronRight,
  BookOpenCheck,
  Building2
} from 'lucide-react';

import { WardArrivalWidget } from '../components/dashboard/WardArrivalWidget';
import { AttendanceWidget } from '../components/dashboard/AttendanceWidget';
import { RoutineWidget } from '../components/dashboard/RoutineWidget';
import { NoticesWidget } from '../components/dashboard/NoticesWidget';

import { apiService } from '../services/apiService';
import { useLanguage } from '../context/LanguageContext';
import type {
  StudentProfile,
  AttendanceData,
  Notice,
  DailyRoutinePeriod
} from '../types';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [attendance, setAttendance] = useState<AttendanceData | null>(null);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [routine, setRoutine] = useState<DailyRoutinePeriod[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    Promise.all([
      apiService.getStudentProfile(),
      apiService.getAttendanceStats(),
      apiService.getNotices(),
      apiService.getDailyRoutine()
    ]).then(([studentData, attendanceData, noticesData, routineData]) => {
      setStudent(studentData);
      setAttendance(attendanceData);
      setNotices(noticesData);
      setRoutine(routineData);
      setLoading(false);
    });
  }, []);

  const quickLinks = [
    {
      title: t('studentInfo'),
      desc: 'View profile, roll no & school records',
      path: '/student-info',
      icon: User,
      color: 'from-blue-500/10 to-indigo-500/10 text-blue-500 border-blue-500/20'
    },
    {
      title: t('academics'),
      desc: 'Curriculum topics & learning resources',
      path: '/academics',
      icon: GraduationCap,
      color: 'from-emerald-500/10 to-teal-500/10 text-emerald-500 border-emerald-500/20'
    },
    {
      title: t('examination'),
      desc: 'Term exams schedule & syllabus',
      path: '/examination',
      icon: FileSpreadsheet,
      color: 'from-amber-500/10 to-orange-500/10 text-amber-500 border-amber-500/20'
    },
    {
      title: t('contactUs'),
      desc: 'School helpline, headmaster & directory',
      path: '/contact',
      icon: PhoneCall,
      color: 'from-purple-500/10 to-pink-500/10 text-purple-500 border-purple-500/20'
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-24 bg-[var(--bg-card)] rounded-2xl"></div>
        <div className="h-32 bg-[var(--bg-card)] rounded-2xl"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-[var(--bg-card)] rounded-2xl"></div>
          <div className="h-64 bg-[var(--bg-card)] rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Top Student Welcome Banner */}
      <div className="card-base p-6 bg-gradient-to-r from-sky-500/10 via-emerald-500/5 to-transparent relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('welcomeBack')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              {t('namaste')}, {student?.name || 'Student'}! 👋
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs bg-[var(--bg-card)]/80 backdrop-blur-xs p-3 rounded-xl border border-[var(--border-color)]">
            <span className="flex items-center gap-1 font-semibold text-[var(--text-primary)]">
              <BookOpenCheck className="w-4 h-4 text-sky-500" />
              {student?.className} ({student?.section})
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="font-semibold text-[var(--text-primary)]">
              {t('rollNo')}: {student?.rollNo}
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="flex items-center gap-1 text-[var(--text-secondary)]">
              <Building2 className="w-3.5 h-3.5 text-emerald-500" />
              {t('schoolName')}
            </span>
          </div>
        </div>
      </div>

      {/* 1. Ward Arrival Notification Component */}
      <WardArrivalWidget />

      {/* 2. Primary Metrics Grid: Attendance, Routine & Notices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Attendance Card (Clickable -> /attendance) */}
        <AttendanceWidget data={attendance} />

        {/* Today's School Routine (View Calendar -> /calendar) */}
        <RoutineWidget routine={routine} />

        {/* Important Notices (View All -> /notices) */}
        <NoticesWidget notices={notices} />
      </div>

      {/* 3. Quick Access Modules Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
            {t('portalNavigationModules')}
          </h2>
          <span className="text-xs text-[var(--text-muted)]">
            {t('clickToOpenSection')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={() => navigate(item.path)}
                className="card-base p-4 card-hover cursor-pointer group flex flex-col justify-between"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(item.path);
                  }
                }}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} border flex items-center justify-center mb-3 transition-transform group-hover:scale-110`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-sky-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2 flex items-center text-xs font-semibold text-sky-500 group-hover:translate-x-1 transition-transform">
                  <span>{t('openSection')}</span>
                  <ChevronRight className="w-4 h-4 ml-0.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
