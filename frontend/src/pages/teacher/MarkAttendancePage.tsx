import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { schoolStore, MOCK_CLASSES } from '../../data/mockData';
import { CheckCircle2, UserCheck, UserX, Clock, Save } from 'lucide-react';

export const MarkAttendancePage: React.FC = () => {
  const [selectedClassId, setSelectedClassId] = useState('CLS-8A');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const students = schoolStore.getStudents().filter((s) => s.classId === selectedClassId);

  // Local attendance status map: studentId -> 'present' | 'absent' | 'late'
  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'present' | 'absent' | 'late'>>(() => {
    const initial: Record<string, 'present' | 'absent' | 'late'> = {};
    schoolStore.getStudents().forEach((s) => {
      initial[s.id] = s.todayAttendance === 'absent' ? 'absent' : 'present';
    });
    return initial;
  });

  const setStatus = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceMap((prev) => ({ ...prev, [studentId]: status }));
    setSavedSuccess(false);
  };

  const handleMarkAllPresent = () => {
    const updated = { ...attendanceMap };
    students.forEach((s) => {
      updated[s.id] = 'present';
    });
    setAttendanceMap(updated);
    setSavedSuccess(false);
  };

  const handleSaveAttendance = () => {
    students.forEach((s) => {
      const status = attendanceMap[s.id] || 'present';
      schoolStore.updateStudent(s.id, { todayAttendance: status });
    });
    setSavedSuccess(true);
  };

  const presentCount = students.filter((s) => (attendanceMap[s.id] || 'present') === 'present').length;
  const absentCount = students.filter((s) => attendanceMap[s.id] === 'absent').length;
  const lateCount = students.filter((s) => attendanceMap[s.id] === 'late').length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100">
      <Header title="Daily Attendance" subtitle="Teacher Portal" />

      <main className="max-w-md mx-auto p-4 space-y-4">
        
        {/* Class & Date Selector */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Class & Section
              </label>
              <select
                value={selectedClassId}
                onChange={(e) => {
                  setSelectedClassId(e.target.value);
                  setSavedSuccess(false);
                }}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
              >
                {MOCK_CLASSES.map((c) => (
                  <option key={c.id} value={c.id}>{c.fullName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Attendance Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
              />
            </div>
          </div>

          {/* Quick Stats & Mark All Present */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center space-x-3">
              <span className="text-emerald-600 font-bold">{presentCount} Present</span>
              <span className="text-red-600 font-bold">{absentCount} Absent</span>
              {lateCount > 0 && <span className="text-amber-600 font-bold">{lateCount} Late</span>}
            </div>
            <button
              onClick={handleMarkAllPresent}
              className="text-[11px] font-semibold text-blue-700 dark:text-blue-400 hover:underline"
            >
              Mark All Present
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Attendance saved successfully for {students.length} students!</span>
          </div>
        )}

        {/* Student Roster */}
        <div className="space-y-2">
          {students.map((student) => {
            const currentStatus = attendanceMap[student.id] || 'present';

            return (
              <div
                key={student.id}
                className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center shrink-0">
                    {student.rollNo}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {student.name}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      Adm: {student.admissionNo}
                    </p>
                  </div>
                </div>

                {/* Status Toggle Buttons */}
                <div className="flex items-center space-x-1 shrink-0">
                  <button
                    onClick={() => setStatus(student.id, 'present')}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition ${
                      currentStatus === 'present'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    P
                  </button>
                  <button
                    onClick={() => setStatus(student.id, 'absent')}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition ${
                      currentStatus === 'absent'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setStatus(student.id, 'late')}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition ${
                      currentStatus === 'late'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    L
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Save Floating Bar */}
        <div className="sticky bottom-20 pt-2">
          <button
            onClick={handleSaveAttendance}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#1e4ed8] hover:bg-blue-700 text-white font-bold text-xs shadow-lg flex items-center justify-center space-x-2 transition"
          >
            <Save className="w-4 h-4" />
            <span>Submit Class Attendance</span>
          </button>
        </div>

      </main>

      <BottomNav />
    </div>
  );
};
