import React, { useEffect, useState } from 'react';
import {
  User,
  Building2,
  Phone,
  ArrowLeft,
  Layers,
  Award,
  IdCard
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../services/apiService';
import { useLanguage } from '../context/LanguageContext';
import type { StudentProfile } from '../types';

export const StudentInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    apiService.getStudentProfile().then((data) => {
      setStudent(data);
      setLoading(false);
    });
  }, []);

  if (loading || !student) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-20 bg-[var(--bg-card)] rounded-2xl"></div>
        <div className="h-48 bg-[var(--bg-card)] rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('backToDashboard')}</span>
        </button>

        <span className="text-xs text-[var(--text-muted)]">
          {t('admissionNo')}: {student.admissionNo}
        </span>
      </div>

      {/* Banner Header */}
      <div className="card-base p-6 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-blue-500/20">
              <User className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
                  {t('studentProfileTitle')}
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
                {t('personalGuardianDetails')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Student Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card Column 1 */}
        <div className="card-base p-6 text-center flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-sky-500/20">
              AS
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-[var(--bg-card)] flex items-center justify-center text-white">
              <Award className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black text-[var(--text-primary)]">
              {student.name}
            </h2>
            <p className="text-xs font-semibold text-sky-500 mt-0.5">
              {student.className} • {student.section}
            </p>
          </div>

          <div className="w-full pt-4 border-t border-[var(--border-color)] grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-[var(--bg-main)]">
              <div className="text-[10px] text-[var(--text-muted)] font-semibold uppercase">Roll Number</div>
              <div className="text-base font-extrabold text-[var(--text-primary)] mt-0.5">{student.rollNo}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[var(--bg-main)]">
              <div className="text-[10px] text-[var(--text-muted)] font-semibold uppercase">Academic Year</div>
              <div className="text-xs font-extrabold text-[var(--text-primary)] mt-1">{student.academicYear}</div>
            </div>
          </div>
        </div>

        {/* Detailed Info Grid Column 2 & 3 */}
        <div className="lg:col-span-2 card-base p-6 space-y-6">
          <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
            <IdCard className="w-4 h-4 text-blue-500" />
            <span>Academic & Guardian Particulars</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
              <div className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Full Name</div>
              <div className="text-sm font-bold text-[var(--text-primary)] mt-0.5">{student.name}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
              <div className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Admission Number</div>
              <div className="text-sm font-bold text-[var(--text-primary)] mt-0.5">{student.admissionNo}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
              <div className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Class & Section</div>
              <div className="text-sm font-bold text-[var(--text-primary)] mt-0.5">{student.className} ({student.section})</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
              <div className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Guardian Name</div>
              <div className="text-sm font-bold text-[var(--text-primary)] mt-0.5">{student.guardianName}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
              <div className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Guardian Contact</div>
              <div className="text-sm font-bold text-[var(--text-primary)] mt-0.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                {student.guardianPhone}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
              <div className="text-[10px] uppercase font-bold text-[var(--text-muted)]">School & District</div>
              <div className="text-sm font-bold text-[var(--text-primary)] mt-0.5 flex items-center gap-1.5 truncate">
                <Building2 className="w-3.5 h-3.5 text-blue-500" />
                {student.schoolName}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Future LMS Expansion Placeholder Section */}
      <div className="card-base p-6 bg-[var(--bg-main)] border-dashed border-2 border-[var(--border-color)] space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Future LMS Expansion Architecture</span>
        </div>

        <h3 className="text-sm font-bold text-[var(--text-primary)]">
          Student Info Submodules Ready For Expansion
        </h3>

        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          The internal hierarchy of this module (such as student medical records, extracurricular achievement certificates, document repository, and transport slips) will be defined in subsequent project phases. The navigation drawer and page routing are structured to seamlessly connect new sub-routes.
        </p>
      </div>
    </div>
  );
};
