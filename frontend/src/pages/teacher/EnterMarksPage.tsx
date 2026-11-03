import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { schoolStore, MOCK_CLASSES } from '../../data/mockData';
import { Award, CheckCircle2, Save } from 'lucide-react';

export const EnterMarksPage: React.FC = () => {
  const [selectedClassId, setSelectedClassId] = useState('CLS-8A');
  const [subject, setSubject] = useState('Mathematics');
  const [exam, setExam] = useState('Unit Test 2');
  const [maxMarks, setMaxMarks] = useState(25);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const students = schoolStore.getStudents().filter((s) => s.classId === selectedClassId);

  // Marks map: studentId -> numeric marks
  const [marksMap, setMarksMap] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    schoolStore.getStudents().forEach((s, idx) => {
      init[s.id] = 20 + (idx % 6); // default demo marks 20-25
    });
    return init;
  });

  const calculateGrade = (score: number, max: number) => {
    const pct = (score / max) * 100;
    if (pct >= 90) return { grade: 'A+', color: 'text-emerald-600 bg-emerald-50' };
    if (pct >= 80) return { grade: 'A', color: 'text-blue-600 bg-blue-50' };
    if (pct >= 70) return { grade: 'B', color: 'text-amber-600 bg-amber-50' };
    if (pct >= 50) return { grade: 'C', color: 'text-purple-600 bg-purple-50' };
    return { grade: 'F', color: 'text-red-600 bg-red-50' };
  };

  const handleMarkChange = (studentId: string, val: string) => {
    const num = Math.min(Math.max(0, Number(val) || 0), maxMarks);
    setMarksMap((prev) => ({ ...prev, [studentId]: num }));
    setSavedSuccess(false);
  };

  const handleSaveMarks = () => {
    setSavedSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100">
      <Header title="Enter Exam Marks" subtitle="Teacher Portal" />

      <main className="max-w-md mx-auto p-4 space-y-4">
        
        {/* Controls */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Class
              </label>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
              >
                {MOCK_CLASSES.map((c) => (
                  <option key={c.id} value={c.id}>{c.fullName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
              >
                {['Mathematics', 'Science', 'English', 'Tamil', 'Social Science'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Examination
              </label>
              <select
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
              >
                <option value="Unit Test 1">Unit Test 1 (25 M)</option>
                <option value="Unit Test 2">Unit Test 2 (25 M)</option>
                <option value="Mid-Term Exam">Mid-Term Exam (100 M)</option>
                <option value="Annual Exam">Annual Exam (100 M)</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Max Marks
              </label>
              <input
                type="number"
                value={maxMarks}
                onChange={(e) => setMaxMarks(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium"
              />
            </div>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Marks recorded & published for {students.length} students in {exam}!</span>
          </div>
        )}

        {/* Student Marks List */}
        <div className="space-y-2">
          {students.map((student) => {
            const score = marksMap[student.id] ?? 22;
            const { grade, color } = calculateGrade(score, maxMarks);

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
                    <p className="text-[10px] text-slate-400">
                      Adm: {student.admissionNo}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <div className="flex items-center space-x-1">
                    <input
                      type="number"
                      min="0"
                      max={maxMarks}
                      value={score}
                      onChange={(e) => handleMarkChange(student.id, e.target.value)}
                      className="w-14 px-2 py-1.5 text-center text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                    <span className="text-xs text-slate-400">/{maxMarks}</span>
                  </div>
                  <span className={`px-2 py-1 text-[11px] font-bold rounded-lg ${color}`}>
                    {grade}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Save Button */}
        <div className="sticky bottom-20 pt-2">
          <button
            onClick={handleSaveMarks}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#1e4ed8] hover:bg-blue-700 text-white font-bold text-xs shadow-lg flex items-center justify-center space-x-2 transition"
          >
            <Save className="w-4 h-4" />
            <span>Save & Publish Marks</span>
          </button>
        </div>

      </main>

      <BottomNav />
    </div>
  );
};
