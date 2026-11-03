import React, { useEffect, useState } from 'react';
import {
  UserCheck,
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Calendar as CalendarIcon,
  Award,
  Filter,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../services/apiService';
import { useLanguage } from '../context/LanguageContext';
import type { AttendanceData, DailyAttendanceRecord } from '../types';

export const AttendancePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [attendance, setAttendance] = useState<AttendanceData | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    apiService.getAttendanceStats().then((data) => {
      setAttendance(data);
      setLoading(false);
    });
  }, []);

  if (loading || !attendance) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-20 bg-[var(--bg-card)] rounded-2xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="h-28 bg-[var(--bg-card)] rounded-2xl"></div>
          <div className="h-28 bg-[var(--bg-card)] rounded-2xl"></div>
          <div className="h-28 bg-[var(--bg-card)] rounded-2xl"></div>
          <div className="h-28 bg-[var(--bg-card)] rounded-2xl"></div>
        </div>
      </div>
    );
  }

  const filteredLogs = attendance.dailyAttendance.filter((log) => {
    if (statusFilter === 'all') return true;
    return log.status === statusFilter;
  });

  const getStatusBadge = (status: DailyAttendanceRecord['status']) => {
    switch (status) {
      case 'present':
        return {
          label: t('filterPresent'),
          bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
          icon: CheckCircle2
        };
      case 'absent':
        return {
          label: t('filterAbsent'),
          bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
          icon: XCircle
        };
      case 'holiday':
        return {
          label: t('filterHoliday'),
          bg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
          icon: CalendarIcon
        };
      default:
        return {
          label: t('filterWeekend'),
          bg: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
          icon: CalendarIcon
        };
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Back Button & Page Title */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('backToDashboard')}</span>
        </button>

        <span className="text-xs text-[var(--text-muted)]">
          Last Updated: {attendance.lastUpdated}
        </span>
      </div>

      <div className="card-base p-6 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-500/20">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
                {t('attendanceRecordTitle')}
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
                {t('classSection')} • {t('academicSession')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[var(--bg-card)] px-4 py-2 rounded-xl border border-[var(--border-color)]">
            <Award className="w-5 h-5 text-emerald-500" />
            <div>
              <div className="text-[10px] uppercase font-bold text-[var(--text-muted)]">
                {t('attendance')}
              </div>
              <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                {t('attendanceCompliant')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Metrics Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="card-base p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[var(--text-muted)]">
              Overall Percentage
            </div>
            <div className="text-3xl font-black text-[var(--text-primary)] mt-1">
              {attendance.attendancePercentage}%
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
              Above Minimum Threshold (75%)
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-extrabold text-lg">
            %
          </div>
        </div>

        {/* Metric 2 */}
        <div className="card-base p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[var(--text-muted)]">
              Classes Attended
            </div>
            <div className="text-3xl font-black text-[var(--text-primary)] mt-1">
              {attendance.classesAttended} <span className="text-sm font-normal text-[var(--text-muted)]">/ {attendance.totalClasses}</span>
            </div>
            <div className="text-[11px] text-[var(--text-secondary)] font-medium mt-1">
              Total Recorded Classes
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="card-base p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[var(--text-muted)]">
              Current Streak
            </div>
            <div className="text-3xl font-black text-amber-500 mt-1">
              {attendance.streakDays} Days
            </div>
            <div className="text-[11px] text-[var(--text-secondary)] font-medium mt-1">
              Consecutive Attendance
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="card-base p-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[var(--text-muted)]">
              Absentee Days
            </div>
            <div className="text-3xl font-black text-rose-500 mt-1">
              {attendance.totalClasses - attendance.classesAttended} Days
            </div>
            <div className="text-[11px] text-rose-500 font-semibold mt-1">
              Medical & Sick Leave
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
            <XCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Monthly Attendance Breakdown */}
      <div className="card-base p-6">
        <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
          Monthly Attendance Breakdown
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {attendance.monthlyAttendance.map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
              <div className="text-xs font-bold text-[var(--text-secondary)]">{m.month}</div>
              <div className="text-xl font-black text-[var(--text-primary)] mt-1">
                {m.percentage}%
              </div>
              <div className="w-full bg-[var(--border-color)] h-2 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${m.percentage}%` }}
                />
              </div>
              <div className="text-[10px] text-[var(--text-muted)] mt-2 font-medium">
                {m.attended} / {m.total} Attended
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Attendance Log & Calendar Status Grid */}
      <div className="card-base p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              August 2026 Daily Attendance Log
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Date-wise attendance verification
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-[var(--text-muted)] flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {['all', 'present', 'absent', 'holiday', 'weekend'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  statusFilter === st
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-[var(--bg-main)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Log Table/List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredLogs.map((log) => {
            const badge = getStatusBadge(log.status);
            const BadgeIcon = badge.icon;

            return (
              <div
                key={log.date}
                className="p-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-[var(--text-primary)]">
                    {log.date}
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-0.5 truncate max-w-[140px]">
                    {log.remarks}
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border flex items-center gap-1 ${badge.bg}`}>
                  <BadgeIcon className="w-3 h-3" />
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
