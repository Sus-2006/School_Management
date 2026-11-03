import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, ChevronRight, TrendingUp, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { AttendanceData } from '../../types';

interface AttendanceWidgetProps {
  data: AttendanceData | null;
}

export const AttendanceWidget: React.FC<AttendanceWidgetProps> = ({ data }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const percentage = data?.attendancePercentage ?? 94.6;
  const attended = data?.classesAttended ?? 123;
  const total = data?.totalClasses ?? 129;
  const streak = data?.streakDays ?? 14;

  return (
    <div
      onClick={() => navigate('/attendance')}
      className="card-base p-5 card-hover cursor-pointer group flex flex-col justify-between"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate('/attendance');
        }
      }}
      aria-label="View Detailed Attendance"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[var(--text-primary)]">
                {t('attendanceOverview')}
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                {t('currentTermProgress')}
              </p>
            </div>
          </div>

          <div className="p-1.5 rounded-xl bg-[var(--bg-main)] text-[var(--text-muted)] group-hover:text-emerald-500 group-hover:translate-x-1 transition-all">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>

        {/* Attendance Metric Ring / Bar Display */}
        <div className="flex items-center justify-between gap-4 my-2">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
              {percentage}%
            </div>
            <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{t('standing')}</span>
            </div>
          </div>

          {/* SVG Progress Circle */}
          <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[var(--border-color)]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500 transition-all duration-1000 ease-out"
                strokeDasharray={`${percentage}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <Award className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Class Count & Streak Breakdown */}
      <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs">
        <span className="text-[var(--text-secondary)] font-medium">
          {t('classesAttended')}: <strong className="text-[var(--text-primary)] font-bold">{attended} / {total}</strong>
        </span>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
          {streak} {t('dayStreak')}
        </span>
      </div>
    </div>
  );
};
