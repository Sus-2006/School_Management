import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { schoolStore, MOCK_TIMETABLE, MOCK_NOTICES } from '../../data/mockData';
import { CalendarCheck, BookOpen, Award, MessageSquare, Clock, MapPin } from 'lucide-react';

export const TeacherHome: React.FC = () => {
  const navigate = useNavigate();
  const todayClasses = MOCK_TIMETABLE.slice(0, 4); // First 4 periods

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100">
      <Header title="Mrs. Priya Sharma" subtitle="Teacher Portal" />

      <main className="max-w-md mx-auto p-4 space-y-5">
        
        {/* Class Teacher Badge Banner */}
        <div className="p-4 rounded-3xl bg-blue-700 text-white shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-blue-200 font-medium">Class Teacher In-Charge</p>
            <p className="text-xl font-bold mt-0.5">Class 8-A • 20 Students</p>
            <p className="text-[11px] text-blue-100 mt-0.5">Room 301 • Mathematics Department</p>
          </div>
          <button
            onClick={() => navigate('/teacher/attendance')}
            className="px-3 py-2 rounded-xl bg-white text-blue-800 text-xs font-bold shadow-xs hover:bg-blue-50 transition"
          >
            Mark Att.
          </button>
        </div>

        {/* Quick Actions (Matching spec) */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2.5">
            Quick actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/teacher/attendance')}
              className="p-3.5 rounded-2xl bg-[#e8f0fe] hover:bg-[#dbe7fd] dark:bg-blue-950/40 text-left text-xs font-semibold text-slate-800 dark:text-blue-200 border border-blue-100 dark:border-blue-900/40 shadow-xs flex items-center space-x-2 active:scale-[0.98] transition"
            >
              <CalendarCheck className="w-4 h-4 text-blue-700 dark:text-blue-400" />
              <span>Mark Attendance</span>
            </button>
            <button
              onClick={() => navigate('/teacher/homework')}
              className="p-3.5 rounded-2xl bg-[#fef7e0] hover:bg-[#fdf0cb] dark:bg-amber-950/40 text-left text-xs font-semibold text-slate-800 dark:text-amber-200 border border-amber-100 dark:border-amber-900/40 shadow-xs flex items-center space-x-2 active:scale-[0.98] transition"
            >
              <BookOpen className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              <span>Post Homework</span>
            </button>
            <button
              onClick={() => navigate('/teacher/marks')}
              className="p-3.5 rounded-2xl bg-[#e6f4ea] hover:bg-[#d7f0dd] dark:bg-emerald-950/40 text-left text-xs font-semibold text-slate-800 dark:text-emerald-200 border border-emerald-100 dark:border-emerald-900/40 shadow-xs flex items-center space-x-2 active:scale-[0.98] transition"
            >
              <Award className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Enter Marks</span>
            </button>
            <button
              onClick={() => navigate('/teacher/messages')}
              className="p-3.5 rounded-2xl bg-[#fce8e6] hover:bg-[#fadad7] dark:bg-rose-950/40 text-left text-xs font-semibold text-slate-800 dark:text-rose-200 border border-rose-100 dark:border-rose-900/40 shadow-xs flex items-center space-x-2 active:scale-[0.98] transition"
            >
              <MessageSquare className="w-4 h-4 text-rose-700 dark:text-rose-400" />
              <span>Message Parents</span>
            </button>
          </div>
        </div>

        {/* Today's Teaching Timetable */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Today's Teaching Schedule
            </h2>
            <span className="text-xs text-blue-600 font-semibold">Monday</span>
          </div>

          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {todayClasses.map((period) => (
              <div key={period.id} className="p-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center shrink-0">
                    {period.periodLabel}
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      {period.subject} • {period.className}
                    </h3>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" /> {period.room}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{period.startTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notices */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2.5">
            Staff & Academic Notices
          </h2>
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {MOCK_NOTICES.slice(0, 2).map((notice) => (
              <div key={notice.id} className="p-3.5 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    {notice.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate max-w-[260px]">
                    {notice.summary}
                  </p>
                </div>
                <span className="text-[11px] text-slate-400 shrink-0 ml-2">
                  {notice.timeAgo}
                </span>
              </div>
            ))}
          </div>
        </div>

      </main>

      <BottomNav />
    </div>
  );
};
