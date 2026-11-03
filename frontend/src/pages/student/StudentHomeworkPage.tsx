import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { MOCK_HOMEWORK } from '../../data/mockData';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';

export const StudentHomeworkPage: React.FC = () => {
  const [homeworkList, setHomeworkList] = useState(MOCK_HOMEWORK);

  const toggleStatus = (id: string) => {
    setHomeworkList((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, status: h.status === 'submitted' ? 'pending' : 'submitted' } : h
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100">
      <Header title="My Homework" subtitle="Class 8-A" />

      <main className="max-w-md mx-auto p-4 space-y-4">
        
        <div className="space-y-3">
          {homeworkList.map((hw) => {
            const isCompleted = hw.status === 'submitted';

            return (
              <div
                key={hw.id}
                className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold">
                      {hw.subject}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      {hw.title}
                    </h3>
                  </div>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    Due: {hw.dueLabel}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {hw.description}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">
                    By {hw.teacherName}
                  </span>

                  <button
                    onClick={() => toggleStatus(hw.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1 transition ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-blue-700 hover:bg-blue-800 text-white shadow-xs'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{isCompleted ? 'Marked Completed' : 'Mark as Done'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </main>

      <BottomNav />
    </div>
  );
};
