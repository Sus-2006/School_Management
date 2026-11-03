import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, ChevronRight, Clock, BookOpen, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { DailyRoutinePeriod } from '../../types';

interface RoutineWidgetProps {
  routine: DailyRoutinePeriod[];
}

export const RoutineWidget: React.FC<RoutineWidgetProps> = ({ routine }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Highlight top 3 periods on dashboard summary
  const displayPeriods = routine.slice(0, 3);

  return (
    <div className="card-base p-5 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[var(--text-primary)]">
                {t('todaysRoutine')}
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                {t('dailyClassSchedule')}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/calendar')}
            className="flex items-center gap-1 text-xs font-semibold text-sky-500 hover:text-sky-600 transition-colors"
          >
            <span>{t('viewCalendar')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Schedule List */}
        <div className="space-y-2.5 my-2">
          {displayPeriods.map((period) => (
            <div
              key={period.period}
              className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                period.isCurrent
                  ? 'bg-sky-500/10 border-sky-500/30 text-[var(--text-primary)] font-medium'
                  : 'bg-[var(--bg-main)] border-transparent hover:border-[var(--border-color)]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                  period.isCurrent
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-[var(--border-color)] text-[var(--text-secondary)]'
                }`}>
                  P{period.period}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[var(--text-primary)] truncate flex items-center gap-1.5">
                    <span>{period.subject}</span>
                    {period.isCurrent && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] uppercase font-bold bg-sky-500 text-white">
                        Now
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)] truncate flex items-center gap-2 mt-0.5">
                    <span>{period.teacher}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <MapPin className="w-3 h-3" />
                      {period.room}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 shrink-0 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{period.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer Action */}
      <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs">
        <span className="text-[var(--text-muted)] flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5 text-sky-500" />
          {t('totalPeriodsToday')}
        </span>
        <button
          onClick={() => navigate('/calendar')}
          className="text-xs font-semibold text-sky-500 hover:underline"
        >
          {t('seeFullTimetable')} →
        </button>
      </div>
    </div>
  );
};
