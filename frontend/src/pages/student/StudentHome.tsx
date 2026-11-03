import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { useAuth } from '../../context/AuthContext';
import { schoolStore, MOCK_TIMETABLE, MOCK_HOMEWORK } from '../../data/mockData';

export const StudentHome: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const student = schoolStore.getStudents()[0]; // Aarav Sundaram
  const timetable = MOCK_TIMETABLE.slice(0, 4); // First 4 periods matching Image 6
  const homework = MOCK_HOMEWORK.slice(0, 2);   // First 2 homework items matching Image 6

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100">
      <Header />

      <main className="max-w-md mx-auto p-4 space-y-5">
        
        {/* Today's Timetable Section (Matching Image 6) */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2.5">
            Today's timetable
          </h2>
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {timetable.map((period) => (
              <div key={period.id} className="p-3.5 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {period.periodLabel} {period.subject}
                </span>
                <span className="text-xs font-medium text-slate-400">
                  {period.startTime}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Homework Due Section (Matching Image 6) */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2.5">
            Homework due
          </h2>
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {homework.map((hw) => (
              <div key={hw.id} className="p-3.5 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {hw.title}
                </span>
                <span className="text-xs font-medium text-slate-400">
                  {hw.dueLabel}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Ring Card (Matching Image 6) */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2.5">
            Attendance
          </h2>
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center space-x-5">
            {/* Circular Ring with percentage */}
            <div className="w-18 h-18 rounded-full border-4 border-[#1e4ed8] border-t-slate-200 dark:border-t-slate-700 flex items-center justify-center shrink-0">
              <span className="text-base font-bold text-slate-900 dark:text-white">
                {student.attendancePercentage}%
              </span>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Attendance this term
              </p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                Eligible for term exams
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons: Results (Orange) & Bus info (Blue) (Matching Image 6) */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={() => navigate('/student/results')}
            className="py-3.5 px-4 rounded-2xl bg-[#f59e0b] hover:bg-[#d97706] active:scale-[0.98] text-white font-bold text-sm shadow-md transition-all text-center"
          >
            Results
          </button>
          <button
            onClick={() => navigate('/student/bus')}
            className="py-3.5 px-4 rounded-2xl bg-[#1e4ed8] hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm shadow-md transition-all text-center"
          >
            Bus info
          </button>
        </div>

      </main>

      <BottomNav />
    </div>
  );
};
