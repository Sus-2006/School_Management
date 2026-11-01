import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { useAuth } from '../../context/AuthContext';
import { schoolStore, MOCK_BUSES, MOCK_NOTICES } from '../../data/mockData';

export const ParentHome: React.FC = () => {
  const navigate = useNavigate();
  const { activeChild } = useAuth();

  const child = activeChild || schoolStore.getStudents()[0];
  const bus = child?.busId ? schoolStore.getBusById(child.busId) || MOCK_BUSES[2] : MOCK_BUSES[2];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100">
      <Header />

      <main className="max-w-md mx-auto p-4 space-y-5">
        
        {/* Child Attendance & Bus Card (Matching Image 5) */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Attendance today
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white capitalize">
                {child.todayAttendance === 'present' ? 'Present' : 'Absent'}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Bus status
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {bus.currentStatus}
              </span>
            </div>
          </div>

          {/* Big Orange Track Bus Action Button (Matching Image 5) */}
          <button
            onClick={() => navigate('/parent/bus')}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#f59e0b] hover:bg-[#d97706] active:scale-[0.99] text-white font-bold text-sm shadow-md transition-all duration-150"
          >
            Track bus
          </button>
        </div>

        {/* Shortcuts 2x2 Grid (Matching Image 5) */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2.5">
            Shortcuts
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Homework - Light Blue */}
            <button
              onClick={() => navigate('/parent/child?tab=homework')}
              className="p-4 rounded-2xl bg-[#e8f0fe] hover:bg-[#dbe7fd] dark:bg-blue-950/40 text-left text-xs font-semibold text-slate-800 dark:text-blue-200 border border-blue-100 dark:border-blue-900/40 shadow-xs active:scale-[0.98] transition"
            >
              Homework
            </button>

            {/* Results - Light Yellow */}
            <button
              onClick={() => navigate('/parent/child?tab=results')}
              className="p-4 rounded-2xl bg-[#fef7e0] hover:bg-[#fdf0cb] dark:bg-amber-950/40 text-left text-xs font-semibold text-slate-800 dark:text-amber-200 border border-amber-100 dark:border-amber-900/40 shadow-xs active:scale-[0.98] transition"
            >
              Results
            </button>

            {/* Fees due - Light Green */}
            <button
              onClick={() => navigate('/parent/fees')}
              className="p-4 rounded-2xl bg-[#e6f4ea] hover:bg-[#d7f0dd] dark:bg-emerald-950/40 text-left text-xs font-semibold text-slate-800 dark:text-emerald-200 border border-emerald-100 dark:border-emerald-900/40 shadow-xs active:scale-[0.98] transition"
            >
              Fees due
            </button>

            {/* Timetable - Light Pink */}
            <button
              onClick={() => navigate('/parent/child?tab=timetable')}
              className="p-4 rounded-2xl bg-[#fce8e6] hover:bg-[#fadad7] dark:bg-rose-950/40 text-left text-xs font-semibold text-slate-800 dark:text-rose-200 border border-rose-100 dark:border-rose-900/40 shadow-xs active:scale-[0.98] transition"
            >
              Timetable
            </button>
          </div>
        </div>

        {/* Notices Section (Matching Image 5) */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2.5">
            Notices
          </h2>
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Fee reminder – Term 2
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Term 2 tuition & bus fees due by Nov 15th
                </p>
              </div>
              <span className="text-xs text-slate-400 shrink-0 ml-2">Today</span>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Unit test schedule
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Second cycle tests commence from Nov 10th
                </p>
              </div>
              <span className="text-xs text-slate-400 shrink-0 ml-2">2 days ago</span>
            </div>
          </div>
        </div>

      </main>

      <BottomNav />
    </div>
  );
};
