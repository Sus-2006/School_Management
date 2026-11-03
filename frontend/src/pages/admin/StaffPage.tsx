import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/common/Header';
import { BottomNav } from '../../components/common/BottomNav';
import { schoolStore, MOCK_CLASSES } from '../../data/mockData';
import { Plus, Phone, Mail, Award, BookOpen } from 'lucide-react';
import type { TeacherProfile } from '../../types';

export const StaffPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherProfile | null>(null);

  const teachers = schoolStore.getTeachers();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-800 dark:text-slate-100">
      <Header title="Teaching Faculty" subtitle="Admin Portal" />

      <main className="max-w-md mx-auto p-4 space-y-4">
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Faculty Directory ({teachers.length})
            </h2>
            <p className="text-xs text-slate-500">
              Assigned across 7 academic classes
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/add-teacher')}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#1e4ed8] hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Teacher</span>
          </button>
        </div>

        {/* Classes & Class Teachers mapping overview */}
        <div className="p-3.5 rounded-2xl bg-[#e8f0fe] dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-xs space-y-2">
          <p className="font-bold text-blue-900 dark:text-blue-200">
            Class Teachers Assigned (7 Classes):
          </p>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 dark:text-slate-300">
            {MOCK_CLASSES.map((c) => (
              <div key={c.id} className="truncate">
                <span className="font-semibold text-blue-800 dark:text-blue-300">{c.fullName}:</span> {c.classTeacherName.split(' ')[1]}
              </div>
            ))}
          </div>
        </div>

        {/* Teachers List */}
        <div className="space-y-3">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              onClick={() => setSelectedTeacher(teacher)}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs cursor-pointer hover:border-blue-400 active:scale-[0.99] transition space-y-2"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {teacher.name}
                  </h3>
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                    {teacher.subject}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {teacher.qualification} • {teacher.experienceYears} yrs experience
                  </p>
                </div>
                {teacher.classTeacherOf && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-bold">
                    {teacher.classTeacherOf}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-4 pt-1 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={`tel:${teacher.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center space-x-1 hover:text-blue-600"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{teacher.phone}</span>
                </a>
                <a
                  href={`mailto:${teacher.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center space-x-1 hover:text-blue-600 truncate max-w-[170px]"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{teacher.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Teacher Detail Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  {selectedTeacher.name}
                </h3>
                <p className="text-xs font-bold text-blue-600">
                  {selectedTeacher.subject}
                </p>
              </div>
              <button
                onClick={() => setSelectedTeacher(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
              <div className="flex justify-between">
                <span className="text-slate-500">Employee ID:</span>
                <span className="font-semibold">{selectedTeacher.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Qualifications:</span>
                <span className="font-semibold">{selectedTeacher.qualification}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Class In-Charge:</span>
                <span className="font-semibold">{selectedTeacher.classTeacherOf || 'Subject Teacher'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone:</span>
                <span className="font-semibold">{selectedTeacher.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email:</span>
                <span className="font-semibold">{selectedTeacher.email}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedTeacher(null)}
              className="w-full py-2.5 rounded-xl bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};
