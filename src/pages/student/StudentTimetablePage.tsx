import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { MOCK_TIMETABLE } from '../../data/mockData';
import { Clock, MapPin } from 'lucide-react';

export const StudentTimetablePage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100">
      <Header title="Class Timetable" subtitle="Class 8-A" />

      <main className="max-w-md mx-auto p-4 space-y-4">
        
        {/* Day Selector Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs font-semibold">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3.5 py-2 rounded-xl shrink-0 transition ${
                selectedDay === day
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Periods List */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
          {MOCK_TIMETABLE.map((slot) => (
            <div key={slot.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center shrink-0">
                  {slot.periodLabel}
                </span>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    {slot.subject}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {slot.teacherName} • Room {slot.room}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-blue-700 dark:text-blue-400">
                  {slot.startTime}
                </span>
                <p className="text-[10px] text-slate-400">45 Mins</p>
              </div>
            </div>
          ))}
        </div>

      </main>

      <BottomNav />
    </div>
  );
};
