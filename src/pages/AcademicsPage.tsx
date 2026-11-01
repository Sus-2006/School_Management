import React, { useEffect, useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  ArrowLeft,
  Layers,
  Sparkles,
  BookCheck,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../services/apiService';
import { useLanguage } from '../context/LanguageContext';
import type { AcademicSubject } from '../types';

export const AcademicsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [subjects, setSubjects] = useState<AcademicSubject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    apiService.getAcademicSubjects().then((data) => {
      setSubjects(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-20 bg-[var(--bg-card)] rounded-2xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-48 bg-[var(--bg-card)] rounded-2xl"></div>
          <div className="h-48 bg-[var(--bg-card)] rounded-2xl"></div>
        </div>
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
          {subjects.length} Enrolled Subjects
        </span>
      </div>

      {/* Banner */}
      <div className="card-base p-6 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
                {t('academicsCurriculumTitle')}
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
                {t('subjectWiseProgress')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((sub) => (
          <div key={sub.id} className="card-base p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {sub.code}
                  </span>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mt-1.5">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Teacher: {sub.teacher}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-[var(--text-primary)]">
                    {sub.progressPercentage}%
                  </div>
                  <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    Syllabus Covered
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[var(--border-color)] h-2 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${sub.progressPercentage}%` }}
                />
              </div>

              <p className="text-xs text-[var(--text-secondary)] mt-3 leading-relaxed">
                {sub.description}
              </p>
            </div>

            {/* Upcoming Assignment */}
            {sub.upcomingAssignment && (
              <div className="p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <BookCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-[var(--text-primary)] font-medium truncate">
                    {sub.upcomingAssignment}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-amber-500 shrink-0">
                  Active
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Future LMS Modules Placeholder Card */}
      <div className="card-base p-6 bg-[var(--bg-main)] border-dashed border-2 border-[var(--border-color)] space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Future Academic LMS Modules</span>
        </div>

        <h3 className="text-sm font-bold text-[var(--text-primary)]">
          LMS Learning Features Framework
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)]">
            <div className="font-bold text-xs text-[var(--text-primary)] flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-sky-500" />
              Digital Textbooks
            </div>
            <div className="text-[11px] text-[var(--text-muted)] mt-1">
              NCERT e-books & chapters
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)]">
            <div className="font-bold text-xs text-[var(--text-primary)] flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-500" />
              Online Submissions
            </div>
            <div className="text-[11px] text-[var(--text-muted)] mt-1">
              Assignment uploads & quizzes
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)]">
            <div className="font-bold text-xs text-[var(--text-primary)] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Progress Analytics
            </div>
            <div className="text-[11px] text-[var(--text-muted)] mt-1">
              Subject mastery charts
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
