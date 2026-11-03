import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { useAuth } from '../../context/AuthContext';
import { schoolStore, MOCK_TIMETABLE, MOCK_HOMEWORK, MOCK_EXAM_MARKS } from '../../data/mockData';
import { BookOpen, Award, Clock, CheckCircle2, User, Phone, MapPin } from 'lucide-react';

export const ParentChildView: React.FC = () => {
  const { activeChild } = useAuth();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState<'overview' | 'results' | 'homework' | 'timetable'>(
    initialTab as any
  );

  const child = activeChild || schoolStore.getStudents()[0];
  const examMarks = MOCK_EXAM_MARKS.filter((m) => m.studentId === child.id || m.studentId === 'STU-001');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100">
      <Header title="Child Profile" subtitle="Parent Portal" />

      <main className="max-w-md mx-auto p-4 space-y-4">
        
        {/* Child Header Profile Card */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center space-x-3.5">
          <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-xl flex items-center justify-center shrink-0">
            {child.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {child.name}
            </h2>
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
              {child.className} • Roll No: {child.rollNo}
            </p>
            <p className="text-[11px] text-slate-400">
              Admission No: {child.admissionNo} • Blood: {child.bloodGroup}
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-semibold">
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'results', label: 'Results' },
            { key: 'homework', label: 'Homework' },
            { key: 'timetable', label: 'Timetable' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-2 px-1 text-center rounded-xl transition ${
                activeTab === tab.key
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Attendance Circular Card */}
            <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">Term Attendance</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                  {child.attendancePercentage}%
                </p>
                <p className="text-[11px] text-emerald-600 font-medium">Excellent record</p>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-blue-600 border-t-blue-200 flex items-center justify-center font-bold text-sm text-blue-700 dark:text-blue-300">
                {child.attendancePercentage}%
              </div>
            </div>

            {/* School & Bus Details */}
            <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5 text-xs">
              <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                Registration Info
              </h3>
              <div className="flex justify-between">
                <span className="text-slate-500">Class In-charge:</span>
                <span className="font-semibold">Mrs. Priya Sharma (Maths)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">School Transport:</span>
                <span className="font-semibold">{child.transportRequired ? `${child.busNo} (${child.stopName})` : 'Self Commute'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Home Address:</span>
                <span className="font-semibold">{child.address}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RESULTS */}
        {activeTab === 'results' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Academic Exam Performance
            </h3>
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
              {examMarks.map((m) => (
                <div key={m.id} className="p-3.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{m.subject}</span>
                    <p className="text-[10px] text-slate-400">{m.exam} • {m.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {m.marks}/{m.maxMarks}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {m.grade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: HOMEWORK */}
        {activeTab === 'homework' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Pending & Active Homework
            </h3>
            {MOCK_HOMEWORK.map((hw) => (
              <div
                key={hw.id}
                className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1.5"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{hw.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                    Due: {hw.dueLabel}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{hw.description}</p>
                <p className="text-[10px] text-slate-400 pt-1">Assigned by {hw.teacherName}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: TIMETABLE */}
        {activeTab === 'timetable' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Class 8-A Weekly Timetable (Monday)
            </h3>
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
              {MOCK_TIMETABLE.map((t) => (
                <div key={t.id} className="p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-[11px] flex items-center justify-center">
                      {t.periodLabel}
                    </span>
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">{t.subject}</p>
                      <p className="text-[10px] text-slate-400">{t.teacherName} • {t.room}</p>
                    </div>
                  </div>
                  <span className="text-slate-500 font-medium text-[11px]">{t.startTime}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <BottomNav />
    </div>
  );
};
