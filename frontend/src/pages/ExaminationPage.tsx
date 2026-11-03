import React, { useEffect, useState } from 'react';
import {
  FileSpreadsheet,
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  AlertCircle,
  Layers
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../services/apiService';
import { useLanguage } from '../context/LanguageContext';
import type { ExamScheduleItem } from '../types';

export const ExaminationPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [schedule, setSchedule] = useState<ExamScheduleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    apiService.getExamSchedule().then((data) => {
      setSchedule(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
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
          {t('academicSession')}
        </span>
      </div>

      {/* Banner */}
      <div className="card-base p-6 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-orange-500/20">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
                {t('examPortalTitle')}
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
                {t('firstTermDatesheet')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Exam Date Sheet List */}
      <div className="card-base p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[var(--text-primary)]">
            First Term Timetable (August 2026)
          </h2>
          <span className="text-xs px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold border border-orange-500/20">
            Official Date Sheet
          </span>
        </div>

        <div className="space-y-4">
          {schedule.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-[var(--text-primary)]">
                    {item.subject}
                  </span>
                  <span className="text-xs font-semibold text-[var(--text-muted)]">
                    ({item.maxMarks} Marks)
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-orange-500" />
                    <strong>{item.date}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-sky-500" />
                    {item.time} ({item.duration})
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    {item.roomNo}
                  </span>
                </div>

                {/* Syllabus Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-[10px] font-bold uppercase text-[var(--text-muted)]">Syllabus:</span>
                  {item.syllabus.map((syl, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-color)] text-[10px] text-[var(--text-secondary)]"
                    >
                      {syl}
                    </span>
                  ))}
                </div>
              </div>

              <button
                disabled
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-color)] cursor-not-allowed shrink-0"
              >
                Admit Slip Ready
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Guidelines & Exam Directives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-base p-6 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-orange-500">
            <AlertCircle className="w-4 h-4" />
            <span>Exam Hall Guidelines</span>
          </div>
          <ul className="text-xs text-[var(--text-secondary)] space-y-2 list-disc list-inside leading-relaxed">
            <li>Students must arrive at the examination hall 15 minutes before exam commencement.</li>
            <li>School ID card and admit slip are mandatory for entering the exam hall.</li>
            <li>Electronic devices, calculators, and unapproved notes are strictly prohibited.</li>
            <li>Writing time is 2 hours 30 minutes. An additional 15 minutes is granted for question paper reading.</li>
          </ul>
        </div>

        {/* Future Reports Placeholder */}
        <div className="card-base p-6 bg-[var(--bg-main)] border-dashed border-2 border-[var(--border-color)] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-orange-500 uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Report Card & Evaluation Module</span>
          </div>

          <h3 className="text-sm font-bold text-[var(--text-primary)]">
            Future Grading & Transcripts Architecture
          </h3>

          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            This module is structured for seamless integration with report card generation, grade performance analytics, answer sheet re-evaluation requests, and term transcripts.
          </p>
        </div>
      </div>
    </div>
  );
};
