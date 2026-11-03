import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { MOCK_EXAM_MARKS } from '../../data/mockData';
import { Award, TrendingUp } from 'lucide-react';

export const StudentResultsPage: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<'Mid-Term' | 'Unit Test 1'>('Mid-Term');

  const marks = MOCK_EXAM_MARKS.filter((m) => m.exam === selectedExam);
  const totalScored = marks.reduce((acc, m) => acc + m.marks, 0);
  const totalMax = marks.reduce((acc, m) => acc + m.maxMarks, 0);
  const aggregatePct = totalMax > 0 ? Math.round((totalScored / totalMax) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100">
      <Header title="Exam Report Card" subtitle="Aarav Sundaram • Class 8-A" showBack={true} />

      <main className="max-w-md mx-auto p-4 space-y-4">
        
        {/* Exam Toggle Pills */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setSelectedExam('Mid-Term')}
            className={`py-2 text-center rounded-xl transition ${
              selectedExam === 'Mid-Term'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Mid-Term Exam (100 M)
          </button>
          <button
            onClick={() => setSelectedExam('Unit Test 1')}
            className={`py-2 text-center rounded-xl transition ${
              selectedExam === 'Unit Test 1'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Unit Test 1 (25 M)
          </button>
        </div>

        {/* Aggregate Banner */}
        <div className="p-5 rounded-3xl bg-blue-700 text-white shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-blue-200 font-semibold uppercase tracking-wider">
              Aggregate Performance
            </p>
            <p className="text-3xl font-black mt-0.5">{aggregatePct}%</p>
            <p className="text-xs text-blue-100 mt-0.5">
              Rank: 1st in Class 8-A • Grade: A+
            </p>
          </div>
          <div className="w-16 h-16 rounded-full bg-blue-600 border-2 border-blue-400 flex flex-col items-center justify-center font-bold text-xs">
            <span>Score</span>
            <span className="text-sm">{totalScored}/{totalMax}</span>
          </div>
        </div>

        {/* Marks Breakdown Table */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
          {marks.map((m) => (
            <div key={m.id} className="p-4 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {m.subject}
                </h4>
                <p className="text-[10px] text-slate-400">Exam Date: {m.date}</p>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-sm font-black text-slate-900 dark:text-white">
                  {m.marks} <span className="text-xs font-normal text-slate-400">/ {m.maxMarks}</span>
                </span>
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                  {m.grade}
                </span>
              </div>
            </div>
          ))}
        </div>

      </main>

      <BottomNav />
    </div>
  );
};
