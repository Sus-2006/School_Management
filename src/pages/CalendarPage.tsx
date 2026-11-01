import React, { useEffect, useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  CalendarDays,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../services/apiService';
import { useLanguage } from '../context/LanguageContext';
import type { CalendarEvent, DailyRoutinePeriod } from '../types';

export const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [routine, setRoutine] = useState<DailyRoutinePeriod[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-24');

  useEffect(() => {
    Promise.all([
      apiService.getCalendarEvents(),
      apiService.getDailyRoutine()
    ]).then(([eventsData, routineData]) => {
      setEvents(eventsData);
      setRoutine(routineData);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-20 bg-[var(--bg-card)] rounded-2xl"></div>
        <div className="h-64 bg-[var(--bg-card)] rounded-2xl"></div>
      </div>
    );
  }

  const filteredEvents = events.filter((evt) => {
    if (typeFilter === 'all') return true;
    return evt.type === typeFilter;
  });

  const getEventBadge = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'holiday':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      case 'exam':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      case 'special':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'event':
        return 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20';
      default:
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    }
  };

  // Generate August 2026 Calendar Grid Days (1 to 31)
  const augustDays = Array.from({ length: 31 }, (_, i) => i + 1);

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

      <div className="card-base p-6 bg-gradient-to-r from-sky-500/10 via-indigo-500/5 to-transparent">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-sky-500/20">
              <CalendarDays className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
                {t('academicCalendarTitle')}
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
                {t('dailyTimetable')} & {t('academicSession')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Calendar Grid & Daily Routine Timetable */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive August 2026 Calendar View (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="card-base p-6">
            {/* Month Header Switcher */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[var(--text-primary)]">
                  August 2026
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-500 font-semibold border border-sky-500/20">
                  Current Month
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  disabled
                  className="p-1.5 rounded-lg text-[var(--text-muted)] bg-[var(--bg-main)] cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled
                  className="p-1.5 rounded-lg text-[var(--text-muted)] bg-[var(--bg-main)] cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-[var(--text-muted)] uppercase mb-2">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* August 2026 Calendar Day Cells */}
            <div className="grid grid-cols-7 gap-1.5">
              {/* August 1, 2026 starts on Saturday (6 empty offset cells) */}
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="h-12 sm:h-14 rounded-xl bg-transparent" />
              ))}

              {augustDays.map((day) => {
                const dateStr = `2026-08-${day < 10 ? '0' + day : day}`;
                const eventForDay = events.find((e) => e.date === dateStr);
                const isSelected = selectedDate === dateStr;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`h-12 sm:h-14 rounded-xl p-1.5 border flex flex-col justify-between items-start transition-all ${
                      isSelected
                        ? 'border-sky-500 bg-sky-500/10 font-bold shadow-sm'
                        : 'border-[var(--border-color)] bg-[var(--bg-main)] hover:border-sky-400'
                    }`}
                  >
                    <span className={`text-xs font-semibold ${isSelected ? 'text-sky-500' : 'text-[var(--text-primary)]'}`}>
                      {day}
                    </span>

                    {eventForDay && (
                      <span className={`w-full truncate text-[9px] font-bold px-1 py-0.5 rounded text-left ${getEventBadge(eventForDay.type)}`}>
                        {eventForDay.title}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Event Filter & Event Cards List */}
          <div className="card-base p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                School Events & Holidays
              </h2>

              <div className="flex items-center gap-1.5 flex-wrap">
                {['all', 'exam', 'holiday', 'event', 'special'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                      typeFilter === t
                        ? 'bg-sky-500 text-white'
                        : 'bg-[var(--bg-main)] text-[var(--text-secondary)] border border-[var(--border-color)]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredEvents.map((evt) => (
                <div
                  key={evt.id}
                  onClick={() => setSelectedDate(evt.date)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedDate === evt.date
                      ? 'bg-sky-500/5 border-sky-500'
                      : 'bg-[var(--bg-main)] border-[var(--border-color)] hover:border-sky-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getEventBadge(evt.type)}`}>
                      {evt.type}
                    </span>
                    <span className="text-xs font-semibold text-[var(--text-secondary)] flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5 text-sky-500" />
                      {evt.date}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-[var(--text-primary)] mt-2">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                    {evt.description}
                  </p>

                  {evt.timing && (
                    <div className="text-[11px] font-medium text-sky-600 dark:text-sky-400 flex items-center gap-1 mt-2">
                      <Clock className="w-3 h-3" />
                      Timing: {evt.timing}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Daily Period Timetable Routine (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="card-base p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-[var(--text-primary)]">
                  Daily Period Timetable
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Class 8-A Master Schedule
                </p>
              </div>

              <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Active
              </div>
            </div>

            <div className="space-y-3">
              {routine.map((item) => (
                <div
                  key={item.period}
                  className={`p-3.5 rounded-xl border transition-all ${
                    item.isCurrent
                      ? 'bg-sky-500/10 border-sky-500 text-[var(--text-primary)] shadow-sm'
                      : 'bg-[var(--bg-main)] border-[var(--border-color)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-sky-500 uppercase">
                      Period {item.period}
                    </span>
                    <span className="text-[11px] font-semibold text-[var(--text-secondary)] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-sky-500" />
                      {item.time}
                    </span>
                  </div>

                  <div className="font-bold text-sm text-[var(--text-primary)] mt-1">
                    {item.subject}
                  </div>

                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mt-1.5">
                    <span>{item.teacher}</span>
                    <span className="flex items-center gap-1 text-[var(--text-secondary)]">
                      <MapPin className="w-3 h-3 text-emerald-500" />
                      {item.room}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
