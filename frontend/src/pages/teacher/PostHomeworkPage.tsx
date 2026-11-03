import React, { useState } from 'react';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { schoolStore, MOCK_CLASSES } from '../../data/mockData';
import { BookOpen, Plus, CheckCircle2, Calendar } from 'lucide-react';
import type { HomeworkItem } from '../../types';

export const PostHomeworkPage: React.FC = () => {
  const [homeworkList, setHomeworkList] = useState<HomeworkItem[]>(schoolStore.getHomework());
  const [showAddForm, setShowAddForm] = useState(false);
  const [success, setSuccess] = useState(false);

  const [classId, setClassId] = useState('CLS-8A');
  const [subject, setSubject] = useState('Mathematics');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handlePostHomework = (e: React.FormEvent) => {
    e.preventDefault();
    const cls = MOCK_CLASSES.find((c) => c.id === classId);
    const created = schoolStore.addHomework({
      classId,
      className: cls?.fullName || 'Class 8-A',
      subject,
      title,
      description,
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: dueDate || '2026-11-05',
      dueLabel: 'Next Week',
      teacherName: 'Mrs. Priya Sharma',
      status: 'pending',
    });

    setHomeworkList([created, ...homeworkList]);
    setShowAddForm(false);
    setSuccess(true);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100">
      <Header title="Class Homework" subtitle="Teacher Portal" />

      <main className="max-w-md mx-auto p-4 space-y-4">
        
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Assignments ({homeworkList.length})
          </h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Task</span>
          </button>
        </div>

        {success && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Homework posted and synced to student & parent dashboards!</span>
          </div>
        )}

        {/* Add Homework Form */}
        {showAddForm && (
          <form
            onSubmit={handlePostHomework}
            className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              Assign New Homework
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Target Class
                </label>
                <select
                  value={classId}
                  onChange={(e) => setClassId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
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
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                >
                  {['Mathematics', 'Science', 'English', 'Tamil', 'Social Science'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Title / Assignment Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Maths - Chapter 6 Exercises"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Instructions
              </label>
              <textarea
                rows={2}
                required
                placeholder="Details of problems, pages, or textbook exercises..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Submission Due Date
              </label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>

            <div className="flex space-x-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800"
              >
                Post to Students
              </button>
            </div>
          </form>
        )}

        {/* Existing Homework List */}
        <div className="space-y-3">
          {homeworkList.map((hw) => (
            <div
              key={hw.id}
              className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold">
                    {hw.className} • {hw.subject}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                    {hw.title}
                  </h3>
                </div>
                <span className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1 shrink-0">
                  <Calendar className="w-3 h-3" /> Due: {hw.dueLabel || hw.dueDate}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {hw.description}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>By {hw.teacherName}</span>
                <span className="text-emerald-600 font-semibold">18 of 20 Submitted</span>
              </div>
            </div>
          ))}
        </div>

      </main>

      <BottomNav />
    </div>
  );
};
