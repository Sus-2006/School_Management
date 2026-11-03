import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { schoolStore } from '../../data/mockData';

export const AdminHome: React.FC = () => {
  const navigate = useNavigate();

  const students = schoolStore.getStudents();
  const teachers = schoolStore.getTeachers();
  const buses = schoolStore.getBuses();

  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const presentToday = students.filter((s) => s.todayAttendance === 'present').length;
  const totalBuses = buses.length;

  // Attendance bar data for 7 classes
  const classAttendanceBars = [
    { label: '6A', percent: 95, height: 'h-16' },
    { label: '6B', percent: 85, height: 'h-13' },
    { label: '7A', percent: 100, height: 'h-18' },
    { label: '7B', percent: 80, height: 'h-12' },
    { label: '8A', percent: 90, height: 'h-15' },
    { label: '9A', percent: 95, height: 'h-17' },
    { label: '10A', percent: 85, height: 'h-14' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100">
      <Header />

      <main className="max-w-md mx-auto p-4 space-y-5">
        
        {/* 4 Stat Cards Grid (Matching Image 2) */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* Students Card - Soft Blue */}
          <div
            onClick={() => navigate('/admin/students')}
            className="p-4 rounded-2xl bg-[#e8f0fe] dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 shadow-xs cursor-pointer active:scale-[0.98] transition"
          >
            <p className="text-xs font-medium text-slate-600 dark:text-blue-300">Students</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{totalStudents}</p>
          </div>

          {/* Teachers Card - Soft Yellow */}
          <div
            onClick={() => navigate('/admin/staff')}
            className="p-4 rounded-2xl bg-[#fef7e0] dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 shadow-xs cursor-pointer active:scale-[0.98] transition"
          >
            <p className="text-xs font-medium text-slate-600 dark:text-amber-300">Teachers</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{totalTeachers}</p>
          </div>

          {/* Present Today Card - Soft Green */}
          <div
            onClick={() => navigate('/admin/reports')}
            className="p-4 rounded-2xl bg-[#e6f4ea] dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 shadow-xs cursor-pointer active:scale-[0.98] transition"
          >
            <p className="text-xs font-medium text-slate-600 dark:text-emerald-300">Present today</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {presentToday > 0 ? presentToday : '—'}
            </p>
          </div>

          {/* Buses Card - Soft Pink */}
          <div
            onClick={() => navigate('/admin/transport')}
            className="p-4 rounded-2xl bg-[#fce8e6] dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 shadow-xs cursor-pointer active:scale-[0.98] transition"
          >
            <p className="text-xs font-medium text-slate-600 dark:text-rose-300">Buses</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{totalBuses}</p>
          </div>
        </div>

        {/* Quick Actions (Matching Image 2) */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2.5">
            Quick actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/admin/add-student')}
              className="p-3.5 rounded-2xl bg-[#e8f0fe] hover:bg-[#dbe7fd] dark:bg-blue-950/50 dark:hover:bg-blue-900/60 text-left text-xs font-semibold text-slate-700 dark:text-blue-200 border border-blue-100 dark:border-blue-900/40 shadow-xs active:scale-[0.98] transition"
            >
              + Student
            </button>
            <button
              onClick={() => navigate('/admin/add-teacher')}
              className="p-3.5 rounded-2xl bg-[#fef7e0] hover:bg-[#fdf0cb] dark:bg-amber-950/40 dark:hover:bg-amber-900/50 text-left text-xs font-semibold text-slate-700 dark:text-amber-200 border border-amber-100 dark:border-amber-900/40 shadow-xs active:scale-[0.98] transition"
            >
              + Teacher
            </button>
            <button
              onClick={() => navigate('/admin/transport')}
              className="p-3.5 rounded-2xl bg-[#e6f4ea] hover:bg-[#d7f0dd] dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 text-left text-xs font-semibold text-slate-700 dark:text-emerald-200 border border-emerald-100 dark:border-emerald-900/40 shadow-xs active:scale-[0.98] transition"
            >
              Transport
            </button>
            <button
              onClick={() => navigate('/admin/notices')}
              className="p-3.5 rounded-2xl bg-[#fce8e6] hover:bg-[#fadad7] dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-left text-xs font-semibold text-slate-700 dark:text-rose-200 border border-rose-100 dark:border-rose-900/40 shadow-xs active:scale-[0.98] transition"
            >
              Post notice
            </button>
          </div>
        </div>

        {/* Today's Attendance Bar Chart (Matching Image 2) */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2.5">
            Today's attendance
          </h2>
          <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-end justify-between h-24 px-2 pt-2 pb-1 gap-2">
              {classAttendanceBars.map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div
                    style={{ height: `${bar.percent}%` }}
                    className="w-full rounded-md bg-[#3b82f6] dark:bg-blue-600 transition-all duration-300"
                    title={`${bar.label}: ${bar.percent}% attendance`}
                  />
                  <span className="text-[10px] font-medium text-slate-500">{bar.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Overall: 94.2% Attendance</span>
              <span>132 of 140 Present</span>
            </div>
          </div>
        </div>

        {/* Recent Activity List (Matching Image 2) */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2.5">
            Recent activity
          </h2>
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                New student added
              </span>
              <span className="text-xs text-slate-400">Today</span>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                Bus 3 route updated
              </span>
              <span className="text-xs text-slate-400">Today</span>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                Fee reminder sent
              </span>
              <span className="text-xs text-slate-400">Yesterday</span>
            </div>
          </div>
        </div>

      </main>

      <BottomNav />
    </div>
  );
};
